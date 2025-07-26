import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import CargoInfoSection from "./CargoInfoSection";
import CargoTeklif from "./CargoTeklif";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./OrderDetailModalCargo.scss";
import { useCargo } from "../hooks";

const OrderDetailModalCargo = ({ order, onClose, setIsSubmit }) => {
  const {
    formik,
    activeStep,
    steps,
    responseTeklifData,
    stepLoading,
    submitSiparisCargo,
  } = useCargo(order, onClose, setIsSubmit);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const StepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <CargoInfoSection stepLoading={stepLoading} formik={formik} />;
      case 1:
        return (
          <CargoTeklif
            submitSiparisCargo={submitSiparisCargo}
            stepLoading={stepLoading}
            responseTeklifData={responseTeklifData}
            orderCode={order.orderCode}
          />
        );
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
