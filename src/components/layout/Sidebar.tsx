import { NavLink } from "react-router-dom";
import { useHasPermission } from "../../hooks/useHasPermission";

import "./Sidebar.css";

function Sidebar() {
  const canViewUsers = useHasPermission("VIEW_USERS");
  const canViewDashboard = useHasPermission("VIEW_DASHBOARD");
  const canViewProjects = useHasPermission("VIEW_PROJECT");
  const canViewSettings = useHasPermission("VIEW_SETTINGS");
  const canViewActivity = useHasPermission("VIEW_ACTIVITY");

  return (
    <div className="sidebar">

      <h2 className="logo">AI Workspace</h2>

      <div className="menu">

        {canViewDashboard && (
          <NavLink to="/dashboard" end className="nav-link">
            Dashboard
          </NavLink>
        )}

        {canViewUsers && (
          <NavLink to="/dashboard/users" className="nav-link">
            Users
          </NavLink>
        )}

        {canViewProjects && (
          <NavLink to="/dashboard/projects" className="nav-link">
            Projects
          </NavLink>
        )}

        {canViewActivity && (
          <NavLink to="/dashboard/activity" className="nav-link">
            Activity
          </NavLink>
        )}

        {canViewSettings && (
          <NavLink to="/dashboard/settings" className="nav-link">
            Settings
          </NavLink>
        )}

      </div>

    </div>
  );
}

export default Sidebar;