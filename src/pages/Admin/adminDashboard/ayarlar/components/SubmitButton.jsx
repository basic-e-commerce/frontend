const SubmitButton = ({ initialData, formData }) => {
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <div className="buttonContainer">
      <button
        disabled={!hasChanges}
        className={!hasChanges ? "disabledButton" : ""}
        type="submit"
      >
        Ayarları Güncelle
      </button>
    </div>
  );
};

export default SubmitButton;
