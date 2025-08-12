import { FormikProvider, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const fields = [
  {
    name: "password",
    label: "Yeni Şifre",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "rePassword",
    label: "Yeni Şifre Tekrar",
    type: "password",
    autoComplete: "new-password",
  },
];

const SifreYenilemeForm = ({ formik }) => {
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

        {formik.errors.general && (
          <div className="error-message">{formik.errors.general}</div>
        )}

        <div className="buttonContainer">
          <button
            type="submit"
            className={formik.isSubmitting ? "disabled" : "btn-card"}
            disabled={formik.isSubmitting}
          >
            Şifremi Yenile
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

SifreYenilemeForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default SifreYenilemeForm;
