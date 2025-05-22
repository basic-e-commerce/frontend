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
  removeFromCart,
} from "../../redux/slices/sepetCartSlice";
import { Link } from "react-router-dom";
import api from "../../api/api";

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
  const { cartItems, status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );
  const { isLogin } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchCartItemsLoggedIn());
    } else {
      dispatch(fetchCartItems(baslangıcState));
    }
  }, [baslangıcState, dispatch, isLogin]);

  const updateQuantity = async (item, change) => {
    if (isLogin) {
      try {
        await api.put("http://localhost:8083/api/v1/card", {
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
      dispatch(removeFromCart(item.id));
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
                <span style={{ color: "red" }}>{cartItems.length}</span> adet
                ürün bulunmakta.
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
                  {cartItems.map((item) => (
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
                        <button
                          className=""
                          onClick={() => updateQuantity(item, -1)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className=""
                          onClick={() => updateQuantity(item, +1)}
                        >
                          +
                        </button>
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
                  value={cartTotal?.progressValue}
                />
              </div>

              <div className="ucretDetay">
                <h2 className="title">Toplam Tutar</h2>
                <p>
                  <span>Toplam Fiyat: </span>{" "}
                  <strong>{cartTotal?.totalPrice?.toFixed(2)} ₺</strong>
                </p>
                <p>
                  <span>KDV:</span>{" "}
                  <strong>{cartTotal?.kdv?.toFixed(2)} ₺</strong>
                </p>
                <p>
                  <span>Kargo:</span>{" "}
                  <strong>{cartTotal?.shippingCost?.toFixed(2)} ₺</strong>
                </p>

                <hr />
                <p>
                  <span>Toplam:</span>{" "}
                  <strong>{cartTotal?.totalWithShipping?.toFixed(2)} ₺</strong>
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
