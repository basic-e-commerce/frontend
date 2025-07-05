import PropTypes from "prop-types";
import { Chip, Box } from "@mui/material";

const CategoryDropdown = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const handleChipClick = (id) => {
    // Chip tıklanınca toggle et
    if (selectedCategories.includes(id)) {
      onCategoryChange({ target: { value: id, checked: false } });
    } else {
      onCategoryChange({ target: { value: id, checked: true } });
    }
  };

  return (
    <Box className="contentCategoryyy" display="flex">
      {categories?.map((category) => (
        <Box className="categoryChipsContainer" key={category.id}>
          {/* Ana Kategori */}
          <Chip
            label={category?.categoryName}
            color={
              selectedCategories.includes(category.id) ? "primary" : "default"
            }
            onClick={() => handleChipClick(category.id)}
            disabled={category.subCategories.length > 0}
          />

          {/* Alt Kategoriler */}
          {category.subCategories.length > 0 && (
            <Box ml={3} display="flex" flexWrap="wrap" gap={1}>
              {category.subCategories?.map((sub) => (
                <Chip
                  key={sub.id}
                  label={sub.categoryName}
                  color={
                    selectedCategories.includes(sub.id) ? "primary" : "default"
                  }
                  onClick={() => handleChipClick(sub.id)}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryDropdown;
