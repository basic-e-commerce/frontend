import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({
  showPopupCategory,
  handleCloseDeletePopup,
  handleConfirmDeleteCategory,
}) => {
  const { isLoading } = useSelector((state) => state.loading);

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
            disabled={isLoading}
            type="button"
            className={isLoading ? "confirm disabled" : "confirm"}
            onClick={handleConfirmDeleteCategory}
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  showPopupCategory: PropTypes.bool.isRequired,
  handleCloseDeletePopup: PropTypes.func.isRequired,
  handleConfirmDeleteCategory: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

export default DeleteConfirmationModal;
