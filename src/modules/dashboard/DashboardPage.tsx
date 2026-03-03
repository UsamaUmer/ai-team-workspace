import { useAppStore } from "../../app/store";

import StatsCard from "./components/StatsCard";
import ActivityFeed from "./components/ActivityFeed";
import ProjectsOverview from "./components/ProjectsOverview";
import { useEffect } from "react";

function DashboardPage() {
  const loadUsers = useAppStore((state)=> {return state.loadUsers});
  const loadActivities = useAppStore((state)=> {return state.loadActivities});
  const loadProjects = useAppStore((state)=>{return state.loadProjects});
  useEffect(() => {
    loadUsers();
    loadActivities();
    loadProjects();
  }, []);

  const users = useAppStore((state) => state.users);
  const projects = useAppStore((state) => state.projects);
  const activities = useAppStore((state) => state.activities);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Stats Row */}
      <h2>Overview</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <StatsCard title="Total Users" value={users.length} />
        <StatsCard title="Total Projects" value={projects.length} />
        <StatsCard title="Total Activities" value={activities.length} />
      </div>

      {/* Activity Feed */}
      <h2>Recent Activity</h2>
      <ActivityFeed />

      {/* Projects Overview */}
      <h2>Projects</h2>
      <ProjectsOverview />
    </div>
  );
}

export default DashboardPage;

// import { useAppStore } from "../../app/store";
// import { useNavigate } from "react-router-dom";
// import { useHasPermission } from "../../hooks/useHasPermission";

// function DashboardPage() {
//   const navigate = useNavigate();
//   const logout = useAppStore((state) => state.logout);
//   const currentUser = useAppStore((state) => state.currentUser);
//   // const activities = useAppStore((state)=> state.projects);

//   const canCreateUser = useHasPermission("VIEW_DASHBOARD");
//   //   const canCreateUser = useHasPermission('VIEW_USERS');
//   //   const canCreateUser = useHasPermission('DELETE_PROJECT');

//   function handleLogout() {
//     logout();
//     navigate("/login");
//     // console.log(activities);
//     // console.log(currentUser);
//     // console.log(canCreateUser);
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* {currentUser?.name}  could also write below logic*/}
//       <p>Welcome, {currentUser && currentUser.name}</p>
//       {canCreateUser}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default DashboardPage;
