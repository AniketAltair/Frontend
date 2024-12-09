import React, { useState } from 'react';
import { useTranslationContext } from '../../common/translationContext/translationContext';


const NotificationSettings = ({
    notificationSettingsData,
    setNotificationSettingsData
    }) => {

  const { t } = useTranslationContext();

  const toggleSetting = (key) => {
    setNotificationSettingsData((prevSettings) => ({ ...prevSettings, [key]: !prevSettings[key] }));
  };

  return (
    <div className="bg-white shadow-2xl border-4 border-red-600 rounded-lg p-6 w-60 sm:w-80 lg:w-1/5 mx-auto">
      <h2 className="text-lg md:text-xl font-bold text-black text-center mb-4">{t('notification')}</h2>
      <div className="space-y-4">
        {Object.keys(notificationSettingsData).map((key) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-base md:text-lg text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <div
                className={`flex items-center justify-between w-12 h-6 rounded-full cursor-pointer transition-colors ${
                    notificationSettingsData[key] ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => toggleSetting(key)}
                >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${notificationSettingsData[key] ? 'ml-6' : ''}`}></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
