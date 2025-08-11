import "./Sepet.scss";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
  loadCartFromStorage,
  updateQuantityLocal,
} from "../../redux/slices/sepetCartSlice";
import { BASE_URL } from "../../config/baseApi";
import api from "../../api/api";
import UrunListesi from "./components/UrunListesi";
import FiyatOzet from "./components/FiyatOzet";
import SepetSkeleton from "./components/SepetSkeleton";
import { clearLoading, setLoading } from "../../redux/slices/loadingSlice";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";

const Sepet = ({ minOrderAmount }) => {
  const dispatch = useDispatch();
  const { cartItems, baslangıcState, status } = useSelector(
    (state) => state.sepet
  );
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const { isLoading } = useSelector((state) => state.loading);
  const [cuponText, setCuponText] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (!isAuthChecked) return;

    const fetchData = async () => {
      try {
        if (isLogin) {
          await dispatch(fetchCartItemsLoggedIn()).unwrap();
        } else {
          await dispatch(fetchCartItems(baslangıcState)).unwrap();
        }
      } catch (error) {
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: error.response.data,
              status: "error",
            })
          );
        }, 400);
      }
    };

    fetchData();
  }, [baslangıcState, dispatch, isLogin, isAuthChecked, isSubmiting]);

  const updateQuantity = async (item, change) => {
    if (isLogin) {
      try {
        await api.put(`${BASE_URL}/api/v1/card`, {
          cardItems: [
            {
              productId: item.id,
              quantity: change,
            },
          ],
        });
        await dispatch(fetchCartItemsLoggedIn()).unwrap();
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(updateQuantityLocal({ productId: item.id, quantity: change }));
      dispatch(fetchCartItems(loadCartFromStorage()));
    }
  };

  const handleSubmitKupon = async () => {
    dispatch(setLoading({ isLoading: true, message: "Sepet yukleniyor..." }));
    try {
      await api.put(`${BASE_URL}/api/v1/card/add-coupon?code=${cuponText}`);
      setIsSubmiting((prev) => !prev);
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: "Kupon Başarıyla Uygulandı!",
            status: "success",
          })
        );
      }, 400);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response?.data?.error || "Böyle bir kupon yok",
            status: "error",
          })
        );
      }, 700);
    } finally {
      setCuponText("");
      setTimeout(() => {
        dispatch(clearLoading());
      }, 300);
    }
  };

  const handleRemoveCoupon = async () => {
    dispatch(setLoading({ isLoading: true, message: "Sepet yukleniyor..." }));
    try {
      await api.put(`${BASE_URL}/api/v1/card/remove-coupon`);
      setIsSubmiting((prev) => !prev);

      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: "Kupon Başarıyla Kaldırıldı!",
            status: "success",
          })
        );
      }, 400);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      }, 700);
    } finally {
      setTimeout(() => {
        dispatch(clearLoading());
      }, 300);
    }
  };

  if (status === "loading" || !isAuthChecked || isLoading) {
    return <SepetSkeleton />;
  }

  return (
    <div className="sepet">
      <div className="container">
        <div className="wrapper">
          <Paper
            className={
              cartItems?.details?.length > 0 ? "form" : "form fullWidth"
            }
            sx={{
              boxShadow: 4,
              padding: "3rem 3.5rem",
              borderRadius: 1,
            }}
          >
            <div>
              <h2>Sepetiniz</h2>
              <p className="sayi">
                Sepetinizde toplam{" "}
                <span style={{ color: "red" }}>
                  {cartItems?.details?.length || 0}
                </span>{" "}
                adet ürün bulunmakta.
              </p>
            </div>

            {isLogin && !cartItems?.couponCustomerResponseDto?.code && (
              <div
                className={
                  !cartItems?.details?.length > 0 ? "cuppon none" : "cuppon"
                }
              >
                <form className="subscride-form" onSubmit={handleSubmitKupon}>
                  <input
                    value={cuponText}
                    onChange={(e) => setCuponText(e.target.value)}
                    type="text"
                    placeholder="Kupon kodunu girin"
                  />
                  <button type="submit">Uygula</button>
                </form>
              </div>
            )}

            {cartItems?.couponCustomerResponseDto?.code && (
              <div className="uygulanmisKuponChip">
                <span className="kuponKod">
                  {cartItems?.couponCustomerResponseDto?.code}
                </span>
                <button className="kapatButonu" onClick={handleRemoveCoupon}>
                  ×
                </button>
              </div>
            )}

            <UrunListesi
              cartItems={cartItems}
              updateQuantity={updateQuantity}
            />
          </Paper>
          <FiyatOzet
            minOrderAmount={minOrderAmount}
            cartItems={cartItems}
            isCartEmpty={!(cartItems?.details?.length > 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sepet;
