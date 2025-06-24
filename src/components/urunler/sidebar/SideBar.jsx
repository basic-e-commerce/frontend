import { Link } from "react-router-dom";
import "./SideBar.scss";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const SideBar = ({
  setSidebarOpen,
  categories,
  categoryLinkName,
  sidebarOpen,
}) => {
  return (
    <sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="categories">
        <div className="title">
          <h3 style={{ fontSize: "1.2rem" }}>Kategoriler</h3>
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
    </sidebar>
  );
};

export default SideBar;
