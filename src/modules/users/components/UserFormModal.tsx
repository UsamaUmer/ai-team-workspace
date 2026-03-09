import { useState } from "react";
import { useAppStore } from "../../../app/store";
import type { User, Role } from "../../../types/user.types";
import { useToast } from "../../../hooks/useToast";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
}

const nowISO = () => new Date().toISOString();

function UserFormModal({ open, onClose }: UserFormModalProps) {
  const toast = useToast();
  const { users, currentUser, createUser, addActivity } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("MEMBER");
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("MEMBER");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const emailExist = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (emailExist) {
      setError("Email already exists.");
      return;
    }

    if (!currentUser) return;

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
      status: "ACTIVE",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };

    try {
      await createUser(newUser);

      addActivity({
        id: crypto.randomUUID(),
        action: "USER_CREATED",
        entityType: "USER",
        entityId: newUser.id,
        userId: currentUser.id,
        timestamp: nowISO(),
        metadata: { name: newUser.name, email: newUser.email },
      });

      resetForm();
      onClose();
      toast.success("User created successfully");
    } catch {
      setError("Something went wrong");
      toast.error("Failed to create user");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Create User</h3>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            {currentUser?.role === "SUPER_ADMIN" && (
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            )}
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
            <option value="VIEWER">VIEWER</option>
          </select>

          <div style={{ marginTop: "12px" }}>
            <button type="submit">Create</button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;

/* ======================
   Styling
====================== */

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};
