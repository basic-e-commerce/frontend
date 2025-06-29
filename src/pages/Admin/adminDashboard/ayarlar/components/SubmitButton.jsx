const SubmitButton = ({ initialData, formData, onSubmit }) => {
  return (
    <div className="buttonContainer">
      <button
        disabled={JSON.stringify(formData) === JSON.stringify(initialData)}
        className={
          JSON.stringify(formData) === JSON.stringify(initialData)
            ? "disabledButton"
            : ""
        }
        type="submit"
        onClick={onSubmit}
      >
        Ayarları Güncelle
      </button>
    </div>
  );
};

export default SubmitButton;
