import "./UrunList.scss";
import { useUrunList } from "./hooks/useUrunList";
import CategorySelector from "./components/CategorySelector";
import ProductTable from "./components/ProductTable";
import NoProductsMessage from "./components/NoProductsMessage";
import Pagination from "../../../../../components/Pagination/Pagination";
import Loading from "../../../../../components/Loading/Loading";
import { STATUS } from "../../../../../utils/status";

const UrunList = () => {
  const {
    products,
    categories,
    currentItems,
    selectedCategoryId,
    setCurrentItems,
    handleCategoryChange,
    productsStatus,
  } = useUrunList();

  return (
    <div className="urunList">
      <div className="container">
        <div className="urunListContent">
          <CategorySelector
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={handleCategoryChange}
          />

          {selectedCategoryId ? (
            <>
              {productsStatus === STATUS.LOADING ? (
                <Loading />
              ) : currentItems?.length > 0 ? (
                <ProductTable currentItems={currentItems} />
              ) : (
                <NoProductsMessage />
              )}

              {productsStatus === STATUS.SUCCESS && (
                <Pagination
                  itemsPerPage={5}
                  items={products}
                  setCurrentItems={setCurrentItems}
                />
              )}
            </>
          ) : (
            <div className="selectCategoryMessage">
              Lütfen bir kategori seçin
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrunList;
