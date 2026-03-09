import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastContainer from "../ui/ToastContainer";

function DashboardLayout() {
  return (
    <div className="layout" style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div className="main" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

        <div className="content" style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default DashboardLayout;
