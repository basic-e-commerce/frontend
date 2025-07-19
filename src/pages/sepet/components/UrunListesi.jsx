import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const UrunListesi = ({ cartItems, updateQuantity }) => {
  return (
    <div className="urunTable">
      <div className="table-wrapper">
        <table className="shopTable">
          <thead>
            <tr>
              <th className="product-thumbnail">Resim</th>
              <th className="product-name">İsim</th>
              <th className="product-price">Fiyat</th>
              <th className="product-quantity">Adet</th>
              <th className="product-subtotal">Toplam</th>
              <th className="controls">Kontroller</th>
            </tr>
          </thead>
          <tbody className="cart-wrapper">
            {cartItems?.details?.length > 0 ? (
              cartItems.details.map((item) => (
                <tr className="cart-item" key={item.id}>
                  <td className="cart-image">
                    <img src={item.coverImage} alt={item.title} />
                  </td>
                  <td className="product-name">{item.title}</td>
                  <td className="product-price">{item.comparePrice}₺</td>
                  <td className="product-quantity">{item.quantity}</td>
                  <td className="product-subtotal">
                    {item.comparePrice * item.quantity} ₺
                  </td>
                  <td className="controls">
                    <div className="buttonss">
                      <button onClick={() => updateQuantity(item, -1)}>
                        <RemoveIcon className="iconControl" />
                      </button>
                      {item.quantity}
                      <button onClick={() => updateQuantity(item, +1)}>
                        <AddIcon className="iconControl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Sepet Boş
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrunListesi;
