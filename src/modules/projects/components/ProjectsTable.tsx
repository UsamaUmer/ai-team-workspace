import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../../../app/store";
import { useHasPermission } from "../../../hooks/useHasPermission";
import type { Project } from "../../../types/project.types";
import ConfirmModal from "../../../components/ui/ConfirmModal";

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
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "visible",
        background: "#fff",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Visibility</th>
            <th style={thStyle}>Members</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              style={{ transition: "background 0.1s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fafafa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={tdStyle}>{project.name}</td>
              <td style={tdStyle}>
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
              <td style={tdStyle}>{project.visibility}</td>
              <td style={tdStyle}>{project.members?.length || 0}</td>

              {/* <td>
                {(canEdit || canDelete) && (
                  <>
                    {canDelete && (
                      <button onClick={() => setConfirmProject(project)}>
                        Delete
                      </button>
                    )}
                  </>
                )}
              </td> */}
              <td style={{ position: "relative" }}>
                {(canEdit || canDelete) && (
                  <>
                    <button
                      onClick={() => toggleDropdown(project.id)}
                      style={actionButtonStyle}
                    >
                      ⋮
                    </button>

                    {openId === project.id && (
                      <div ref={dropdownRef} style={dropdownStyle}>
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
        open={!!confirmProject}
        title="Confirm Delete"
        description={`Delete ${confirmProject?.name}?`}
        onCancel={() => setConfirmProject(null)}
        onConfirm={() => confirmProject && handleDelete(confirmProject)}
      />
    </div>
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
const actionButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  padding: "4px 8px",
};

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
