import "./SiparisOzeti.scss";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

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

const SiparisOzeti = ({ cartItems }) => {
  return (
    <div className="fiyatSiparisOZeti">
      <Paper className="paper" sx={{ boxShadow: 4 }}>
        <div>
          <h2>Sipariş Özeti</h2>
        </div>

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
          <h3 className="title">Toplam Tutar</h3>
          <p>
            <span>Net Fiyat: </span>
            <strong>{cartItems?.totalWithOutTax} ₺</strong>
          </p>
          <p>
            <span>KDV:</span> <strong>{cartItems?.totalTax} ₺</strong>
          </p>
          <p>
            <span>Kargo:</span> <strong>{cartItems?.shippingCost} ₺</strong>
          </p>

          <hr />
          <p>
            <span>Toplam:</span> <strong>{cartItems?.totalPrice} ₺</strong>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default SiparisOzeti;
