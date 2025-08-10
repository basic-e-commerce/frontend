import "./CancelOnayPopUp.scss";
import { useState } from "react";

const HandleNextOnay = ({ order, onClose, handleManualNextSubmit }) => {
  const [isLoading, setIsloading] = useState(false);

  return (
    <div className="popupAdresler">
      <form
        onSubmit={() =>
          handleManualNextSubmit(
            order.orderStatusResponse?.orderPackages?.[0]?.id,
            order.orderCode
          )
        }
        className="popupAdresler-inner"
      >
        <p>Kargo Teslimi için emin misiniz?</p>
        <div className="popupAdresler-buttons">
          <button
            onClick={() => {
              onClose();
            }}
            type="button"
            className="cancel"
          >
            Vazceç
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className={isLoading ? "confirm green disabled" : "confirm green"}
          >
            {isLoading ? "Teslim Ediliyor..." : "Teslim Et"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HandleNextOnay;
