import { Field, ErrorMessage } from "formik";

const ProductFormFields = () => {
  const fields = [
    {
      name: "name",
      label: "Ürün İsmi:",
      type: "text",
    },
    {
      name: "quantity",
      label: "Stok:",
      type: "number",
      min: 0,
      pattern: "[0-9]*",
    },
    {
      name: "stockNotification",
      label: "Stok Alarmı:",
      type: "number",
      min: 0,
      pattern: "[0-9]*",
    },
    {
      name: "salePrice",
      label: "Fiyat:",
      type: "number",
      min: 0,
      step: "0.01",
      pattern: "[0-9]*[.]?[0-9]*",
    },
    {
      name: "comparePrice",
      label: "İndirimli Fiyat:",
      type: "number",
      min: 0,
      step: "0.01",
      pattern: "[0-9]*[.]?[0-9]*",
    },
    {
      name: "buyingPrice",
      label: "Alış Fiyat:",
      type: "number",
      min: 0,
      step: "0.01",
      pattern: "[0-9]*[.]?[0-9]*",
    },
    {
      name: "taxRate",
      label: "Vergi Oranı:",
      type: "number",
      min: 0,
      max: 100,
      step: "0.01",
      pattern: "[0-9]*[.]?[0-9]*",
    },
    {
      name: "published",
      label: "Canlıda mı?",
      type: "select",
      options: [
        { value: "true", label: "Aktif" },
        { value: "false", label: "Pasif" },
      ],
    },
    {
      name: "disableOutOfStock",
      label: "Stoğu Kapatma",
      type: "select",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      name: "productType",
      label: "Ürün Tipi",
      type: "select",
      options: [
        { value: "", label: "Seçiniz" },
        { value: "SIMPLE", label: "Normal" },
      ],
    },
    {
      name: "shortDescription",
      label: "Kısa Açıklama:",
      type: "textarea",
      rows: 3,
    },
    {
      name: "productDescription",
      label: "Açıklama:",
      type: "textarea",
      rows: 5,
    },
  ];

  const renderField = (field) => {
    const { name, type, options, min, max, step, rows, pattern } = field;

    if (type === "select") {
      return (
        <Field as="select" name={name}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    }

    if (type === "textarea") {
      return <Field as="textarea" name={name} rows={rows} />;
    }

    return (
      <Field
        type={type}
        name={name}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
        onKeyPress={(e) => {
          // Sadece sayı ve nokta karakterlerine izin ver
          if (type === "number" && !/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
    );
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index}>
          <label>
            {field.label}
            {renderField(field)}
          </label>
          <ErrorMessage
            style={{
              textAlign: "end",
              width: "100%",
              color: "red",
              fontSize: "0.8rem",
              marginTop: "0.3rem",
            }}
            name={field.name}
            component="div"
            className="error"
          />
        </div>
      ))}
    </>
  );
};

export default ProductFormFields;
