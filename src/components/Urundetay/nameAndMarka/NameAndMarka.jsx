import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
    </div>
  );
};

export default NameAndMarka;
