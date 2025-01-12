import React, { useState } from "react";

const BodyFatPercentCalculator = ({setToastMessage, setToastVisible,setIsToastValidType }) => {
  const [bodyFatPercent, setBodyFatPercent] = useState(null);

  const calculateBodyFatPercent = () => {

    // API call to get latest personal stats
    const userPersonalStats = {height:174,weight:85,age:23,gender:"male",goal:"cutting"};

    const { height, weight, age, gender, goal } = userPersonalStats;
    
    if (!height || !weight || !age || !gender || !goal) {
      console.log("www");
      setToastMessage("Personal Stats Required !!!");
      setToastVisible(true);
      setIsToastValidType(false);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }

    // API call to calculate value of body fat percent

    /*  Use below formula in backend
    BFP (Men)=1.20×BMI+0.23×Age−16.2
    BFP (Women)=1.20×BMI+0.23×Age−5.4
    BMI= ( Height (m))^2 / Weight (kg)
     */
    
    setBodyFatPercent("15.2");
  };

  return (
    <div className="bg-white border-2 border-red-500 shadow-2xl rounded-md p-4 max-w-sm mx-auto text-center">
      <button
        className="bg-white text-red-500 border-2 border-red-500 px-4 py-2 rounded-md hover:bg-red-200"
        onClick={calculateBodyFatPercent}
      >
        Get Body Fat Percent
      </button>
      <div className="mt-4 text-lg font-semibold text-gray-700">
        {bodyFatPercent ? `${bodyFatPercent} %` : ""}
      </div>
    </div>
  );
};

export default BodyFatPercentCalculator;
