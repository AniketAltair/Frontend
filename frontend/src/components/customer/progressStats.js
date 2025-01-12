import React, { useState } from 'react';
import { FaFire, FaSmile, FaMeh, FaFrown, FaSkull } from 'react-icons/fa';
import InputDaysMissedModal from './inputDaysMissedModal';

const ProgressStats = ({ stats }) => {
  const { progressSoFar, inputDaysMissed, inputDaysMissedDates, dailyAvgActiveTime } = stats;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressIcons = {
    excellent: <FaFire className="text-orange-500 text-2xl" />,
    good: <FaSmile className="text-yellow-500 text-2xl" />,
    average: <FaMeh className="text-gray-500 text-2xl" />,
    improvement: <FaFrown className="text-blue-400 text-2xl" />,
    poor: <FaSkull className="text-black text-2xl" />,
  };

  // Toggle modal visibility
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
      <div className="flex flex-col border-2 border-red-500 items-center p-4 bg-white shadow-2xl rounded-lg">
        <h2 className="text-lg font-bold text-red-500">Progress So Far</h2>
        <div className="mt-2">{progressIcons[progressSoFar]}</div>
      </div>

      <div
        className="flex flex-col border-2 border-red-500 items-center p-4 bg-white shadow-2xl rounded-lg cursor-pointer"
        onClick={handleCardClick}
      >
        <h2 className="text-lg font-bold text-red-500">Days of Input Missed</h2>
        <p className="mt-2 text-lg font-semibold text-gray-700">{inputDaysMissed} days</p>
      </div>

      <div className="flex flex-col border-2 border-red-500 items-center p-4 bg-white shadow-2xl rounded-lg">
        <h2 className="text-lg font-bold text-red-500">Daily Avg Active Time</h2>
        <p className="mt-2 text-lg font-semibold text-gray-700">{dailyAvgActiveTime} s</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <InputDaysMissedModal
          dates={inputDaysMissedDates}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ProgressStats;
