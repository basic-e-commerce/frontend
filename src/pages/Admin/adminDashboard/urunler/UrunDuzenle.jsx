import { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CategoryDropdown from "./CategoryDropdown";
import {
  getProductDetailAdmin,
  updateProduct,
} from "../../../../redux/slices/productSlice";
import { showAlertWithTimeout } from "../../../../redux/slices/alertSlice";
import { getCategories } from "../../../../redux/slices/categorySlice";
import "./UrunEkle.scss";

const UrunDuzenle = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { productLinkName } = useParams();
  const [loading, setIsloading] = useState(false);
  const { categories, loadingCategoriesStatus } = useSelector(
    (state) => state.categories
  );
  const { productDetailStatus, adminProductDetail } = useSelector(
    (state) => state.products
  );

  const [initialImages, setInitialImages] = useState([]);
  const [initialCoverImage, setInitialCoverImage] = useState(null);
  const [initialFormData, setInitialFormData] = useState({
    id: null,
    name: "",
    shortDescription: "",
    productDescription: "",
    quantity: "",
    salePrice: "",
    comparePrice: "",
    buyingPrice: "",
    productType: "",
    published: "true",
    disableOutOfStock: "true",
    categoryIds: [],
    images: [],
    coverImage: "",
  });

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    shortDescription: "",
    productDescription: "",
    quantity: "",
    salePrice: "",
    comparePrice: "",
    buyingPrice: "",
    productType: "",
    published: "true",
    disableOutOfStock: "true",
    categoryIds: [],
    images: [],
    coverImage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      if (!productLinkName) return;

      try {
        const data = await dispatch(
          getProductDetailAdmin(productLinkName)
        ).unwrap();
        console.log(data);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        dispatch(
          showAlertWithTimeout({
            message: error,
            status: "error",
          })
        );
      }
    };

    fetchData();
    dispatch(getCategories());
  }, [productLinkName]);

  useEffect(() => {
    if (adminProductDetail) {
      setFormData({
        id: adminProductDetail.id,
        name: adminProductDetail.productName || "",
        shortDescription: adminProductDetail.shortDescription || "",
        productDescription: adminProductDetail.productDescription || "",
        quantity: adminProductDetail.quantity?.toString() || "",
        salePrice: adminProductDetail.salePrice?.toString() || "",
        comparePrice: adminProductDetail.comparePrice?.toString() || "",
        buyingPrice: adminProductDetail.buyingPrice?.toString() || "",
        productType: adminProductDetail.productType || "",
        published: adminProductDetail.published?.toString() || "true",
        disableOutOfStock:
          adminProductDetail.disableOutOfStock?.toString() || "true",
        categoryIds: (adminProductDetail.categories || [])?.map(
          (category) => category.id
        ),
        images: adminProductDetail.productImages || [],
        coverImage: adminProductDetail.coverImage?.url || "",
      });

      setInitialFormData({
        id: adminProductDetail.id,
        name: adminProductDetail.productName || "",
        shortDescription: adminProductDetail.shortDescription || "",
        productDescription: adminProductDetail.productDescription || "",
        quantity: adminProductDetail.quantity?.toString() || "",
        salePrice: adminProductDetail.salePrice?.toString() || "",
        comparePrice: adminProductDetail.comparePrice?.toString() || "",
        buyingPrice: adminProductDetail.buyingPrice?.toString() || "",
        productType: adminProductDetail.productType || "",
        published: adminProductDetail.published?.toString() || "true",
        disableOutOfStock:
          adminProductDetail.disableOutOfStock?.toString() || "true",
        categoryIds: (adminProductDetail.categories || [])?.map(
          (category) => category.id
        ),
        images: adminProductDetail.productImages || [],
        coverImage: adminProductDetail.coverImage?.url || "",
      });

      setInitialImages(adminProductDetail.productImages || []);
      setInitialCoverImage(adminProductDetail.coverImage?.url || "");
    }
  }, [adminProductDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsloading(true);

    try {
      await dispatch(
        updateProduct({
          formData,
          initialKapakImages: initialCoverImage,
          initialImages,
        })
      ).unwrap();
      await dispatch(getProductDetailAdmin(productLinkName)).unwrap();

      setIsloading(false);
      dispatch(
        showAlertWithTimeout({
          message: "Ürün başarıyla düzenlendi.",
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        showAlertWithTimeout({
          message: err.message,
          status: "error",
        })
      );
      console.log(err);
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
    if (["quantity", "price", "discountPrice, comparePrice"].includes(name)) {
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
  };

  return (
    <div className="container">
      {productDetailStatus == "LOADING" ||
      loading == true ||
      loadingCategoriesStatus == true ? (
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
                      src={
                        typeof formData.coverImage === "string"
                          ? formData.coverImage
                          : URL.createObjectURL(formData.coverImage)
                      }
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
                              src={
                                image?.url
                                  ? image.url
                                  : typeof image === "string"
                                  ? image
                                  : URL.createObjectURL(image)
                              }
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
                <div className="categorySeciton">
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
                  <button
                    disabled={
                      JSON.stringify(formData) ===
                      JSON.stringify(initialFormData)
                    }
                    className={
                      JSON.stringify(formData) ===
                      JSON.stringify(initialFormData)
                        ? "disabledButton"
                        : ""
                    }
                    type="submit"
                  >
                    Ürün Düzenle
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UrunDuzenle;
