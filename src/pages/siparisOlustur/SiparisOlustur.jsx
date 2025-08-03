import { useEffect, useMemo, useState } from "react";
import "./SiparisOlustur.scss";
import Adres from "./Adres/Adres";
import Odeme from "./Odeme/Odeme";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OdemeSkeleton from "./Odeme/OdemeSkeleton";
import { fetchCartItemsLoggedIn } from "../../redux/slices/sepetCartSlice";
import { useNavigate } from "react-router-dom";

const SiparisOlustur = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Adres Bilgisi", "Ödeme"];
  const { isAuthChecked, isLogin } = useSelector((state) => state.authSlice);
  const { baslangıcState, cartItems } = useSelector((state) => state.sepet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthChecked) {
        if (isLogin) {
          const response = await dispatch(fetchCartItemsLoggedIn()).unwrap();
          console.log(response); // burada array geliyor mu kontrol et
        } else {
          if (!(baslangıcState.length > 0)) navigate("/kategoriler");
        }
      }
    };

    fetchData();
  }, [isAuthChecked, isLogin, baslangıcState]);

  if (!isAuthChecked) {
    return <OdemeSkeleton />;
  }

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
