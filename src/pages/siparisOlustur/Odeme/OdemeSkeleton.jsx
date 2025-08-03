import "./OdemeSkeleton.scss";
import Paper from "@mui/material/Paper";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";

const OdemeSkeleton = () => {
  return (
    <div className="siparisOdemeSectionSkleton container">
      <Paper
        sx={{ boxShadow: 4, padding: "2.5rem", borderRadius: 1 }}
        className="formOdeme"
      >
        <div className="cardOdeme card-animation">
          <div className="card-content">
            <div className="skeleton-title skeleton-animation"></div>

            {/* Full Name Input Skeleton */}
            <div className="skeleton-input skeleton-animation"></div>

            {/* Card Number Input Skeleton */}
            <div className="skeleton-input skeleton-animation"></div>

            {/* Expiry Date Group Skeleton */}
            <div className="input-group">
              <div className="skeleton-input-small skeleton-animation"></div>
              <div className="skeleton-input-small skeleton-animation"></div>
            </div>

            {/* CVV Input Skeleton */}
            <div className="skeleton-input skeleton-animation"></div>

            {/* Installment Select Skeleton */}
            <div className="skeleton-select skeleton-animation"></div>

            {/* Payment Cards Image Skeleton */}
            <div className="skeleton-payment-cards skeleton-animation"></div>

            {/* Submit Button Skeleton */}
            <div className="skeleton-button skeleton-animation"></div>
          </div>
        </div>
      </Paper>

      {/* Order Summary Skeleton */}
      <div className="skeleton-order-summary">
        <div className="skeleton-summary-title skeleton-animation"></div>
        <div className="skeleton-summary-items">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="skeleton-summary-item skeleton-animation"
            ></div>
          ))}
        </div>
        <div className="skeleton-summary-total skeleton-animation"></div>
      </div>
    </div>
  );
};

export default OdemeSkeleton;
