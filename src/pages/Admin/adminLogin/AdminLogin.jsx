import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { useAdminLoginForm } from "./hooks/useAdminLoginForm";
import AdminLoginForm from "./components/AdminLoginForm";
import "./AdminLogin.scss";

function AdminLogin() {
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );
  const { isLoading } = useSelector((state) => state.loading);
  const { handleSubmit } = useAdminLoginForm();

  if (!isAuthChecked) {
    return <Loading />;
  }

  if (isLogin && role?.includes("ADMIN") && isAuthChecked) {
    return <Navigate to="/admins/dashboard" replace />;
  }

  return (
    <div className="loginAdmin">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Admin Giriş</h2>
              <div className="socialMedia"></div>
            </div>
            <AdminLoginForm handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          <div className="loginSectionRight">
            <div className="title">
              <h3>Admin Login</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
