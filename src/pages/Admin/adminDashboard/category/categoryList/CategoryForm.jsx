import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySingleDown from "./CategorySingleDown";
import {
  updateCategory,
  removeCategory,
} from "../../../../../redux/slices/categorySlice";
import { handleApiError } from "../../../../../utils/errorHandler";
import "./CategoryForm.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state) => state.categories
  );

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
        coverImage: selectedCategory.coverImage.url || "",
      });
      setInitialKapakImages(selectedCategory.coverImage?.url || "");
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
  };

  const handleSubmitDuzenleCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCategory({ formData, initialKapakImages })).unwrap();
      dispatch(
        showAlertWithTimeout({
          message: "Kategori başarıyla güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: handleApiError(error),
          status: "error",
        })
      );
    }
  };

  const handleConfirmDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeCategory(formData.id)).unwrap();
      setShowPopupCategory(false);
      dispatch(
        showAlertWithTimeout({
          message: "Kategori başarıyla silindi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: handleApiError(error),
          status: "error",
        })
      );
    }
  };

  const renderedImage = useMemo(() => {
    if (typeof formData.coverImage === "string") return formData.coverImage;
    if (formData.coverImage instanceof File)
      return URL.createObjectURL(formData.coverImage);
    return null;
  }, [formData.coverImage]);

  console.log("1." + selectedCategory?.active);
  console.log("2." + formData.active);

  return (
    <form onSubmit={handleSubmitDuzenleCategory} className="category-form">
      <label className="secilenBolum">
        Kategori Seç:
        <CategorySingleDown
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </label>

      {selectedCategory && (
        <div className="categoryEdit">
          <div className="leftSide">
            <div className="avatar">
              <input
                type="file"
                accept="image/*"
                id="kapakFoto"
                onChange={handleKapakImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="kapakFoto" className="kapsayiciButton">
                {renderedImage ? (
                  <img
                    className="kapakImgg"
                    src={renderedImage}
                    alt="Kategori Kapak"
                  />
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Kategori Resmi Ekle
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="rightSection">
            <label>
              Kategori İsmi:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
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
              <button
                type="button"
                onClick={() => {
                  setShowPopupCategory(true);
                }}
                className="delete"
              >
                Sil
              </button>

              <button
                disabled={
                  !(
                    selectedCategory.categoryName !== formData.name ||
                    selectedCategory.categoryDescription !==
                      formData.description ||
                    formData.coverImage instanceof File
                  )
                }
                className={
                  !(
                    selectedCategory.categoryName !== formData.name ||
                    selectedCategory.categoryDescription !==
                      formData.description ||
                    formData.coverImage instanceof File
                  )
                    ? "disabled"
                    : ""
                }
                type="submit"
              >
                Kategori Düzenle
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopupCategory && (
        <div className="popup">
          <div className="popup-inner">
            <p>Silmek istediğinize emin misiniz?</p>
            <div className="popup-buttons">
              <button
                className="cancel"
                type="button"
                onClick={() => {
                  setShowPopupCategory(false);
                }}
              >
                İptal
              </button>
              <button
                type="button"
                className="confirm"
                onClick={handleConfirmDeleteCategory}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
