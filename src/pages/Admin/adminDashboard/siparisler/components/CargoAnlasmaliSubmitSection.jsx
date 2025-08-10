import PropTypes from "prop-types";
import "./CargoInfoSection.scss";
import CargoInfoSkeleton from "./CargoInfoSkeleton";

const CargoAnlasmaliSubmitSection = ({ formik, stepLoading }) => {
  if (stepLoading) {
    return <CargoInfoSkeleton />;
  }
  return (
    <form className="cargoInfoSection" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label>
          Kargo Şirketi:
          <select
            name="cargoCompany"
            value={formik.values.cargoCompany}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.cargoCompany && formik.errors.cargoCompany
                ? "error"
                : ""
            }
          >
            <option value="">Seçiniz</option>
            <option value="PTT_STANDART">PTT_STANDART</option>
            <option value="PTT_KAPIDA_ODEME">PTT_KAPIDA_ODEME</option>
            <option value="SENDEO_STANDART">SENDEO_STANDART</option>
            <option value="MNG_STANDART">MNG_STANDART</option>
            <option value="HEPSIJET_STANDART">HEPSIJET_STANDART</option>
            <option value="KOLAYGELSIN_STANDART">KOLAYGELSIN_STANDART</option>
            <option value="PAKETTAXI_STANDART">PAKETTAXI_STANDART</option>
            <option value="ARAS_STANDART">ARAS_STANDART</option>
            <option value="GELIVER_STANDART">GELIVER_STANDART</option>
            <option value="MANUEL_STANDART">MANUEL_STANDART</option>
          </select>
        </label>
        {formik.touched.cargoCompany && formik.errors.cargoCompany && (
          <div className="error-message">{formik.errors.cargoCompany}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Uzunluk:
          <input
            type="number"
            name="length"
            value={formik.values.length}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.length && formik.errors.length ? "error" : ""
            }
          />
        </label>
        {formik.touched.length && formik.errors.length && (
          <div className="error-message">{formik.errors.length}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Yükseklik:
          <input
            type="number"
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.height && formik.errors.height ? "error" : ""
            }
          />
        </label>
        {formik.touched.height && formik.errors.height && (
          <div className="error-message">{formik.errors.height}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Genişlik:
          <input
            type="number"
            name="width"
            value={formik.values.width}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.width && formik.errors.width ? "error" : ""
            }
          />
        </label>
        {formik.touched.width && formik.errors.width && (
          <div className="error-message">{formik.errors.width}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Uzunluk Birimi:
          <select
            name="distanceUnit"
            value={formik.values.distanceUnit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.distanceUnit && formik.errors.distanceUnit
                ? "error"
                : ""
            }
          >
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="mm">mm</option>
          </select>
        </label>
        {formik.touched.distanceUnit && formik.errors.distanceUnit && (
          <div className="error-message">{formik.errors.distanceUnit}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Ağırlık:
          <input
            type="number"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.weight && formik.errors.weight ? "error" : ""
            }
          />
        </label>
        {formik.touched.weight && formik.errors.weight && (
          <div className="error-message">{formik.errors.weight}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Ağırlık Birimi:
          <select
            name="massUnit"
            value={formik.values.massUnit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.massUnit && formik.errors.massUnit ? "error" : ""
            }
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="mg">mg</option>
          </select>
        </label>
        {formik.touched.massUnit && formik.errors.massUnit && (
          <div className="error-message">{formik.errors.massUnit}</div>
        )}
      </div>

      <div className="buttonContainer">
        <button
          disabled={formik.isSubmitting || !formik.isValid}
          className={
            formik.isSubmitting || !formik.isValid ? "disabledButton" : ""
          }
          type="submit"
        >
          {formik.isSubmitting ? "Bekleyin..." : "Kargola"}
        </button>
      </div>
    </form>
  );
};

CargoAnlasmaliSubmitSection.propTypes = {
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.shape({
      length: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      distanceUnit: PropTypes.string.isRequired,
      weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      massUnit: PropTypes.string.isRequired,
      cargoCompany: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
  }).isRequired,
  stepLoading: PropTypes.bool.isRequired,
};

export default CargoAnlasmaliSubmitSection;
