import UsersTable from "./components/UsersTable";
import UserFormModal from "./components/UserFormModal";
import { useAppStore } from "../../app/store";
import { useState, useEffect } from "react";

import { useHasPermission } from "../../hooks/useHasPermission";

function UsersPage() {
  const canViewUsers = useHasPermission("VIEW_USERS");
  const canCreateUser = useHasPermission("CREATE_USER");

  const loadUsers = useAppStore((state) => state.loadUsers);
  useEffect(() => {
    loadUsers();
  }, []);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreateModal = () => setIsCreateOpen(true);
  const closeCreateModal = () => setIsCreateOpen(false);

  if (!canViewUsers) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Users</h2>
        {canCreateUser && (
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={openCreateModal}
          >
            + Create User
          </button>
        )}
      </div>
      <UsersTable></UsersTable>
      <UserFormModal open={isCreateOpen} onClose={closeCreateModal} />
    </div>
  );
}

export default UsersPage;
