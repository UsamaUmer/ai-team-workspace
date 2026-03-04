import { useAppStore } from "../../app/store";
import { useEffect } from "react";
import { useHasPermission } from "../../hooks/useHasPermission";
import ProjectsTable from "./components/ProjectsTable";

// import ProjectsTab

function ProjectsPage() {
  const loadProjects = useAppStore((s) => s.loadProjects);
  const isLoading = useAppStore((s) => s.isLoading);
  const canViewProjects = useHasPermission("VIEW_PROJECT");

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);
  if (!canViewProjects) return null;

  return (
    <div>
      <h2>Projects</h2>
      {isLoading ? <p>Loading projects...</p> : <ProjectsTable />}
    </div>
  );
}

export default ProjectsPage;
