import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react"; // You can use any icon library for the bell icon

const NotificationBell = ({ 
  hasNotification, 
  notificationSeen,
  setNotificationSeen
 }) => {
  
  const [isWobbling, setIsWobbling] = useState(false);
  const [audio] = useState(new Audio(require("../../../assets/sounds/notificationBell.wav"))); // Path to your local sound file

  useEffect(() => {
    if (hasNotification) {
      // Start wobbling when notification appears
      setIsWobbling(true);

      // Stop wobbling after 5 seconds
      setTimeout(() => {
        setIsWobbling(false);
      }, 5000);
    }

    // sets notification messages here
  }, [hasNotification]);

  const handleBellClick = () => {
    setNotificationSeen(true); // Mark notification as seen
    // Play sound only after user clicks on the bell icon (to bypass autoplay restrictions)
    audio.play();
  };

  return (
    <div className="relative flex flex-col items-center justify-start">
      <style>
        {`
          @keyframes wobble {
            0% {
              transform: rotate(0deg);
            }
            15% {
              transform: rotate(15deg);
            }
            30% {
              transform: rotate(-10deg);
            }
            45% {
              transform: rotate(5deg);
            }
            60% {
              transform: rotate(-5deg);
            }
            75% {
              transform: rotate(2deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          .animate-wobble {
            animation: wobble 1s ease-in-out infinite;
          }
        `}
      </style>

      {/* Bell Icon Container */}
      <div className="relative">
        {/* Bell Icon */}
        <div
          className={`relative flex items-center justify-center ${isWobbling ? "animate-wobble" : ""}`}
          onClick={handleBellClick} // Handle bell click
        >
          <Bell size={28} className="text-black fill-yellow-400" />

          {/* Red dot for notifications */}
          {hasNotification && !notificationSeen && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-600 border-2 border-black rounded-full"></div>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default NotificationBell;
