import "./AdminDashboard.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Navbar from "../../../components/Admin/Navbar/Navbar";

function Panel() {
  return (
    <div className="panel">
      <Sidebar />
      <div className="panelRight">
        <Navbar />
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Panel;
