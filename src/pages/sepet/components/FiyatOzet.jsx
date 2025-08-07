import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "black" : "black",
  },
}));

const FiyatOzet = ({ cartItems, isCartEmpty }) => {
  return (
    <div className={isCartEmpty ? "fiyat none" : "fiyat"}>
      <Paper
        className="paper"
        sx={{
          boxShadow: 4,
        }}
      >
        <div className="bar">
          <p>
            <strong>1000 ₺</strong> üzeri alışverişe ücretsiz kargo!
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
            <strong>{cartItems?.totalWithOutTax || 0} ₺</strong>
          </p>
          <p>
            <span>KDV:</span> <strong>{cartItems?.totalTax || 0} ₺</strong>
          </p>
          <p>
            <span>Kargo:</span>{" "}
            <strong>{cartItems?.shippingCost || 0} ₺</strong>
          </p>
          <p>
            <span>Kupon:</span>{" "}
            <strong> - {cartItems?.couponDiscount || 0} ₺</strong>
          </p>
          <hr />
          <p>
            <span>Toplam:</span> <strong>{cartItems?.totalPrice || 0} ₺</strong>
          </p>
        </div>

        <Link to={"/siparis"}>
          <button
            className={isCartEmpty ? "button disabled" : "button"}
            disabled={isCartEmpty}
          >
            Alışverişi Tamamla
          </button>
        </Link>
      </Paper>
    </div>
  );
};

export default FiyatOzet;
