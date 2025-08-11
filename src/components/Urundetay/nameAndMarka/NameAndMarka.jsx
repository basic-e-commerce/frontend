import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc, stokKodu }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
      <p>Stok Kodu: {"200825" + stokKodu}</p>
      <p>{desc}</p>
    </div>
  );
};

export default NameAndMarka;
