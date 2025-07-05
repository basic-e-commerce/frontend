import PropTypes from "prop-types";
import CategoryDropdown from "./CategoryDropdown";

const CategorySelector = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const categoryId = parseInt(value);

    let updatedCategories;
    if (checked) {
      updatedCategories = [...selectedCategories, categoryId];
    } else {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId);
    }

    onCategoryChange(updatedCategories);
  };

  return (
    <div className="categorySeciton">
      Ürün Kategorisi:
      <CategoryDropdown
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
};

CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategorySelector;
