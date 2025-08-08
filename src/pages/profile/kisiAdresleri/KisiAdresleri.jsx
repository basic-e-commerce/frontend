import "./KisiAdresleri.scss";
import { useState, useEffect } from "react";
import { useAddresses, useLocationData, useModalState } from "./hooks";
import {
  AddressCard,
  AddAddressButton,
  AddressForm,
  DeleteConfirmationPopup,
} from "./components";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { useDispatch, useSelector } from "react-redux";
import KisiAdresleriSkeleton from "./KisiAdresleriSkeleton";

const KisiAdresleri = () => {
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
  const { addresses, addAddress, updateAddress, deleteAddress } =
    useAddresses();
  const { citys, districts, fetchDistrict } = useLocationData();
  const {
    modalOpen,
    showPopup,
    editMode,
    selectedId,
    openAddModal,
    openEditModal,
    closeModal,
    openDeletePopup,
    closePopup,
  } = useModalState();

  useEffect(() => {
    if (tempAddress.cityCode) {
      fetchDistrict(tempAddress.cityCode);
    }
  }, [tempAddress.cityCode]);

  const handleAddressSubmit = async (values, { setSubmitting }) => {
    try {
      if (editMode) {
        await updateAddress(values, selectedId);
      } else {
        await addAddress(values);
      }
      dispatch(
        showAlertWithTimeoutKullanici({
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
        showAlertWithTimeoutKullanici({
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
        showAlertWithTimeoutKullanici({
          message: "Adres başarıyla silindi",
          status: "success",
        })
      );
      closePopup();
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message:
            error.response?.data ||
            error.response?.data.message ||
            error.message,
          status: "error",
        })
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((item) => item.id === id);
    if (addressToEdit) {
      const newAdres = {
        title: addressToEdit.title,
        firstName: addressToEdit.firstName,
        lastName: addressToEdit.lastName,
        countryName: addressToEdit.countryName,
        cityCode: addressToEdit.cityCode,
        districtId: addressToEdit.districtId,
        addressLine1: addressToEdit.addressLine1,
        postalCode: addressToEdit.postalCode,
        phoneNo: addressToEdit.phoneNo,
        username: addressToEdit.username,
      };
      setTempAddress(newAdres);
      openEditModal(id);
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

  if (isLoading) {
    return <KisiAdresleriSkeleton />;
  }

  return (
    <div className="kisiAdresleri">
      <div className="title">
        <h3>Adreslerim</h3>
      </div>

      <hr />

      <div className="papers">
        <AddAddressButton onClick={handleAddAddress} />

        {addresses.map((adres) => (
          <AddressCard
            key={adres.id}
            adres={adres}
            onEdit={handleEditAddress}
            onDelete={openDeletePopup}
          />
        ))}
      </div>

      {modalOpen && (
        <AddressForm
          editMode={editMode}
          initialValues={tempAddress}
          onSubmit={handleAddressSubmit}
          onCancel={handleCancelModal}
          citys={citys}
          districts={districts}
          onCityChange={handleCityChange}
        />
      )}

      {showPopup && (
        <DeleteConfirmationPopup
          onConfirm={handleDeleteSubmit}
          onCancel={closePopup}
          deleteLoading={deleteLoading}
          setDeleteLoading={setDeleteLoading}
        />
      )}
    </div>
  );
};

export default KisiAdresleri;
