import "./Bilgiler.scss";

const KullaniciBilgileri = () => {
  return (
    <div className="kullaniciBİlgileri">
      <div className="kullaniciInput">
        <div className="title">
          <h3>Kullanıcı Bilgileriniz</h3>
        </div>

        <hr />

        <div className="bars">
          <label>
            Adınız:
            <input
              type="text"
              name="productName"
              //   value={formData.productName}
              //   onChange={handleChange}
              required
            />
          </label>

          <label>
            Soyadınız:
            <input
              type="text"
              name="quantity"
              //   value={formData.quantity}
              //   onChange={handleChange}
              required
            />
          </label>
          <label>
            E-posta Adresiniz:
            <input
              type="text"
              name="quantity"
              //   value={formData.quantity}
              //   onChange={handleChange}
              required
            />
          </label>
          <label>
            Telefon:
            <input
              type="text"
              name="quantity"
              //   value={formData.quantity}
              //   onChange={handleChange}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default KullaniciBilgileri;
