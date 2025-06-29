import "./FormFields.scss";

const FormFields = ({ fields, formData, handleChange }) => {
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  return (
    <div className="formFields">
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={getNestedValue(formData, field.name) || ""}
              onChange={handleChange}
              required={field.required}
              autoComplete="off"
              rows={3}
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
            />
          )}
        </label>
      ))}
    </div>
  );
};

export default FormFields;
