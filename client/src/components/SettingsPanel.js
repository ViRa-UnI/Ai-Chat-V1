import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../redux/userReducer';

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.user.settings);
  const [theme, setTheme] = useState(settings.theme);
  const [font, setFont] = useState(settings.font);
  const [aiResponseBehavior, setAiResponseBehavior] = useState(settings.aiResponseBehavior);

  const handleSaveSettings = () => {
    dispatch(updateSettings({ theme, font, aiResponseBehavior }));
  };

  return (
    <div className="settings-panel">
      <h2>Chat Settings</h2>
      <div className="settings-option">
        <label htmlFor="theme-select">Theme:</label>
        <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="font-select">Font:</label>
        <select id="font-select" value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="response-behavior-select">AI Response Behavior:</label>
        <select id="response-behavior-select" value={aiResponseBehavior} onChange={(e) => setAiResponseBehavior(e.target.value)}>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="humorous">Humorous</option>
        </select>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default SettingsPanel;