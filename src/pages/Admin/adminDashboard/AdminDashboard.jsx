import "./AdminDashboard.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Navbar from "../../../components/Admin/Navbar/Navbar";
import Alert from "./Alert/Alert";

function Panel() {
  return (
    <div className="panel">
      <Sidebar />
      <div className="panelRight">
        <Navbar />
        <section className="container">
          <Outlet />
        </section>
        <Alert />
      </div>
    </div>
  );
}

export default Panel;
