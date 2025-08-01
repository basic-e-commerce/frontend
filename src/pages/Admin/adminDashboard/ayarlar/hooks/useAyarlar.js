import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import { ayarlarValidation, initialValues } from "../yup/ayarlarValidation";

import {
  clearLoading,
  setLoading,
} from "../../../../../redux/slices/loadingSlice";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";

export const useAyarlar = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchAyarlar = async () => {
    dispatch(
      setLoading({
        isLoading: true,
        message: "Kupon oluşturuluyor...",
      })
    );

    try {
      const response = await api.get(`${BASE_URL}/api/v1/merchant`);
      const merchantData = response.data[0];

      const citiesData = await api.get(`${BASE_URL}/api/v1/city`);
      setCities(citiesData.data);

      const districtByCityCode = await api.get(
        `${BASE_URL}/api/v1/district/city-code?cityCode=${response.data[0].address.city.cityCode}`
      );
      setDistricts(districtByCityCode.data);

      formik.setValues({
        name: merchantData.name || "",
        firstName: merchantData.address.firstName || "",
        lastName: merchantData.address.lastName || "",
        title: merchantData.address.title || "",
        countryName: merchantData.address.country.upperName || "",
        cityCode: merchantData.address.city.cityCode || "",
        districtId: merchantData.address.district.districtId || "",
        addressLine1: merchantData.address.addressLine1 || "",
        postalCode: merchantData.address.postalCode || "",
        phoneNo: merchantData.phoneNo || "",
        email: merchantData.email || "",
        minOrderAmount: merchantData.minOrderAmount || "",
        shippingFee: merchantData.shippingFee || "",
        emailPassword: merchantData.emailPassword || "",
        instagram: merchantData.instagram || "",
        instagramLink: merchantData.instagramLink || "",
        footerDescription: merchantData.footerDescription || "",
        openCloseHours: merchantData.openCloseHours || [],
      });
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.response.data || "Mağaza Ayarları Çekilemedi",
          status: "error",
        })
      );
    } finally {
      dispatch(clearLoading());
    }
  };

  useEffect(() => {
    fetchAyarlar();
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: ayarlarValidation,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      dispatch(
        setLoading({
          isLoading: true,
          message: "Mağaza Düzenleniyor...",
        })
      );

      try {
        await api.put(`${BASE_URL}/api/v1/merchant`, values);
        dispatch(
          showAlertWithTimeout({
            message: "Mağaza Ayarları Güncellendi",
            status: "success",
          })
        );
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Mağaza Ayarları Düzenlenemedi",
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    },
  });

  return {
    isLoading,
    formik,
    cities,
    districts,
    onToggle,
    isOpen,
  };
};
