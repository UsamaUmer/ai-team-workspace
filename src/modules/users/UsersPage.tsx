import UsersTable from "./components/UsersTable";
import UserFormModal from "./components/UserFormModal";
import Card from "../../components/Card/Card";

import { useAppStore } from "../../app/store";
import { useState, useEffect } from "react";

import { useHasPermission } from "../../hooks/useHasPermission";
import Button from "../../components/ui/Button/Button";

function UsersPage() {
  const canViewUsers = useHasPermission("VIEW_USERS");
  const canCreateUser = useHasPermission("CREATE_USER");
  const isLoading = useAppStore((state) => state.isLoading);

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
          <Button variant="ghost" onClick={openCreateModal}>
            + Create User
          </Button>
        )}
      </div>
      <Card>
        {isLoading ? <p>Loading Users...</p> : <UsersTable></UsersTable>}
      </Card>
      <UserFormModal open={isCreateOpen} onClose={closeCreateModal} />
    </div>
  );
}

export default UsersPage;
