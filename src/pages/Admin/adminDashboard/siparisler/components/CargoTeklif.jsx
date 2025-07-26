import "./CargoTeklif.scss";
import PropTypes from "prop-types";

const dummyCargos = [
  {
    id: 1,
    name: "HızlıKargo",
    price: 89.99,
    eta: "1-2 gün",
    type: "fastest",
    logo: "🚀",
  },
  {
    id: 2,
    name: "UcuzKargo",
    price: 59.99,
    eta: "3-4 gün",
    type: "cheapest",
    logo: "💸",
  },
  {
    id: 3,
    name: "StandartKargo",
    price: 69.99,
    eta: "2-3 gün",
    type: "other",
    logo: "📦",
  },
  {
    id: 4,
    name: "EkspresKargo",
    price: 99.99,
    eta: "1 gün",
    type: "other",
    logo: "⚡",
  },
];

const groupCargos = (cargos) => {
  return {
    cheapest: cargos.find((c) => c.type === "cheapest"),
    fastest: cargos.find((c) => c.type === "fastest"),
    others: cargos.filter((c) => c.type === "other"),
  };
};

const CargoCard = ({ cargo }) => (
  <div className="cargo-card">
    <div className="cargo-logo">{cargo.logo}</div>
    <div className="cargo-info">
      <div className="cargo-name">{cargo.name}</div>
      <div className="cargo-eta">Tahmini: {cargo.eta}</div>
    </div>
    <div className="cargo-price">{cargo.price.toFixed(2)} TL</div>
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
  const { cheapest, fastest, others } = groupCargos(dummyCargos);

  console.log(responseTeklifData);

  return (
    <div className="cargo-teklif-container">
      <h3>Kargo Seçenekleri</h3>
      {cheapest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-ucuz">En Ucuz</div>
          <CargoCard cargo={cheapest} />
        </div>
      )}
      {fastest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-hizli">En Hızlı</div>
          <CargoCard cargo={fastest} />
        </div>
      )}
      {others.length > 0 && (
        <div className="cargo-section">
          <div className="cargo-section-title diger">Diğer Kargolar</div>
          {others.map((cargo) => (
            <CargoCard cargo={cargo} key={cargo.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CargoTeklif;
