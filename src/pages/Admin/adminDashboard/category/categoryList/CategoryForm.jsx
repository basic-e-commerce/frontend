import { useCategoryForm } from "./hooks/useCategoryForm";
import CategorySingleDown from "./components/CategorySingleDown";
import ImageUploader from "./components/ImageUploader";
import FormFields from "./components/FormFields";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import "./CategoryForm.scss";

const CategoryForm = () => {
  const {
    showPopupCategory,
    categories,
    selectedCategory,
    renderedImage,
    isFormChanged,
    isLoading,
    formik,
    handleKapakImageChange,
    handleConfirmDeleteCategory,
    handleOpenDeletePopup,
    handleCloseDeletePopup,
  } = useCategoryForm();

  return (
    <form onSubmit={formik.handleSubmit} className="category-form">
      <label className="secilenBolum">
        Kategori Seç:
        <CategorySingleDown
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </label>

      {selectedCategory && (
        <div className="categoryEdit">
          <div className="leftSide">
            <ImageUploader
              renderedImage={renderedImage}
              handleKapakImageChange={handleKapakImageChange}
              formik={formik}
            />
          </div>

          <div className="rightSection">
            <FormFields formik={formik} />

            <div className="buttonContainer">
              <button
                type="button"
                onClick={handleOpenDeletePopup}
                className="delete"
              >
                Sil
              </button>

              <button
                disabled={!isFormChanged || isLoading}
                className={!isFormChanged || isLoading ? "disabled" : ""}
                type="submit"
              >
                {isLoading ? "Düzenleniyor..." : "Kategori Düzenle"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        showPopupCategory={showPopupCategory}
        handleCloseDeletePopup={handleCloseDeletePopup}
        handleConfirmDeleteCategory={handleConfirmDeleteCategory}
      />
    </form>
  );
};

export default CategoryForm;
