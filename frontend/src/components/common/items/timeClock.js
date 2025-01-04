import React, { useState, useEffect } from 'react';

const TimeClock = ({ value, handleTimeChange, mealIndex }) => {
  const [selectedMode, setSelectedMode] = useState('hours'); // 'hours' or 'minutes'
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [outerRadius, setOuterRadius] = useState(160); // Default radius for larger screens

  // Adjust the outer radius dynamically based on the container width
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setOuterRadius(120); // Smaller radius for mobile screens
      } else if (width < 768) {
        setOuterRadius(130); // Medium radius for tablet screens
      } else {
        setOuterRadius(160); // Default radius for larger screens
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    setSelectedMode('minutes'); // Move to minute selection after selecting hour
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
    // Send time back to parent component after both hour and minute are selected
    handleTimeChange(mealIndex, `${String(selectedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    // Reset the clock after selection
    setSelectedHour(0);
    setSelectedMinute(0);
    setSelectedMode('hours');
  };

  const renderClockNumbers = () => {
    const numbers = [];

    if (selectedMode === 'hours') {
      // Display hour numbers: 0–11 on outer circle and 12–23 on inner circle
      for (let i = 0; i < 12; i++) {
        numbers.push({ value: i, radius: outerRadius, angle: i * 30 });
      }
      for (let i = 12; i < 24; i++) {
        numbers.push({ value: i, radius: outerRadius - 50, angle: (i - 12) * 30 });
      }
    } else if (selectedMode === 'minutes') {
      // Display minute numbers: 0, 5, 10, ..., 55 on the outer circle
      for (let i = 0; i < 60; i += 5) {
        numbers.push({ value: i, radius: outerRadius, angle: (i / 5) * 30 });
      }
    }

    return numbers.map(({ value, radius, angle }) => {
      const radian = (angle * Math.PI) / 180;
      const x = radius * Math.sin(radian);
      const y = radius * -Math.cos(radian); // Negative for clockwise direction

      return (
        <div
          key={value}
          className={`absolute font-bold cursor-pointer ${
            selectedMode === 'hours'
              ? value === selectedHour
                ? 'text-red-300'
                : 'text-red-500'
              : value === selectedMinute
              ? 'text-green-300'
              : 'text-green-500'
          }`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => (selectedMode === 'hours' ? handleHourClick(value) : handleMinuteClick(value))}
        >
          {value}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-4 border-gray-800 bg-white flex items-center justify-center">
        {renderClockNumbers()}
      </div>
    </div>
  );
};

export default TimeClock;
