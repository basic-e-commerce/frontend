import { Link } from "react-router-dom";
import "./SideBar.scss";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Slider } from "@mui/material";
import PropTypes from "prop-types";

const SideBar = ({
  setSidebarOpen,
  categories,
  categoryLinkName,
  sidebarOpen,
  value,
  setValue,
}) => {
  const renderCategory = (category, isSubCategory = false) => {
    const hasSubCategories =
      category.subCategories && category.subCategories.length > 0;
    const isSelected = categoryLinkName === category.categoryLinkName;

    return (
      <li
        key={category.id}
        className={`${isSelected ? "selected" : ""} ${
          isSubCategory ? "sub-category" : ""
        }`}
      >
        {hasSubCategories ? (
          // Parent category with subcategories - not clickable
          <div className="parent-category">
            <span>{category.categoryName}</span>
          </div>
        ) : (
          // Category without subcategories - clickable
          <Link
            onClick={() => {
              setSidebarOpen(false);
            }}
            to={`/kategoriler/${category.categoryLinkName}`}
          >
            <span>{category.categoryName}</span>
            <ChevronRightOutlinedIcon
              style={{ color: "black", fontSize: "1rem" }}
            />
          </Link>
        )}

        {/* Render subcategories if they exist */}
        {hasSubCategories && (
          <ul className="sub-categories">
            {category.subCategories.map((subCategory) =>
              renderCategory(subCategory, true)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="categories">
        <div className="title">
          <h3 style={{ fontSize: "1.1rem" }}>Kategoriler</h3>
          <hr />
        </div>
        <div className="listCategories">
          <ul>{categories?.map((item) => renderCategory(item))}</ul>
        </div>
      </div>

      <div className="filter">
        <div className="title">
          <h3 style={{ fontSize: "1.1rem", marginTop: "2rem" }}>Filtreleme</h3>
          <hr />
        </div>

        <div className="filterSection">
          <div className="inputs">
            <input
              value={value[0]}
              onChange={(e) => setValue([+e.target.value, value[1]])}
              type="number"
            />

            <input
              value={value[1]}
              onChange={(e) => setValue([value[0], +e.target.value])}
              type="number"
            />
            <span>TL</span>
          </div>

          <div className="sliderFilter">
            <Slider
              min={0}
              max={30000}
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              size="small"
              valueLabelDisplay="auto"
              sx={{
                color: "black",
                "& .MuiSlider-thumb": {
                  backgroundColor: "black",
                },
                "& .MuiSlider-rail": {
                  opacity: 0.2,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categoryName: PropTypes.string.isRequired,
      categoryLinkName: PropTypes.string.isRequired,
      categoryDescription: PropTypes.string,
      coverImage: PropTypes.object,
      subCategories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          categoryName: PropTypes.string.isRequired,
          categoryLinkName: PropTypes.string.isRequired,
          categoryDescription: PropTypes.string,
          coverImage: PropTypes.object,
        })
      ),
    })
  ),
  categoryLinkName: PropTypes.string,
  sidebarOpen: PropTypes.bool.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  setValue: PropTypes.func.isRequired,
};

export default SideBar;
