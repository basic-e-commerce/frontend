import Loading from "../../../../../components/Loading/Loading";
import { Formik, Form } from "formik";
import { useUrunDuzenleForm } from "./hooks";
import { ImageUpload, CategorySelector, ProductFormFields } from "./components";
import "./UrunEkle.scss";

const UrunDuzenle = () => {
  const {
    inputRef,
    isLoading,
    images,
    coverImage,
    categories,
    handleImageUpload,
    handleRemoveImage,
    handleKapakImageChange,
    initialValues,
    validationSchema,
    onSubmit,
  } = useUrunDuzenleForm();

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="createProject">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isSubmitting, dirty, setFieldValue, values }) => {
              // Resim değişikliklerini de kontrol et
              const hasImageChanges =
                JSON.stringify(images) !==
                  JSON.stringify(initialValues.images) ||
                coverImage !== initialValues.coverImage;

              const isFormDirty = dirty || hasImageChanges;

              return (
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
                        selectedCategories={values.categoryIds}
                        onCategoryChange={(updatedCategories) => {
                          setFieldValue("categoryIds", updatedCategories);
                        }}
                      />

                      <ProductFormFields />

                      <div className="buttonContainer">
                        <button
                          disabled={!isFormDirty || isSubmitting}
                          className={
                            !isFormDirty || isSubmitting ? "disabledButton" : ""
                          }
                          type="submit"
                        >
                          {isSubmitting ? "Düzenleniyor..." : "Ürün Düzenle"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default UrunDuzenle;
