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

const SiparisOzeti = ({ cartTotal }) => {
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
            value={cartTotal?.progressValue}
          />
        </div>

        <div className="ucretDetay">
          <h3 className="title">Toplam Tutar</h3>
          <p>
            <span>Toplam Fiyat: </span>
            <strong>{cartTotal?.totalPrice?.toFixed(2)} ₺</strong>
          </p>
          <p>
            <span>KDV:</span> <strong>{cartTotal?.kdv?.toFixed(2)} ₺</strong>
          </p>
          <p>
            <span>Kargo:</span>
            <strong>{cartTotal?.shippingCost?.toFixed(2)} ₺</strong>
          </p>

          <hr />
          <p>
            <span>Toplam:</span>
            <strong>{cartTotal?.totalWithShipping?.toFixed(2)} ₺</strong>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default SiparisOzeti;
