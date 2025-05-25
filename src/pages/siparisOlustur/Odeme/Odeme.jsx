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

const Odeme = () => {
  const dispatch = useDispatch();

  const { status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );

  console.log(cartTotal);

  const { isLogin } = useSelector((state) => state.authSlice);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [binNumber, setBinNumber] = useState("");

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchCartItemsLoggedIn());
    } else {
      dispatch(fetchCartItems(baslangıcState));
    }
  }, [baslangıcState, dispatch, isLogin]);

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      installment: "",
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getInstallmentData = async (bin) => {
    try {
      const response = await axios.get(
        `https://litysofttest1.site/api/v1/payment/bin?bin=${bin}&amount=${cartTotal.totalWithShipping}`
      );

      if (
        response.data.status === "success" &&
        response.data.installmentDetails.length > 0
      ) {
        const prices = response.data.installmentDetails[0].installmentPrices;
        setInstallmentOptions(prices);
      }
    } catch (error) {
      console.error("Taksit bilgileri alınamadı:", error);
    }
  };

  return (
    <div className="siparisOdemeSection">
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
                name="cardNumber"
                placeholder="Kart Numarası"
                maxLength={16}
                value={formik.values.cardNumber}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("cardNumber", rawValue);

                  if (rawValue.length === 6 && rawValue !== binNumber) {
                    setBinNumber(rawValue);
                    getInstallmentData(rawValue);
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
                <option value="">Taksit seçiniz</option>{" "}
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
                <button type="submit">Öde</button>
              </div>
            </div>
          </div>
        </form>
      </Paper>

      <SiparisOzeti cartTotal={cartTotal} />
    </div>
  );
};

export default Odeme;
