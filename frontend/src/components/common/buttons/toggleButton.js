import React, { useEffect, useState } from "react";

const ToggleSwitch = ({field, setCurrentData ,toggleValue,isToggleAllowed}) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(()=>{
    setIsOn(toggleValue);
    setCurrentData((prev)=>({...prev,[field]:toggleValue}))
  },[])

  const toggleSwitch = () => {
    const newIsOn = isToggleAllowed ? !isOn : toggleValue;
    setIsOn(newIsOn);
  
    if (field === "Status") {
      setCurrentData((prev) => ({
        ...prev,
        [field]: newIsOn ? "Active" : "InActive", 
      }));
    }
  };
  

  return (
    <button
      onClick={toggleSwitch}
      className={`border-2  relative w-12 h-6 flex-shrink-0 rounded-full transition-colors duration-300 ${
        isOn ? "border-black bg-white" : "border-gray-300 bg-white"
      }`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4  rounded-full shadow-md transition-transform duration-300 ${
          isOn ? " bg-black translate-x-6" : "bg-gray-300 translate-x-0"
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
