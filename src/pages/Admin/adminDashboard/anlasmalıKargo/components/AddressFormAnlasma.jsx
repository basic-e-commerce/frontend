import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddressFormAnlasma = ({ initialValues, onSubmit, onCancel }) => {
  const [parameters, setParameters] = useState(
    initialValues.parameters ? Object.entries(initialValues.parameters) : []
  );
  const [newParameter, setNewParameter] = useState({ key: "", value: "" });

  const addParameter = () => {
    if (newParameter.key.trim() && newParameter.value.trim()) {
      setParameters([...parameters, [newParameter.key, newParameter.value]]);
      setNewParameter({ key: "", value: "" });
    }
  };

  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleSubmit = (values, formikBag) => {
    const parametersObj = {};
    parameters.forEach(([key, value]) => {
      parametersObj[key] = value;
    });

    const formData = {
      ...values,
      parameters: parametersObj,
    };

    onSubmit(formData, formikBag);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Kullanıcı adı gereklidir")
      .min(3, "Kullanıcı adı en az 3 karakter olmalı")
      .max(50, "Kullanıcı adı en fazla 50 karakter olabilir"),

    password: Yup.string()
      .required("Şifre gereklidir")
      .min(6, "Şifre en az 6 karakter olmalı")
      .max(50, "Şifre en fazla 50 karakter olabilir"),

    cargoCompany: Yup.string()
      .required("Kargo şirketi gereklidir")
      .min(2, "Kargo şirketi en az 2 karakter olmalı")
      .max(100, "Kargo şirketi en fazla 100 karakter olabilir"),

    isActive: Yup.string()
      .oneOf(["true", "false"], "Lütfen aktiflik durumunu seçiniz")
      .required("IsActive gereklidir"),

    isDynamicPrice: Yup.string()
      .oneOf(["true", "false"], "Lütfen dinamik fiyat durumunu seçiniz")
      .required("Dinamik fiyat gereklidir"),

    sharable: Yup.string()
      .oneOf(["true", "false"], "Lütfen sharable durumunu seçiniz")
      .required("Sharable gereklidir"),

    isPublic: Yup.string()
      .oneOf(["true", "false"], "Lütfen public durumunu seçiniz")
      .required("IsPublic gereklidir"),
  });

  return (
    <div className="modall">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, isSubmitting, isValid }) => (
          <Form className="modal-content">
            <h3>{"Yeni Anlaşma Ekle"}</h3>
            <div className="modelContentSection">
              <div className="left">
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Kullanıcı Adı"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field type="password" name="password" placeholder="Şifre" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="cargoCompany"
                    placeholder="Kargo Şirketi"
                  />
                  <ErrorMessage
                    name="cargoCompany"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field as="select" name="isActive" placeholder="isActive">
                    <option value="">IsActive Seçiniz</option>
                    <option value="false">Pasif</option>
                    <option value="true">Aktif</option>
                  </Field>

                  <ErrorMessage
                    name="isActive"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Dinamik Parametreler */}
                <div className="parameters-section">
                  <h4>Parametreler</h4>

                  {/* Mevcut Parametreler */}
                  {parameters.map(([key, value], index) => (
                    <div key={index} className="parameter-row">
                      <span className="parameter-key">{key}:</span>
                      <span className="parameter-value">{value}</span>
                      <button
                        type="button"
                        onClick={() => removeParameter(index)}
                        className="remove-parameter-btn"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}

                  {/* Yeni Parametre Ekleme */}
                  <div className="add-parameter-section">
                    <div className="parameter-inputs">
                      <input
                        type="text"
                        placeholder="Parametre Adı"
                        value={newParameter.key}
                        onChange={(e) =>
                          setNewParameter({
                            ...newParameter,
                            key: e.target.value,
                          })
                        }
                        className="parameter-key-input"
                      />
                      <input
                        type="text"
                        placeholder="Parametre Değeri"
                        value={newParameter.value}
                        onChange={(e) =>
                          setNewParameter({
                            ...newParameter,
                            value: e.target.value,
                          })
                        }
                        className="parameter-value-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addParameter}
                      className="add-parameter-btn"
                      disabled={
                        !newParameter.key.trim() || !newParameter.value.trim()
                      }
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="right">
                <div>
                  <Field
                    as="select"
                    name="isDynamicPrice"
                    placeholder="Dinamik Fiyat"
                  >
                    <option value="">Dinamik Fiyat Seçiniz</option>
                    <option value="false">Pasif</option>
                    <option value="true">Aktif</option>
                  </Field>

                  <ErrorMessage
                    name="isDynamicPrice"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field as="select" name="sharable" placeholder="Sharable">
                    <option value="">Sharable Seçiniz</option>
                    <option value="false">Pasif</option>
                    <option value="true">Aktif</option>
                  </Field>

                  <ErrorMessage
                    name="sharable"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field as="select" name="isPublic" placeholder="IsPublic">
                    <option value="">IsPublic Seçiniz</option>
                    <option value="false">Pasif</option>
                    <option value="true">Aktif</option>
                  </Field>

                  <ErrorMessage
                    name="isPublic"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>

            <div className="buttons">
              <button type="button" onClick={onCancel}>
                İptal
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting || !isValid || Object.keys(errors).length > 0
                }
                className={
                  isSubmitting || !isValid || Object.keys(errors).length > 0
                    ? "disabledButton"
                    : "normalButton"
                }
              >
                {isSubmitting ? "Kaydetiliyor..." : "Oluştur"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressFormAnlasma;
