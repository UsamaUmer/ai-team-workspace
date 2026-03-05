import { api } from "./axios";
import type { Project } from "../types/project.types";

export async function fetchProjects(): Promise<Project[]> {
  const res = await api.get("/projects");
  return res.data;
}

export async function createProjectApi(project: Project): Promise<Project> {
  const res = await api.post("/projects", project);
  return res.data;
}

export async function updateProjectApi(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data;
}

export async function deleteProjectApi(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}