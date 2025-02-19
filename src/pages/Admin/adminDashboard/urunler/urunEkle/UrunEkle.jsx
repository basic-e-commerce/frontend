import "./UrunEkle.scss";
import { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UrunEkle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    price: "",
    discountPrice: "",
    status: true,
    unitType: "",
    categoryId: [],
    images: [],
    coverImage: "",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discountPrice", formData.discountPrice);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("unitType", formData.unitType);
    formData.categoryId.forEach((id) =>
      formDataToSend.append("categoryId", id)
    );
    formData.images.forEach((image) => formDataToSend.append("images", image));
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/product/model",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      setTimeout(() => {
        navigate("/admin");
        setIsloading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // Form Degisiklik
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (["quantity", "price", "discountPrice"].includes(name)) {
      newValue = value === "" ? "" : parseInt(value) || 0; // Boşsa boş bırak, yoksa sayıya çevir
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  // Kategori Change
  const handleCategoryChange = (e) => {
    const value = Number(e.target.value); // String olarak gelen değeri sayıya çevir
    const checked = e.target.checked;

    setFormData((prevData) => {
      const updatedCategories = checked
        ? [...prevData.categoryId, value]
        : prevData.categoryId.filter((id) => id !== value);

      return { ...prevData, categoryId: updatedCategories };
    });
  };

  // Resim Yükleme
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Resim Silme
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Kapak Fotografı yükleme
  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
  };

  // Kapak Fotografı silme
  const handleKapakRemoveImage = () => {
    setFormData({ ...formData, coverImage: "" });
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="projeEkle">
          <form onSubmit={handleSubmit}>
            <div className="uploader-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
                className="baslikAndButton"
              >
                <h4>Proje Resimleri Yükle</h4>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="upload-input"
                  id="file-input"
                />

                <div>
                  <label
                    htmlFor="file-input"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      padding: "10px",
                      backgroundColor: "rgb(31, 75, 28)",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {formData.images.length > 0
                      ? `Resim Ekle: ${formData.images.length}`
                      : "Resimleri Seç"}
                  </label>
                </div>
              </div>

              <div className="images-preview-container">
                {formData.images.map((image, index) => {
                  return (
                    <div key={index} className="image-container">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded Preview ${index}`}
                      />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="uploader-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
                className="baslikAndButton"
              >
                <h4>Kapak Fotoğrafı Yükle</h4>
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  id="kapakFoto"
                  onChange={handleKapakImageChange}
                  style={{ display: "none" }}
                />

                <div>
                  <label
                    htmlFor="kapakFoto"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      padding: "10px",
                      backgroundColor: "rgb(31, 75, 28)",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {formData.coverImage ? "Resiim Değiştir" : "Resim Seç"}
                  </label>
                </div>
              </div>

              {formData.coverImage && (
                <div className="images-preview-container">
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(formData.coverImage)}
                      alt="Kapak"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <button
                      className="remove-button"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={handleKapakRemoveImage}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              Ürün Kategorisi:
              <div>
                {categories.map((category) => (
                  <label key={category.id}>
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={formData.categoryId.includes(category.id)} // category.id bir sayı olmalı
                      onChange={handleCategoryChange}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            <label>
              Ürün İsmi:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Stok:
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Fiyat:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              İndirimli Fiyat:
              <input
                type="text"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Aktiflik
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value={true}>Aktif</option>
                <option value={false}>Pasif</option>
              </select>
            </label>

            <label>
              Birim
              <select
                name="unitType"
                value={formData.unitType}
                onChange={handleChange}
                required
              >
                <option value={""}>Seçiniz</option>
                <option value={"kg"}>Kg</option>
                <option value={"item"}>Adet</option>
              </select>
            </label>

            <label>
              Açıklama:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>

            <div className="buttonContainer">
              <button type="submit">Ürün Ekle</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UrunEkle;
