import "./Sepet.scss";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartItems,
  fetchCartItemsLoggedIn,
  loadCartFromStorage,
  updateQuantityLocal,
} from "../../redux/slices/sepetCartSlice";
import { Link } from "react-router-dom";
import api from "../../api/api";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BASE_URL } from "../../config/baseApi";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#316032" : "#316032",
  },
}));

const Sepet = () => {
  const dispatch = useDispatch();
  const { cartItems, status, baslangıcState } = useSelector(
    (state) => state.sepet
  );
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (!isAuthChecked) return;

    isLogin
      ? dispatch(fetchCartItemsLoggedIn())
      : dispatch(fetchCartItems(baslangıcState));
  }, [baslangıcState, dispatch, isLogin, isAuthChecked]);

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
        dispatch(fetchCartItemsLoggedIn());
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(updateQuantityLocal({ productId: item.id, quantity: change }));
      dispatch(fetchCartItems(loadCartFromStorage()));
    }
  };

  return (
    <div className="sepet">
      <div className="container">
        <div className="wrapper">
          <Paper
            className="form"
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
                  {cartItems?.details?.length}
                </span>{" "}
                adet ürün bulunmakta.
              </p>
            </div>

            <div className="urunTable">
              <table className="shopTable">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Resim</th>
                    <th className="product-name">İsim</th>
                    <th className="product-price">Fiyat</th>
                    <th className="product-quantity">Adet</th>
                    <th className="product-subtotal">Toplam</th>
                    <th className="controls">Kontroller</th>
                    {/* <th className="controls">Kontroller</th> */}
                  </tr>
                </thead>
                <tbody className="cart-wrapper">
                  {cartItems?.details?.map((item) => (
                    <tr className="cart-item" key={item.id}>
                      <td className="cart-image">
                        <img src={item.coverImage} alt={item.title} />
                      </td>
                      <td className="product-name">{item.title}</td>
                      <td className="product-price">{item.comparePrice}₺</td>
                      <td className="product-quantity">{item.quantity}</td>
                      <td className="product-subtotal">
                        {item.comparePrice * item.quantity} ₺
                      </td>
                      <td className="controls">
                        <div className="buttonss">
                          <button
                            className=""
                            onClick={() => updateQuantity(item, -1)}
                          >
                            <RemoveIcon className="iconControl" />
                          </button>
                          {item.quantity}
                          <button
                            className=""
                            onClick={() => updateQuantity(item, +1)}
                          >
                            <AddIcon className="iconControl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>

          <div className="fiyat">
            <Paper
              className="paper"
              sx={{
                boxShadow: 4,
              }}
            >
              <div className="bar">
                <p>
                  <strong>2000 ₺</strong> üzeri alışverişe ücretsiz kargo!
                </p>
                <BorderLinearProgress
                  variant="determinate"
                  value={Math.min(cartItems?.shippingCostRate || 0, 100)}
                />
              </div>

              <div className="ucretDetay">
                <h2 className="title">Toplam Tutar</h2>
                <p>
                  <span>Net Fiyat: </span>
                  <strong>{cartItems?.totalWithOutTax} ₺</strong>
                </p>
                <p>
                  <span>KDV:</span> <strong>{cartItems?.totalTax} ₺</strong>
                </p>
                <p>
                  <span>Kargo:</span>{" "}
                  <strong>{cartItems?.shippingCost} ₺</strong>
                </p>

                <hr />
                <p>
                  <span>Toplam:</span>{" "}
                  <strong>{cartItems?.totalPrice} ₺</strong>
                </p>
              </div>

              <Link to={"/siparis"}>
                <button className="button">Alışverişi Tamamla</button>
              </Link>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
