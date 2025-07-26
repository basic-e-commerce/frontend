import CargoInfoSkeleton from "./CargoInfoSkeleton";
import "./CargoTeklif.scss";
import PropTypes from "prop-types";

const CargoCard = ({ cargo, submitSiparisCargo, orderCode, nicelikler }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitSiparisCargo(cargo.id, orderCode, nicelikler);
  };

  return (
    <form onSubmit={handleSubmit} className="cargo-card">
      <div className="cargo-info">
        <div className="cargo-name">{cargo?.providerCode || "Bilinmiyor"}</div>
        <div className="cargo-eta">
          Tahmini: {cargo?.averageEstimatedTimeHumanReadible || "Bilinmiyor"}
        </div>
      </div>
      <div className="cargo-price">{cargo?.totalAmount} TL</div>
      <button type="submit" className="cargo-select">
        Seç
      </button>
    </form>
  );
};

CargoCard.propTypes = {
  cargo: PropTypes.shape({
    id: PropTypes.string,
    providerCode: PropTypes.string,
    averageEstimatedTimeHumanReadible: PropTypes.string,
    totalAmount: PropTypes.number,
  }).isRequired,
  submitSiparisCargo: PropTypes.func.isRequired,
  orderCode: PropTypes.string.isRequired,
  nicelikler: PropTypes.shape({
    height: PropTypes.number,
    length: PropTypes.number,
    width: PropTypes.number,
    weight: PropTypes.number,
    distanceUnit: PropTypes.string,
    massUnit: PropTypes.string,
  }).isRequired,
};

const CargoTeklif = ({
  responseTeklifData,
  stepLoading,
  submitSiparisCargo,
  orderCode,
}) => {
  console.log(responseTeklifData);

  if (stepLoading) {
    return <CargoInfoSkeleton />;
  }

  return (
    <div className="cargo-teklif-container">
      <h3>Kargo Seçenekleri</h3>

      {responseTeklifData.cargoOfferResponseUserDto?.cheapest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-ucuz">En Ucuz</div>
          <CargoCard
            submitSiparisCargo={submitSiparisCargo}
            cargo={responseTeklifData.cargoOfferResponseUserDto?.cheapest}
            orderCode={orderCode}
            nicelikler={{
              height: responseTeklifData?.cargoOfferResponseUserDto?.height,
              length: responseTeklifData?.cargoOfferResponseUserDto?.length,
              width: responseTeklifData?.cargoOfferResponseUserDto?.width,
              weight: responseTeklifData?.cargoOfferResponseUserDto?.weight,
              distanceUnit:
                responseTeklifData?.cargoOfferResponseUserDto?.distanceUnit,
              massUnit: responseTeklifData?.cargoOfferResponseUserDto?.massUnit,
            }}
          />
        </div>
      )}
      {responseTeklifData.cargoOfferResponseUserDto?.fastest && (
        <div className="cargo-section">
          <div className="cargo-section-title en-hizli">En Hızlı</div>
          <CargoCard
            submitSiparisCargo={submitSiparisCargo}
            cargo={responseTeklifData.cargoOfferResponseUserDto?.fastest}
            orderCode={orderCode}
            nicelikler={{
              height: responseTeklifData?.cargoOfferResponseUserDto?.height,
              length: responseTeklifData?.cargoOfferResponseUserDto?.length,
              width: responseTeklifData?.cargoOfferResponseUserDto?.width,
              weight: responseTeklifData?.cargoOfferResponseUserDto?.weight,
              distanceUnit:
                responseTeklifData?.cargoOfferResponseUserDto?.distanceUnit,
              massUnit: responseTeklifData?.cargoOfferResponseUserDto?.massUnit,
            }}
          />
        </div>
      )}
      {responseTeklifData.cargoOfferResponseUserDto?.list?.length > 0 && (
        <div className="cargo-section">
          <div className="cargo-section-title diger">Diğer Kargolar</div>
          {responseTeklifData.cargoOfferResponseUserDto?.list.map((cargo) => (
            <CargoCard
              submitSiparisCargo={submitSiparisCargo}
              cargo={cargo}
              orderCode={orderCode}
              key={cargo.id}
              nicelikler={{
                height: responseTeklifData?.cargoOfferResponseUserDto?.height,
                length: responseTeklifData?.cargoOfferResponseUserDto?.length,
                width: responseTeklifData?.cargoOfferResponseUserDto?.width,
                weight: responseTeklifData?.cargoOfferResponseUserDto?.weight,
                distanceUnit:
                  responseTeklifData?.cargoOfferResponseUserDto?.distanceUnit,
                massUnit:
                  responseTeklifData?.cargoOfferResponseUserDto?.massUnit,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CargoTeklif.propTypes = {
  responseTeklifData: PropTypes.shape({
    cargoOfferResponseUserDto: PropTypes.shape({
      cheapest: PropTypes.shape({
        id: PropTypes.string,
        providerCode: PropTypes.string,
        averageEstimatedTimeHumanReadible: PropTypes.string,
        totalAmount: PropTypes.number,
      }),
      fastest: PropTypes.shape({
        id: PropTypes.string,
        providerCode: PropTypes.string,
        averageEstimatedTimeHumanReadible: PropTypes.string,
        totalAmount: PropTypes.number,
      }),
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          providerCode: PropTypes.string,
          averageEstimatedTimeHumanReadible: PropTypes.string,
          totalAmount: PropTypes.number,
        })
      ),
      height: PropTypes.number,
      length: PropTypes.number,
      width: PropTypes.number,
      weight: PropTypes.number,
      distanceUnit: PropTypes.string,
      massUnit: PropTypes.string,
    }),
  }).isRequired,
  stepLoading: PropTypes.bool.isRequired,
  submitSiparisCargo: PropTypes.func.isRequired,
  orderCode: PropTypes.string.isRequired,
};

export default CargoTeklif;
