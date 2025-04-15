import "./CategoryCreate.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../../components/Loading/Loading";
import { createCategory } from "../../../../../api/apiCategory";

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgKapak, setImgKapak] = useState(null);
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategoryId: "0",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("parentCategoryId", formData.parentCategoryId);
    formDataToSend.append("image", imgKapak);

    try {
      console.log(formDataToSend);
      createCategory(formDataToSend);
      setTimeout(() => {
        navigate("/admins");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="projeEkle">
          <form onSubmit={handleSubmit}>
            <label>
              Kategori İsmi:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

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
                      backgroundColor: "#315345",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {imgKapak ? "Resiim Değiştir" : "Resim Seç"}
                  </label>
                </div>
              </div>

              {imgKapak && (
                <div className="images-preview-container">
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(imgKapak)}
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
                      onClick={() => {
                        setImgKapak(null);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            <label>
              Üst Kategori:
              <select
                name="parentCategoryId"
                value={formData.parentCategoryId}
                onChange={handleChange}
              >
                <option value="0">Ana Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
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

export default CategoryCreate;
