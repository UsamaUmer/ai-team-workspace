import { useAppStore } from "../../app/store";
import { useEffect } from "react";

import ActivityTimeline from "./components/ActivityTimeline";

function ActivityPage() {
  const { isLoading, loadActivities, loadUsers } = useAppStore();

  useEffect(() => {
    loadActivities();
    loadUsers();
  }, [loadActivities, loadUsers]);


  return (
    <div>
      <h2>Activity Timeline</h2>

      {isLoading ? <p>Loading activity...</p> : <ActivityTimeline />}
    </div>
  );
}

export default ActivityPage;
