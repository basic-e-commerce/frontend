import { useSelector, useDispatch } from "react-redux";
import {
  updateAddress,
  updateBillingAddress,
  setBillingSame,
  setInvoiceType,
  updateCorporateInfo,
  updateFarkliAdres,
  resetAdress,
  updataSelectedAdresId,
} from "../../../redux/slices/siparisSlice";
import { Paper } from "@mui/material";
import "./Adres.scss";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useEffect, useState } from "react";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
} from "../../../redux/slices/sepetCartSlice";
import { getAdress } from "../../../api/apiAdress";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function Adres() {
  const dispatch = useDispatch();
  const {
    address,
    invoiceAddress,
    billingSame,
    invoiceType,
    corporateInvoice,
    diffAddress,
    selectedAdresId,
  } = useSelector((state) => state.siparisSlice);
  const { status, baslangıcState, cartItems } = useSelector(
    (state) => state.sepet
  );
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const [addressesOlan, setAddressesOlan] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await getAdress();
      if (response.length === 0) {
        dispatch(updateFarkliAdres(true));
      }
      setAddressesOlan(response);
    } catch (error) {
      console.error("Adresler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (!isAuthChecked) return;

    if (isLogin) {
      dispatch(fetchCartItemsLoggedIn());
      fetchAddresses();
    } else {
      dispatch(fetchCartItems(baslangıcState));
      dispatch(updateFarkliAdres(true));
    }
  }, [baslangıcState, dispatch, isLogin, isAuthChecked]);

  const selectedAdres = (adres) => {
    dispatch(updataSelectedAdresId(adres.id));
    const addressNew = {
      title: adres.title,
      firstName: adres.firstName,
      lastName: adres.lastName,
      addressLine1: adres.addressLine1,
      phoneNo: adres.phoneNo,
      postalCode: adres.postalCode,
      city: adres.city,
      countryName: adres.countryName,
    };

    dispatch(updateAddress(addressNew));
  };

  const fields = [
    { key: "title", placeholder: "Başlık" },
    { key: "username", placeholder: "Mail Adresiniz" },
    { key: "firstName", placeholder: "Ad" },
    { key: "lastName", placeholder: "Soyad" },
    { key: "phoneNo", placeholder: "Telefon" },
    { key: "addressLine1", placeholder: "Adres" },
    { key: "postalCode", placeholder: "Posta Kodu" },
    { key: "city", placeholder: "Şehir" },
  ];

  return (
    <div className="siparisAdresSection">
      <Paper sx={{ boxShadow: 4, borderRadius: 1 }} className="formAdres">
        <form className="address-formm">
          {!isLogin && (
            <div className="warning">
              Zaten Üye misiniz? <a href="/customerlogin">Giriş Yapın</a>
            </div>
          )}

          <section className="adresBilgileri">
            {isLogin && addressesOlan.length != 0 && (
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={diffAddress}
                  onClick={() => {
                    dispatch(resetAdress());
                    dispatch(updataSelectedAdresId(null));
                  }}
                  onChange={(e) =>
                    dispatch(updateFarkliAdres(e.target.checked))
                  }
                />
                Farklı Bir Adres Girmek İstiyorum
              </label>
            )}

            {diffAddress && (
              <div className="adressAsil">
                <h2>Adres Bilgileri</h2>
                {fields.map(({ key, placeholder }) => (
                  <input
                    key={key}
                    placeholder={placeholder}
                    value={address[key]}
                    onChange={(e) =>
                      dispatch(
                        updateAddress({ ...address, [key]: e.target.value })
                      )
                    }
                    required
                  />
                ))}
                <select
                  onChange={(e) =>
                    dispatch(
                      updateAddress({ ...address, countryName: e.target.value })
                    )
                  }
                  value={address.countryName}
                  name="countryName"
                  disabled
                >
                  <option value={"TURKIYE"}>Türkiye</option>
                </select>
              </div>
            )}
          </section>

          {isLogin && addressesOlan.length > 0 && !diffAddress && (
            <div className="adresesContent">
              {addressesOlan?.map((adres) => (
                <div
                  key={adres.id}
                  onClick={() => {
                    selectedAdres(adres);
                  }}
                  className={
                    selectedAdresId == adres.id
                      ? "kayitliAdres paper selectedAdres"
                      : "kayitliAdres paper"
                  }
                >
                  <div className="top">
                    <h4 className="adressTitle">{adres.title}</h4>
                    {selectedAdresId == adres.id ? (
                      <DoneOutlineIcon className="iconTop" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="phone">
                    <p className="name">{adres.phoneNo}</p>
                  </div>
                  <div className="section">
                    <p className="name">{adres.name}</p>
                    <p className="adres">
                      {adres.addressLine1} {adres.postalCode} <br />
                      {`${adres.countryName} / ${adres.city}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <section className="faturaAdresi">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={billingSame}
                onChange={(e) => dispatch(setBillingSame(e.target.checked))}
              />
              Fatura adresim yukarıdaki adresle aynı olsun
            </label>

            {!billingSame && (
              <div className="billing-address">
                <h2>Fatura Adresi</h2>
                {fields.map(({ key, placeholder }) => (
                  <input
                    key={key}
                    placeholder={placeholder}
                    value={invoiceAddress[key]}
                    onChange={(e) =>
                      dispatch(
                        updateBillingAddress({
                          ...invoiceAddress,
                          [key]: e.target.value,
                        })
                      )
                    }
                    required
                  />
                ))}
                <select
                  onChange={(e) =>
                    dispatch(
                      updateAddress({
                        ...invoiceAddress,
                        countryName: e.target.value,
                      })
                    )
                  }
                  value={invoiceAddress.countryName}
                  name="countryName"
                  disabled
                >
                  <option value={"TURKIYE"}>Türkiye</option>
                </select>
              </div>
            )}
          </section>

          <section className="faturaTipi">
            <h2>Fatura Tipi</h2>
            <div className="faturaTipi">
              <label>
                <input
                  type="radio"
                  name="invoiceType"
                  value="INDIVIDUAL"
                  checked={invoiceType === "INDIVIDUAL"}
                  onChange={() => dispatch(setInvoiceType("INDIVIDUAL"))}
                />
                Bireysel
              </label>

              <label>
                <input
                  type="radio"
                  name="invoiceType"
                  value="CORPORATE"
                  checked={invoiceType === "CORPORATE"}
                  onChange={() => dispatch(setInvoiceType("CORPORATE"))}
                />
                Kurumsal
              </label>
            </div>

            {invoiceType === "CORPORATE" && (
              <div className="corporate-info">
                <input
                  placeholder="Vergi Dairesi"
                  value={corporateInvoice.taxOffice}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInvoice,
                        taxOffice: e.target.value,
                      })
                    )
                  }
                  required
                />
                <input
                  placeholder="Vergi Numarası"
                  value={corporateInvoice.taxNumber}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInvoice,
                        taxNumber: e.target.value,
                      })
                    )
                  }
                  required
                />
                <input
                  placeholder="Ticaret Ünvanı"
                  value={corporateInvoice.companyName}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInvoice,
                        companyName: e.target.value,
                      })
                    )
                  }
                  required
                />
              </div>
            )}
          </section>
        </form>
      </Paper>

      <SiparisOzeti cartItems={cartItems} />
    </div>
  );
}
