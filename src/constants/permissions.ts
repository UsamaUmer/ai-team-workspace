import type { Role } from "../types/user.types";

export type Permission =
  | "VIEW_DASHBOARD"
  | "VIEW_USERS"
  | "CREATE_USER"
  | "EDIT_USER"
  | "DELETE_USER"
  | "VIEW_PROJECT"
  | "CREATE_PROJECT"
  | "EDIT_PROJECT"
  | "DELETE_PROJECT"
  | "VIEW_SETTINGS";

export const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "VIEW_DASHBOARD",
    "VIEW_USERS",
    "CREATE_USER",
    "EDIT_USER",
    "DELETE_USER",
    "VIEW_PROJECT",
    "CREATE_PROJECT",
    "EDIT_PROJECT",
    "DELETE_PROJECT",
    "VIEW_SETTINGS",
  ],

  ADMIN: [
    "VIEW_DASHBOARD",
    "VIEW_USERS",
    "CREATE_USER",
    "EDIT_USER",
    "VIEW_PROJECT",
    "CREATE_PROJECT",
    "EDIT_PROJECT",
    "VIEW_SETTINGS",
  ],

  MEMBER: ["VIEW_DASHBOARD", "VIEW_PROJECT"],

  VIEWER: ["VIEW_DASHBOARD"],
};
