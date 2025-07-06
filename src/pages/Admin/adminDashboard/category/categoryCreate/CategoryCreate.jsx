import "./CategoryCreate.scss";
import { useCategoryCreate } from "./hooks";
import { ImageUploader, CategoryForm } from "./components";

const CategoryCreate = () => {
  const { formik, categories, handleImageChange, isLoading } =
    useCategoryCreate();

  return (
    <div className="">
      <div className="categoryCreate">
        <form onSubmit={formik.handleSubmit}>
          <div className="categoryCreate">
            <div className="leftSide">
              <ImageUploader
                formik={formik}
                onImageChange={handleImageChange}
              />
            </div>
            <CategoryForm
              isLoading={isLoading}
              formik={formik}
              categories={categories}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
