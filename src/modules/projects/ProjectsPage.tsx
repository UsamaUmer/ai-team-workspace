import { useAppStore } from "../../app/store";
import { useEffect, useState } from "react";
import { useHasPermission } from "../../hooks/useHasPermission";
import ProjectsTable from "./components/ProjectsTable";
import ProjectFormModal from "./components/ProjectFormModal";

function ProjectsPage() {
  const loadProjects = useAppStore((s) => s.loadProjects);
  const isLoading = useAppStore((s) => s.isLoading);

  const canViewProjects = useHasPermission("VIEW_PROJECT");
  const canCreateProject = useHasPermission("CREATE_PROJECT");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (!canViewProjects) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Projects</h2>

        {canCreateProject && (
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setIsCreateOpen(true)}
          >
            + Create Project
          </button>
        )}
      </div>

      {isLoading ? <p>Loading projects...</p> : <ProjectsTable />}

      <ProjectFormModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}

export default ProjectsPage;
