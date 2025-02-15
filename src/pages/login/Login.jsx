import { useState } from "react";
import "./Login.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/slices/authSlice";
import { handleApiError } from "../../utils/errorHandler";
import api from "../../api/api";

function Login() {
  const dispatch = useDispatch();
  const [isAccount, setIsAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = () => {
    setIsAccount(!isAccount);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/c-login", {
        username,
        password,
      });

      dispatch(setAccessToken(response.data.accessToken));
      console.log(response.data.accessToken);
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    }
  };

  return (
    <div className="login">
      <div className="container cont">
        {isAccount ? (
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
                <h3>Henüz üye değil misin?</h3>
              </div>

              <div className="button">
                <button onClick={handleButtonClick} className="button-uyeol">
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="loginSection">
            <div className="loginSectionLeft">
              <div className="title">
                <h2>Üye Ol</h2>
                <div className="socialMedia">
                  <InstagramIcon />
                </div>
              </div>
              <form>
                <div className="userName abc">
                  <p>Ad Soyad</p>
                  <input className="textInput" type="text" />
                </div>

                <div className="userMail abc">
                  <p>E-mail</p>
                  <input className="textInput" type="email" />
                </div>

                <div className="userPassword abc">
                  <p>Şifre</p>
                  <input className="textInput" type="password" />
                </div>

                <div className="controller">
                  <div className="button">
                    <button type="submit" className="btn-card">
                      Üye Ol
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="loginSectionRight">
              <div className="title">
                <h3>Hesabın var mı?</h3>
              </div>

              <div className="button">
                <button onClick={handleButtonClick} className="button-uyeol">
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
