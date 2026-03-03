// data/seed.ts

import type { User } from "../types/user.types";
import type { Project } from "../types/project.types";
import type { Activity } from "../types/activity.types";

/* =======================
   FIXED IDS
======================= */

export const USER_IDS = {
  SUPER_ADMIN: "user-super-admin",
  ADMIN_ONE: "user-admin-1",
  ADMIN_TWO: "user-admin-2",
  MEMBER_ONE: "user-member-1",
  MEMBER_TWO: "user-member-2",
  MEMBER_THREE: "user-member-3",
  MEMBER_INVITED: "user-member-invited",
  VIEWER_ONE: "user-viewer-1",
};

export const PROJECT_IDS = {
  AI_MARKETING: "project-ai-marketing",
  CRM_DASHBOARD: "project-crm-dashboard",
  INTERNAL_ANALYTICS: "project-internal-analytics",
  CLIENT_PORTAL: "project-client-portal",
};

export const ACTIVITY_IDS = {
  ACT1: "activity-1",
  ACT2: "activity-2",
  ACT3: "activity-3",
  ACT4: "activity-4",
  ACT5: "activity-5",
  ACT6: "activity-6",
  ACT7: "activity-7",
  ACT8: "activity-8",
};

/*TIMESTAMP HELPER */

const nowISO = () => new Date().toISOString();

/*USERS */

export const users: User[] = [
  // {
  //   id: USER_IDS.SUPER_ADMIN,
  //   name: "Ali Super Admin",
  //   email: "alisuper@saas.com",
  //   password: "alisuperAdmin",
  //   role: "SUPER_ADMIN",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.ADMIN_ONE,
  //   name: "Bilal Admin One",
  //   email: "bilaladmin1@saas.com",
  //   password: "bilalAdmin",
  //   role: "ADMIN",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.ADMIN_TWO,
  //   name: "Chery Admin Two",
  //   email: "cheryadmin2@saas.com",
  //   password: "cheryAdmin",
  //   role: "ADMIN",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.MEMBER_ONE,
  //   name: "David Member One",
  //   email: "davidmember1@saas.com",
  //   password: 'davidMember',
  //   role: "MEMBER",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.MEMBER_TWO,
  //   name: "Eliot Member Two",
  //   email: "eliotmember2@saas.com",
  //   password: 'eliotMember',
  //   role: "MEMBER",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.MEMBER_THREE,
  //   name: "Farhan Member Three",
  //   email: "farhanmember3@saas.com",
  //   password: "farhanMember",
  //   role: "MEMBER",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  //   lastLogin: nowISO(),
  // },
  // {
  //   id: USER_IDS.MEMBER_INVITED,
  //   name: "Gleen Pending Member",
  //   email: "gleenpending@saas.com",
  //   password: 'gleenPending',
  //   role: "MEMBER",
  //   status: "INVITED",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  // },
  // {
  //   id: USER_IDS.VIEWER_ONE,
  //   name: "Hassan Viewer One",
  //   email: "hassanviewer@saas.com",
  //   password: 'hassanViewer',
  //   role: "VIEWER",
  //   status: "ACTIVE",
  //   createdAt: nowISO(),
  //   updatedAt: nowISO(),
  // },
];

/*PROJECTS */
export const projects: Project[] = [
  {
    id: PROJECT_IDS.AI_MARKETING,
    name: "AI Marketing Platform",
    description: "AI powered marketing automation SaaS",
    status: "ACTIVE",
    visibility: "TEAM",
    members: [USER_IDS.ADMIN_ONE, USER_IDS.MEMBER_ONE],
    createdBy: USER_IDS.ADMIN_ONE,
    aiModel: "gpt-4",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: PROJECT_IDS.CRM_DASHBOARD,
    name: "CRM Dashboard",
    description: "Customer relationship management system",
    status: "ON_HOLD",
    visibility: "PRIVATE",
    members: [USER_IDS.ADMIN_TWO, USER_IDS.MEMBER_TWO],
    createdBy: USER_IDS.ADMIN_TWO,
    aiModel: "gpt-4-turbo",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: PROJECT_IDS.INTERNAL_ANALYTICS,
    name: "Internal Analytics",
    description: "Company performance tracking tool",
    status: "ACTIVE",
    visibility: "TEAM",
    members: [USER_IDS.SUPER_ADMIN, USER_IDS.MEMBER_THREE],
    createdBy: USER_IDS.SUPER_ADMIN,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: PROJECT_IDS.CLIENT_PORTAL,
    name: "Client Portal",
    description: "External client access platform",
    status: "ARCHIVED",
    visibility: "PRIVATE",
    members: [USER_IDS.ADMIN_ONE, USER_IDS.VIEWER_ONE],
    createdBy: USER_IDS.ADMIN_ONE,
    aiModel: "claude-3",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
];

/*ACTIVITIES*/
export const activities: Activity[] = [
  {
    id: ACTIVITY_IDS.ACT1,
    userId: USER_IDS.SUPER_ADMIN,
    action: "PROJECT_CREATED",
    entityType: "PROJECT",
    entityId: PROJECT_IDS.AI_MARKETING,
    timestamp: nowISO(),
    metadata: { name: "AI Marketing Platform" },
  },
  {
    id: ACTIVITY_IDS.ACT2,
    userId: USER_IDS.ADMIN_ONE,
    action: "PROJECT_UPDATED",
    entityType: "PROJECT",
    entityId: PROJECT_IDS.CRM_DASHBOARD,
    timestamp: nowISO(),
    metadata: { field: "status", oldValue: "ACTIVE", newValue: "ON_HOLD" },
  },
  {
    id: ACTIVITY_IDS.ACT3,
    userId: USER_IDS.ADMIN_ONE,
    action: "USER_INVITED",
    entityType: "USER",
    entityId: USER_IDS.MEMBER_INVITED,
    timestamp: nowISO(),
    metadata: { invitedBy: USER_IDS.ADMIN_ONE },
  },
  {
    id: ACTIVITY_IDS.ACT4,
    userId: USER_IDS.ADMIN_TWO,
    action: "PROJECT_ARCHIVED",
    entityType: "PROJECT",
    entityId: PROJECT_IDS.CLIENT_PORTAL,
    timestamp: nowISO(),
    metadata: { reason: "Completed client project" },
  },
  {
    id: ACTIVITY_IDS.ACT5,
    userId: USER_IDS.MEMBER_TWO,
    action: "USER_UPDATED",
    entityType: "USER",
    entityId: USER_IDS.MEMBER_TWO,
    timestamp: nowISO(),
    metadata: { field: "role", oldValue: "MEMBER", newValue: "ADMIN" },
  },
  {
    id: ACTIVITY_IDS.ACT6,
    userId: USER_IDS.MEMBER_THREE,
    action: "PROJECT_UPDATED",
    entityType: "PROJECT",
    entityId: PROJECT_IDS.INTERNAL_ANALYTICS,
    timestamp: nowISO(),
    metadata: { field: "aiModel", newValue: "gpt-4-turbo" },
  },
  {
    id: ACTIVITY_IDS.ACT7,
    userId: USER_IDS.VIEWER_ONE,
    action: "USER_INVITED",
    entityType: "USER",
    entityId: USER_IDS.MEMBER_INVITED,
    timestamp: nowISO(),
    metadata: { invitedBy: USER_IDS.VIEWER_ONE },
  },
  {
    id: ACTIVITY_IDS.ACT8,
    userId: USER_IDS.SUPER_ADMIN,
    action: "ROLE_CHANGED",
    entityType: "USER",
    entityId: USER_IDS.MEMBER_ONE,
    timestamp: nowISO(),
    metadata: { oldValue: "MEMBER", newValue: "ADMIN" },
  },
];
