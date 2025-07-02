import PropTypes from "prop-types";

const CategoryForm = ({ formData, categories, onChange }) => {
  return (
    <div className="rightSection">
      <label>
        Kategori İsmi:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          autoComplete="off"
        />
      </label>

      <label>
        Üst Kategori:
        <select
          name="parentCategoryId"
          value={formData.parentCategoryId}
          onChange={onChange}
          required
        >
          <option value="0">Ana Kategori</option>
          {categories?.map((category) => (
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
          onChange={onChange}
          required
          autoComplete="off"
        />
      </label>

      <div className="buttonContainer">
        <button type="submit">Kategori Ekle</button>
      </div>
    </div>
  );
};

CategoryForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    parentCategoryId: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryForm;
