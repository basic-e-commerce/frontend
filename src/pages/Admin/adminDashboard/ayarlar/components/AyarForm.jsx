import PropTypes from "prop-types";

const AyarForm = ({
  formik,
  cities,
  districts,
  isLoading,
  initialValuesMe,
}) => {
  return (
    <>
      {/* name */}
      <div className="form-group">
        <label>
          İsim:
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={formik.touched.name && formik.errors.name ? "error" : ""}
          />
        </label>
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>

      {/* firstName */}
      <div className="form-group">
        <label>
          Ad:
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.firstName && formik.errors.firstName ? "error" : ""
            }
          />
        </label>
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error-message">{formik.errors.firstName}</div>
        )}
      </div>

      {/* lastName */}
      <div className="form-group">
        <label>
          Soyad:
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.lastName && formik.errors.lastName ? "error" : ""
            }
          />
        </label>
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error-message">{formik.errors.lastName}</div>
        )}
      </div>

      {/* title */}
      <div className="form-group">
        <label>
          Ünvan:
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.title && formik.errors.title ? "error" : ""
            }
          />
        </label>
        {formik.touched.title && formik.errors.title && (
          <div className="error-message">{formik.errors.title}</div>
        )}
      </div>

      {/* countryName */}
      <div className="form-group">
        <label>
          Ülke Adı:
          <input
            type="text"
            name="countryName"
            value={formik.values.countryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.countryName && formik.errors.countryName
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.countryName && formik.errors.countryName && (
          <div className="error-message">{formik.errors.countryName}</div>
        )}
      </div>

      {/* cityCode */}
      <div className="form-group">
        <label>
          Şehir Kodu:
          <select
            name="cityCode"
            value={formik.values.cityCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.cityCode && formik.errors.cityCode ? "error" : ""
            }
          >
            <option value="">Şehir Seçiniz</option>
            {cities?.map((city) => (
              <option key={city.cityCode} value={city.cityCode}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        {formik.touched.cityCode && formik.errors.cityCode && (
          <div className="error-message">{formik.errors.cityCode}</div>
        )}
      </div>

      {/* districtId */}
      <div className="form-group">
        <label>
          İlçe ID:
          <select
            name="districtId"
            value={formik.values.districtId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.districtId && formik.errors.districtId
                ? "error"
                : ""
            }
          >
            <option value="">İlçe Seçiniz</option>
            {districts?.map((district) => (
              <option key={district.districtId} value={district.districtId}>
                {district.name}
              </option>
            ))}
          </select>
        </label>
        {formik.touched.districtId && formik.errors.districtId && (
          <div className="error-message">{formik.errors.districtId}</div>
        )}
      </div>

      {/* addressLine1 */}
      <div className="form-group">
        <label>
          Adres:
          <input
            type="text"
            name="addressLine1"
            value={formik.values.addressLine1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.addressLine1 && formik.errors.addressLine1
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.addressLine1 && formik.errors.addressLine1 && (
          <div className="error-message">{formik.errors.addressLine1}</div>
        )}
      </div>

      {/* postalCode */}
      <div className="form-group">
        <label>
          Posta Kodu:
          <input
            type="text"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.postalCode && formik.errors.postalCode
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.postalCode && formik.errors.postalCode && (
          <div className="error-message">{formik.errors.postalCode}</div>
        )}
      </div>

      {/* phoneNo */}
      <div className="form-group">
        <label>
          Telefon Numarası:
          <input
            type="text"
            name="phoneNo"
            value={formik.values.phoneNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.phoneNo && formik.errors.phoneNo ? "error" : ""
            }
          />
        </label>
        {formik.touched.phoneNo && formik.errors.phoneNo && (
          <div className="error-message">{formik.errors.phoneNo}</div>
        )}
      </div>

      {/* email */}
      <div className="form-group">
        <label>
          E-posta:
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
          />
        </label>
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      {/* minOrderAmount */}
      <div className="form-group">
        <label>
          Minimum Sipariş Tutarı:
          <input
            type="number"
            name="minOrderAmount"
            value={formik.values.minOrderAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.minOrderAmount && formik.errors.minOrderAmount
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.minOrderAmount && formik.errors.minOrderAmount && (
          <div className="error-message">{formik.errors.minOrderAmount}</div>
        )}
      </div>

      {/* shippingFee */}
      <div className="form-group">
        <label>
          Kargo Ücreti:
          <input
            type="number"
            name="shippingFee"
            value={formik.values.shippingFee}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.shippingFee && formik.errors.shippingFee
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.shippingFee && formik.errors.shippingFee && (
          <div className="error-message">{formik.errors.shippingFee}</div>
        )}
      </div>

      {/* emailPassword */}
      <div className="form-group">
        <label>
          E-posta Şifresi:
          <input
            type="password"
            name="emailPassword"
            value={formik.values.emailPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.emailPassword && formik.errors.emailPassword
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.emailPassword && formik.errors.emailPassword && (
          <div className="error-message">{formik.errors.emailPassword}</div>
        )}
      </div>

      {/* instagram */}
      <div className="form-group">
        <label>
          Instagram Kullanıcı Adı:
          <input
            type="text"
            name="instagram"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.instagram && formik.errors.instagram ? "error" : ""
            }
          />
        </label>
        {formik.touched.instagram && formik.errors.instagram && (
          <div className="error-message">{formik.errors.instagram}</div>
        )}
      </div>

      {/* instagramLink */}
      <div className="form-group">
        <label>
          Instagram Linki:
          <input
            type="url"
            name="instagramLink"
            value={formik.values.instagramLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.instagramLink && formik.errors.instagramLink
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.instagramLink && formik.errors.instagramLink && (
          <div className="error-message">{formik.errors.instagramLink}</div>
        )}
      </div>

      {/* footerDescription */}
      <div className="form-group">
        <label>
          Footer Açıklaması:
          <textarea
            name="footerDescription"
            value={formik.values.footerDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.footerDescription &&
              formik.errors.footerDescription
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.footerDescription &&
          formik.errors.footerDescription && (
            <div className="error-message">
              {formik.errors.footerDescription}
            </div>
          )}
      </div>

      <div className="buttonContainer">
        <button
          type="submit"
          className={
            isLoading ||
            !formik.isValid ||
            JSON.stringify(formik.values) === JSON.stringify(initialValuesMe)
              ? "disabled"
              : ""
          }
          disabled={
            isLoading ||
            !formik.isValid ||
            JSON.stringify(formik.values) === JSON.stringify(initialValuesMe)
          }
        >
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </>
  );
};

AyarForm.propTypes = {
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
  initialValuesMe: PropTypes.object.isRequired,
};

export default AyarForm;
