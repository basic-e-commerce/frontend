import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import {
  setLoading,
  clearLoading,
} from "../../../../../redux/slices/loadingSlice";
import { handleApiError } from "../../../../../utils/errorHandler";
import {
  settingsValidationSchema,
  sanitizeInput,
  validateWorkingHours,
} from "../yup/settingsValidation";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";

export const useSettingsForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [initialData, setInitialData] = useState(null);
  const [isWorkingHoursOpen, setIsWorkingHoursOpen] = useState(false);

  const days = [
    { key: "pazartesi", label: "Pazartesi" },
    { key: "sali", label: "Salı" },
    { key: "çarşamba", label: "Çarşamba" },
    { key: "perşembe", label: "Perşembe" },
    { key: "cuma", label: "Cuma" },
    { key: "cumartesi", label: "Cumartesi" },
    { key: "pazar", label: "Pazar" },
  ];

  const fields = [
    { name: "name", label: "Mağaza Adı", type: "text", required: true },
    {
      name: "address.title",
      label: "Adres Başlığı",
      type: "text",
      required: true,
    },
    { name: "address.firstName", label: "Ad", type: "text", required: true },
    { name: "address.lastName", label: "Soyad", type: "text", required: true },
    {
      name: "address.country.upperName",
      label: "Ülke",
      type: "text",
      required: true,
    },
    { name: "address.city", label: "Şehir", type: "text", required: true },
    {
      name: "address.addressLine1",
      label: "Adres",
      type: "text",
      required: true,
    },
    {
      name: "address.postalCode",
      label: "Posta Kodu",
      type: "text",
      required: true,
    },
    {
      name: "address.phoneNo",
      label: "Adres Telefonu",
      type: "tel",
      required: true,
    },
    { name: "phoneNo", label: "Mağaza Telefonu", type: "tel", required: true },
    { name: "email", label: "E-posta", type: "email", required: true },
    {
      name: "minOrderAmount",
      label: "Minimum Sipariş Tutarı (TL)",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "shippingFee",
      label: "Kargo Ücreti (TL)",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "emailPassword",
      label: "E-posta Şifresi",
      type: "text",
      required: false,
    },
    { name: "instagram", label: "Instagram", type: "text", required: false },
    {
      name: "instagramLink",
      label: "Instagram Linki",
      type: "text",
      required: false,
    },
    { name: "wpLink", label: "WhatsApp Linki", type: "text", required: false },
    {
      name: "footerDescription",
      label: "Footer Açıklaması",
      type: "textarea",
      required: false,
    },
  ];

  const setNestedValue = (obj, path, value) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  const transformToPutFormat = (formData) => {
    return {
      name: sanitizeInput(formData.name || ""),
      firstName: sanitizeInput(formData.address?.firstName || ""),
      lastName: sanitizeInput(formData.address?.lastName || ""),
      title: sanitizeInput(formData.address?.title || ""),
      countryName: sanitizeInput(formData.address?.country?.upperName || ""),
      city: sanitizeInput(formData.address?.city || ""),
      addressLine1: sanitizeInput(formData.address?.addressLine1 || ""),
      postalCode: sanitizeInput(formData.address?.postalCode || ""),
      phoneNo: sanitizeInput(formData.phoneNo || ""),
      phoneNoLink: sanitizeInput(
        formData.phoneNoLink || `tel:${formData.phoneNo || ""}`
      ),
      email: sanitizeInput(formData.email || ""),
      emailLink: sanitizeInput(
        formData.emailLink || `mailto:${formData.email || ""}`
      ),
      minOrderAmount: Number(formData.minOrderAmount) || 0,
      shippingFee: Number(formData.shippingFee) || 0,
      emailPassword: sanitizeInput(formData.emailPassword || ""),
      instagram: sanitizeInput(formData.instagram || ""),
      instagramLink: sanitizeInput(formData.instagramLink || ""),
      wpLink: sanitizeInput(formData.wpLink || ""),
      footerDescription: sanitizeInput(formData.footerDescription || ""),
      openCloseHours: formData.openCloseHours || [],
    };
  };

  const defaultHour = "09:00";
  const defaultEndHour = "18:00";

  const getWorkingHourValue = (dayKey, field) => {
    const formData = formik.values;
    if (!formData.openCloseHours)
      return field === "hour" ? defaultHour : defaultEndHour;
    const dayData = formData.openCloseHours.find((item) => item.day === dayKey);
    return dayData
      ? dayData[field]
      : field === "hour"
      ? defaultHour
      : defaultEndHour;
  };

  const handleWorkingHoursChange = (dayKey, field, value) => {
    const currentHours = [...(formik.values.openCloseHours || [])];
    const index = currentHours.findIndex((item) => item.day === dayKey);

    if (index >= 0) {
      currentHours[index] = { ...currentHours[index], [field]: value };
    } else {
      currentHours.push({
        day: dayKey,
        hour: field === "hour" ? value : defaultHour,
        endHour: field === "endHour" ? value : defaultEndHour,
      });
    }

    formik.setFieldValue("openCloseHours", currentHours);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: {
        title: "",
        firstName: "",
        lastName: "",
        country: { upperName: "" },
        city: "",
        addressLine1: "",
        postalCode: "",
        phoneNo: "",
      },
      phoneNo: "",
      email: "",
      minOrderAmount: 0,
      shippingFee: 0,
      emailPassword: "",
      instagram: "",
      instagramLink: "",
      wpLink: "",
      footerDescription: "",
      openCloseHours: [],
    },
    validationSchema: settingsValidationSchema,
    validate: (values) => {
      const errors = {};

      // Çalışma saatleri validasyonu
      if (!validateWorkingHours(values.openCloseHours)) {
        errors.openCloseHours = "Çalışma saatleri geçersiz";
      }

      return errors;
    },
    onSubmit: async (values) => {
      dispatch(
        setLoading({ isLoading: true, message: "Ayarlar güncelleniyor..." })
      );
      const putData = transformToPutFormat(values);

      try {
        console.log(putData);
        await api.put(`${BASE_URL}/api/v1/merchant?id=${values.id}`, putData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setInitialData(values);

        dispatch(
          showAlertWithTimeout({
            message: "Mağaza ayarları başarıyla güncellendi",
            status: "success",
          })
        );
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: handleApiError(error),
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    if (name.includes(".")) {
      const newValues = { ...formik.values };
      setNestedValue(newValues, name, sanitizedValue);
      formik.setValues(newValues);
    } else {
      formik.setFieldValue(name, sanitizedValue);
    }
  };

  const fetchSettings = async () => {
    dispatch(setLoading({ isLoading: true, message: "Ayarlar yükleniyor..." }));

    try {
      const response = await api.get(`${BASE_URL}/api/v1/merchant`);
      const data = response.data[0];

      // Veriyi sanitize et
      const sanitizedData = {
        ...data,
        name: sanitizeInput(data.name),
        address: {
          ...data.address,
          title: sanitizeInput(data.address?.title),
          firstName: sanitizeInput(data.address?.firstName),
          lastName: sanitizeInput(data.address?.lastName),
          country: {
            ...data.address?.country,
            upperName: sanitizeInput(data.address?.country?.upperName),
          },
          city: sanitizeInput(data.address?.city),
          addressLine1: sanitizeInput(data.address?.addressLine1),
          postalCode: sanitizeInput(data.address?.postalCode),
          phoneNo: sanitizeInput(data.address?.phoneNo),
        },
        phoneNo: sanitizeInput(data.phoneNo),
        email: sanitizeInput(data.email),
        emailPassword: sanitizeInput(data.emailPassword),
        instagram: sanitizeInput(data.instagram),
        instagramLink: sanitizeInput(data.instagramLink),
        wpLink: sanitizeInput(data.wpLink),
        footerDescription: sanitizeInput(data.footerDescription),
      };

      formik.setValues(sanitizedData);
      setInitialData(sanitizedData);
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.response?.data || "Ayarlar yüklenirken hata oluştu",
          status: "error",
        })
      );
    } finally {
      dispatch(clearLoading());
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [dispatch]);

  return {
    isLoading,
    formData: formik.values,
    isWorkingHoursOpen,
    setIsWorkingHoursOpen,
    initialData,
    days,
    fields,
    handleChange,
    handleSubmit: formik.handleSubmit,
    handleWorkingHoursChange,
    getWorkingHourValue,
    errors: formik.errors,
    touched: formik.touched,
    getNestedValue,
  };
};
