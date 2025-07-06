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

  if (productsStatus === STATUS.LOADING) {
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
              {productsStatus === STATUS.SUCCESS && products?.length > 0 ? (
                <>
                  <ProductTable currentItems={currentItems} />
                  <Pagination
                    itemsPerPage={5}
                    items={products}
                    setCurrentItems={setCurrentItems}
                  />
                </>
              ) : productsStatus === STATUS.SUCCESS &&
                products?.length === 0 ? (
                <NoProductsMessage />
              ) : null}
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
