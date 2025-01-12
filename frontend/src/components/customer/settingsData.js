import React, { useState, useEffect } from "react";

const SettingsData = ({ settingsData }) => {
  const [settings, setSettings] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, [name]: checked };
      console.log(updatedSettings);

      // API call to set the new settings data

      return updatedSettings;
    });
  };

  useEffect(() => {
    setSettings(settingsData);
  }, [settingsData]);

  return (
    <div className="p-6 bg-white border-red-500 border-2 rounded-lg shadow-2xl w-full sm:w-3/4 md:w-1/2 mx-auto my-4">

      {/* Planner Active - Non-editable */}
      <div className="text-red-500 flex items-center space-x-4 mb-4">
        <label className="text-sm">Is the Planner Active:</label>
        <input
          type="checkbox"
          checked={settings.isPlannerActive || false}
          disabled
          className="w-5 h-5"
        />
      </div>

      {/* Diet Reminders - Editable */}
      <div className="flex text-red-500 items-center space-x-4 mb-4">
        <label className="text-sm">Activate Diet Reminders:</label>
        <input
          type="checkbox"
          name="isDietNotificationRemindersActive"
          checked={settings.isDietNotificationRemindersActive || false}
          onChange={handleCheckboxChange}
          className="w-5 h-5"
        />
      </div>

      {/* Workout Reminders - Editable */}
      <div className="flex text-red-500 items-center space-x-4 mb-4">
        <label className="text-sm">Activate Workout Reminders:</label>
        <input
          type="checkbox"
          name="isWorkoutNotificationRemindersActive"
          checked={settings.isWorkoutNotificationRemindersActive || false}
          onChange={handleCheckboxChange}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
};

export default SettingsData;
