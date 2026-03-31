/*
import ConfirmModal from '../../../components/ui/ConfirmModal';
import { useAppStore } from '../../../app/store';
import { useHasPermission } from '../../../hooks/useHasPermission';
import { useState } from 'react';
import type { User } from '../../../types/user.types';
import type { Activity } from '../../../types/activity.types';

const nowISO = () => new Date().toISOString();

function UsersTable() {
  const users = useAppStore((s) => s.users);
  const currentUser = useAppStore((s) => s.currentUser);
  const updateUser = useAppStore((s) => s.updateUser);
//   const setState = useAppStore.setState;
  const addActivity = useAppStore((s) => s.addActivity);

  const canEdit = useHasPermission("EDIT_USER");
  const canDelete = useHasPermission("DELETE_USER");

  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmUser, setConfirmUser] = useState<User | null>(null);

  function toggleDropdown(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function isLastAdmin(user: User): boolean {
    const admins = users.filter(
      (u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN",
    );
    return admins.length <= 1 && user.role === "ADMIN";
  }

  function handleDeleteClick(user: User) {
    if (!currentUser) return;

    if (user.id === currentUser.id) {
      alert("You cannot delete yourself");
      return;
    }

    if (isLastAdmin(user)) {
      alert("Cannot delete last admin");
      return;
    }

    setConfirmUser(user);
  }

  function confirmDelete() {
    if (!confirmUser || !currentUser) return;

    useAppStore.setState((state) => ({
      users: state.users.filter((u) => u.id !== confirmUser.id),
    }));

    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: "USER_DELETED",
      entityType: "USER",
      entityId: confirmUser.id,
      timestamp: nowISO(),
    };

    addActivity(activity);
    setConfirmUser(null);
  }

  function handleSuspendToggle(user: User) {
    if (!currentUser) return;

    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    updateUser(user.id, { status: newStatus });

    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: newStatus === "SUSPENDED" ? "USER_SUSPENDED" : "USER_ACTIVATED",
      entityType: "USER",
      entityId: user.id,
      timestamp: nowISO(),
    };

    addActivity(activity);
  }

  function handleRoleChange(user: User) {
    if (!currentUser) return;

    if (user.role === "SUPER_ADMIN") return;

    if (user.id === currentUser.id) {
      alert("You cannot change your own role");
      return;
    }

    const newRole = user.role === "ADMIN" ? "MEMBER" : "ADMIN";

    updateUser(user.id, { role: newRole });

    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: "ROLE_CHANGED",
      entityType: "USER",
      entityId: user.id,
      timestamp: nowISO(),
      metadata: {
        oldValue: user.role,
        newValue: newRole,
      },
    };

    addActivity(activity);
  }

  return (
    <>
      <table width="100%" border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.lastLogin ?? "Never"}</td>

              <td>
                {(canEdit || canDelete) && (
                  <>
                    <button onClick={() => toggleDropdown(user.id)}>⋮</button>

                    {openId === user.id && (
                      <div style={{ background: "#eee", padding: 8 }}>
                        {canEdit && (
                          <>
                            <button onClick={() => handleRoleChange(user)}>
                              Change Role
                            </button>

                            <button onClick={() => handleSuspendToggle(user)}>
                              {user.status === "ACTIVE"
                                ? "Suspend"
                                : "Activate"}
                            </button>
                          </>
                        )}

                        {canDelete && (
                          <button onClick={() => handleDeleteClick(user)}>
                            Delete
                          </button>
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
        open={!!confirmUser}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${confirmUser?.name}?`}
        onCancel={() => setConfirmUser(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default UsersTable;
*/

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../../../app/store";
import { useHasPermission } from "../../../hooks/useHasPermission";
import type { User } from "../../../types/user.types";
import type { Activity } from "../../../types/activity.types";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import "../../../components/ui/Table/Table.css";

import React from "react";
import Button from "../../../components/ui/Button/Button";

const nowISO = () => new Date().toISOString();

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

function UsersTable() {
  const users = useAppStore((state) => state.users);
  const currentUser = useAppStore((state) => state.currentUser);
  const updateUser = useAppStore((state) => state.updateUser);
  const addActivity = useAppStore((state) => state.addActivity);
  const deleteUser = useAppStore((state) => state.deleteUser);

  const canEdit = useHasPermission("EDIT_USER");
  const canDelete = useHasPermission("DELETE_USER");

  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmUser, setConfirmUser] = useState<User | null>(null);
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

  /// checking the last admin

  function isLastAdmin(user: User): boolean {
    const admins = users.filter(
      (u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN",
    );
    return admins.length <= 1 && user.role === "ADMIN";
  }

  /// checking user condition on deletion
  function handleDeleteClick(user: User) {
    if (!currentUser) return;
    if (user.id === currentUser.id) {
      // alert("You cannot delete yourself");
      alert(`${user.name} can not delete ${currentUser.name}`);
      return;
    }
    if (isLastAdmin(user)) {
      alert(`${user.name} is last admin, so It can not be deleted`);
      return;
    }

    setConfirmUser(user);
  }

  // Confirming delete user

  async function confirmDelete() {
    if (!confirmUser || !currentUser) return;

    await deleteUser(confirmUser.id);

    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: "USER_DELETED",
      entityType: "USER",
      entityId: confirmUser.id,
      timestamp: nowISO(),
    };

    addActivity(activity); /// updateing the activiny in store
    setConfirmUser(null);
  }

  // handling status to suspended or active
  function handleSuspendToggle(user: User) {
    if (!currentUser) return;
    if (user.id === currentUser.id) {
      alert("You cannot suspend yourself");
      return;
    }

    if (user.role === "SUPER_ADMIN") {
      alert("Super Admin cannot be suspended");
      return;
    }

    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"; // checking present status and altering it
    updateUser(user.id, { status: newStatus });
    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: newStatus === "SUSPENDED" ? "USER_SUSPENDED" : "USER_ACTIVATED",
      entityType: "USER",
      entityId: user.id,
      timestamp: nowISO(),
    };

    addActivity(activity);
  }

  function handleRoleChange(user: User) {
    if (!currentUser) return; // check if current user is null
    if (user.role === "SUPER_ADMIN") {
      alert("SUPER ADMIN role cannot be changed");
      return;
    } // check if the current user is not SuperAdmin

    if (user.id === currentUser.id) {
      alert(`${user.name} can not change his/her own role`);
      return;
    }
    const newRole = user.role === "ADMIN" ? "MEMBER" : "ADMIN";

    updateUser(user.id, { role: newRole });

    const activity: Activity = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      action: "ROLE_CHANGED",
      entityType: "USER",
      entityId: user.id,
      timestamp: nowISO(),
      metadata: {
        oldValue: user.role,
        newValue: newRole,
      },
    };

    addActivity(activity);
  }

  // styling



  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
            >
              <td>
                <span style={{ fontWeight: 500, color: "#111827" }}>
                  {user.name}
                </span>
              </td>
              <td>{user.email}</td>
              <td>
                <span
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    padding: "2px 9px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {user.role}
                </span>
              </td>
              <td>
                <span style={getStatusBadgeStyle(user.status)}>
                  {user.status}
                </span>
              </td>
              <td>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </td>
              <td style={{ position: "relative" }}>
                {(canEdit || canDelete) && (
                  <>
                    <Button
                      onClick={() => toggleDropdown(user.id)}
                      variant="ghost"
                    >
                      ⋮
                    </Button>

                    {openId === user.id && (
                      <div ref={dropdownRef} style={dropdownStyle}>
                        {canEdit && (
                          <>
                            <DropdownItem
                              label="Change Role"
                              onClick={() => {
                                handleRoleChange(user);
                                setOpenId(null);
                              }}
                            />

                            <DropdownItem
                              label={
                                user.status === "ACTIVE"
                                  ? "Suspend"
                                  : "Activate"
                              }
                              onClick={() => {
                                handleSuspendToggle(user);
                                setOpenId(null);
                              }}
                            />
                          </>
                        )}

                        {canDelete && (
                          <DropdownItem
                            label="Delete"
                            danger
                            onClick={() => {
                              handleDeleteClick(user);
                              setOpenId(null);
                            }}
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
        open={!!confirmUser}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${confirmUser?.name}?`}
        onCancel={() => setConfirmUser(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default UsersTable;

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

const dropdownItemStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
};

function getStatusBadgeStyle(status: User["status"]): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
    display: "inline-block",
  };

  switch (status) {
    case "ACTIVE":
      return {
        ...baseStyle,
        backgroundColor: "#dcfce7",
        color: "#166534",
      };

    case "INVITED":
      return {
        ...baseStyle,
        backgroundColor: "#dbeafe",
        color: "#1e40af",
      };

    case "SUSPENDED":
      return {
        ...baseStyle,
        backgroundColor: "#fee2e2",
        color: "#991b1b",
      };

    default:
      return baseStyle;
  }
}
