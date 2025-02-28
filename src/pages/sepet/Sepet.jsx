import "./Sepet.scss";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import {
  fetchCartItems,
  removeFromCart,
} from "../../redux/slices/sepetCartSlice";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#0b1320" : "#0b1320y",
  },
}));

const Sepet = () => {
  const dispatch = useDispatch();
  const { cartItems, status, baslangıcState } = useSelector(
    (state) => state.sepet
  );

  useEffect(() => {
    if (baslangıcState.length > 0) {
      dispatch(fetchCartItems(baslangıcState)); // Sepeti backend'den güncelle
    }
  }, [baslangıcState, dispatch]);

  const { totalPrice, kdv, shippingCost, totalWithShipping, progressValue } =
    useMemo(() => {
      const kdvRate = 0.2; // %20 KDV
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.discountPrice * item.quantity,
        0
      );
      const kdv = (totalPrice * kdvRate) / (1 + kdvRate);
      const shippingThreshold = 2000;
      const shippingCost = totalPrice >= shippingThreshold ? 0 : 200;
      const totalWithShipping = totalPrice + shippingCost;
      const progressValue = Math.min(
        (totalPrice / shippingThreshold) * 100,
        100
      );

      return {
        totalPrice,
        kdv,
        shippingCost,
        totalWithShipping,
        progressValue,
      };
    }, [cartItems]);

  return (
    <div className="sepet">
      <div className="container">
        <div className="wrapper">
          <Paper
            className="form"
            sx={{
              boxShadow: 4,
              padding: "2rem 2rem",
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
                    <th className="product-quantity">Adet / Metraj</th>
                    <th className="product-subtotal">Toplam</th>
                    <th className="controls">Kontroller</th>
                    {/* <th className="controls">Kontroller</th> */}
                  </tr>
                </thead>
                <tbody className="cart-wrapper">
                  {cartItems.map((item) => (
                    <tr className="cart-item" key={item.id}>
                      <td className="cart-image">
                        <img src={item.coverImage} alt={item.coverImage} />
                      </td>
                      <td className="product-name">{item.name}</td>
                      <td className="product-price">{item.discountPrice}₺</td>
                      <td className="product-quantity">{item.quantity}</td>
                      <td className="product-subtotal">{item.total}₺</td>
                      <td className="controls">
                        <button
                          className="delete"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Sil
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
                  value={progressValue}
                />
              </div>

              <div className="ucretDetay">
                <h2 className="title">Toplam Tutar</h2>
                <p>
                  <span>Toplam Fiyat: </span>{" "}
                  <strong>{totalPrice.toFixed(2)} ₺</strong>
                </p>
                <p>
                  <span>KDV:</span> <strong>{kdv.toFixed(2)} ₺</strong>
                </p>
                <p>
                  <span>Kargo:</span> <strong>{shippingCost} ₺</strong>
                </p>

                <hr />
                <p>
                  <span>Toplam:</span>{" "}
                  <strong>{totalWithShipping.toFixed(2)} ₺</strong>
                </p>
              </div>

              <button className="button">Satın Al</button>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
