import "./CuponCreate.scss";
import { useCategoryCreate } from "./hooks";
import { CuponForm } from "./components";
import ProductTable from "./components/ProductTable";
import { useState } from "react";

const CategoryCreate = () => {
  const { formik, products, isLoading } = useCategoryCreate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleProduct = (id) => {
    const prev = formik.values.productIds || [];
    const newProductIds = prev.includes(id)
      ? prev.filter((pid) => pid !== id)
      : [...prev, id];
    formik.setFieldValue("productIds", newProductIds);
    console.log("Seçili ürünler:", newProductIds);
  };

  // Ürünleri filtrele
  const filteredProducts = products?.filter((product) => {
    if (!searchTerm) return true;

    return product.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="">
      <div className="cuponCreate">
        <form onSubmit={formik.handleSubmit}>
          <div className="cuponCreate">
            <CuponForm formik={formik} isLoading={isLoading} />
            {formik.values.isProductAssigned === "true" && (
              <div className="leftSide">
                <label
                  className="searchBar"
                  style={{ marginBottom: "2rem" }}
                  htmlFor=""
                >
                  <div></div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ürün ara..."
                  />
                </label>

                <div className="avatar">
                  <ProductTable
                    currentItems={filteredProducts}
                    productIds={formik.values.productIds}
                    onToggleProduct={handleToggleProduct}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
