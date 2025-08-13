import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CategoryCard.scss";
import FadeInSection from "../FadeInSection/FadeInSection";

const CategoryCard = ({ img, categoryName, linkName }) => {
  return (
    <FadeInSection>
      <Link to={`/kategoriler/${linkName}`} className="categorycard">
        <div className="categoryContent">
          <div className="backgroundImg">
            <img src={img} alt={categoryName} />
          </div>
          <h3>{categoryName}</h3>
        </div>
      </Link>
    </FadeInSection>
  );
};

CategoryCard.propTypes = {
  img: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired,
};

export default CategoryCard;
