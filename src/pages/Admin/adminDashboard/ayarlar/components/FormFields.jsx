import "./FormFields.scss";

const FormFields = ({
  fields,
  formData,
  handleChange,
  errors,
  touched,
  getNestedValue,
}) => {
  const getFieldError = (fieldName) => {
    if (!errors) return undefined;

    if (fieldName.includes(".")) {
      const keys = fieldName.split(".");
      let error = errors;
      for (const key of keys) {
        error = error?.[key];
        if (!error) break;
      }
      return error;
    }
    return errors[fieldName];
  };

  const isFieldTouched = (fieldName) => {
    if (!touched) return false;

    if (fieldName.includes(".")) {
      const keys = fieldName.split(".");
      let touchedField = touched;
      for (const key of keys) {
        touchedField = touchedField?.[key];
        if (!touchedField) break;
      }
      return touchedField;
    }
    return touched[fieldName];
  };

  return (
    <div className="formFields">
      {fields.map((field) => {
        const fieldError = getFieldError(field.name);
        const fieldTouched = isFieldTouched(field.name);
        const showError = fieldError && fieldTouched;

        return (
          <div key={field.name} className="fieldContainer">
            <label>
              {field.label}:
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={getNestedValue(formData, field.name) || ""}
                  onChange={handleChange}
                  required={field.required}
                  autoComplete="off"
                  rows={3}
                  className={showError ? "error" : ""}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={getNestedValue(formData, field.name) || ""}
                  onChange={handleChange}
                  required={field.required}
                  min={field.min}
                  autoComplete="off"
                  className={showError ? "error" : ""}
                />
              )}
            </label>
            {showError && <div className="errorMessage">{fieldError}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default FormFields;
