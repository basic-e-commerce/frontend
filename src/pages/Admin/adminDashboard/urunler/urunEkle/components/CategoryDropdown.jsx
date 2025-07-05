import PropTypes from "prop-types";

const CategoryDropdown = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div style={{ width: "60%" }}>
      {categories?.map((category) => (
        <div key={category.id}>
          {/* Ana Kategori - Eğer alt kategorisi varsa sadece gösterilir, seçilemez */}
          <label>
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories?.includes(category.id)}
              onChange={onCategoryChange}
              disabled={category.subCategories.length > 0}
            />
            {category?.categoryName?.toUpperCase()}
          </label>

          {/* Alt Kategoriler (Eğer varsa) */}
          {category.subCategories.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {category.subCategories?.map((sub) => (
                <label key={sub.id}>
                  <input
                    type="checkbox"
                    value={sub.id}
                    checked={selectedCategories?.includes(sub.id)}
                    onChange={onCategoryChange}
                  />
                  {sub.categoryName}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryDropdown;
