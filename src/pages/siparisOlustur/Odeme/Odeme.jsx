import "./Odeme.scss";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
} from "../../../redux/slices/sepetCartSlice";
import { useFormik } from "formik";
import { paymentSchema } from "../../../yup/payment";
import axios from "axios";
import { BASE_URL } from "../../../config/baseApi";
import api from "../../../api/api";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";

const Odeme = () => {
  const dispatch = useDispatch();

  const { status, baslangıcState, cartItems } = useSelector(
    (state) => state.sepet
  );
  const {
    address,
    invoiceAddress,
    billingSame,
    invoiceType,
    corporateInvoice,
  } = useSelector((state) => state.siparisSlice);
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [binNumber, setBinNumber] = useState("");

  useEffect(() => {
    if (!isAuthChecked) return;

    isLogin
      ? dispatch(fetchCartItemsLoggedIn())
      : dispatch(fetchCartItems(baslangıcState));
  }, [baslangıcState, dispatch, isLogin, isAuthChecked]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      installment: "",
    },
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      dispatch(setLoading({ isLoading: true, message: "Ödeme alınıyor..." }));

      const payload = {
        code: cartItems?.couponCustomerResponseDto?.code || null,
        address: address,
        invoiceAddress: billingSame ? address : invoiceAddress,
        invoiceType: invoiceType,
        diffAddress: !billingSame,
        ...(invoiceType === "CORPORATE" && {
          corporateInvoice: {
            taxOffice: corporateInvoice.taxOffice,
            companyName: corporateInvoice.companyName,
            taxNumber: corporateInvoice.taxNumber,
          },
        }),
        paymentCreditCardRequestDto: {
          paymentMethod: "IYZICO",
          creditCardRequestDto: {
            cardNumber: values.cardNumber,
            cardHolderName: values.fullName,
            expirationMonth: values.expiryMonth,
            expirationYear: values.expiryYear,
            cvv: values.cvv,
          },
          installmentNumber: values.installment,
        },
        ...(!isLogin && {
          orderItemCreateDtos: baslangıcState,
        }),
      };

      try {
        const response = isLogin
          ? await api.post(`${BASE_URL}/api/v1/payment`, payload)
          : await axios.post(`${BASE_URL}/api/v1/payment`, payload);

        if (
          response.data &&
          typeof response.data === "string" &&
          response.data.includes("<html")
        ) {
          document.open();
          document.write(response.data);
          document.close();
        } else {
          console.log("Beklenen HTML formatı değil:", response.data);
        }
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.message,
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    },
  });

  const getInstallmentData = async (bin) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/payment/bin?bin=${bin}&amount=${cartItems.totalPrice}`
      );

      if (
        response.data.status === "success" &&
        Array.isArray(response.data.installmentDetails) &&
        response.data.installmentDetails.length > 0
      ) {
        const prices = response.data.installmentDetails[0].installmentPrices;
        setInstallmentOptions(prices);
      } else {
        // Hatalı veya desteklenmeyen kart için listeyi temizle
        setInstallmentOptions([]);
      }
    } catch (error) {
      console.error("Taksit bilgileri alınamadı:", error);
      setInstallmentOptions([]); // Hata durumunda da listeyi temizle
    }
  };

  return (
    <div className="siparisOdemeSection container">
      <Paper
        sx={{ boxShadow: 4, padding: "3.5rem 3rem", borderRadius: 1 }}
        className="formOdeme"
      >
        <form className="payment-form" onSubmit={formik.handleSubmit}>
          <div className="cardOdeme card-animation">
            <div className="card-content">
              <h2 className="title">Ödeme Bilgileri</h2>

              <input
                type="text"
                name="fullName"
                placeholder="Ad Soyad"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error">{formik.errors.fullName}</div>
              )}

              <input
                type="text"
                name="cardNumber"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Kart Numarası"
                maxLength={16}
                value={formik.values.cardNumber}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("cardNumber", rawValue);

                  if (rawValue.length >= 6) {
                    const newBin = rawValue.slice(0, 6);
                    if (newBin !== binNumber) {
                      setBinNumber(newBin);
                      getInstallmentData(newBin);
                    }
                  } else {
                    setInstallmentOptions([]);
                    setBinNumber("");
                  }
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <div className="error">{formik.errors.cardNumber}</div>
              )}

              <div className="input-group">
                <input
                  type="text"
                  name="expiryMonth"
                  placeholder="Ay (MM)"
                  maxLength={2}
                  value={formik.values.expiryMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <input
                  type="text"
                  name="expiryYear"
                  placeholder="Yıl (YYYY)"
                  maxLength={4}
                  value={formik.values.expiryYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {(formik.touched.expiryMonth && formik.errors.expiryMonth) ||
              (formik.touched.expiryYear && formik.errors.expiryYear) ? (
                <div className="error-group">
                  {formik.touched.expiryMonth && formik.errors.expiryMonth && (
                    <div className="error">{formik.errors.expiryMonth}</div>
                  )}
                  {formik.touched.expiryYear && formik.errors.expiryYear && (
                    <div className="error">{formik.errors.expiryYear}</div>
                  )}
                </div>
              ) : (
                ""
              )}

              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                maxLength={3}
                value={formik.values.cvv}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.cvv && formik.errors.cvv && (
                <div className="error">{formik.errors.cvv}</div>
              )}

              <select
                name="installment"
                value={formik.values.installment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Taksit seçiniz</option>
                {installmentOptions.map((item) => (
                  <option
                    key={item.installmentNumber}
                    value={item.installmentNumber}
                  >
                    {item.installmentNumber} Taksit - Aylık:{" "}
                    {item.installmentPrice.toFixed(2)}₺ | Toplam:{" "}
                    {item.totalPrice.toFixed(2)}₺
                  </option>
                ))}
              </select>

              {formik.touched.installment && formik.errors.installment && (
                <div className="error">{formik.errors.installment}</div>
              )}

              <div className="infoKomisyon">
                <img src="/images/odeme/cards.png" alt="Kredi Kartları" />
              </div>

              <div className="submitButtonOde">
                <button
                  className={
                    formik.isSubmitting ? "submitingButon" : "normalButton"
                  }
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Ödeniyor..." : "Öde"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Paper>

      <SiparisOzeti cartItems={cartItems} />
    </div>
  );
};

export default Odeme;
