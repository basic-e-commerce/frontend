import { useFormik } from "formik";
import {
  cargoManualValidationSchema,
  initialValues,
} from "../yup/manuelCargoValidation";

import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import { useState } from "react";
import {
  anlasmaliCargoValidation,
  initialValuesAnlasmali,
} from "../yup/anlasmaliCargoValidation";

export const useManualCargo = (order, onClose, setIsSubmit) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Yöntem Seç", "Kargola"];
  const [stepLoading, setstepLoading] = useState(false);

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
    validationSchema: cargoManualValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setstepLoading(true);

      try {
        await api.post(`${BASE_URL}/api/v1/order/cargo-manuel`, {
          cargoCode: values.cargoCode,
          orderCode: order.orderCode,
          cargoBuyDesiRequestAdminDataDto: [
            {
              cargoCompany: values.cargoCompany,
              length: values.length,
              height: values.height,
              width: values.width,
              distanceUnit: values.distanceUnit,
              weight: values.weight,
              massUnit: values.massUnit,
              orderItems: order?.orderItemResponseDtos?.map((item) => ({
                productId: item?.productId,
                productQuantity: item?.quantity,
              })),
            },
          ],
        });
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: "Kargo Başarıyla Oluşturuldu",
              status: "success",
            })
          );
        }, 400);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Hata Oluştu",
            status: "error",
          })
        );
      } finally {
        setstepLoading(false);
        onClose();
        setIsSubmit((prev) => !prev);
      }
    },
  });

  const formikAnlasmali = useFormik({
    initialValues: initialValuesAnlasmali,
    validationSchema: anlasmaliCargoValidation,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setstepLoading(true);

      try {
        await api.post(`${BASE_URL}/api/v1/order/cargo-contract`, {
          orderCode: order.orderCode,
          cargoBuyDesiRequestAdminDataDto: [
            {
              cargoCompany: values.cargoCompany,
              length: values.length,
              height: values.height,
              width: values.width,
              distanceUnit: values.distanceUnit,
              weight: values.weight,
              massUnit: values.massUnit,
              orderItems: order?.orderItemResponseDtos?.map((item) => ({
                productId: item?.productId,
                productQuantity: item?.quantity,
              })),
            },
          ],
        });
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: "Kargo Başarıyla Oluşturuldu",
              status: "success",
            })
          );
        }, 400);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Hata Oluştu",
            status: "error",
          })
        );
      } finally {
        setstepLoading(false);
        onClose();
        setIsSubmit((prev) => !prev);
      }
    },
  });

  const formikDirekt = useFormik({
    initialValues: initialValuesAnlasmali,
    validationSchema: anlasmaliCargoValidation,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setstepLoading(true);

      try {
        await api.post(`${BASE_URL}/api/v1/order/cargo-one-step`, {
          orderCode: order.orderCode,
          cargoBuyDesiRequestAdminDataDto: [
            {
              cargoCompany: values.cargoCompany,
              length: values.length,
              height: values.height,
              width: values.width,
              distanceUnit: values.distanceUnit,
              weight: values.weight,
              massUnit: values.massUnit,
              orderItems: order?.orderItemResponseDtos?.map((item) => ({
                productId: item?.productId,
                productQuantity: item?.quantity,
              })),
            },
          ],
        });
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: "Kargo Başarıyla Oluşturuldu",
              status: "success",
            })
          );
        }, 400);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Hata Oluştu",
            status: "error",
          })
        );
      } finally {
        setstepLoading(false);
        onClose();
        setIsSubmit((prev) => !prev);
      }
    },
  });

  return {
    formik,
    formikAnlasmali,
    formikDirekt,
    activeStep,
    steps,
    stepLoading,
    handleNext,
    handleBack,
    setActiveStep,
  };
};
