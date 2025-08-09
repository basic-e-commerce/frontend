import FavoriteIcon from "@mui/icons-material/Favorite";

const AddressCardAnlasma = ({ adres, onFavorite }) => {
  return (
    <div
      className={
        adres?.default
          ? "kayitliAdres paper defaultAddress"
          : "kayitliAdres paper"
      }
    >
      <div className="top">
        <h4 className="adressTitle">{adres.name}</h4>
        <div className="icons">
          <button onClick={() => onFavorite(adres.id)}>
            <FavoriteIcon className="icon" />
          </button>
        </div>
      </div>
      <div className="phone">
        <p className="name">Kullanıcı: {adres?.username || "Kullanıcı Yok"}</p>
        <p className="name">Kod: {adres?.providerCode || "Kod Yok"}</p>
      </div>
      <div className="section">
        <p className="name">{adres?.name || "Adres Yok"}</p>
        <p className="">
          Entegrasyon: {adres?.integrationType || "Entegrasyon Yok"} <br />
          Etiket Formatı: {adres?.labelFileType || "Etiket Formatı Yok"} <br />
          Aktif: {adres?.isActive ? "Evet" : "Hayır"} <br />
          Public: {adres?.isPublic ? "Evet" : "Hayır"} <br />
          Sharable: {adres?.sharable ? "Evet" : "Hayır"} <br />
          Dinamik Fiyat: {adres?.isDynamicPrice ? "Evet" : "Hayır"} <br />
        </p>
        <p className="">
          Versiyon: {adres?.version || "Versiyon Yok"} <br />
          Oluşturulma Tarihi: {adres?.createdAt ||
            "Oluşturulma Tarihi Yok"}{" "}
          <br />
          Güncellenme Tarihi: {adres?.updatedAt ||
            "Güncellenme Tarihi Yok"}{" "}
          <br />
          isC2C: {adres?.isC2C ? "Evet" : "Hayır"} <br />
          integrationType: {adres?.integrationType || "Integration Type Yok"}
          <br />
          labelFileType: {adres?.labelFileType || "Label File Type Yok"} <br />
          priceUpdatedAt: {adres?.priceUpdatedAt || "Price Updated At Yok"}{" "}
          <br />
        </p>

        {adres?.parameters && Object.keys(adres.parameters).length > 0 && (
          <div className="parameters-section">
            <h5>Parametreler:</h5>
            <p className="parameters-grid">
              {Object.entries(adres.parameters).map(([key, value]) => (
                <div key={key} className="parameter-item">
                  <span className="parameter-key">{key}:</span>
                  <span className="parameter-value">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </div>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCardAnlasma;
