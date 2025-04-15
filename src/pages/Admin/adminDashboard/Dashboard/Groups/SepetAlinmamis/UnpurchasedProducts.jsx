import "./UnpurchasedProducts.scss";

const products = [
  {
    id: "121318",
    name: "Mavi Ceket",
    image: "/images/dogruDaire/huzur.jpg",
    originalPrice: "500 TL",
    discountedPrice: "390 TL",
    inCart: 401,
    added: "1 gün önce atıldı",
  },
  {
    id: "246130",
    name: "Siyah Pantolon",
    image: "/images/dogruDaire/huzur.jpg",
    originalPrice: "500 TL",
    discountedPrice: "390 TL",
    inCart: 128,
    added: "2 gün önce atıldı",
  },
  {
    id: "844573",
    name: "Water Bottle",
    image: "/images/dogruDaire/huzur.jpg",
    originalPrice: "500 TL",
    discountedPrice: "390 TL",
    inCart: 32,
    added: "3 gün önce atıldı",
  },
  {
    id: "844573",
    name: "Water Bottle",
    image: "/images/dogruDaire/huzur.jpg",
    originalPrice: "500 TL",
    discountedPrice: "390 TL",
    inCart: 16,
    added: "4 gün önce atıldı",
  },
];

const UnpurchasedProducts = () => {
  return (
    <div className="product-table__wrapper">
      <h3 className="product-table__title">Sepete Olan Ürünler</h3>
      <table className="product-tableee">
        <thead className="product-table__head">
          <tr>
            <th>Ürün</th>
            <th>Fiyat</th>
            <th>İndirimli Fiyat</th>
            <th>Sepette</th>
            <th>Son Mesaj Zamanı</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="product-table__row">
              <td className="product-table__product">
                <img src={item.image} alt={item.name} />
                <div>
                  <div>{item.name}</div>
                  <small>ID: {item.id}</small>
                </div>
              </td>
              <td>{item.originalPrice}</td>
              <td style={{ textAlign: "center" }}>{item.discountedPrice}</td>
              <td>{item.inCart} Sepette</td>
              <td>{item.added}</td>
              <td>
                <button className="product-table__button">
                  E-posta Gönder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnpurchasedProducts;
