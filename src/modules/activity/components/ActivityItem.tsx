import { useAppStore } from "../../../app/store";
import type { Activity } from "../../../types/activity.types";

import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const { users } = useAppStore();

  const newUser = users.find((user) => user.id === activity.userId);

  function formatAction(action: string) {
    switch (action) {
      case "PROJECT_CREATED":
        return "created a project";

      case "PROJECT_UPDATED":
        return "updated a project";

      case "PROJECT_ARCHIVED":
        return "archived a project";

      case "USER_CREATED":
        return "created a user";

      case "USER_UPDATED":
        return "updated a user";

      case "USER_DELETED":
        return "deleted a user";

      case "USER_LOGIN":
        return "logged in";

      case "ROLE_CHANGED":
        return "changed a role";

      case "USER_ACTIVATED":
        return "activate a user";

      case "USER_SUSPENDED":
        return "suspend a user";

      default:
        return action;
    }
  }

  const actionText = formatAction(activity.action);

  return (
    <div style={containerStyle}>
      <div style={userStyle}>
        {newUser?.name}
        {/* { equal above
          if (newUser !== undefined && newUser !== null) {
  return newUser.name;
} else {
  return undefined;
}
        } */}
      </div>

      <div style={timeStyle}>{actionText}</div>
      <div style={timeStyle}>{activity.metadata?.name}</div>
      <div style={timeStyle}>
        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
      </div>
    </div>
  );
}

export default ActivityItem;

const containerStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
};

const userStyle: React.CSSProperties = {
  fontWeight: 600,
};

const timeStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#888",
};
