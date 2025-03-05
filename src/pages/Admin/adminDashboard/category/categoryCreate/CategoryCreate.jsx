import "./CategoryCreate.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../config/baseApi";
import Loading from "../../../../../components/Loading/Loading";

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", parentCategoryId: "" });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/v1/category`, formData);
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
            <label>
              Üst Kategori:
              <select
                name="parentCategoryId"
                value={formData.parentCategoryId}
                onChange={handleChange}
              >
                <option value="">Ana Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
