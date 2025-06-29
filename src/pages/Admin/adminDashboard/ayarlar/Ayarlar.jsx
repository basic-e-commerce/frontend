import "./Ayarlar.scss";
import { useState, useEffect } from "react";
import Loading from "../../../../components/Loading/Loading";
import { showAlertWithTimeout } from "../../../../redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { handleApiError } from "../../../../utils/errorHandler";
import StorefrontIcon from "@mui/icons-material/Storefront";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";

const Ayarlar = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [initialData, setInitialData] = useState(null);

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
      name: "address.country.name",
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
  ];

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

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
      title: formData.address?.title || "",
      firstName: formData.address?.firstName || "",
      lastName: formData.address?.lastName || "",
      countryName: formData.address?.country?.name || "",
      city: formData.address?.city || "",
      addressLine1: formData.address?.addressLine1 || "",
      postalCode: formData.address?.postalCode || "",
      phoneNo: formData.phoneNo || "",
      email: formData.email || "",
      minOrderAmount: Number(formData.minOrderAmount) || 0,
      shippingFee: Number(formData.shippingFee) || 0,
    };
  };

  useEffect(() => {
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

    fetchSettings();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const putData = transformToPutFormat(formData);
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

  if (!formData || isLoading) {
    return <Loading />;
  }

  return (
    <div className="ayarlar">
      <div className="container">
        <div className="ayarlarContent">
          <form onSubmit={handleSubmit}>
            <div className="settingsForm">
              <div className="leftSide">
                <div className="storeInfo">
                  <div className="storeIcon">
                    <StorefrontIcon fontSize="large" />
                  </div>
                  <h3>Mağaza Bilgileri</h3>
                  <p>Mağaza ayarlarınızı buradan güncelleyebilirsiniz</p>
                </div>
              </div>

              <div className="rightSection">
                {fields.map((field) => (
                  <div key={field.name} className="formGroup">
                    <label>
                      {field.label}:
                      <input
                        type={field.type}
                        name={field.name}
                        value={getNestedValue(formData, field.name) || ""}
                        onChange={handleChange}
                        required={field.required}
                        min={field.min}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                ))}

                <div className="buttonContainer">
                  <button
                    disabled={
                      JSON.stringify(formData) === JSON.stringify(initialData)
                    }
                    className={
                      JSON.stringify(formData) === JSON.stringify(initialData)
                        ? "disabledButton"
                        : ""
                    }
                    type="submit"
                  >
                    Ayarları Güncelle
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ayarlar;
