import "./Login.scss";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useLoginForm } from "./hooks/useLoginForm";
import InstagramIcon from "@mui/icons-material/Instagram";

function Login() {
  const { isLogin, role, isAuthChecked } = useLoginForm();

  if (isLogin && role?.includes("CUSTOMER") && isAuthChecked) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Giriş Yap</h2>
              <div className="socialMedia">
                <InstagramIcon />
              </div>
            </div>

            <LoginForm />
          </div>
          <div className="loginSectionRight">
            <div className="title">
              <h3>Henüz üye değil misin?</h3>
            </div>

            <div className="button">
              <Link to={"/customerregister"} className="button-uyeol">
                Üye Ol
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
