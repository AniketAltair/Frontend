import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsAssistantVisible } from "../../common/redux/slice/assistantSlice";
import Chat from './chat'; 
import assistantImagePath from "../../../assets/assistant/assistant.png";

const Assistant = () => {
  const [audioFilePath] = useState(new Audio(require("../../../assets/sounds/robotAssistant.wav")));
  const { isAssistantVisible } = useSelector((state) => state.assistant);
  const dispatch = useDispatch();

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(''); // Direction class for rotation
  const [backgroundOpacity, setBackgroundOpacity] = useState(1); // State for background opacity
  const timerRef = useRef(null);
  
  // Ref for the chat and assistant container to detect clicks outside
  const wrapperRef = useRef(null);

  const handleAssistantVisibility = () => {
    dispatch(setIsAssistantVisible({ "isAssistantVisible": false }));
  };

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      handleAssistantVisibility();
    }, 2000); // 3 seconds
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const playAudio = () => {
    audioFilePath.play().catch(err => {
      console.error("Error playing audio:", err);
    });
  };

  const handleClick = () => {
    // Play the audio on click
    playAudio();
    // Toggle rotation direction and chat visibility
    setRotationDirection(prev =>
      prev === 'animate-rotateAntiClockwise' ? 'animate-rotateClockwise' : 'animate-rotateAntiClockwise'
    );
    setIsChatVisible(prev => !prev);

    // Set the background opacity to 75%
    setBackgroundOpacity(prev => (prev === 1 ? 0.75 : 1));
  };

  // Handle clicks outside the wrapper to hide chat and reset background opacity
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // Close chat and reset background opacity
        setIsChatVisible(false);
        setBackgroundOpacity(1);
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    isAssistantVisible && (
      <div className="font-cursive fixed bottom-4 right-4 z-50" ref={wrapperRef}>
        {/* Background Overlay */}
        {backgroundOpacity === 0.75 && (
          <div className="fixed inset-0 bg-black opacity-75 z-40"></div>
        )}

        {/* Chat Component */}
        <Chat isVisible={isChatVisible} />
        
        {/* Assistant Icon */}
        <div
          className={`flex items-center justify-center bg-white w-20 h-20 border-2 border-red-500 rounded-full shadow-2xl cursor-pointer z-50 ${backgroundOpacity === 0.75 ? 'relative' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onClick={handleClick}
        >
          <img
            src={assistantImagePath}
            alt="Assistant"
            className={`w-16 h-16 rounded-full object-cover transition-transform ${rotationDirection}`}
          />
        </div>
      </div>
    )
  );
};

export default Assistant;
