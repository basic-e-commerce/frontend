import { useEffect, useMemo, useState } from "react";
import "./SiparisOlustur.scss";
import Adres from "./Adres/Adres";
import Odeme from "./Odeme/Odeme";
import { Step, StepLabel, Stepper } from "@mui/material";

const SiparisOlustur = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Adres Bilgisi", "Ödeme"];

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Eğer son adıma gelindiğinde ise "Bitir" butonunu disable et
      const bitirButton = document.getElementById("bitirButtonuu");
      bitirButton.className = "buttonDisabled";
      bitirButton.disabled = true;

      // yonlenndir
    }
  };

  const handleBack = () => {
    // Geri alındığında "Bitir" butonunun disable'ını kaldır
    if (activeStep === steps.length - 1) {
      const bitirButton = document.getElementById("bitirButtonuu");
      bitirButton.className = "button";
      bitirButton.disabled = false;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            <button id="bitirButtonuu" className="button" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Ödeme Yap" : "İleri"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiparisOlustur;
