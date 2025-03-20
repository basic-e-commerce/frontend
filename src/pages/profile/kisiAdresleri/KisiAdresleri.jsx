import "./KisiAdresleri.scss";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";

const KisiAdresleri = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempAddress, setTempAddress] = useState({
    title: "",
    name: "",
    address: "",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Ev",
      name: "Ömer Türkay",
      address:
        "Güvenevler mh 23 nolu sokak no:35 sarıkonak apt kat:2 daire:4 Şehitkamil/Gaziantep",
    },
    {
      id: 2,
      title: "İş",
      name: "Rozerin Türkay",
      address:
        "Çanakkale mh 23 nolu sokak no:35 sarıkonak apt kat:2 daire:4 Şehitkamil/Gaziantep",
    },
  ]);

  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get("https://api.example.com/addresses"); // API URL'ini değiştir
  //     setAddresses(response.data);
  //   } catch (error) {
  //     console.error("Adresler alınırken hata oluştu:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAddresses();
  // }, []);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `https://api.example.com/addresses/${tempAddress.id}`,
          tempAddress
        );
        console.log("Adres Güncellendi:", tempAddress);
      } else {
        await axios.post("https://api.example.com/addresses", tempAddress);
        console.log("Yeni Adres Eklendi:", tempAddress);
      }
      // fetchAddresses();
    } catch (error) {
      console.error("Adres ekleme/güncelleme hatası:", error);
    } finally {
      setShowPopup(false);
      setTempAddress({ title: "", name: "", address: "" });
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://api.example.com/addresses/${tempAddress.id}`);
      console.log("Adres Silindi:", tempAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen(false);
      setEditMode(false);
      setTempAddress({ title: "", name: "", address: "" });
    }
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((item) => item.id === id);
    setTempAddress(addressToEdit);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAddAddress = () => {
    setEditMode(false);
    setTempAddress({ title: "", name: "", address: "" });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const addressToDelete = addresses.find((item) => item.id === id);
    setTempAddress(addressToDelete);
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
            <div className="section">
              <p className="name">{adres.name}</p>
              <p className="adres">{adres.address}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleAddressSubmit} className="modal-content">
            <h3>Yeni Adres Ekle</h3>
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
              required
              type="text"
              placeholder="Ad Soyad"
              value={tempAddress.name}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, name: e.target.value })
              }
            />
            <textarea
              required
              placeholder="Adres Detayları"
              value={tempAddress.address}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, address: e.target.value })
              }
            ></textarea>
            <div className="buttons">
              <button onClick={() => setModalOpen(false)}>İptal</button>
              <button type="submit">Kaydet</button>
            </div>
          </form>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <p>Silmek istediğinize emin misiniz?</p>
            <div className="popup-buttons">
              <button
                className="cancel"
                onClick={() => {
                  setTempAddress({ title: "", name: "", address: "" });
                  setShowPopup(false);
                }}
              >
                İptal
              </button>
              <button className="confirm" onClick={handleDeleteSubmit}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KisiAdresleri;
