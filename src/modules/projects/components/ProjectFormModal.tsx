import { useEffect, useState } from "react";
import { useAppStore } from "../../../app/store";
import type { Project } from "../../../types/project.types";
import type { User } from "../../../types/user.types";

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
}

const nowISO = () => new Date().toISOString();

function ProjectFormModal({ open, onClose }: ProjectFormModalProps) {
  const { users, currentUser, createProject, addActivity, loadUsers } =
    useAppStore();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"TEAM" | "PRIVATE">("TEAM");
  const [aiModel, setAiModel] = useState("gpt-4");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const activeUsers = users.filter((u) => u.status === "ACTIVE");

  function toggleMember(userId: string) {
    setMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name required");
      return;
    }

    if (!description.trim()) {
      setError("Description required");
      return;
    }

    if (members.length === 0) {
      setError("Select at least one member");
      return;
    }

    if (!currentUser) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      status: "ACTIVE",
      visibility,
      members,
      createdBy: currentUser.id,
      aiModel,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };

    try {
      await createProject(newProject);

      await addActivity({
        id: crypto.randomUUID(),
        action: "PROJECT_CREATED",
        entityType: "PROJECT",
        entityId: newProject.id,
        userId: currentUser.id,
        timestamp: nowISO(),
        metadata: { name: newProject.name },
      });

      resetForm();
      onClose();
    } catch {
      setError("Failed to create project");
    }
  }

  function resetForm() {
    setName("");
    setDescription("");
    setMembers([]);
    setError(null);
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Create Project</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "TEAM" | "PRIVATE")
            }
          >
            <option value="TEAM">TEAM</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>

          <label>AI Model</label>
          <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="claude-3">Claude 3</option>
          </select>

          <label>Members</label>

          <div>
            {activeUsers.map((user: User) => (
              <label key={user.id} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={members.includes(user.id)}
                  onChange={() => toggleMember(user.id)}
                />
                {user.name}
              </label>
            ))}
          </div>

          <div style={{ marginTop: "12px" }}>
            <button type="submit">Create</button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "350px",
};
