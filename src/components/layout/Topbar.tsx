import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../app/store";

import "./Topbar.css";
import Button from "../ui/Button/Button";

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function getPageTitle(path: string) {
    if (path.includes("/users")) return "Users";
    if (path.includes("/projects")) return "Projects";
    if (path.includes("/activity")) return "Activity";
    if (path.includes("/settings")) return "Settings";

    return "Dashboard";
  }

  const title = getPageTitle(location.pathname);

  return (
    <div className="topbar">
      <div>{title}</div>

      <div className="user">
        <img
          src={currentUser?.avatar || "https://i.pravatar.cc/40"}
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
        Welcome,{" "}
        <span>
          {currentUser?.name} ({currentUser?.role})
        </span>
        <Button onClick={handleLogout} variant="primary">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
