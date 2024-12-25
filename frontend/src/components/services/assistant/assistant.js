import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsAssistantVisible } from "../../common/redux/slice/assistantSlice";
import Chat from './chat'; 
import assistantImagePath from "../../../assets/assistant/assistant.png"

const Assistant = () => {
  const [audioFilePath] = useState(new Audio(require("../../../assets/sounds/robotAssistant.wav")));
  const { isAssistantVisible } = useSelector((state) => state.assistant);
  const dispatch = useDispatch();

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(''); // Direction class for rotation
  const timerRef = useRef(null);

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
  };

  return (
    isAssistantVisible && (
      <div className="font-cursive fixed bottom-4 right-4">
        {/* Chat Component */}
        <Chat isVisible={isChatVisible} />
        
        {/* Assistant Icon */}
        <div
          className="flex items-center justify-center bg-white w-20 h-20 border-2 border-red-500 rounded-full shadow-2xl cursor-pointer z-50"
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
