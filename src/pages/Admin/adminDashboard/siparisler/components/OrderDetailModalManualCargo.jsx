import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./OrderDetailModalCargo.scss";
import { useManualCargo } from "../hooks";
import CargoManuelSubmitSection from "./CargoManuelSubmitSection";

const OrderDetailModalManualCargo = ({ order, onClose, setIsSubmit }) => {
  const { formik, activeStep, steps, stepLoading, setActiveStep } =
    useManualCargo(order, onClose, setIsSubmit);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const StepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <CargoManuelSubmitSection stepLoading={stepLoading} formik={formik} />
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

OrderDetailModalManualCargo.propTypes = {
  order: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
};

export default OrderDetailModalManualCargo;
