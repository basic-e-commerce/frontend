import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CategorySingleDown from "./CategorySingleDown";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import { handleApiError } from "../../../../../utils/errorHandler";
import "./CategoryForm.scss";

import {
  deleteCategory,
  deleteCoverImgCategory,
  updateCategoryImage,
  updateCategoryText,
} from "../../../../../api/apiCategory";

const CategoryForm = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const dispatch = useDispatch();
  const [showPopupCategory, setShowPopupCategory] = useState(false);
  const [initialKapakImages, setInitialKapakImages] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    active: false,
    coverImage: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        id: selectedCategory.id,
        name: selectedCategory.categoryName || "",
        description: selectedCategory.categoryDescription || "",
        active: selectedCategory.active || false,
        coverImage: selectedCategory.coverImage || "",
      });
      setInitialKapakImages(selectedCategory.coverImage);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
  };

  const handleKapakRemoveImage = () => {
    setFormData({ ...formData, coverImage: "" });
  };

  const handleSubmitDuzenleCategory = async () => {
    try {
      updateCategoryText({
        id: formData.id,
        name: formData.name,
        description: formData.description,
        active: formData.active,
      });

      if (formData.coverImage !== initialKapakImages) {
        if (formData.coverImage === null) {
          deleteCoverImgCategory(formData.id);
        } else {
          const kapakData = new FormData();
          kapakData.append("image", formData.coverImage);
          updateCategoryImage(formData.id, kapakData);
        }
      }

      dispatch(getCategories());
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
      console.log(error);
    }
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      const response = deleteCategory(formData.id);
      setFormData({
        id: "",
        name: "",
        description: "",
        parentCategoryId: "",
        active: false,
        coverImage: "",
      });
      setSelectedCategory("");
      setShowPopupCategory(false);
      dispatch(getCategories()); // Yeniden ürünleri çek
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-form">
      <label>
        Kategori Seç:
        <CategorySingleDown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </label>

      <label>
        Kategori İsmi:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={!selectedCategory}
        />
      </label>

      {selectedCategory && (
        <label>
          Açıklama:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      )}

      {selectedCategory && (
        <div className="uploader-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
            className="baslikAndButton"
          >
            <label>Kapak Fotoğrafı Yükle</label>
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
              <div className="image-container" style={{ position: "relative" }}>
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
      )}

      {selectedCategory && (
        <div className="buttonContainer">
          <button
            onClick={() => {
              setShowPopupCategory(true);
            }}
            className="sil"
          >
            Sil
          </button>
          <button onClick={handleSubmitDuzenleCategory}>Düzenle</button>
        </div>
      )}

      {showPopupCategory && (
        <div className="popup">
          <div className="popup-inner">
            <p>Silmek istediğinize emin misiniz?</p>
            <div className="popup-buttons">
              <button
                className="cancel"
                onClick={() => {
                  setShowPopupCategory(false);
                }}
              >
                İptal
              </button>
              <button className="confirm" onClick={handleConfirmDeleteCategory}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
