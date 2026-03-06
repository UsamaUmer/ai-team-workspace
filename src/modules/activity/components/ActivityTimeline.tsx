import { useAppStore } from "../../../app/store";

import ActivityItem from "./ActivityItem";

function ActivityTimeline() {
  const { activities } = useAppStore();

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  console.log(activities);
  return (
    <div>
      {sortedActivities.length === 0 && <p>No activity found</p>}
      {sortedActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

export default ActivityTimeline;
