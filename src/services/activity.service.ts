import { api } from "./axios";
import type { Activity } from "../types/activity.types";

export async function fetchActivities(): Promise<Activity[]> {
  const response = await api.get("/activities");
  return response.data;
}

export async function createActivityApi(activity: Activity): Promise<Activity> {
  const response = await api.post("/activities", activity);
  return response.data;
}
