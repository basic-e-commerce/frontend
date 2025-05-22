import { useSelector, useDispatch } from "react-redux";
import {
  updateAddress,
  updateBillingAddress,
  setBillingSame,
  setInvoiceType,
  updateCorporateInfo,
  updateFarkliAdres,
  resetAdress,
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
    billingAddress,
    billingSame,
    invoiceType,
    corporateInfo,
    farkliAdres,
  } = useSelector((state) => state.siparisSlice);
  const { status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );
  const { isLogin } = useSelector((state) => state.authSlice);
  const [addressesOlan, setAddressesOlan] = useState([]);
  const [selectedAdresId, setSelectedAdresId] = useState(null);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchCartItemsLoggedIn());
      fetchAddresses();
    } else {
      dispatch(fetchCartItems(baslangıcState));
    }
  }, [baslangıcState, dispatch, isLogin]);

  const fetchAddresses = async () => {
    try {
      const response = await getAdress();
      setAddressesOlan(response);
    } catch (error) {
      console.error("Adresler alınırken hata oluştu:", error);
    }
  };

  const fields = [
    { key: "title", placeholder: "Başlık" },
    { key: "phoneNo", placeholder: "Telefon" },
    { key: "addressLine1", placeholder: "Adres" },
    { key: "postalCode", placeholder: "Posta Kodu" },
    { key: "city", placeholder: "Şehir" },
  ];

  const selectedAdres = (adres) => {
    setSelectedAdresId(adres.id);
    const addressNew = {
      title: adres.title,
      addressLine1: adres.addressLine1,
      phoneNo: adres.phoneNo,
      postalCode: adres.postalCode,
      city: adres.city,
      countryId: 1,
    };

    dispatch(updateAddress(addressNew));
  };

  console.log(address);

  return (
    <div className="siparisAdresSection">
      <Paper sx={{ boxShadow: 4, borderRadius: 1 }} className="formAdres">
        <form className="address-formm">
          {!isLogin && (
            <div className="warning">
              Zaten Üye misiniz? <a href="/login">Giriş Yapın</a>
            </div>
          )}

          <section className="adresBilgileri">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={farkliAdres}
                onClick={() => dispatch(resetAdress())}
                onChange={(e) => dispatch(updateFarkliAdres(e.target.checked))}
              />
              Farklı Bir Adres Girmek İstiyorum
            </label>

            {farkliAdres && (
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
                      updateAddress({ ...address, countryId: e.target.value })
                    )
                  }
                  value={address.countryId}
                  name="countryId"
                  disabled
                >
                  <option value={1}>Türkiye</option>
                </select>
              </div>
            )}
          </section>

          {isLogin && addressesOlan.length > 0 && !farkliAdres && (
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
                      {`${adres.country} / ${adres.city}`}
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
                    value={billingAddress[key]}
                    onChange={(e) =>
                      dispatch(
                        updateBillingAddress({
                          ...billingAddress,
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
                        ...billingAddress,
                        countryId: e.target.value,
                      })
                    )
                  }
                  value={billingAddress.countryId}
                  name="countryId"
                  disabled
                >
                  <option value={1}>Türkiye</option>
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
                  value="bireysel"
                  checked={invoiceType === "bireysel"}
                  onChange={() => dispatch(setInvoiceType("bireysel"))}
                />
                Bireysel
              </label>

              <label>
                <input
                  type="radio"
                  name="invoiceType"
                  value="kurumsal"
                  checked={invoiceType === "kurumsal"}
                  onChange={() => dispatch(setInvoiceType("kurumsal"))}
                />{" "}
                Kurumsal
              </label>
            </div>

            {invoiceType === "kurumsal" && (
              <div className="corporate-info">
                <input
                  placeholder="Vergi Dairesi"
                  value={corporateInfo.taxOffice}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInfo,
                        taxOffice: e.target.value,
                      })
                    )
                  }
                  required
                />
                <input
                  placeholder="Vergi Numarası"
                  value={corporateInfo.taxNumber}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInfo,
                        taxNumber: e.target.value,
                      })
                    )
                  }
                  required
                />
                <input
                  placeholder="Ticaret Ünvanı"
                  value={corporateInfo.companyName}
                  onChange={(e) =>
                    dispatch(
                      updateCorporateInfo({
                        ...corporateInfo,
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

      <SiparisOzeti cartTotal={cartTotal} />
    </div>
  );
}
