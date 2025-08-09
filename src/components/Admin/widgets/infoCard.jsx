import { Link } from "react-router-dom";
import "./infoCard.scss";

function InfoCard({ img, value, tag, onClick }) {
  return (
    <Link to={""} className="infoCard" onClick={onClick}>
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
