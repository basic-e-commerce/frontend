import "./SifreDegistir.scss";

const SifreDegistir = () => {
  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Şifre İşlemleri</h3>
      </div>

      <hr />
      <div className="bars">
        <label>
          Eski Şifre:
          <input
            type="text"
            name="productName"
            //   value={formData.productName}
            //   onChange={handleChange}
            required
          />
        </label>

        <label>
          Yeni Şifre:
          <input
            type="text"
            name="quantity"
            //   value={formData.quantity}
            //   onChange={handleChange}
            required
          />
        </label>

        <label>
          Yeni Şifre Tekrar:
          <input
            type="text"
            name="quantity"
            //   value={formData.quantity}
            //   onChange={handleChange}
            required
          />
        </label>

        <div className="button">
          <button>Değiştir</button>
        </div>
      </div>
    </div>
  );
};

export default SifreDegistir;
