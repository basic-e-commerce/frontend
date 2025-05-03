import "./CategoryCreate.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import Loading from "../../../../../components/Loading/Loading";
import { createCategory } from "../../../../../api/apiCategory";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";
import { handleApiError } from "../../../../../utils/errorHandler";

const CategoryCreate = () => {
  const dispatch = useDispatch();
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
      await createCategory(formDataToSend);
      setFormData({ name: "", description: "", parentCategoryId: "0" });
      setImgKapak(null);
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
    } finally {
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
        <div className="categoryCreate">
          <form onSubmit={handleSubmit}>
            <div className="categoryCreate">
              <div className="leftSide">
                <div className="avatar">
                  <input
                    type="file"
                    accept="image/*"
                    className="upload-input"
                    id="kapakFoto"
                    onChange={handleKapakImageChange}
                    style={{ display: "none" }}
                  />

                  <label htmlFor="kapakFoto" className="kapsayiciButton">
                    {imgKapak ? (
                      <img
                        className="kapakImgg"
                        src={URL.createObjectURL(imgKapak)}
                        alt="kapakResmi"
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
                  Üst Kategori:
                  <select
                    name="parentCategoryId"
                    value={formData.parentCategoryId}
                    onChange={handleChange}
                    required
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
                    autoComplete="off"
                  />
                </label>

                <div className="buttonContainer">
                  <button type="submit">Kategori Ekle</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryCreate;
