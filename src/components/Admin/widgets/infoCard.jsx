import { Link } from "react-router-dom";
import "./infoCard.scss";

function InfoCard({ img, value, tag }) {
  return (
    <Link to={""} className="infoCard">
      {img}
      <div className="textCard">
        <span>
          <b>{value}</b>
        </span>
        <span>{tag}</span>
      </div>
    </Link>
  );
}

export default InfoCard;
