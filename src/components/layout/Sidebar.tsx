import { NavLink } from "react-router-dom";
import { useHasPermission } from "../../hooks/useHasPermission";

function Sidebar() {
  const canViewUsers = useHasPermission("VIEW_USERS");
  const canViewDashboard = useHasPermission("VIEW_DASHBOARD");
  const canViewProjects = useHasPermission("VIEW_PROJECT");
  const canViewSettings = useHasPermission("VIEW_SETTINGS");

  return (
    <div
      style={{
        width: "220px",
        background: "#bfbbbb",
        color: "#fff",
        padding: "20px",
        
      }}
    >
      <h2>AI Workspace</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        {canViewDashboard && (
          <NavLink
            to="/dashboard" end
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Dashboard
          </NavLink>
        )}

        {canViewUsers && (
          <NavLink
            to="/dashboard/users"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Users
          </NavLink>
        )}

        {canViewProjects && (
          <NavLink
            to="/dashboard/projects"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Projects
          </NavLink>
        )}

        {canViewSettings && (
          <NavLink
            to="/dashboard/settings"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Settings
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
