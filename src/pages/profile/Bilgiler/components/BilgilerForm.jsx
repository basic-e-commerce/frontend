import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  ad: Yup.string().required("Ad alanı zorunludur"),
  soyad: Yup.string().required("Soyad alanı zorunludur"),
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email alanı zorunludur"),
  telefon: Yup.string()
    .required("Telefon alanı zorunludur")
    .test(
      "telefon-format",
      "Telefon numarası +90 ile başlamalı ve geçerli bir formatta olmalıdır",
      function (value) {
        if (!value) return false;

        if (value === "+90" || value.startsWith("+90")) {
          return true;
        }

        const phoneRegex = /^\+90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
        return phoneRegex.test(value);
      }
    ),
});

const BilgilerForm = ({ formData, onSubmit }) => {
  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        dirty,
      }) => {
        const isDisabled = !isValid || !dirty;

        return (
          <Form className="bars">
            <label>
              Adınız:
              <Field
                type="text"
                name="ad"
                value={values.ad}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="off"
              />
            </label>
            {errors.ad && touched.ad && (
              <div className="error">{errors.ad}</div>
            )}

            <label>
              Soyadınız:
              <Field
                type="text"
                name="soyad"
                value={values.soyad}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="off"
              />
            </label>
            {errors.soyad && touched.soyad && (
              <div className="error">{errors.soyad}</div>
            )}

            <label>
              E-posta Adresiniz:
              <Field
                type="email"
                name="email"
                disabled
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="off"
              />
            </label>
            {errors.email && touched.email && (
              <div className="error">{errors.email}</div>
            )}

            <label>
              Telefon:
              <Field
                type="tel"
                name="telefon"
                value={values.telefon}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="off"
                maxLength={13}
                minLength={13}
                placeholder="+90 599 999 99 99"
              />
            </label>
            {errors.telefon && touched.telefon && (
              <div className="error">{errors.telefon}</div>
            )}

            <div className="button">
              <button
                className={isDisabled ? "disabledButton" : "normalButton"}
                disabled={isDisabled}
                type="submit"
              >
                Değiştir
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

BilgilerForm.propTypes = {
  formData: PropTypes.shape({
    ad: PropTypes.string.isRequired,
    soyad: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telefon: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BilgilerForm;
