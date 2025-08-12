import "./SifreYenileme.scss";
import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSifreYenilemeValidation } from "./hooks/useSifreYenilemeValidation";
import SifreYenilemeForm from "./components/SifreYenilemeForm";

function SifreYenileme() {
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );
  const [searchParams] = useSearchParams();
  const generateCode = searchParams.get("generateCode");
  const formik = useSifreYenilemeValidation(generateCode);

  if (isLogin && role?.includes("CUSTOMER") && isAuthChecked) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="customerLogin">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Şifre Yenileme</h2>
            </div>
            <SifreYenilemeForm formik={formik} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SifreYenileme;
