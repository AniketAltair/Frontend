import React, { useState } from 'react';
import { useTranslationContext } from '../../common/translationContext/translationContext';


const VolumeSettings = ({
    volumeSettingsData,
    setNotificationSettingsData
}) => {

  const { t } = useTranslationContext();

  return (
    <div className="bg-white shadow-2xl border-4 border-red-600 rounded-lg p-6 w-60 sm:w-80 lg:w-1/5 mx-auto">
      <h2 className="text-lg md:text-xl font-bold text-black text-center mb-4">{t('volume')}</h2>
      <div className="flex items-center justify-between space-x-4">
        <span className="text-base md:text-lg text-gray-800 whitespace-nowrap">{t('volume')}<span>:</span></span>
        <input
          type="range"
          min="0"
          max="100"
          step="20"
          value={volumeSettingsData}
          onChange={(e) => setNotificationSettingsData(Number(e.target.value))}
          className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-10"
        />
        <span className="text-base md:text-lg text-gray-800">{volumeSettingsData}</span>
      </div>
    </div>
  );
};

export default VolumeSettings;
