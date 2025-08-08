import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import "./SifreDegistirForm.scss";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Eski şifre gereklidir"),
  newPassword: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Yeni şifre gereklidir"),
  reNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı gereklidir"),
});

const SifreDegistirForm = ({ onSubmit, isLoading }) => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({ isValid, dirty, errors, touched }) => (
        <Form className="bars">
          <div>
            <label>
              Eski Şifre:
              <Field
                type="password"
                name="oldPassword"
                id="current-password"
                autoComplete="off"
              />
            </label>
            {errors.oldPassword && touched.oldPassword && (
              <div className="errorSifreDegistir">{errors.oldPassword}</div>
            )}
          </div>

          <div>
            <label>
              Yeni Şifre:
              <Field
                type="password"
                name="newPassword"
                id="new-password"
                autoComplete="off"
              />
            </label>
            {errors.newPassword && touched.newPassword && (
              <div className="errorSifreDegistir">{errors.newPassword}</div>
            )}
          </div>

          <div>
            <label>
              Yeni Şifre Tekrar:
              <Field
                type="password"
                name="reNewPassword"
                id="confirm-password"
                autoComplete="off"
              />
            </label>
            {errors.reNewPassword && touched.reNewPassword && (
              <div className="errorSifreDegistir">{errors.reNewPassword}</div>
            )}
          </div>

          <div className="button">
            <button
              className={
                !isValid || !dirty || isLoading
                  ? "disabledButton"
                  : "normalButton"
              }
              type="submit"
              disabled={!isValid || !dirty || isLoading}
            >
              {isLoading ? "Değiştiriliyor..." : "Değiştir"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

SifreDegistirForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SifreDegistirForm;
