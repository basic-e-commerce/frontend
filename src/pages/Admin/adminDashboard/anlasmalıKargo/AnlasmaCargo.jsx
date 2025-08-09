import "./AnlasmaCargo.scss";
import { useState, useEffect } from "react";
import {
  useAddressesKargo,
  useLocationDataKargo,
  useModalStateKargo,
} from "./hooks";
import {
  AddressCardAnlasma,
  AddAddressButtonAnlasma,
  AddressFormAnlasma,
} from "./components";

import { useDispatch, useSelector } from "react-redux";
import AnlasmaCargoSkleton from "./AnlasmaCargoSkleton";
import { showAlertWithTimeout } from "../../../../redux/slices/alertSlice";
import FavoriteConfirmationPopupAnlasma from "./components/FavoriteConfirmationPopupAnlasma";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
const AnlasmaCargo = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [tempAddress, setTempAddress] = useState({
    username: "",
    password: "",
    cargoCompany: "",
    parameters: {},
    isActive: "",
    isPublic: "",
    sharable: "",
    isDynamicPrice: "",
  });

  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { addresses, addAddress, fetchAddresses } = useAddressesKargo();
  const { citys, districts, fetchDistrict } = useLocationDataKargo();
  const {
    modalOpen,
    selectedId,
    openAddModal,
    closeModal,
    showFavoritePopup,
    openFavoritePopup,
    closeFavoritePopup,
  } = useModalStateKargo();

  useEffect(() => {
    if (tempAddress.cityCode) {
      fetchDistrict(tempAddress.cityCode);
    }
  }, [tempAddress.cityCode]);

  const handleAddressSubmit = async (values, formikBag) => {
    const { setSubmitting } = formikBag;
    try {
      await addAddress(values);
      dispatch(
        showAlertWithTimeout({
          message: "Adres başarıyla kaydedildi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: "Hata oluştu",
          status: "error",
        })
      );
    } finally {
      setSubmitting(false);
      fetchAddresses();
      closeModal();
      setTempAddress({
        username: "",
        password: "",
        cargoCompany: "",
        parameters: {},
        isActive: "",
        isPublic: "",
        sharable: "",
        isDynamicPrice: "",
      });
    }
  };

  const handleFavoriteSubmit = async (e) => {
    e.preventDefault();
    setFavoriteLoading(true);
    try {
      await api.put(
        `${BASE_URL}/api/v1/merchant/select-default-custom-cargo-contract?customContractId=${selectedId}`
      );
      dispatch(
        showAlertWithTimeout({
          message: "Kargo Varsayılan olarak seçildi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message:
            error.response?.data ||
            error.response?.data.message ||
            error.message,
          status: "error",
        })
      );
    } finally {
      closeFavoritePopup();
      setFavoriteLoading(false);
      fetchAddresses();
    }
  };

  const handleAddAddress = () => {
    setTempAddress({
      username: "",
      password: "",
      cargoCompany: "",
      parameters: {},
      isActive: "",
      isPublic: "",
      sharable: "",
      isDynamicPrice: "",
    });
    openAddModal();
  };

  const handleCityChange = (cityCode) => {
    fetchDistrict(cityCode);
  };

  const handleCancelModal = () => {
    closeModal();
    setTempAddress({
      username: "",
      password: "",
      cargoCompany: "",
      parameters: {},
      isActive: "",
      isPublic: "",
      sharable: "",
      isDynamicPrice: "",
    });
  };

  const handleFavorite = (id) => {
    openFavoritePopup(id);
  };

  if (isLoading) {
    return <AnlasmaCargoSkleton />;
  }
  return (
    <div className="kisiAdresleri">
      <div className="papers">
        <AddAddressButtonAnlasma onClick={handleAddAddress} />

        {addresses.map((adres) => (
          <AddressCardAnlasma
            key={adres.id}
            adres={adres}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      {modalOpen && (
        <AddressFormAnlasma
          initialValues={tempAddress}
          onSubmit={handleAddressSubmit}
          onCancel={handleCancelModal}
          citys={citys}
          districts={districts}
          onCityChange={handleCityChange}
        />
      )}

      {showFavoritePopup && (
        <FavoriteConfirmationPopupAnlasma
          onConfirm={handleFavoriteSubmit}
          onCancel={closeFavoritePopup}
          favoriteLoading={favoriteLoading}
        />
      )}
    </div>
  );
};

export default AnlasmaCargo;
