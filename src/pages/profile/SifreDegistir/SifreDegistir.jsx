import { useState } from "react";
import "./SifreDegistir.scss";
import api from "../../../api/api";

const SifreDegistir = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        "http://localhost:8083/api/v1/customer/update-password",
        {
          oldPassword: oldPassword,
          password: newPassword,
          rePassword: reNewPassword,
        }
      );

      setNewPassword("");
      setOldPassword("");
      setReNewPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Şifre İşlemleri</h3>
      </div>

      <hr />
      <form onSubmit={submit} className="bars">
        <label>
          Eski Şifre:
          <input
            type="password"
            name="oldPassword"
            id="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            required
          />
        </label>

        <div className="button">
          <button type="submit">Değiştir</button>
        </div>
      </form>
    </div>
  );
};

export default SifreDegistir;
