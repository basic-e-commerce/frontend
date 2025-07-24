import PropTypes from "prop-types";
import "./CargoInfoSection.scss";

const CargoInfoSection = ({ formik }) => {
  return (
    <form className="cargoInfoSection" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label>
          Uzunluk (lenght):
          <input
            type="number"
            name="lenght"
            value={formik.values.lenght}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.lenght && formik.errors.lenght ? "error" : ""
            }
          />
        </label>
        {formik.touched.lenght && formik.errors.lenght && (
          <div className="error-message">{formik.errors.lenght}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Yükseklik (height):
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
          Genişlik (width):
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
          Uzunluk Birimi (distanceUnit):
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
          Ağırlık (weight):
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
          Ağırlık Birimi (massUnit):
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
    </form>
  );
};

CargoInfoSection.propTypes = {
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.shape({
      lenght: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      distanceUnit: PropTypes.string.isRequired,
      weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      massUnit: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};

export default CargoInfoSection;
