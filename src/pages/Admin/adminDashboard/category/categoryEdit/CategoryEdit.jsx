import "./CategoryEdit.scss";
import { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../config/baseApi";

const CategoryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    status: true,
    unitType: "",
    categoryId: "",
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
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("unitType", formData.unitType);
    formData.categoryId.forEach((id) =>
      formDataToSend.append("categoryId", id)
    );
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/product/model`,
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
  const handleCategoryChange = (id) => {
    setFormData((prevData) => {
      return { ...prevData, categoryId: id };
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
              }}
            >
              Kategori Durumu:
              <select
                value={formData.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value={"0"}>Ana Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <label>
              Kategori İsmi:
              <input
                type="text"
                name="productName"
                value={formData.productName}
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
              Açıklama:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>

            <div className="buttonContainer">
              <button type="submit">Kategori Ekle</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryEdit;
