import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddressFormKargo = ({
  initialValues,
  onSubmit,
  onCancel,
  citys,
  districts,
  onCityChange,
}) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Adres başlığı gereklidir"),
    firstName: Yup.string().required("İsim gereklidir"),
    lastName: Yup.string().required("Soyad gereklidir"),
    username: Yup.string()
      .email("Geçerli bir email adresi giriniz")
      .required("Email gereklidir"),
    phoneNo: Yup.string().required("Telefon numarası gereklidir"),
    addressLine1: Yup.string().required("Adres gereklidir"),
    cityCode: Yup.string().required("Şehir seçimi gereklidir"),
    districtId: Yup.string().required("İlçe seçimi gereklidir"),
    postalCode: Yup.string().required("Posta kodu gereklidir"),
  });

  const handleCityChange = (e, setFieldValue) => {
    const cityCode = e.target.value;
    setFieldValue("cityCode", cityCode);
    setFieldValue("districtId", "");
    onCityChange(cityCode);
  };

  return (
    <div className="modall">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, setFieldValue, isValid }) => (
          <Form className="modal-content">
            <h3>{"Yeni Adres Ekle"}</h3>
            <div className="modelContentSection">
              <div className="left">
                <div>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Adres Başlığı (Ev, İş vb.)"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field type="text" name="firstName" placeholder="İsim" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field type="text" name="lastName" placeholder="Soyad" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field
                    type="tel"
                    name="phoneNo"
                    placeholder="Telefon Numarası"
                  />
                  <ErrorMessage
                    name="phoneNo"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field type="email" name="username" placeholder="Mail" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="right">
                <div>
                  <Field
                    as="textarea"
                    name="addressLine1"
                    placeholder="Adres Satırı 1"
                  />
                  <ErrorMessage
                    name="addressLine1"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="cityCode"
                    onChange={(e) => handleCityChange(e, setFieldValue)}
                  >
                    <option value="">Şehir Seçin</option>
                    {citys?.map((item, index) => (
                      <option key={index} value={item.cityCode}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="cityCode"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field as="select" name="districtId">
                    <option value="">İlçe Seçin</option>
                    {districts?.map((item, index) => (
                      <option key={index} value={item.districtId}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="districtId"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="postalCode"
                    placeholder="Posta Kodu"
                  />
                  <ErrorMessage
                    name="postalCode"
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

export default AddressFormKargo;
