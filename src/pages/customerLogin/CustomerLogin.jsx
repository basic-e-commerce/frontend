import "./CustomerLogin.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CustomerLoginForm from "./components/CustomerLoginForm";
import { useCustomerLoginForm } from "./hooks/useCustomerLoginForm";

function CustomerLogin() {
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );

  const formik = useCustomerLoginForm();

  if (isLogin && role?.includes("CUSTOMER") && isAuthChecked) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="customerLogin">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Üye Ol</h2>
              <div className="socialMedia">
                <InstagramIcon />
              </div>
            </div>
            <CustomerLoginForm formik={formik} />
          </div>

          <div className="loginSectionRight">
            <div className="title">
              <h3>Hesabınız var ise</h3>
            </div>

            <div className="button">
              <Link to={"/login"} className="button-uyeol">
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
