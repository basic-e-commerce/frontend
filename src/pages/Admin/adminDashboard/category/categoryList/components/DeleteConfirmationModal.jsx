const DeleteConfirmationModal = ({
  showPopupCategory,
  handleCloseDeletePopup,
  handleConfirmDeleteCategory,
}) => {
  if (!showPopupCategory) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>Silmek istediğinize emin misiniz?</p>
        <div className="popup-buttons">
          <button
            className="cancel"
            type="button"
            onClick={handleCloseDeletePopup}
          >
            İptal
          </button>
          <button
            type="button"
            className="confirm"
            onClick={handleConfirmDeleteCategory}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
