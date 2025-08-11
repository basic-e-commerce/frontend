import { useEffect, useMemo, useState } from "react";
import "./SiparisOlustur.scss";
import Adres from "./Adres/Adres";
import Odeme from "./Odeme/Odeme";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OdemeSkeleton from "./Odeme/OdemeSkeleton";
import { fetchCartItemsLoggedIn } from "../../redux/slices/sepetCartSlice";
import { useNavigate } from "react-router-dom";

const SiparisOlustur = ({ minOrderAmount }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Adres Bilgisi", "Ödeme"];
  const { isAuthChecked, isLogin } = useSelector((state) => state.authSlice);
  const { baslangıcState, cartItems } = useSelector((state) => state.sepet);
  const {
    address,
    invoiceAddress,
    billingSame,
    invoiceType,
    corporateInvoice,
  } = useSelector((state) => state.siparisSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isStepValid = () => {
    const isAddressFilled =
      address.firstName &&
      address.lastName &&
      address.username &&
      address.city &&
      address.cityCode &&
      address.district &&
      address.districtId &&
      address.addressLine1 &&
      address.postalCode &&
      address.phoneNo;

    const isInvoiceAddressFilled = billingSame
      ? true
      : invoiceAddress.firstName &&
        invoiceAddress.lastName &&
        invoiceAddress.username &&
        invoiceAddress.city &&
        invoiceAddress.cityCode &&
        invoiceAddress.district &&
        invoiceAddress.districtId &&
        invoiceAddress.addressLine1 &&
        invoiceAddress.postalCode &&
        invoiceAddress.phoneNo;

    const isCorporateValid =
      invoiceType === "CORPORATE"
        ? corporateInvoice.taxOffice &&
          corporateInvoice.taxNumber &&
          corporateInvoice.companyName
        : true;

    return isAddressFilled && isInvoiceAddressFilled && isCorporateValid;
  };

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
        return <Adres minOrderAmount={minOrderAmount} />;
      case 1:
        return <Odeme minOrderAmount={minOrderAmount} />;
      default:
        return null;
    }
  }, [activeStep]);

  useEffect(() => {
    if (!isAuthChecked) return;

    const fetchData = async () => {
      if (isLogin) {
        try {
          const response = await dispatch(fetchCartItemsLoggedIn()).unwrap();
          const hasCartItems =
            Array.isArray(response?.details) && response.details.length > 0;
          if (!hasCartItems) {
            navigate("/kategoriler");
          }
        } catch (error) {
          console.error("Sepet verisi alınırken hata:", error);
          navigate("/kategoriler");
        }
      } else {
        const hasLocalCart =
          Array.isArray(baslangıcState) && baslangıcState.length > 0;
        if (!hasLocalCart) {
          navigate("/kategoriler");
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
                className={isStepValid() ? "button" : "buttonDisabled"}
                onClick={handleNext}
                disabled={!isStepValid()}
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
