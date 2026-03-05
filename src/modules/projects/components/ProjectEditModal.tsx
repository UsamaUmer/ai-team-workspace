import React, { useState, useEffect } from "react";
import { useAppStore } from "../../../app/store";
import type { User } from "../../../types/user.types";
import type { Project } from "../../../types/project.types";

interface ProjectEditModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

const nowISO = () => new Date().toISOString();

function ProjectEditModal({ open, project, onClose }: ProjectEditModalProps) {
  const { users, currentUser, updateProject, addActivity } = useAppStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"TEAM" | "PRIVATE">("TEAM");
  const [aiModel, setAiModel] = useState("gpt-4");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const activeUsers = users.filter((u) => u.status === "ACTIVE");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setVisibility(project.visibility);
      setAiModel(project.aiModel || "gpt-4");
      setMembers(project.members || []);
    }
  }, [project]);

  if (!open || !project) return null;

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
      setError("Project name Required");
      return;
    }
    if (!description.trim()) {
      setError("Description Required");
      return;
    }
    if (members.length === 0) {
      setError("Select at least one member");
      return;
    }

    if (!currentUser) return;
    if (!project) return;
    try {
      await updateProject(project.id, {
        name,
        description,
        visibility,
        aiModel,
        members,
        updatedAt: nowISO(),
      });

      await addActivity({
        id: crypto.randomUUID(),
        action: "PROJECT_UPDATED",
        entityType: "PROJECT",
        entityId: project.id,
        userId: currentUser.id,
        timestamp: nowISO(),
        metadata: { name },
      });

      onClose();
    } catch {
      setError("Update failed");
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit Project</h3>

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
            <button type="submit">Save Changes</button>

            <button
              type="button"
              onClick={() => {
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

export default ProjectEditModal;

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
