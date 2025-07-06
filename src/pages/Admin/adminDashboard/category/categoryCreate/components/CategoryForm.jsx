import PropTypes from "prop-types";

const CategoryForm = ({ formik, isLoading, categories }) => {
  return (
    <div className="rightSection">
      <div className="form-group">
        <label>
          Kategori İsmi:
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

      <div className="form-group">
        <label>
          Üst Kategori:
          <select
            name="parentCategoryId"
            value={formik.values.parentCategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={
              formik.touched.parentCategoryId && formik.errors.parentCategoryId
                ? "error"
                : ""
            }
          >
            <option value="0">Ana Kategori</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>
        {formik.touched.parentCategoryId && formik.errors.parentCategoryId && (
          <div className="error-message">{formik.errors.parentCategoryId}</div>
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

      <div className="buttonContainer">
        <button
          type="submit"
          className={
            isLoading || !formik.isValid || !formik.dirty ? "disabled" : ""
          }
          disabled={isLoading || !formik.isValid || !formik.dirty}
        >
          {isLoading ? "Ekleniyor..." : "Kategori Ekle"}
        </button>
      </div>
    </div>
  );
};

CategoryForm.propTypes = {
  formik: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default CategoryForm;
