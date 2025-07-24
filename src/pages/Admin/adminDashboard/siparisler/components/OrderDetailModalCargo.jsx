import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import CargoInfoSection from "./CargoInfoSection";
import CargoTeklif from "./CargoTeklif";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./OrderDetailModalCargo.scss";
import { useCargo } from "../hooks";

const OrderDetailModalCargo = ({ order, onClose }) => {
  const { formik, activeStep, steps, handleNext, handleBack } = useCargo(order);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const StepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <CargoInfoSection formik={formik} />;
      case 1:
        return <CargoTeklif />;
      default:
        return null;
    }
  }, [activeStep, formik]);

  return (
    <div className="modal-overlayyy">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="corgoStepper">
          <Stepper
            className="airDropsStepper"
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className="ucusBilgileri">
            <div className="airDropSection">{StepContent}</div>
          </div>

          <div className="airDropController">
            <button
              className={activeStep === 0 ? "buttonDisabled" : "button"}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Geri
            </button>
            {activeStep !== steps.length - 1 && (
              <button
                id="bitirButtonuu"
                className="button"
                onClick={handleNext}
              >
                İleri
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

OrderDetailModalCargo.propTypes = {
  order: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailModalCargo;
