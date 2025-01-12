import React, { useState, useEffect } from 'react';

const SlidingMessagesComponent = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [messages]);

  // Truncate messages to a maximum of 20 characters
  const truncateMessage = (message) => {
    return message.length > 20 ? message.substring(0, 30) + '...' : message;
  };

  return (
    <div className="relative border-2 border-red-500 w-full max-w-2xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="mb-4 w-full flex-shrink-0 p-2 text-center text-sm font-semibold text-gray-700"
          >
            {truncateMessage(message)}
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {messages.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingMessagesComponent;
