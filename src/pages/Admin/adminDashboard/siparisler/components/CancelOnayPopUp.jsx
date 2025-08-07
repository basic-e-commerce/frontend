import { useDispatch } from "react-redux";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import "./CancelOnayPopUp.scss";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import { useState } from "react";

const CancelOnayPopUp = ({ order, onClose, setIsSubmit }) => {
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      if (order?.orderStatusResponse?.orderPackages?.length > 0) {
        await api.post(
          `${BASE_URL}/api/v1/order/cargo-cancel?orderCode=${order.orderCode}&orderPackageId=${order?.orderStatusResponse?.orderPackages[0]?.id}`
        );
      } else {
        await api.post(
          `${BASE_URL}/api/v1/order/cargo-cancel?orderCode=${order.orderCode}`
        );
      }

      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: "Siptaiş İptal Edildi",
            status: "success",
          })
        );
      }, 400);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: error?.response?.data || error.message || "Hata Oluştu",
            status: "error",
          })
        );
      }, 400);
    } finally {
      setIsloading(false);
      onClose();
      setIsSubmit((prev) => !prev);
    }
  };

  return (
    <div className="popupAdresler">
      <form onSubmit={handleDeleteSubmit} className="popupAdresler-inner">
        <p>İptal için emin misiniz?</p>
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
            className={isLoading ? "confirm disabled" : "confirm"}
          >
            {isLoading ? "İptal Ediliyor..." : "İptal Et"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancelOnayPopUp;
