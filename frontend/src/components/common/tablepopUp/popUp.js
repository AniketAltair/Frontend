import React, { useEffect, useRef } from "react";

const PopUp = ({ isOpen, data, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener on component unmount or when isOpen changes
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div
        ref={popupRef}
        className="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full below-400:w-[300px] below-400:h-[300px]"
      >
        <div className="max-h-[400px] overflow-y-auto">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <p key={key} className="mb-2 text-black">
                <strong className="text-red-700">{key}:</strong>
                {
                  (key==="From") && 
                  <span className="ml-4 break-words">{value}</span>
                }
                {
                  (key==="Date") && 
                  <span className="ml-4 break-words">{value}</span>
                }
                {
                  (key==="Message") && 
                  <div className="mt-4 break-words border border-red-700 rounded-md p-2 max-h-[150px] overflow-y-auto">{value}</div>
                }
              </p>
            ))}
        </div>
            
      </div>
    </div>
  );
};

export default PopUp;
