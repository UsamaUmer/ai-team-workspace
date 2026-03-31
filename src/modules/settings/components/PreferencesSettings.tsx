import { useState } from "react";
import Button from "../../../components/ui/Button/Button";

function PreferencesSettings() {
  const stored = localStorage.getItem("preferences");

  const initial = stored ? JSON.parse(stored) : {};

  const [aiModel, setAiModel] = useState(initial.aiModel || "gpt-4");
  const [theme, setTheme] = useState(initial.theme || "light");

  function handleSave() {
    const preferences = {
      aiModel,
      theme,
    };

    localStorage.setItem("preferences", JSON.stringify(preferences));

    alert("Preferences saved");
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Preferences</h3>

      <label>AI Model</label>

      <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-4-turbo">GPT-4 Turbo</option>
        <option value="claude-3">Claude</option>
      </select>

      <label>Theme</label>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
    </div>
  );
}

export default PreferencesSettings;
    