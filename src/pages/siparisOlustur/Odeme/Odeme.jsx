import "./Odeme.scss";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
} from "../../../redux/slices/sepetCartSlice";
import { useFormik } from "formik";
import { paymentSchema } from "../../../yup/payment";

const Odeme = () => {
  const dispatch = useDispatch();

  const { status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );

  const { isLogin } = useSelector((state) => state.authSlice);

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
      expiry: "",
      cvv: "",
      installment: "1",
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <div className="error">{formik.errors.cardNumber}</div>
              )}

              <div className="input-group">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={formik.values.expiry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {(formik.touched.expiry && formik.errors.expiry) ||
              (formik.touched.cvv && formik.errors.cvv) ? (
                <div className="error-group">
                  {formik.touched.expiry && formik.errors.expiry && (
                    <div className="error">{formik.errors.expiry}</div>
                  )}
                  {formik.touched.cvv && formik.errors.cvv && (
                    <div className="error">{formik.errors.cvv}</div>
                  )}
                </div>
              ) : (
                ""
              )}

              <select
                name="installment"
                value={formik.values.installment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="1">Tek Çekim</option>
                <option value="3">3 Taksit</option>
                <option value="6">6 Taksit</option>
                <option value="9">9 Taksit</option>
              </select>

              {formik.touched.installment && formik.errors.installment && (
                <div className="error">{formik.errors.installment}</div>
              )}

              <div className="infoKomisyon">
                <img src="/images/odeme/cards.png" alt="Kredi Kartları" />
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
