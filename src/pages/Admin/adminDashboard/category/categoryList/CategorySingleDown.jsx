import React from "react";

const CategorySingleDown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <select value={selectedCategory} onChange={handleCategoryChange} required>
      <option disabled value="">
        Kategori Seç
      </option>

      {categories?.map((category) => (
        <React.Fragment key={category.id}>
          {/* Ana Kategori - Eğer alt kategorisi varsa disabled olacak */}
          <option
            value={category.id}
            // disabled={category.subCategories.length > 0}
          >
            {category.name}
          </option>

          {/* Alt Kategoriler (Eğer varsa) */}
          {category.subCategories.length > 0 &&
            category.subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;{sub.name}
                {/* Çizgi ile ayrılan alt kategori */}
              </option>
            ))}
        </React.Fragment>
      ))}
    </select>
  );
};

export default CategorySingleDown;
