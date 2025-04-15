import { useSelector, useDispatch } from "react-redux";
import {
  updateAddress,
  updateBillingAddress,
  setBillingSame,
  setInvoiceType,
  updateCorporateInfo,
} from "../../../redux/slices/siparisSlice";
import { Paper } from "@mui/material";
import "./Adres.scss";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useEffect } from "react";
import { fetchCartItems } from "../../../redux/slices/sepetCartSlice";

export default function Adres() {
  const dispatch = useDispatch();
  const { address, billingAddress, billingSame, invoiceType, corporateInfo } =
    useSelector((state) => state.siparisSlice);
  const { status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );
  const { isLogin } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      adres: address,
      faturaAdres: billingSame ? address : billingAddress,
      faturaTipi:
        invoiceType === "bireysel"
          ? "bireysel"
          : {
              tip: "kurumsal",
              ...corporateInfo,
            },
    };
    console.log("Adres bilgisi gönderildi:", payload);
  };

  useEffect(() => {
    dispatch(fetchCartItems(baslangıcState));
  }, [baslangıcState, dispatch]);

  const fields = [
    { key: "title", placeholder: "Başlık" },
    { key: "name", placeholder: "Ad Soyad" },
    { key: "phone", placeholder: "Telefon" },
    { key: "addressLine1", placeholder: "Adres" },
    { key: "postalCode", placeholder: "Posta Kodu" },
    { key: "city", placeholder: "Şehir" },
  ];

  return (
    <div className="siparisAdresSection">
      <Paper sx={{ boxShadow: 4, borderRadius: 1 }} className="formAdres">
        <form className="address-formm" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="warning">
              Zaten Üye misiniz? <a href="/login">Giriş Yapın</a>
            </div>
          )}

          {/* Adres Bilgileri */}
          <section>
            <h2>Adres Bilgileri</h2>
            {fields.map(({ key, placeholder }) => (
              <input
                key={key}
                placeholder={placeholder}
                value={address[key]}
                onChange={(e) =>
                  dispatch(updateAddress({ ...address, [key]: e.target.value }))
                }
                required
              />
            ))}
          </section>

          {/* Fatura Adresi */}
          <section>
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
              </div>
            )}
          </section>

          {/* Fatura Tipi */}
          <section>
            <h2>Fatura Tipi</h2>
            <div className="faturaTipi">
              <label>
                <input
                  type="radio"
                  name="invoiceType"
                  value="bireysel"
                  checked={invoiceType === "bireysel"}
                  onChange={() => dispatch(setInvoiceType("bireysel"))}
                />{" "}
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
