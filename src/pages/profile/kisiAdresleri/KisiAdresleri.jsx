import "./KisiAdresleri.scss";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  addAdress,
  deleteAdress,
  getAdress,
  getCity,
  getDistrict,
  updateAdress,
} from "../../../api/apiAdress";

const KisiAdresleri = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [editMode, setEditMode] = useState(false);
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
  const [selectedId, setSelectedId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  console.log(selectedId);

  const fetchAddresses = async () => {
    try {
      const response = await getAdress();
      setAddresses(response);
    } catch (error) {
      console.error("Adresler alınırken hata oluştu:", error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await getCity();
      setCitys(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiscrict = async (cityCode) => {
    try {
      const response = await getDistrict(cityCode);
      setDistricts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchCity();
  }, []);

  useEffect(() => {
    if (tempAddress.cityCode) {
      fetchDiscrict(tempAddress.cityCode);
    }
  }, [tempAddress.cityCode]);

  useEffect(() => {
    if (modalOpen || showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen, showPopup]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateAdress(tempAddress, selectedId);
      } else {
        await addAdress(tempAddress);
      }
      fetchAddresses();
    } catch (error) {
      console.error("Adres ekleme/güncelleme hatası:", error);
    } finally {
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
      setModalOpen(false);
      setEditMode(false);
      setSelectedId(null);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteAdress(selectedId);
      fetchAddresses();
    } catch (error) {
      console.log(error);
    } finally {
      setShowPopup(false);
      setSelectedId(null);
    }
  };

  const handleEditAddress = (id) => {
    setSelectedId(id);
    const addressToEdit = addresses.find((item) => item.id === id);

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
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAddAddress = () => {
    setEditMode(false);
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
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  return (
    <div className="kisiAdresleri">
      <div className="title">
        <h3>Adreslerim</h3>
      </div>

      <hr />

      <div className="papers">
        <div className="add paper">
          <button onClick={handleAddAddress}>
            <AddIcon />
            <strong>Adres Ekle</strong>
          </button>
        </div>

        {addresses.map((adres) => (
          <div key={adres.id} className="kayitliAdres paper">
            <div className="top">
              <h4 className="adressTitle">{adres.title}</h4>
              <div className="icons">
                <button onClick={() => handleEditAddress(adres.id)}>
                  <ModeEditIcon className="icon" />
                </button>
                <button onClick={() => handleDeleteClick(adres.id)}>
                  <DeleteIcon className="icon" />
                </button>
              </div>
            </div>
            <div className="phone">
              <p className="name">{adres.phoneNo}</p>
            </div>
            <div className="section">
              <p className="name">{adres.name}</p>
              <p className="adres">
                {adres.addressLine1} {adres.postalCode} <br />
                {`${adres.countryName} / ${adres.city}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modall">
          <form onSubmit={handleAddressSubmit} className="modal-content">
            <h3>{editMode ? "Adresi Duzenle" : "Yeni Adres Ekle"}</h3>
            <div className="modelContentSection">
              <div className="left">
                <input
                  type="text"
                  placeholder="Adres Başlığı (Ev, İş vb.)"
                  required
                  value={tempAddress.title}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="İsim"
                  required
                  value={tempAddress.firstName}
                  onChange={(e) =>
                    setTempAddress({
                      ...tempAddress,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Soyad"
                  required
                  value={tempAddress.lastName}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, lastName: e.target.value })
                  }
                />

                <input
                  required
                  type="tel"
                  placeholder="Telefon Numarası"
                  value={tempAddress.phoneNo}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, phoneNo: e.target.value })
                  }
                />

                <input
                  required
                  type="email"
                  placeholder="Mail"
                  value={tempAddress.username}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, username: e.target.value })
                  }
                />
              </div>

              <div className="right">
                <textarea
                  required
                  name="addressLine1"
                  placeholder="Adres Satırı 1"
                  value={tempAddress.addressLine1}
                  onChange={(e) =>
                    setTempAddress({
                      ...tempAddress,
                      addressLine1: e.target.value,
                    })
                  }
                ></textarea>

                <select
                  required
                  onChange={(e) => {
                    setTempAddress({
                      ...tempAddress,
                      cityCode: e.target.value,
                    });
                  }}
                  value={tempAddress.cityCode}
                >
                  <option value="">Şehir Seçin</option>
                  {citys?.map((item, index) => (
                    <option key={index} value={item.cityCode}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <select
                  required
                  onChange={(e) => {
                    setTempAddress({
                      ...tempAddress,
                      districtId: e.target.value,
                    });
                  }}
                  value={tempAddress.districtId}
                >
                  <option value="">İlçe Seçin</option>
                  {districts?.map((item, index) => (
                    <option key={index} value={item.districtID}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <input
                  required
                  type="text"
                  placeholder="Posta Kodu"
                  value={tempAddress.postalCode}
                  onChange={(e) =>
                    setTempAddress({
                      ...tempAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="buttons">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedId(null);
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
                }}
              >
                İptal
              </button>
              <button type="submit">{editMode ? "Kaydet" : "Oluştur"}</button>
            </div>
          </form>
        </div>
      )}

      {showPopup && (
        <div className="popupAdresler">
          <form onSubmit={handleDeleteSubmit} className="popupAdresler-inner">
            <p>Silmek istediğinize emin misiniz?</p>
            <div className="popupAdresler-buttons">
              <button
                className="cancel"
                onClick={() => {
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
                  setSelectedId(null);
                  setShowPopup(false);
                }}
              >
                İptal
              </button>
              <button type="submit" className="confirm">
                Sil
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default KisiAdresleri;
