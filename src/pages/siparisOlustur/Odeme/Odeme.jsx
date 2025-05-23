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
import * as Yup from "yup";
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
      // Burada kart bilgilerini direkt backend'e değil, ödeme servisinin SDK'sına gönder
      console.log(values);
    },
  });

  return (
    <div className="siparisOdemeSection">
      <Paper
        sx={{ boxShadow: 4, padding: "3.5rem 3rem", borderRadius: 1 }}
        className="formOdeme"
      >
        <form onSubmit={formik.handleSubmit}>
          <input
            name="cardNumber"
            placeholder="Kart Numarası"
            maxLength={16}
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <div className="error">{formik.errors.cardNumber}</div>
          )}

          <input
            name="expiry"
            placeholder="MM/YY"
            maxLength={5}
            value={formik.values.expiry}
            onChange={formik.handleChange}
          />
          {formik.touched.expiry && formik.errors.expiry && (
            <div className="error">{formik.errors.expiry}</div>
          )}

          <input
            name="cvv"
            placeholder="CVV"
            maxLength={3}
            value={formik.values.cvv}
            onChange={formik.handleChange}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <div className="error">{formik.errors.cvv}</div>
          )}

          <select
            name="installment"
            value={formik.values.installment}
            onChange={formik.handleChange}
          >
            <option value="1">Tek Çekim</option>
            <option value="3">3 Taksit</option>
            <option value="6">6 Taksit</option>
            <option value="9">9 Taksit</option>
          </select>

          <button type="submit">Ödemeyi Tamamla</button>
        </form>
      </Paper>

      <SiparisOzeti cartTotal={cartTotal} />
    </div>
  );
};

export default Odeme;
