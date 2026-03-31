import { useAppStore } from "../../../app/store";
import { formatDistanceToNow } from "date-fns";

// import ActivityPage from "../../activity/ActivityPage";

function ActivityFeed() {
  const activities = useAppStore((state) => state.activities);
  const users = useAppStore((state) => state.users);

  const latestActivities = activities.slice(-5).reverse();
  const userMap = new Map(users.map((user) => [user.id, user]));
  return (
    <div>
      {/* <ActivityPage></ActivityPage> */}
      {latestActivities
        ? latestActivities.map((activity) => {
            const userName = userMap.get(activity.userId);
            return (
              <div key={activity.id} style={{ marginBottom: "12px" }}>
                <strong>{userName?.name}</strong> performed {activity.action}
                <div style={{ fontSize: "12px", opacity: 0.7 }}>
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            );
          })
        : "No recent activity."}
    </div>
  );
}

export default ActivityFeed;
