const FormFields = ({ formik }) => {
  return (
    <>
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

      <label>
        Açıklama:
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
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
    </>
  );
};

export default FormFields;
