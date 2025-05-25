import "./UrunEkle.scss";
import { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../redux/slices/categorySlice";
import CategoryDropdown from "./CategoryDropdown";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { createProduct } from "../../../../api/apiProduct";
import { showAlertWithTimeout } from "../../../../redux/slices/alertSlice";

const UrunEkle = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    productDescription: "",
    quantity: "",
    salePrice: "",
    comparePrice: "",
    buyingPrice: "",
    taxRate: "",
    productType: "",
    published: "true",
    disableOutOfStock: "true",
    categoryIds: [],
    images: [],
    coverImage: "",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.productDescription);
    formDataToSend.append("shortDescription", formData.shortDescription);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("salePrice", formData.salePrice);
    formDataToSend.append("buyingPrice", formData.buyingPrice);
    formDataToSend.append("taxRate", formData.taxRate);
    formDataToSend.append("comparePrice", formData.comparePrice);
    formDataToSend.append("published", formData.published);
    formDataToSend.append("productType", formData.productType);
    formDataToSend.append("disableOutOfStock", formData.disableOutOfStock);
    formData.categoryIds.forEach((id) =>
      formDataToSend.append("categoryIds", id)
    );
    formData.images.forEach((image) =>
      formDataToSend.append("productImages", image)
    );
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      await createProduct(formDataToSend);
      dispatch(
        showAlertWithTimeout({
          message: "Ürün başarıyla Eklendi",
          status: "success",
        })
      );

      setFormData({
        name: "",
        shortDescription: "",
        productDescription: "",
        quantity: "",
        salePrice: "",
        comparePrice: "",
        buyingPrice: "",
        productType: "",
        published: true,
        disableOutOfStock: true,
        categoryIds: [],
        images: [],
        coverImage: "",
      });
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message,
          status: "error",
        })
      );
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleClick = (e) => {
    if (
      !e.target.closest(".image-container") &&
      !e.target.closest(".remove-button")
    ) {
      inputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (
      [
        "quantity",
        "salePrice",
        "comparePrice",
        "buyingPrice",
        "taxRate",
      ].includes(name)
    ) {
      newValue = value === "" ? "" : parseInt(value) || 0; // Boşsa boş bırak, yoksa sayıya çevir
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  const handleCategoryChange = (updatedCategories) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: updatedCategories,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
    event.target.value = "";
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="createProject">
          <form className="formCreate" onSubmit={handleSubmit}>
            <div className="leftCreate">
              <div className="avatar">
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  id="kapakFoto"
                  onChange={handleKapakImageChange}
                  style={{ display: "none" }}
                />

                <label htmlFor="kapakFoto" className="kapsayiciButton">
                  {formData.coverImage ? (
                    <img
                      className="kapakImgg"
                      src={URL.createObjectURL(formData.coverImage)}
                      alt="kapakResmi"
                    />
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Kapak Resmi
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="rightCreate">
              <div className="avatarResimler">
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  multiple
                  id="file-input"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  ref={inputRef}
                />

                <div onClick={handleClick} className="kapsayiciButton">
                  {formData.images.length > 0 ? (
                    <div className="images-preview-container">
                      {formData.images.map((image, index) => {
                        return (
                          <div key={index} className="image-container">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded Preview ${index}`}
                            />
                            <button
                              type="button"
                              className="remove-button"
                              onClick={(event) => {
                                event.stopPropagation(); // silerken input açılmasın
                                handleRemoveImage(index);
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Ürün Resimleri Ekle
                    </div>
                  )}
                </div>
              </div>

              <div className="bottomText">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  Ürün Kategorisi:
                  <CategoryDropdown
                    categories={categories}
                    selectedCategories={formData.categoryIds}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>

                <label>
                  Ürün İsmi:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Stok:
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Fiyat:
                  <input
                    type="text"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  İndirimli Fiyat:
                  <input
                    type="text"
                    name="comparePrice"
                    value={formData.comparePrice}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Alış Fiyat:
                  <input
                    type="text"
                    name="buyingPrice"
                    value={formData.buyingPrice}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Vergi Oranı:
                  <input
                    type="text"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Published
                  <select
                    name="published"
                    value={formData.published}
                    onChange={handleChange}
                    required
                  >
                    <option value={"true"}>Aktif</option>
                    <option value={"false"}>Pasif</option>
                  </select>
                </label>
                <label>
                  DisableOutOfStock
                  <select
                    name="disableOutOfStock"
                    value={formData.disableOutOfStock}
                    onChange={handleChange}
                    required
                  >
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                  </select>
                </label>
                <label>
                  Birim
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                  >
                    <option value={""}>Seçiniz</option>
                    <option value={"SIMPLE"}>Simple</option>
                  </select>
                </label>
                <label>
                  Kısa Açıklama:
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Açıklama:
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="buttonContainer">
                  <button type="submit">Ürün Ekle</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UrunEkle;
