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
    city: "",
    phone: "",
    postalCode: "",
    addressLine1: "",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Ev",
      name: "Ömer Türkay",
      addressLine1:
        "Güvenevler mh 23 nolu sokak no:35 Sarı konak apt kat 2 daire 4",
      phone: "+905396928491",
      postalCode: "17000",
      city: "İstanbul",
    },
    {
      id: 2,
      title: "İş",
      name: "Rozerin Tanrıkulu",
      addressLine1:
        "Güvenevler mh 23 nolu sokak no:35 Sarı konak apt kat 2 daire 4",
      phone: "+905396928491",
      postalCode: "17000",
      city: "İstanbul",
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
      setTempAddress({
        title: "",
        name: "",
        addressLine1: "",

        city: "",
        phone: "",
        postalCode: "",
      });
      setModalOpen(false);
      setEditMode(false);
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
      setShowPopup(false);
      setTempAddress({
        title: "",
        name: "",
        addressLine1: "",
        city: "",
        phone: "",
        postalCode: "",
      });
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
    setTempAddress({
      title: "",
      name: "",
      city: "",
      phone: "",
      postalCode: "",
      addressLine1: "",
    });
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
              <p className="adres">{adres.addressLine1}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
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
                  required
                  type="text"
                  placeholder="Ad Soyad"
                  value={tempAddress.name}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, name: e.target.value })
                  }
                />

                <input
                  required
                  type="tel"
                  placeholder="Telefon Numarası"
                  value={tempAddress.phone}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, phone: e.target.value })
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
                  value={tempAddress.city}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, city: e.target.value })
                  }
                >
                  <option value="">Şehir Seçin</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
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
              <button onClick={() => setModalOpen(false)}>İptal</button>
              <button type="submit">{editMode ? "Kaydet" : "Oluştur"}</button>
            </div>
          </form>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <form onSubmit={handleDeleteSubmit} className="popup-inner">
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
