import "./CategoryCreate.scss";
import Loading from "../../../../../components/Loading/Loading";
import { useCategoryCreate } from "./hooks";
import { ImageUploader, CategoryForm } from "./components";

const CategoryCreate = () => {
  const {
    imgKapak,
    isLoading,
    formData,
    categories,
    handleSubmit,
    handleChange,
    handleKapakImageChange,
  } = useCategoryCreate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="categoryCreate">
        <form onSubmit={handleSubmit}>
          <div className="categoryCreate">
            <div className="leftSide">
              <ImageUploader
                imgKapak={imgKapak}
                onImageChange={handleKapakImageChange}
              />
            </div>
            <CategoryForm
              formData={formData}
              categories={categories}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
