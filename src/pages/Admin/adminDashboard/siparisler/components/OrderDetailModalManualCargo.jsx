import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./OrderDetailModalCargo.scss";
import { useManualCargo } from "../hooks";
import CargoManuelSubmitSection from "./CargoManuelSubmitSection";
import ManuelOption from "./ManuelOption";
import CargoAnlasmaliSubmitSection from "./CargoAnlasmaliSubmitSection";

const OrderDetailModalManualCargo = ({ order, onClose, setIsSubmit }) => {
  const {
    formik,
    formikAnlasmali,
    formikDirekt,
    activeStep,
    steps,
    stepLoading,
    setActiveStep,
  } = useManualCargo(order, onClose, setIsSubmit);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const StepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <ManuelOption setActiveStep={setActiveStep} />;

      case 1:
        return (
          <CargoAnlasmaliSubmitSection
            stepLoading={stepLoading}
            formik={formikAnlasmali}
          />
        );

      case 2:
        return (
          <CargoManuelSubmitSection stepLoading={stepLoading} formik={formik} />
        );

      case 3:
        return (
          <CargoAnlasmaliSubmitSection
            stepLoading={stepLoading}
            formik={formikDirekt}
          />
        );

      default:
        return null;
    }
  }, [activeStep, formik, formikAnlasmali, formikDirekt]);

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
