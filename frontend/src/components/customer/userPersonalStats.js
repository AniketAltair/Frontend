import React, { useState, useEffect } from "react";
import { FaMale, FaFemale, FaBalanceScale} from "react-icons/fa";
import { FaPerson,FaWeightScale  } from "react-icons/fa6";

const UserPersonalStats = ({ 
    stats,
    setToastMessage,
    setIsToastVisible,
    setIsToastValidType
 }) => {

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [goal, setGoal] = useState(null);

  const setToastData = (error) => {
    setToastMessage(error);
    setIsToastVisible(true);
    setTimeout(() => {
        setIsToastVisible(false);
    }, 3000);
    setIsToastValidType(false);
  };

  const validate = () => {
    if (!height || height <= 0 || height >= 240) {
      setToastData("Enter Height");
      return false;
    }
    if (!weight || weight <= 0 || weight >= 300) {
      setToastData("Enter Weight");
      return false;
    }
    if (!age || age <= 0 || age >= 150) {
      setToastData("Enter Age");
      return false;
    }
    if (!gender) {
      setToastData("Choose Gender");
      return false;
    }
    if (!goal) {
      setToastData("Choose Goal");
      return false;
    }

    // API to save data in backend 
    // send all height, weight , age, gender, and goal

    return true;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    console.log({
      height,
      weight,
      age,
      gender,
      goal,
    });
  };

  // Set initial values when the component mounts or `stats` changes
  useEffect(() => {
    if (stats) {
      setHeight(stats.height || null);
      setWeight(stats.weight || null);
      setAge(stats.age || null);
      setGender(stats.gender || null);
      setGoal(stats.goal || null);
    }
  }, [stats]);

  return (
    <div className="max-w-md border-red-500 border-2 mx-auto mt-8 p-6 bg-white rounded-lg shadow-2xl">

      {/* Height Input */}
      <div className="flex mb-4 items-center">
        <label className="text-lg text-black mb-2 mr-2">Height&nbsp;(cm)&nbsp;:</label>
        <input
          type="number"
          value={height || ""}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          className="w-full p-2 border-2 border-red-500 rounded-md text-green-500"
          placeholder="Enter height"
        />
      </div>

      {/* Weight Input */}
      <div className="flex mb-4 items-center">
        <div className="text-lg text-black mb-2 mr-2">Weight&nbsp;(kg)&nbsp;:</div>
        <input
          type="number"
          value={weight || ""}
          onChange={(e) => setWeight(parseInt(e.target.value))}
          className="w-full p-2 border-2 border-red-500 rounded-md text-green-500"
          placeholder="Enter weight"
        />
      </div>

      {/* Age Input */}
      <div className="flex mb-4 items-center">
        <label className="text-lg text-black mb-2 mr-2">Age&nbsp;:</label>
        <input
          type="number"
          value={age || ""}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="w-full p-2 border-2 border-red-500 rounded-md text-green-500"
          placeholder="Enter age"
        />
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <div className="flex justify-center space-x-8">
          {/* Male Icon */}
          <div
            onClick={() => setGender("male")}
            className={`p-4 border-2 border-black rounded-full cursor-pointer ${
              gender === "male" ? "bg-green-200 text-green-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaMale size={24} />
          </div>
          {/* Female Icon */}
          <div
            onClick={() => setGender("female")}
            className={`p-4 border-2 border-black rounded-full cursor-pointer ${
              gender === "female" ? "bg-green-200 text-green-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaFemale size={24} />
          </div>
        </div>
      </div>

      {/* Goal Selection */}
      <div className="mb-6">
        <div className="flex justify-center space-x-10">
          {/* Cutting */}
          <FaPerson 
              className={`w-8 h-8 mt-5 ${goal === "cutting" ? "text-red-500" : "text-gray-600"}`} 
              onClick={() => setGoal("cutting")}/>
          {/* Bulking */}
          <FaPerson
              className={`w-8 h-8 mt-5 ${goal === "bulking" ? "text-red-500" : "text-gray-600"}`} 
              style={{ transform: 'scaleX(2)' }} // Stretch horizontally
              onClick={() => setGoal("bulking")}/>
          {/* Maintenance */}
          <FaBalanceScale 
              className={`w-8 h-8 mt-5 ${goal === "maintenance" ? "text-red-500" : "text-gray-600"}`}
              onClick={() => setGoal("maintenance")}/>
          {/* Weight Loss */}
          <FaWeightScale
              className={`w-8 h-8 mt-5 ${goal === "weightloss" ? "text-red-500" : "text-gray-600"}`} 
              onClick={() => setGoal("weightloss")}/>
        </div>

        {/* Display Selected Goal */}
        <div className="text-center mt-4">
          {goal && (
            <div className="text-lg font-semibold text-gray-700">
             <span className="text-red-500">{goal.charAt(0).toUpperCase() + goal.slice(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-2 px-4 border-2 border-black bg-green-500 text-black font-semibold rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default UserPersonalStats;