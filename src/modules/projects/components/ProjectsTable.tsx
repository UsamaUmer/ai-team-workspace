import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../../../app/store";
import { useHasPermission } from "../../../hooks/useHasPermission";
import type { Project } from "../../../types/project.types";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import ProjectEditModal from "./ProjectEditModal";
import "../../../components/ui/Table/Table.css";
import Button from "../../../components/ui/Button/Button";
// import Button from "../../../components/ui/Button/Button";

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#9ca3af",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};

function ProjectsTable() {
  const projects = useAppStore((state) => state.projects);
  const deleteProject = useAppStore((state) => state.deleteProject);
  const addActivity = useAppStore((state) => state.addActivity);
  const currentUser = useAppStore((state) => state.currentUser);

  const canEdit = useHasPermission("EDIT_PROJECT");
  const canDelete = useHasPermission("DELETE_PROJECT");

  /// editing project

  const [editProject, setEditProject] = useState<Project | null>(null);

  const [confirmProject, setConfirmProject] = useState<Project | null>(null);

  async function handleDelete(project: Project) {
    if (!currentUser) return;

    await deleteProject(project.id);

    await addActivity({
      id: crypto.randomUUID(),
      action: "PROJECT_ARCHIVED",
      entityType: "PROJECT",
      entityId: project.id,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
    });

    setConfirmProject(null);
  }

  const [openId, setOpenId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function toggleDropdown(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }
  const tdStyle = {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f9fafb",
    verticalAlign: "middle",
  };

  return (
    <>
      <table className="table">
        <thead >
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Visibility</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
            >
              <td>{project.name}</td>
              <td>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor:
                      project.status === "ACTIVE"
                        ? "#dcfce7"
                        : project.status === "ARCHIVED"
                          ? "#fee2e2"
                          : "#fef9c3",
                    color:
                      project.status === "ACTIVE"
                        ? "#166534"
                        : project.status === "ARCHIVED"
                          ? "#991b1b"
                          : "#92400e",
                  }}
                >
                  {project.status}
                </span>
              </td>
              <td>{project.visibility}</td>
              <td>{project.members?.length || 0}</td>

              <td style={{ position: "relative" }}>
                {(canEdit || canDelete) && (
                  <>
                    <Button
                      onClick={() => toggleDropdown(project.id)}
                      // style={actionButtonStyle}
                      variant="ghost"
                    >
                      ⋮
                    </Button>

                    {openId === project.id && (
                      <div ref={dropdownRef} style={dropdownStyle}>
                        {canEdit && (
                          <DropdownItem
                            label="Edit"
                            onClick={() => {
                              setEditProject(project);
                              setOpenId(null);
                            }}
                          />
                        )}
                        {canDelete && (
                          <DropdownItem
                            label="Delete"
                            danger
                            onClick={() => setConfirmProject(project)}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={confirmProject ? true : false}
        title="Confirm Delete"
        description={`Delete ${confirmProject?.name}?`}
        onCancel={() => setConfirmProject(null)}
        onConfirm={() => confirmProject && handleDelete(confirmProject)}
      />
      <ProjectEditModal
        open={editProject ? true : false}
        project={editProject}
        onClose={() => setEditProject(null)}
      />
    </>
  );
}

export default ProjectsTable;

const dropdownItemStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
};
interface DropdownItemProps {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

function DropdownItem({ label, onClick, danger }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...dropdownItemStyle,
        color: danger ? "#d32f2f" : "#333",
      }}
    >
      {label}
    </button>
  );
}


const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: "30px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  padding: "6px 0",
  minWidth: "160px",
  zIndex: 100,
};
