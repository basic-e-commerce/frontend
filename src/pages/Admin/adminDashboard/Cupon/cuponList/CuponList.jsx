import { useEffect, useState } from "react";
import "./CuponList.scss";
import { Switch } from "@mui/material";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoading,
  setLoading,
} from "../../../../../redux/slices/loadingSlice";
import CuponListSkeleton from "./CuponListSkeleton";

const CuponList = () => {
  const [cupons, setCupons] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const typeOfTip = (type) => {
    switch (type) {
      case "PERCENTAGE":
        return "Yüzdelik";
      case "FIXEDAMOUNT":
        return "Net İndirim";
      default:
        return "Bilinmeyen Tip";
    }
  };

  useEffect(() => {
    dispatch(
      setLoading({ isLoading: true, message: "Kupon durumu güncelleniyor..." })
    );
    const fetchCupons = async () => {
      dispatch(
        setLoading({ isLoading: true, message: "Kuponlar yükleniyor..." })
      );
      try {
        const response = await api.get(`${BASE_URL}/api/v1/coupon`);
        setCupons(response.data);
      } catch (error) {
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: error.response.data,
              status: "error",
            })
          );
        }, 400);
      } finally {
        dispatch(clearLoading());
      }
    };
    fetchCupons();
  }, [isSubmiting]);

  const handleToggle = async (id, code, currentActive) => {
    dispatch(
      setLoading({ isLoading: true, message: "Kupon durumu güncelleniyor..." })
    );
    try {
      const newActive = !currentActive;
      await api.put(
        `${BASE_URL}/api/v1/coupon/active?code=${code}&active=${newActive}`
      );

      setIsSubmiting((prev) => !prev);
      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: "Kupon durumu güncellendi",
            status: "success",
          })
        );
      }, 400);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data,
            status: "error",
          })
        );
      }, 400);
    } finally {
      dispatch(clearLoading());
    }
  };

  if (isLoading) {
    return <CuponListSkeleton />;
  }

  return (
    <table className="cupon-table-cupon">
      <thead>
        <tr>
          <th className="col-2">Kupon Kodu</th>
          <th className="col-2">Açıklama</th>
          <th className="col-1">Tip</th>
          <th className="col-0">Değer</th>
          <th className="col-0">Kullanım</th>
          <th className="col-0">Toplam Limit</th>
          <th className="col-0">Min. Tutar</th>
          <th className="col-0">Max. Tutar</th>
          <th className="col-2">Başlangıç</th>
          <th className="col-2">Bitiş</th>
          <th className="col-1">Durum</th>
          <th className="col-1"></th>
        </tr>
      </thead>
      <tbody>
        {cupons?.length > 0 ? (
          cupons?.map((cupon) => (
            <tr key={cupon.id}>
              <td>{cupon.code}</td>
              <td> {cupon.description}</td>
              <td>{typeOfTip(cupon.discountType)}</td>
              <td>{cupon.discountValue}</td>
              <td>{cupon.timesUsed}</td>
              <td>{cupon.totalUsageLimit}</td>
              <td>{cupon.minOrderAmountLimit}</td>
              <td>{cupon.maxOrderAmountLimit}</td>
              <td>
                {new Date(cupon.couponStartDate).toLocaleDateString()}
                <br />
                <small>
                  {new Date(cupon.couponStartDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </td>
              <td>
                {new Date(cupon.couponEndDate).toLocaleDateString()}
                <br />
                <small>
                  {new Date(cupon.couponEndDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </td>
              <td>{cupon.active ? "Aktif" : "Pasif"}</td>
              <td>
                <Switch
                  checked={cupon.active}
                  onChange={() =>
                    handleToggle(cupon.id, cupon.code, cupon.active)
                  }
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="11">Kupon bulunamadı.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CuponList;
