import "./CategoryCreate.scss";
import Loading from "../../../../../components/Loading/Loading";
import { useCategoryCreate } from "./hooks";
import { ImageUploader, CategoryForm } from "./components";

const CategoryCreate = () => {
  const { formik, categories, handleImageChange } = useCategoryCreate();

  if (formik.isSubmitting) {
    return <Loading />;
  }

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
            <CategoryForm formik={formik} categories={categories} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
