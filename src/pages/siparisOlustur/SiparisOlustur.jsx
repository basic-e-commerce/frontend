import { useEffect, useMemo, useState } from "react";
import "./SiparisOlustur.scss";
import Adres from "./Adres/Adres";
import Odeme from "./Odeme/Odeme";
import { Step, StepLabel, Stepper } from "@mui/material";

const SiparisOlustur = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Adres Bilgisi", "Ödeme"];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const StepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <Adres />;
      case 1:
        return <Odeme />;
      default:
        return null;
    }
  }, [activeStep]);

  return (
    <div className="SiparisOlustur">
      <div className="container">
        <div className="siparisOlusturContent">
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

export default SiparisOlustur;
