import { api } from "./axios";
import type { Project } from "../types/project.types";

export async function fetchProjects(): Promise<Project[]> {
  const response = await api.get("/projects");
  return response.data;
}

export async function createProjectApi(project: Project): Promise<Project> {
  const response = await api.post("/projects", project);
  return response.data;
}

export async function updateProjectApi(
  id: string,
  data: Partial<Project>,
): Promise<Project> {
  const response = await api.patch(`/projects/${id}`, data);
  return response.data;
}

export async function deleteProjectApi(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
