import React, { useState } from "react";
import { useAppStore } from "../../../app/store";
import Button from "../../../components/ui/Button/Button";

function ProfileSettings() {
  const { currentUser, updateUser } = useAppStore();

  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser) return;

    if (!name.trim()) {
      setError("Name property required");
      return;
    }

    try {
      await updateUser(currentUser.id, {
        name,
        avatar,
        updatedAt: new Date().toISOString(),
      });
      alert("Profile updated");
    } catch {
      setError("Failed to update profile");
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Profile Settings</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <Button variant="primary" type="submit">Save</Button>
      </form>
    </div>
  );
}

export default ProfileSettings;
