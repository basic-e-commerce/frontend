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
  resetCheckout,
} from "../../../redux/slices/siparisSlice";
import { Paper } from "@mui/material";
import "./Adres.scss";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useEffect, useState } from "react";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
} from "../../../redux/slices/sepetCartSlice";
import { getAdress, getCity, getDistrict } from "../../../api/apiAdress";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import OdemeSkeleton from "../Odeme/OdemeSkeleton";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";
import { checkoutValidation } from "./checkoutValidation";
import * as Yup from "yup";

export default function Adres({ minOrderAmount, setHazir }) {
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
  const { isLoading } = useSelector((state) => state.loading);
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const [addressesOlan, setAddressesOlan] = useState([]);

  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtsInvoice, setDistrictsInvoice] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchAddresses = async () => {
    try {
      const response = await getAdress();
      if (response.length === 0) {
        dispatch(updateFarkliAdres(true));
      }
      setAddressesOlan(response);
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message,
          status: "error",
        })
      );
    }
  };

  const fetchCity = async () => {
    try {
      const response = await getCity();
      setCitys(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiscrict = async (cityCode) => {
    try {
      const response = await getDistrict(cityCode);
      setDistricts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiscrictInvoice = async (cityCode) => {
    try {
      const response = await getDistrict(cityCode);
      setDistrictsInvoice(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuthChecked) return;

    const fetchData = async () => {
      dispatch(setLoading({ isLoading: true, message: "Yükleniyor" }));
      dispatch(resetCheckout());

      try {
        if (isLogin) {
          await dispatch(fetchCartItemsLoggedIn()).unwrap();
          await fetchAddresses();
        } else {
          await dispatch(fetchCartItems(baslangıcState)).unwrap();
          dispatch(updateFarkliAdres(true));
        }
        await fetchCity();
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.message,
            status: "error",
          })
        );
      } finally {
        setTimeout(() => {
          dispatch(clearLoading());
        }, 350);
      }
    };

    fetchData();
  }, [baslangıcState, dispatch, isLogin, isAuthChecked]);

  useEffect(() => {
    if (address.cityCode) {
      fetchDiscrict(address.cityCode);
    }
  }, [address.cityCode]);

  useEffect(() => {
    if (invoiceAddress.cityCode) {
      fetchDiscrictInvoice(invoiceAddress.cityCode);
    }
  }, [invoiceAddress.cityCode]);

  useEffect(() => {
    const validateForm = async () => {
      try {
        // Redux'tan gelen tüm veriyi tek objede topla
        const formData = {
          address,
          invoiceAddress,
          corporateInvoice,
          diffAddress,
          billingSame,
          invoiceType,
          selectedAdresId,
        };

        await checkoutValidation.validate(formData, { abortEarly: false });

        // Eğer buraya geldiysek hata yok
        setErrors({});
        setHazir(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const newErrors = {};
          err.inner.forEach((validationError) => {
            // path: örn. "address.firstName"
            newErrors[validationError.path] = validationError.message;
          });
          setErrors(newErrors);
        }
        setHazir(false);
      }
    };

    validateForm();
  }, [
    address,
    invoiceAddress,
    corporateInvoice,
    diffAddress,
    billingSame,
    invoiceType,
  ]);

  const selectedAdres = (adres) => {
    dispatch(updataSelectedAdresId(adres.id));
    dispatch(updateAddress(adres));
  };

  const fields = [
    { key: "title", placeholder: "Başlık" },
    { key: "username", placeholder: "Mail Adresiniz" },
    { key: "firstName", placeholder: "Ad" },
    { key: "lastName", placeholder: "Soyad" },
    { key: "phoneNo", placeholder: "Telefon" },
    { key: "addressLine1", placeholder: "Adres" },
    { key: "postalCode", placeholder: "Posta Kodu" },
  ];

  if (isLoading || !status == "LOADING") {
    return <OdemeSkeleton />;
  }

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
                  <div key={key}>
                    <input
                      placeholder={placeholder}
                      value={address[key]}
                      onChange={(e) =>
                        dispatch(
                          updateAddress({ ...address, [key]: e.target.value })
                        )
                      }
                      required
                    />
                    {errors[`address.${key}`] && (
                      <span className="error">{errors[`address.${key}`]}</span>
                    )}
                  </div>
                ))}
                <div>
                  <select
                    value={address.cityCode}
                    onChange={(e) => {
                      const selectedCity = citys.find(
                        (city) => city.cityCode === e.target.value
                      );
                      dispatch(
                        updateAddress({
                          ...address,
                          cityCode: e.target.value,
                          city: selectedCity ? selectedCity.name : "",
                          districtId: "",
                        })
                      );
                    }}
                    required
                  >
                    <option value="">Şehir Seçiniz</option>
                    {citys.map((city) => (
                      <option
                        name={city.name}
                        key={city.cityCode}
                        value={city.cityCode}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>

                  {errors[`address.cityCode`] && (
                    <span className="error">{errors[`address.cityCode`]}</span>
                  )}
                </div>

                <div>
                  <select
                    value={address.districtId}
                    onChange={(e) => {
                      const selectedDistrict = districts.find(
                        (district) => district.districtId == e.target.value
                      );
                      dispatch(
                        updateAddress({
                          ...address,
                          districtId: e.target.value,
                          district: selectedDistrict
                            ? selectedDistrict.name
                            : "",
                        })
                      );
                    }}
                    required
                    disabled={address.cityCode ? false : true}
                  >
                    <option value="">İlçe Seçiniz</option>
                    {districts.map((district) => (
                      <option
                        key={district.districtId}
                        value={district.districtId}
                      >
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors[`address.districtId`] && (
                    <span className="error">
                      {errors[`address.districtId`]}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    onChange={(e) =>
                      dispatch(
                        updateAddress({
                          ...address,
                          countryName: e.target.value,
                        })
                      )
                    }
                    value={address.countryName}
                    name="countryName"
                    disabled
                  >
                    <option value={"TURKIYE"}>Türkiye</option>
                  </select>
                  {errors[`address.countryName`] && (
                    <span className="error">
                      {errors[`address.countryName`]}
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>

          {isLogin && addressesOlan.length > 0 && !diffAddress && (
            <div>
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

              {errors[`selectedAdresId`] && (
                <span className="error">{errors[`selectedAdresId`]}</span>
              )}
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
                  <div key={key}>
                    <input
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
                    {errors[`invoiceAddress.${key}`] && (
                      <span className="error">
                        {errors[`invoiceAddress.${key}`]}
                      </span>
                    )}
                  </div>
                ))}

                <div>
                  <select
                    onChange={(e) =>
                      dispatch(
                        updateBillingAddress({
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
                  {errors[`invoiceAddress.countryName`] && (
                    <span className="error">
                      {errors[`invoiceAddress.countryName`]}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    value={invoiceAddress.cityCode}
                    onChange={(e) => {
                      const selectedCity = citys.find(
                        (city) => city.cityCode === e.target.value
                      );
                      dispatch(
                        updateBillingAddress({
                          ...invoiceAddress,
                          cityCode: e.target.value,
                          city: selectedCity ? selectedCity.name : "",
                          districtId: "",
                        })
                      );
                    }}
                    required
                  >
                    <option value="">Şehir Seçiniz</option>
                    {citys.map((city) => (
                      <option key={city.cityCode} value={city.cityCode}>
                        {city.name}
                      </option>
                    ))}
                  </select>

                  {errors[`invoiceAddress.cityCode`] && (
                    <span className="error">
                      {errors[`invoiceAddress.cityCode`]}
                    </span>
                  )}
                </div>

                {/* İlçe seçimi */}
                <div>
                  <select
                    value={invoiceAddress.districtId}
                    onChange={(e) => {
                      const selectedDistrict = districtsInvoice.find(
                        (district) => district.districtId == e.target.value
                      );
                      dispatch(
                        updateBillingAddress({
                          ...invoiceAddress,
                          districtId: e.target.value,
                          district: selectedDistrict
                            ? selectedDistrict.name
                            : "",
                        })
                      );
                    }}
                    required
                    disabled={invoiceAddress.cityCode ? false : true}
                  >
                    <option value="">İlçe Seçiniz</option>
                    {districtsInvoice.map((district) => (
                      <option
                        key={district.districtId}
                        value={district.districtId}
                      >
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors[`invoiceAddress.districtId`] && (
                    <span className="error">
                      {errors[`invoiceAddress.districtId`]}
                    </span>
                  )}
                </div>
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
                <div>
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
                  {errors[`corporateInvoice.taxOffice`] && (
                    <span className="error">
                      {errors[`corporateInvoice.taxOffice`]}
                    </span>
                  )}
                </div>

                <div>
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
                  {errors[`corporateInvoice.taxNumber`] && (
                    <span className="error">
                      {errors[`corporateInvoice.taxNumber`]}
                    </span>
                  )}
                </div>

                <div>
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
                  {errors[`corporateInvoice.companyName`] && (
                    <span className="error">
                      {errors[`corporateInvoice.companyName`]}
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>
        </form>
      </Paper>

      <SiparisOzeti minOrderAmount={minOrderAmount} cartItems={cartItems} />
    </div>
  );
}
