import { useEffect } from "react";
import { useAppStore } from "../../app/store";

import ProfileSettings from "./components/ProfileSettings";
import PasswordSettings from "./components/PasswordSettings";
import PreferencesSettings from "./components/PreferencesSettings";

function SettingsPage() {
  const { currentUser, loadUsers } = useAppStore();
  

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (!currentUser) return;

  return (
    <div>
      <h2>Setting Page {currentUser.name}</h2>
      <ProfileSettings></ProfileSettings>
      <PasswordSettings></PasswordSettings>
      <PreferencesSettings></PreferencesSettings>
    </div>
  );
}

export default SettingsPage;
