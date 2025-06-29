import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import { handleApiError } from "../../../../../utils/errorHandler";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";

export const useSettingsForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(null);
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

  const transformToPutFormat = (formData) => {
    return {
      name: formData.name || "",
      firstName: formData.address?.firstName || "",
      lastName: formData.address?.lastName || "",
      title: formData.address?.title || "",
      countryName: formData.address?.country?.upperName || "",
      city: formData.address?.city || "",
      addressLine1: formData.address?.addressLine1 || "",
      postalCode: formData.address?.postalCode || "",
      phoneNo: formData.phoneNo || "",
      phoneNoLink: formData.phoneNoLink || `tel:${formData.phoneNo || ""}`,
      email: formData.email || "",
      emailLink: formData.emailLink || `mailto:${formData.email || ""}`,
      minOrderAmount: Number(formData.minOrderAmount) || 0,
      shippingFee: Number(formData.shippingFee) || 0,
      emailPassword: formData.emailPassword || "",
      instagram: formData.instagram || "",
      instagramLink: formData.instagramLink || "",
      wpLink: formData.wpLink || "",
      footerDescription: formData.footerDescription || "",
      openCloseHours: formData.openCloseHours || [],
    };
  };

  const defaultHour = "09:00";
  const defaultEndHour = "18:00";

  const getWorkingHourValue = (dayKey, field) => {
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
    setFormData((prev) => {
      const updatedData = { ...prev };
      const hours = [...(updatedData.openCloseHours || [])];
      const index = hours.findIndex((item) => item.day === dayKey);

      if (index >= 0) {
        hours[index] = { ...hours[index], [field]: value };
      } else {
        hours.push({
          day: dayKey,
          hour: field === "hour" ? value : defaultHour,
          endHour: field === "endHour" ? value : defaultEndHour,
        });
      }

      updatedData.openCloseHours = hours;
      return updatedData;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      setFormData((prev) => {
        const newData = { ...prev };
        setNestedValue(newData, name, value);
        return newData;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const putData = transformToPutFormat(formData);

    try {
      console.log(putData);
      await api.put(`${BASE_URL}/api/v1/merchant?id=${formData.id}`, putData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInitialData(formData);

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
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await api.get(`${BASE_URL}/api/v1/merchant`);
      setFormData(response.data[0]);
      setInitialData(response.data[0]);
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.response.data,
          status: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [dispatch]);

  return {
    isLoading,
    formData,
    isWorkingHoursOpen,
    setIsWorkingHoursOpen,
    initialData,
    days,
    fields,
    handleChange,
    handleSubmit,
    handleWorkingHoursChange,
    getWorkingHourValue,
  };
};
