const CategoryDropdown = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const categoryId = parseInt(value);
    let updatedCategories = selectedCategories;

    if (checked) {
      if (!updatedCategories?.includes(categoryId)) {
        updatedCategories?.push(categoryId);
      }
    } else {
      updatedCategories = updatedCategories?.filter((id) => id !== categoryId);
    }

    onCategoryChange(updatedCategories);
  };

  console.log(categories);

  return (
    <div>
      {categories?.map((category) => (
        <div key={category.id}>
          {/* Ana Kategori - Eğer alt kategorisi varsa sadece gösterilir, seçilemez */}
          <label>
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories?.includes(category.id)}
              onChange={handleCategoryChange}
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
                    onChange={handleCategoryChange}
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

export default CategoryDropdown;
