import Categories from "./Categories/Categories";
import "./FilterSection.scss";

const FilterSection = () => {
  return (
    <div className="filterSection">
      <div className="title">
        <h3 style={{ fontSize: "1.2rem" }}>Filtreleme</h3>
        <hr />
      </div>
      <div className="listCategories">
        <Categories />
      </div>
    </div>
  );
};

export default FilterSection;
