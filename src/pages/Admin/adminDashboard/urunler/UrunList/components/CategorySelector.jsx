import PropTypes from "prop-types";

const CategorySelector = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
}) => {
  return (
    <div className="categorySelector">
      <label>
        Kategori Seçin:
        <select
          id="categorySelect"
          value={selectedCategoryId || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="categorySelect"
        >
          <option disabled value="">
            Kategori Seçin
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategoryId: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategorySelector;
