import "./UrunEkle.scss";
import { useEffect } from "react";
import LoadingBar from "../../../../../components/LoadingBar/LoadingBar";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import { Formik, Form } from "formik";
import { useUrunEkleForm } from "./hooks/useUrunEkleForm";
import ImageUpload from "./components/ImageUpload";
import CategorySelector from "./components/CategorySelector";
import ProductFormFields from "./components/ProductFormFields";

const UrunEkle = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.loading);
  const {
    inputRef,
    images,
    coverImage,
    categoryIds,
    handleImageUpload,
    handleRemoveImage,
    handleKapakImageChange,
    handleCategoryChange,
    initialValues,
    validationSchema,
    onSubmit,
  } = useUrunEkleForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="">
      <LoadingBar isLoading={isLoading} />
      <div className="createProject">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          validateOnMount={true}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="formCreate">
              <div className="leftCreate">
                <ImageUpload
                  isCover
                  coverImage={coverImage}
                  handleKapakImageChange={handleKapakImageChange}
                />
              </div>
              <div className="rightCreate">
                <ImageUpload
                  images={images}
                  inputRef={inputRef}
                  handleImageUpload={handleImageUpload}
                  handleRemoveImage={handleRemoveImage}
                />
                <div className="bottomText">
                  <CategorySelector
                    categories={categories}
                    selectedCategories={categoryIds}
                    onCategoryChange={handleCategoryChange}
                  />
                  <ProductFormFields />
                  <div className="buttonContainer">
                    <button
                      disabled={isSubmitting || !isValid}
                      className={
                        isSubmitting || !isValid ? "disabledButton" : ""
                      }
                      type="submit"
                    >
                      {isSubmitting ? "Ekleniyor..." : "Ürün Ekle"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UrunEkle;
