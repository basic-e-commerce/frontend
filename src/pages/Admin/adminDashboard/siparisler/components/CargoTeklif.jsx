import "./CargoTeklif.scss";
import PropTypes from "prop-types";

const CargoCard = ({ cargo }) => (
  <div className="cargo-card">
    <div className="cargo-info">
      <div className="cargo-name">{cargo?.providerCode || "Bilinmiyor"}</div>
      <div className="cargo-eta">
        Tahmini: {cargo?.averageEstimatedTimeHumanReadible || "Bilinmiyor"}
      </div>
    </div>
    <div className="cargo-price">{cargo?.totalAmount} TL</div>
    <button className="cargo-select">Seç</button>
  </div>
);

CargoCard.propTypes = {
  cargo: PropTypes.shape({
    logo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    eta: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

const CargoTeklif = ({ responseTeklifData }) => {
  console.log(responseTeklifData);

  return (
    <div className="cargo-teklif-container">
      <h3>Kargo Seçenekleri</h3>
      {responseTeklifData.cargoOfferResponseUserDto?.cheapest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-ucuz">En Ucuz</div>
          <CargoCard
            cargo={responseTeklifData.cargoOfferResponseUserDto?.cheapest}
          />
        </div>
      )}
      {responseTeklifData.cargoOfferResponseUserDto?.fastest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-hizli">En Hızlı</div>
          <CargoCard
            cargo={responseTeklifData.cargoOfferResponseUserDto?.fastest}
          />
        </div>
      )}
      {responseTeklifData.cargoOfferResponseUserDto?.list?.length > 0 && (
        <div className="cargo-section">
          <div className="cargo-section-title diger">Diğer Kargolar</div>
          {responseTeklifData.cargoOfferResponseUserDto?.list.map((cargo) => (
            <CargoCard cargo={cargo} key={cargo.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CargoTeklif;
