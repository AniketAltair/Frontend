import React, { useState } from 'react';

const Notifications = () => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  const handleCheckboxChange = () => {
    // API call to send latest value to backend.
    // send (!isReminderEnabled)
    setIsReminderEnabled(!isReminderEnabled);
    console.log(isReminderEnabled ? 'No' : 'Yes');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="bg-white border-2 border-red-500 p-4 rounded-lg mb-6">

        <div className="flex items-center justify-between">
          <p className="text-black font-medium">Do you want to receive Reminders for Workouts?</p>
          <input
            type="checkbox"
            checked={isReminderEnabled}
            onChange={handleCheckboxChange}
            className="w-6 h-6 text-green-500 border-2 border-black rounded"
          />
        </div>
      </div>

      <div className="text-red-600 text-xs space-y-2">
        <ul className="flex flex-col gap-2 pl-5">
          <li className='mb-2'><strong>*</strong> When Reminders are enabled, you will receive Notifications for your workout via WhatsApp, In-App, or push notification.</li>
          <li className='mb-2'><strong>*</strong> It will remind you of your workout and todays exercises</li>
          <li className='mb-2'><strong>*</strong> This will help you to keep track of daily workout and prevent skipping workouts.</li>
        </ul>
      </div>

    </div>
  );
};

export default Notifications;
