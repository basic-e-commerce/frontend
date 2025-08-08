import { FormikProvider, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const fields = [
  {
    name: "firstName",
    label: "Ad",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Soyad",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "username",
    label: "E-posta",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Şifre",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "rePassword",
    label: "Şifre Tekrar",
    type: "password",
    autoComplete: "new-password",
  },
];

const CustomerLoginForm = ({ formik }) => {
  return (
    <FormikProvider value={formik}>
      <Form>
        {fields.map((field) => (
          <div className="abc" key={field.name}>
            <p>{field.label}</p>
            <label>
              <Field
                name={field.name}
                className={`textInput${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? " error"
                    : ""
                }`}
                type={field.type}
                autoComplete={field.autoComplete}
              />
            </label>
            <ErrorMessage
              name={field.name}
              component="div"
              className="error-message"
            />
          </div>
        ))}

        <div className="privacy-policy-container">
          <label className="checkbox-label">
            <Field
              name="privacyPolicy"
              type="checkbox"
              className="privacy-checkbox"
            />
            <span className="checkbox-text">
              <a
                href="/gizlilik-politikasi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gizlilik sözleşmesini
              </a>
              {" ,"}
              <a
                href="/kvkk-aydinlatma-metni"
                target="_blank"
                rel="noopener noreferrer"
              >
                KVKK Aydınlatma Metnini
              </a>{" "}
              ve{" "}
              <a
                href="/cerez-politikasi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Çerez Politikasını
              </a>{" "}
              okudum ve kabul ediyorum
            </span>
          </label>
          <ErrorMessage
            name="privacyPolicy"
            component="div"
            className="error-message"
          />
        </div>

        {formik.errors.general && (
          <div className="error-message">{formik.errors.general}</div>
        )}

        <div className="buttonContainer">
          <button
            type="submit"
            className={formik.isSubmitting ? "disabled" : "btn-card"}
            disabled={formik.isSubmitting}
          >
            Üye Ol
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

CustomerLoginForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default CustomerLoginForm;
