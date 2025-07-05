import "./UrunList.scss";
import { useUrunList } from "./hooks/useUrunList";
import {
  CategorySelector,
  ProductTable,
  NoProductsMessage,
  ProductListSkeleton,
} from "./components";
import Pagination from "../../../../../components/Pagination/Pagination";
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

  // Loading durumunda skeleton göster
  if (productsStatus === STATUS.LOADING && selectedCategoryId) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="urunList">
      <div className="">
        <div className="urunListContent">
          <CategorySelector
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={handleCategoryChange}
          />

          {selectedCategoryId ? (
            <>
              {currentItems?.length > 0 ? (
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
