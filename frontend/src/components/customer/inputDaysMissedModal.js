import React, { useState } from 'react';

const InputDaysMissedModal = ({ dates, onClose }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  
  // Function to format date in DD/MM/YYYY format
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generate past 60 days (excluding today)
  const pastDays = Array.from({ length: 60 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (i + 1)); // Get past 60 days (excluding today)
    return formatDate(date); // Format as 'DD/MM/YYYY'
  });

  // Function to calculate which grid boxes should be red
  const getGridColor = (date) => {
    return dates.includes(date) ? 'border-black bg-red-400' : 'border-black bg-green-400';
  };

  // Handle click on grid boxes
  const handleGridClick = (date) => {
    if (dates.includes(date)) {
      setSelectedDate(date); // Set selected date only if it's red (missed day)
    } else {
      setSelectedDate(null); // Reset date if it's green (not missed)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={onClose}>
      <div
        className="border-2 border-red-500 mx-3 bg-white p-6 rounded-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Display selected date only if it's not null */}
        {selectedDate && (
          <div className="mb-4 text-center text-sm font-bold text-black">
            {selectedDate}
          </div>
        )}

        <div className="grid grid-cols-10 gap-2 mb-4">
          {pastDays.map((date, index) => (
            <div
              key={index}
              className={`h-6 w-6 rounded-lg cursor-pointer border-2 ${getGridColor(date)}`}
              onClick={() => handleGridClick(date)} // Handle click
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputDaysMissedModal;
