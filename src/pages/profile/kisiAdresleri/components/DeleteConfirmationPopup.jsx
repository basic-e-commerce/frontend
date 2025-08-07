const DeleteConfirmationPopup = ({ onConfirm, onCancel, deleteLoading }) => {
  return (
    <div className="popupAdresler">
      <form onSubmit={onConfirm} className="popupAdresler-inner">
        <p>Silmek istediğinize emin misiniz?</p>
        <div className="popupAdresler-buttons">
          <button type="button" className="cancel" onClick={onCancel}>
            İptal
          </button>
          <button
            type="submit"
            className="confirm"
            disabled={deleteLoading}
            style={{
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            {deleteLoading ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteConfirmationPopup;
