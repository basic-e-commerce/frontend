import { useFormik } from "formik";
import { cargoValidationSchema, initialValues } from "../yup/cargoValidation";

import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import { useState } from "react";

export const useCargo = (order) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Kargo Bilgisi", "Teklif"];
  const [stepLoading, setstepLoading] = useState(false);
  const [responseTeklifData, setresponseTeklifData] = useState({});

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

  const formik = useFormik({
    initialValues,
    validationSchema: cargoValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setstepLoading(true);

      try {
        const response = await api.post(
          `${BASE_URL}/api/v1/order/cargo-offer?orderCode=${order.orderCode}`,
          [values]
        );

        setresponseTeklifData(response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Hata Oluştu",
            status: "error",
          })
        );
      } finally {
        setstepLoading(false);
      }
    },
  });

  return {
    responseTeklifData,
    formik,
    activeStep,
    steps,
    stepLoading,
    handleNext,
    handleBack,
  };
};
