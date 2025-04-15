import React from "react";

const CategorySingleDown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;

    // Seçilen kategori ya da alt kategori nesnesini bul
    const selected = categories
      .flatMap((category) => [category, ...category.subCategories])
      .find((item) => item.id.toString() === selectedId);

    setSelectedCategory(selected);
  };

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
