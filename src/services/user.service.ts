import { api } from "./axios";
import type { User } from "../types/user.types";

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get("/users");
  return response.data;
}

export async function createUserApi(user: User): Promise<User> {
  const response = await api.post("/users", user);
  return response.data;
}

export async function updateUserApi(
  id: string,
  data: Partial<User>
): Promise<User> {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
}

export async function deleteUserApi(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}