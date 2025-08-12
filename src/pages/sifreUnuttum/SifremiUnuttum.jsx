import "./SifremiUnuttum.scss";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import SifreUnuttumForm from "./components/sifreUnuttumForm";
import { useSifremiUnuttumForm } from "./hooks/useSifremiUnuttumForm";

function SifremiUnuttum() {
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );

  const formik = useSifremiUnuttumForm();

  if (isLogin && role?.includes("CUSTOMER") && isAuthChecked) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sifremiUnuttum">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Şifremi Sıfırla</h2>
            </div>
            <SifreUnuttumForm formik={formik} />
          </div>

          <div className="loginSectionRight">
            <div className="title">
              <h3>Hesabınız var ise</h3>
            </div>

            <div className="button">
              <Link to={"/customerlogin"} className="button-uyeol">
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SifremiUnuttum;
