import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import { useLoginForm } from "../hooks/useLoginForm";

const fields = [
  {
    name: "username",
    label: "Kullanıcı Adı",
    type: "email",
    autoComplete: "username",
  },
  {
    name: "password",
    label: "Şifre",
    type: "password",
    autoComplete: "current-password",
  },
];

const LoginForm = () => {
  const { formik } = useLoginForm();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off">
        {fields.map((field) => (
          <div className="abc" key={field.name}>
            <p>{field.label}</p>
            <label>
              <Field
                name={field.name}
                className="textInput"
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

        <ErrorMessage
          name="general"
          component="div"
          className="error-message"
        />

        <div className="buttonContainer">
          <button
            type="submit"
            className={formik.isSubmitting ? "disabled" : "btn-card"}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
