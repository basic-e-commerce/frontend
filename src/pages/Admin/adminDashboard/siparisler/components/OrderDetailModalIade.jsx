import { useState } from "react";
import IptalCard from "./IptalCard";
import {
  clearLoading,
  setLoading,
} from "../../../../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import OrderDetailModalIadeSkleton from "./OrderDetailModalIadeSkleton";

const OrderDetailModalIade = ({ order, onClose, setIsSubmit }) => {
  const dispatch = useDispatch();
  const [refundItems, setRefundItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleRefund = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const payload = {
      orderItemRefundDtos: refundItems,
      orderCode: order.orderCode,
      willAccept: true,
    };

    try {
      await api.post(`${BASE_URL}/api/v1/order/cargo-refund`, payload);
      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: "İade Başarılı",
            status: "success",
          })
        );
      }, 500);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: error?.message || error?.response?.data || "Hata var",
            status: "error",
          })
        );
      }, 500);
    } finally {
      setIsSubmit((prev) => !prev);
      setisLoading(false);
      onClose();
    }
  };

  if (isLoading) {
    return <OrderDetailModalIadeSkleton />;
  }

  return (
    <div className="modal-overlayIade">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleRefund}>
          <table className="product-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Ürün Adı</th>
                <th>Adet</th>
                <th>İndirimli / Kuponlu</th>
                <th>İade Miktarı</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItemResponseDtos?.map((item, index) => (
                <IptalCard
                  item={item}
                  key={index}
                  onQuantityChange={(quantity) => {
                    setRefundItems((prev) => {
                      const updated = [...prev];
                      const existingIndex = updated.findIndex(
                        (x) => x.orderItemId === item.orderItemId
                      );
                      if (existingIndex > -1) {
                        if (quantity > 0) {
                          updated[existingIndex] = {
                            orderItemId: item.orderItemId,
                            productId: item.productId,
                            quantity,
                          };
                        } else {
                          updated.splice(existingIndex, 1);
                        }
                      } else if (quantity > 0) {
                        updated.push({
                          orderItemId: item.orderItemId,
                          productId: item.productId,
                          quantity,
                        });
                      }
                      return updated;
                    });
                  }}
                />
              ))}
            </tbody>
          </table>

          <div className="buttonContainer">
            <button className="button" type="submit">
              İade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailModalIade;
