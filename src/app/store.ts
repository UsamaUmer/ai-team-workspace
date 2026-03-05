// app/store.ts
import { create } from "zustand";

import type { User } from "../types/user.types";
import type { Project } from "../types/project.types";
import type { Activity } from "../types/activity.types";

import {
  fetchUsers,
  createUserApi,
  deleteUserApi,
  updateUserApi,
} from "../services/user.service";

import {
  fetchActivities,
  createActivityApi,
} from "../services/activity.service";

import {
  fetchProjects,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../services/project.service";

// import { users, projects, activities, USER_IDS } from "../data/seed";

/* =======================
   App State Interface
======================= */
export interface AppState {
  /* -------------------
     STATE
  ------------------- */
  currentUser: User | null;
  users: User[];
  projects: Project[];
  activities: Activity[];
  isLoading: boolean;
  error: string | null;

  /* -------------------
     ACTIONS / MUTATIONS
  ------------------- */
  ///Users
  loadUsers: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  setCurrentUser: (user: User | null) => void;
  createUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => Promise<void>;

  //Projects
  loadProjects: () => Promise<void>;
  createProject: (project: Project) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  //Activity
  loadActivities: () => Promise<void>;
  addActivity: (activity: Activity) => void;
  resetStore: () => void;
  logout: () => void;
}

/* =======================
   Zustand Store
======================= */
const nowISO = () => new Date().toISOString();

let initialUser: User | null = null;
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    try {
      initialUser = JSON.parse(storedUser);
    } catch {
      initialUser = null;
    }
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  /* -------------------
     STATE
  ------------------- */
  currentUser: initialUser,
  users: [],
  projects: [],
  activities: [],
  isLoading: false,
  error: null,
  /* -------------------
     ACTIONS / MUTATIONS
  ------------------- */
  // login validation

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      // Always fetch fresh users from backend
      const users = await fetchUsers();

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim(),
      );

      if (!user) {
        set({ isLoading: false });
        return false;
      }

      if (user.password !== password || user.status !== "ACTIVE") {
        set({ isLoading: false });
        return false;
      }

      const updatedUser = await updateUserApi(user.id, {
        lastLogin: nowISO(),
        updatedAt: nowISO(),
      });

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      await get().addActivity({
        id: crypto.randomUUID(),
        userId: updatedUser.id,
        action: "USER_LOGIN",
        entityType: "USER",
        entityId: updatedUser.id,
        timestamp: nowISO(),
        metadata: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });

      set((state) => ({
        currentUser: updatedUser,
        users: state.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        ),
        isLoading: false,
      }));

      return true;
    } catch (error) {
      console.error("Login failed", error);
      set({
        error: "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  // from localhost://3000
  loadUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await fetchUsers();
      set({ users, isLoading: false });
    } catch (error) {
      console.error("Failed to load users", error);
      set({ error: "Failed to load users", isLoading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      await deleteUserApi(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.error("Delete failed", error);
    }
  },
  // Set or switch current user
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
    set({ currentUser: user });
  },

  // Add a new user
  createUser: async (user) => {
    try {
      const savedUser = await createUserApi(user);
      set((state) => ({
        users: [...state.users, savedUser],
      }));
    } catch (error) {
      console.error("Create user failed", error);
      throw error;
    }
  },

  // Update existing user by ID
  updateUser: async (id, data) => {
    try {
      const updatedUser = await updateUserApi(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
      }));
    } catch (error) {
      console.error("Update failed", error);
    }
  },

  // Add a new project
  loadProjects: async () => {
    set({ isLoading: true, error: null });

    try {
      const projects = await fetchProjects();
      set({ projects, isLoading: false });
    } catch (error) {
      console.error("Failed to load projects", error);
      set({ error: "Failed to load projects", isLoading: false });
    }
  },

  // Update existing project by ID
  createProject: async (project) => {
    try {
      const { currentUser } = get();
      if (!currentUser) return;

      const saved = await createProjectApi(project);

      set((state) => ({
        projects: [...state.projects, saved],
      }));

      // 🔥 Create Activity
      const activity: Activity = {
        id: crypto.randomUUID(),
        userId: currentUser.id,
        action: "PROJECT_CREATED",
        entityType: "PROJECT",
        entityId: saved.id,
        timestamp: nowISO(),
      };

      const savedActivity = await createActivityApi(activity);

      set((state) => ({
        activities: [...state.activities, savedActivity],
      }));
    } catch (error) {
      console.error("Create project failed", error);
      throw error;
    }
  },
  updateProject: async (id, data) => {
    try {
      const updated = await updateProjectApi(id, data);

      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (error) {
      console.error("Project update failed", error);
    }
  },
  deleteProject: async (id) => {
    try {
      const { currentUser } = get();
      if (!currentUser) return;

      await deleteProjectApi(id);

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
      const activity: Activity = {
        id: crypto.randomUUID(),
        userId: currentUser.id,
        action: "PROJECT_ARCHIVED",
        entityType: "PROJECT",
        entityId: id,
        timestamp: nowISO(),
      };

      const savedActivity = await createActivityApi(activity);

      set((state) => ({
        activities: [...state.activities, savedActivity],
      }));
    } catch (error) {
      console.error("Delete project failed", error);
    }
  },

  // Add a new activity
  addActivity: async (activity) => {
    try {
      const saved = await createActivityApi(activity);
      set((state) => ({
        activities: [...state.activities, saved],
      }));
    } catch (error) {
      console.error("Activity failed", error);
    }
  },

  // Reset entire store to initial seed
  resetStore: () => {
    localStorage.removeItem("currentUser");
    set({
      currentUser: null,
      users: [],
      projects: [],
      activities: [],
      isLoading: false,
      error: null,
    });
  },

  /// Activities
  loadActivities: async () => {
    set({ isLoading: true, error: null });
    try {
      const activities = await fetchActivities();
      set({ activities, isLoading: false });
    } catch (error) {
      console.error("Failed to load activities", error);
      set({ error: "Failed to load activities", isLoading: false });
    }
  },

  // Logout current user
  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },
}));
