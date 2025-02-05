import "./CardItem.scss";
const CardItem = ({ title, desc, buttonText, img }) => {
  return (
    <div className="cardItemm">
      <div className="card-content">
        <img src={img} alt="Peynir Çeşitleri" className="product-image" />
        <div className="text-content">
          <h2>{title}</h2>
          <p>{desc}</p>
          <a href="#" className="button green-button">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
