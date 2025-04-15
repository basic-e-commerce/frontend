import { useState } from "react";
import "./AdminLogin.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch } from "react-redux";
import { handleApiError } from "../../../utils/errorHandler";
import api from "../../../api/api";
import { setLogin } from "../../../redux/slices/authSlice";
import { Link } from "react-router-dom";

function AdminLogin() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/a-login", {
        username,
        password,
      });

      dispatch(setLogin(response.data));
      console.log(response.data);
      console.log(response.data.accessToken);
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="container cont">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Giriş Yap</h2>
              <div className="socialMedia">
                <InstagramIcon />
              </div>
            </div>
            <form onSubmit={handleLogin}>
              <div className="userName abc">
                <p>Kullanıcı Adı</p>
                <input
                  name="username"
                  className="textInput"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="password abc">
                <p>Şifre</p>
                <input
                  name="password"
                  className="textInput"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="controller">
                <div className="button">
                  <button type="submit" className="btn-card">
                    Giriş Yap
                  </button>
                </div>
                <div className="forgetPassword">
                  <a href="lll">
                    <p style={{ fontSize: "0.9rem" }}>Şifremi Unuttum</p>
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="loginSectionRight">
            <div className="title">
              <h3>Admin Login</h3>
            </div>

            <div className="button">
              <Link to={"/admins/kategoriekle"}>Categoriler</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
