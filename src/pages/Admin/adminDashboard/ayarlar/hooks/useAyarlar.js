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
  const [initialValuesMe, setInitialValuesMe] = useState({});

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchAyarlar = async () => {
    dispatch(
      setLoading({
        isLoading: true,
        message: "Ayarlar yükleniyor...",
      })
    );

    try {
      const response = await api.get(`${BASE_URL}/api/v1/merchant`);
      const merchantData = response.data[0];

      const response2 = await api.get(
        `${BASE_URL}/api/v1/merchant/public-detail`
      );
      const publicData = response2.data;

      const citiesData = await api.get(`${BASE_URL}/api/v1/city`);
      setCities(citiesData.data);

      const districtByCityCode = await api.get(
        `${BASE_URL}/api/v1/district/city-code?cityCode=${response.data[0].cityCode}`
      );
      setDistricts(districtByCityCode.data);

      formik.setValues({
        name: merchantData?.name || "",
        firstName: publicData?.firstName || "",
        lastName: publicData?.lastName || "",
        title: publicData?.title || "",
        countryName: merchantData?.countryName || "",
        cityCode: merchantData?.cityCode || "",
        districtId: merchantData?.districtId || "",
        addressLine1: merchantData?.addressLine1 || "",
        postalCode: merchantData?.postalCode || "",
        phoneNo: merchantData?.phoneNo || "",
        email: merchantData?.email || "",
        minOrderAmount: merchantData?.minOrderAmount || "",
        shippingFee: merchantData?.shippingFee || "",
        emailPassword: merchantData?.emailPassword || "",
        instagram: merchantData?.instagram || "",
        instagramLink: merchantData?.instagramLink || "",
        footerDescription: merchantData.footerDescription || "",
        openCloseHours: merchantData.openCloseHours || [],
      });

      setInitialValuesMe({
        name: merchantData?.name || "",
        firstName: publicData?.firstName || "",
        lastName: publicData?.lastName || "",
        title: publicData?.title || "",
        countryName: merchantData?.countryName || "",
        cityCode: merchantData?.cityCode || "",
        districtId: merchantData?.districtId || "",
        addressLine1: merchantData?.addressLine1 || "",
        postalCode: merchantData?.postalCode || "",
        phoneNo: merchantData?.phoneNo || "",
        email: merchantData?.email || "",
        minOrderAmount: merchantData?.minOrderAmount || "",
        shippingFee: merchantData?.shippingFee || "",
        emailPassword: merchantData?.emailPassword || "",
        instagram: merchantData?.instagram || "",
        instagramLink: merchantData?.instagramLink || "",
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
        fetchAyarlar();
      }
    },
  });

  useEffect(() => {
    if (formik.values.cityCode) {
      const fetchDistricts = async () => {
        try {
          const districtByCityCode = await api.get(
            `${BASE_URL}/api/v1/district/city-code?cityCode=${formik.values.cityCode}`
          );
          setDistricts(districtByCityCode.data);
        } catch (error) {
          dispatch(
            showAlertWithTimeout({
              message: error.response?.data || "İlçeler yüklenemedi",
              status: "error",
            })
          );
        }
      };

      fetchDistricts();
    }
  }, [formik.values.cityCode, dispatch]);

  return {
    isLoading,
    formik,
    cities,
    districts,
    onToggle,
    isOpen,
    initialValuesMe,
  };
};
