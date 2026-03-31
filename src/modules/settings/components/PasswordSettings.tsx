import React, { useState } from "react";
import { useAppStore } from "../../../app/store";
import Button from "../../../components/ui/Button/Button";

function PasswordSettings() {
  const { currentUser, updateUser } = useAppStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser) return;

    if (currentPassword !== currentUser.password) {
      setError("Incorrect current password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await updateUser(currentUser.id, {
        password: newPassword,
        updatedAt: new Date().toISOString(),
      });

      alert("Password updated");
    } catch {
      setError("Update failed");
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Password Settings</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button variant="primary" type="submit">Update Password</Button>
      </form>
    </div>
  );
}

export default PasswordSettings;
