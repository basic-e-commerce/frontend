import "./AdminDashboard.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Navbar from "../../../components/Admin/Navbar/Navbar";
import Alert from "./Alert/Alert";
import { useSelector } from "react-redux";
import LoadingBar from "../../../components/LoadingBar";

function Panel() {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <div className="panel">
      <Sidebar />
      <div className="panelRight">
        <Navbar />
        <section className="container">
          <Outlet />
        </section>
        <Alert />
        <LoadingBar isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Panel;
