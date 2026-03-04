export type EntityType =
  | "USER"
  | "PROJECT";

export type ActivityAction =
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_SUSPENDED"
  | "USER_ACTIVATED"
  | "USER_DELETED"
  | "USER_INVITED"
  | "ROLE_CHANGED"
  | "PROJECT_CREATED"
  | "PROJECT_UPDATED"
  | "PROJECT_ARCHIVED"
  | "PROJECT_DELETED"
  | "USER_LOGIN";

export interface Activity {
  id: string;
  userId: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId: string;
  metadata?: Record<string, string>;
  timestamp: string;
}
