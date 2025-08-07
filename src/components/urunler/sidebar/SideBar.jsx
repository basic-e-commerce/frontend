import { Link } from "react-router-dom";
import "./SideBar.scss";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Slider } from "@mui/material";
import { useState } from "react";

const SideBar = ({
  setSidebarOpen,
  categories,
  categoryLinkName,
  sidebarOpen,
  value,
  setValue,
}) => {
  return (
    <sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="categories">
        <div className="title">
          <h3 style={{ fontSize: "1.1rem" }}>Kategoriler</h3>
          <hr />
        </div>
        <div className="listCategories">
          <ul>
            {categories?.map((item, index) => (
              <li
                key={index}
                className={
                  categoryLinkName === item.categoryLinkName ? "selected" : ""
                }
              >
                <Link
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                  to={`/kategoriler/${item.categoryLinkName}`}
                >
                  <span>{item.categoryName}</span>
                  <ChevronRightOutlinedIcon
                    style={{ color: "black", fontSize: "1rem" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
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
            <span> - </span>
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
              max={5000}
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
    </sidebar>
  );
};

export default SideBar;
