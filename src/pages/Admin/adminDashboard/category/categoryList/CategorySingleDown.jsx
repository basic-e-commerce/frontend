import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../../../../redux/slices/categorySlice";
import { useLocation } from "react-router-dom";

const CategorySingleDown = ({ categories, selectedCategory }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const location = useLocation();

  const handleCategoryChange = (event) => {
    const newId = event.target.value;
    setSelectedId(newId);
  };

  useEffect(() => {
    setSelectedId(null);
    dispatch(setSelectedCategory(null));
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedId || !categories.length) return;

    const selected = categories
      .flatMap((category) => [category, ...category.subCategories])
      .find((item) => item.id.toString() === selectedId);

    if (selected) {
      dispatch(setSelectedCategory(selected));
    } else {
      setSelectedId(null);
    }
  }, [selectedId, categories]);

  return (
    <select
      value={selectedCategory ? selectedCategory.id : ""}
      onChange={handleCategoryChange}
      required
    >
      <option disabled value="">
        Kategori Seç
      </option>

      {categories?.map((category) => (
        <React.Fragment key={category.id}>
          {/* Ana Kategori - Eğer alt kategorisi varsa disabled olacak */}
          <option
            value={category.id}
            disabled={category.subCategories.length > 0}
          >
            {category.categoryName}
          </option>

          {/* Alt Kategoriler (Eğer varsa) */}
          {category.subCategories.length > 0 &&
            category.subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;{sub.categoryName}
                {/* Çizgi ile ayrılan alt kategori */}
              </option>
            ))}
        </React.Fragment>
      ))}
    </select>
  );
};

export default CategorySingleDown;
