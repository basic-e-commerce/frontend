import "./List.scss";
import TeamListCard from "../teamListCard/TeamListCard";
import FadeInSection from "../../FadeInSection/FadeInSection";
import DashboardIcon from "@mui/icons-material/Dashboard";

const List = ({ toggleSidebar, currentItems, products, categoryName }) => {
  return (
    <div className="projeList">
      <div className="title">
        <div onClick={toggleSidebar} className="titleContent">
          <h3 className="anaa" style={{ fontSize: "1.1rem" }}>
            {categoryName}
          </h3>

          <h3 className="katt" style={{ display: "none", fontSize: "1.1rem" }}>
            Diğer Kategoriler
          </h3>
          <div className="filterIconContent">
            <DashboardIcon
              style={{ fontSize: "1.3rem" }}
              className="iconFilter"
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="list">
        {products?.length > 0 ? (
          currentItems?.map((product, index) => (
            <FadeInSection key={index}>
              <TeamListCard product={product} />
            </FadeInSection>
          ))
        ) : (
          <p className="noDaire">Ürünler Bulunamadı...</p>
        )}
      </div>
    </div>
  );
};

export default List;
