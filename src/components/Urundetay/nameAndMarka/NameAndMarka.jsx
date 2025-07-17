import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
      <p>Stok Kodu: 215854</p>
      <p>{desc}</p>
    </div>
  );
};

export default NameAndMarka;
