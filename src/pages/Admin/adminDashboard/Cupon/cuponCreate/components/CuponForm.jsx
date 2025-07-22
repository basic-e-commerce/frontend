import PropTypes from "prop-types";

const CuponForm = ({ formik, isLoading }) => {
  return (
    <div className="rightSection">
      <div className="form-group">
        <label>
          Kupon Kodu:
          <input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={formik.touched.code && formik.errors.code ? "error" : ""}
          />
        </label>
        {formik.touched.code && formik.errors.code && (
          <div className="error-message">{formik.errors.code}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Açıklama:
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.description && formik.errors.description
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.description && formik.errors.description && (
          <div className="error-message">{formik.errors.description}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          DiscountValue
          <input
            type="number"
            name="discountValue"
            value={formik.values.discountValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={formik.touched.name && formik.errors.name ? "error" : ""}
          />
        </label>
        {formik.touched.discountValue && formik.errors.discountValue && (
          <div className="error-message">{formik.errors.discountValue}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          discountType
          <select
            name="discountType"
            value={formik.values.discountType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.discountType && formik.errors.discountType
                ? "error"
                : ""
            }
          >
            <option value="PERCENTAGE">PERCENTAGE</option>
          </select>
        </label>
        {formik.touched.discountType && formik.errors.discountType && (
          <div className="error-message">{formik.errors.discountType}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          tatalUsageLimit
          <input
            type="number"
            name="tatalUsageLimit"
            value={formik.values.tatalUsageLimit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.tatalUsageLimit && formik.errors.tatalUsageLimit
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.tatalUsageLimit && formik.errors.tatalUsageLimit && (
          <div className="error-message">{formik.errors.tatalUsageLimit}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          minOrderAmountLimit
          <input
            type="number"
            name="minOrderAmountLimit"
            value={formik.values.minOrderAmountLimit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.minOrderAmountLimit &&
              formik.errors.minOrderAmountLimit
                ? "error"
                : ""
            }
          />
        </label>
        {formik.touched.minOrderAmountLimit &&
          formik.errors.minOrderAmountLimit && (
            <div className="error-message">
              {formik.errors.minOrderAmountLimit}
            </div>
          )}
      </div>

      <div className="form-group">
        <label>
          Başlangıç
          <input
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.startDate && formik.errors.startDate ? "error" : ""
            }
          />
        </label>
        {formik.touched.startDate && formik.errors.startDate && (
          <div className="error-message">{formik.errors.startDate}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          Bitiş
          <input
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete="off"
            className={
              formik.touched.endDate && formik.errors.endDate ? "error" : ""
            }
          />
        </label>
        {formik.touched.endDate && formik.errors.endDate && (
          <div className="error-message">{formik.errors.endDate}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          isPublic
          <select
            name="isPublic"
            value={formik.values.isPublic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.isPublic && formik.errors.isPublic ? "error" : ""
            }
          >
            <option value={true}>Public</option>
            <option value={false}>Hidden</option>
          </select>
        </label>
        {formik.touched.isPublic && formik.errors.isPublic && (
          <div className="error-message">{formik.errors.isPublic}</div>
        )}
      </div>

      <div className="form-group">
        <label>
          isActive
          <select
            name="isActive"
            value={formik.values.isActive}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.isActive && formik.errors.isActive ? "error" : ""
            }
          >
            <option value={true}>Aktif</option>
            <option value={false}>Pasif</option>
          </select>
        </label>
        {formik.touched.isActive && formik.errors.isActive && (
          <div className="error-message">{formik.errors.isActive}</div>
        )}
      </div>

      <div className="buttonContainer">
        <button
          type="submit"
          className={
            isLoading || !formik.isValid || !formik.dirty ? "disabled" : ""
          }
          disabled={isLoading || !formik.isValid || !formik.dirty}
        >
          {isLoading ? "Ekleniyor..." : "Kupon Ekle"}
        </button>
      </div>
    </div>
  );
};

CuponForm.propTypes = {
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CuponForm;
