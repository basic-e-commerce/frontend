import "./SifreDegistir.scss";

const SifreDegistir = () => {
  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Şifre İşlemleri</h3>
      </div>

      <hr />
      <form className="bars">
        <label>
          Eski Şifre:
          <input
            type="password"
            name="oldPassword"
            id="current-password"
            //   value={formData.productName}
            //   onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>

        <label>
          Yeni Şifre:
          <input
            type="password"
            name="newPassword"
            id="new-password"
            //   value={formData.quantity}
            //   onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>

        <label>
          Yeni Şifre Tekrar:
          <input
            type="password"
            name="confirmNewPassword"
            id="confirm-password"
            autoComplete="off"
            //   value={formData.quantity}
            //   onChange={handleChange}

            required
          />
        </label>

        <div className="button">
          <button>Değiştir</button>
        </div>
      </form>
    </div>
  );
};

export default SifreDegistir;
