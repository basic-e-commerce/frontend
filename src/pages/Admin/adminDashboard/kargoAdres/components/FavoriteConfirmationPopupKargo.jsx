const FavoriteConfirmationPopupKargo = ({
  onConfirm,
  onCancel,
  favoriteLoading,
}) => {
  return (
    <div className="popupAdresler">
      <form onSubmit={onConfirm} className="popupAdresler-inner">
        <p>Varsayılan Adres olarak seçmek istediğinize emin misiniz?</p>
        <div className="popupAdresler-buttons">
          <button type="button" className="cancel" onClick={onCancel}>
            İptal
          </button>
          <button
            type="submit"
            className="confirm"
            disabled={favoriteLoading}
            style={{
              backgroundColor: "darkgreen",
              opacity: favoriteLoading ? 0.5 : 1,
            }}
          >
            {favoriteLoading ? "Ekleniyor..." : "Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FavoriteConfirmationPopupKargo;
