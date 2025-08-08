import "./KargoAdres.scss";
import { useState, useEffect } from "react";
import {
  useAddressesKargo,
  useLocationDataKargo,
  useModalStateKargo,
} from "./hooks";
import {
  AddressCardKargo,
  AddAddressButtonKargo,
  AddressFormKargo,
  DeleteConfirmationPopupKargo,
} from "./components";

import { useDispatch, useSelector } from "react-redux";
import KargoAdresSkeleton from "./KargoAdresSkeleton";
import { showAlertWithTimeout } from "../../../../redux/slices/alertSlice";
import FavoriteConfirmationPopupKargo from "./components/FavoriteConfirmationPopupKargo";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
const KargoAdres = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [tempAddress, setTempAddress] = useState({
    title: "",
    firstName: "",
    lastName: "",
    username: "",
    countryName: "TURKIYE",
    districtId: "",
    cityCode: "",
    addressLine1: "",
    postalCode: "",
    phoneNo: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { addresses, addAddress, deleteAddress } = useAddressesKargo();
  const { citys, districts, fetchDistrict } = useLocationDataKargo();
  const {
    modalOpen,
    showPopup,
    selectedId,
    openAddModal,
    closeModal,
    openDeletePopup,
    closePopup,
    showFavoritePopup,
    openFavoritePopup,
    closeFavoritePopup,
  } = useModalStateKargo();

  useEffect(() => {
    if (tempAddress.cityCode) {
      fetchDistrict(tempAddress.cityCode);
    }
  }, [tempAddress.cityCode]);

  const handleAddressSubmit = async (values, { setSubmitting }) => {
    try {
      await addAddress(values);
      dispatch(
        showAlertWithTimeout({
          message: "Adres başarıyla kaydedildi",
          status: "success",
        })
      );
      closeModal();
      setTempAddress({
        title: "",
        firstName: "",
        lastName: "",
        username: "",
        countryName: "TURKIYE",
        districtId: "",
        cityCode: "",
        addressLine1: "",
        postalCode: "",
        phoneNo: "",
      });
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
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      await deleteAddress(selectedId);
      dispatch(
        showAlertWithTimeout({
          message: "Adres başarıyla silindi",
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
      closePopup();
      setDeleteLoading(false);
    }
  };

  const handleFavoriteSubmit = async (e) => {
    e.preventDefault();
    setFavoriteLoading(true);
    try {
      await api.put(
        `${BASE_URL}/api/v1/merchant/select-default-address?addressId=${selectedId}`
      );
      dispatch(
        showAlertWithTimeout({
          message: "Adres Varsayılan olarak seçildi",
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
    }
  };

  const handleAddAddress = () => {
    setTempAddress({
      title: "",
      firstName: "",
      lastName: "",
      username: "",
      countryName: "TURKIYE",
      districtId: "",
      cityCode: "",
      addressLine1: "",
      postalCode: "",
      phoneNo: "",
    });
    openAddModal();
  };

  const handleCityChange = (cityCode) => {
    fetchDistrict(cityCode);
  };

  const handleCancelModal = () => {
    closeModal();
    setTempAddress({
      title: "",
      firstName: "",
      lastName: "",
      username: "",
      countryName: "TURKIYE",
      districtId: "",
      cityCode: "",
      addressLine1: "",
      postalCode: "",
      phoneNo: "",
    });
  };

  const handleFavorite = (id) => {
    openFavoritePopup(id);
  };

  if (isLoading) {
    return <KargoAdresSkeleton />;
  }
  return (
    <div className="kisiAdresleri">
      <div className="papers">
        <AddAddressButtonKargo onClick={handleAddAddress} />

        {addresses.map((adres) => (
          <AddressCardKargo
            key={adres.id}
            adres={adres}
            onDelete={openDeletePopup}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      {modalOpen && (
        <AddressFormKargo
          initialValues={tempAddress}
          onSubmit={handleAddressSubmit}
          onCancel={handleCancelModal}
          citys={citys}
          districts={districts}
          onCityChange={handleCityChange}
        />
      )}

      {showPopup && (
        <DeleteConfirmationPopupKargo
          onConfirm={handleDeleteSubmit}
          onCancel={closePopup}
          deleteLoading={deleteLoading}
          setDeleteLoading={setDeleteLoading}
        />
      )}

      {showFavoritePopup && (
        <FavoriteConfirmationPopupKargo
          onConfirm={handleFavoriteSubmit}
          onCancel={closeFavoritePopup}
          favoriteLoading={favoriteLoading}
        />
      )}
    </div>
  );
};

export default KargoAdres;
