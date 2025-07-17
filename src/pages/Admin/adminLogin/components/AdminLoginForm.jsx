import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { adminLoginValidationSchema } from "../yup/adminLoginValidation";

const AdminLoginForm = ({ handleSubmit, isLoading }) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={adminLoginValidationSchema}
    onSubmit={handleSubmit}
  >
    {({ errors, isSubmitting }) => (
      <Form>
        <div className="abc">
          <p>Kullanıcı Adı</p>
          <label>
            <Field
              name="username"
              className="textInput"
              type="email"
              autoComplete="username"
            />
          </label>
          <ErrorMessage
            name="username"
            component="div"
            className="error-message"
          />
        </div>
        <div className="abc">
          <p>Şifre</p>
          <label>
            <Field
              name="password"
              className="textInput"
              type="password"
              autoComplete="current-password"
            />
          </label>
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />
        </div>
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        <div className="buttonContainer">
          <button
            type="submit"
            className={isLoading || isSubmitting ? "disabled" : "btn-card"}
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

AdminLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AdminLoginForm;
