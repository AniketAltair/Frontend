import React, { useState } from 'react';

const MacroGoals = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("Maintenance");
  const [showMacros, setShowMacros] = useState(false);
  const [warning, setWarning] = useState("");
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0, calories: 0 });

  const handleFindMacros = () => {
    if (!height || height <= 0) {
      setWarning("Height is missing or invalid.");
      setShowMacros(false);
      return;
    }
    if (!weight || weight <= 0) {
      setWarning("Weight is missing or invalid.");
      setShowMacros(false);
      return;
    }

    setWarning("");

    // API call to get macros as per height , weight and goal.

    
    // Example calculation for macros (replace with real logic if available)
    const protein = Math.round(weight * 1.6);
    const carbs = Math.round(weight * 2.5);
    const fats = Math.round(weight * 0.9);
    const calories = Math.round(weight * 30);

    setMacros({ protein, carbs, fats, calories });
    setShowMacros(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      {/* Input Card */}
      <div className="border-2 border-red-500 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="text-black w-full p-2 border-2 border-red-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="text-black w-full p-2 border-2 border-red-500 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Current Goal:</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="text-black w-full p-2 border-2 border-red-500 rounded-md"
          >
            <option value="Cutting">Cutting</option>
            <option value="Bulking">Bulking</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Intense HIIT">Intense HIIT</option>
          </select>
        </div>
        <button
          onClick={handleFindMacros}
          className="w-full bg-green-500 text-white py-2 rounded-md border-2 border-black"
        >
          Find Macros
        </button>
      </div>

      {/* Warning or Macros Card */}
      <div className="mt-6 w-full max-w-md">
        {warning && (
          <div className="text-red-500 text-center font-medium">{warning}</div>
        )}

        {showMacros && (
          <div className="bg-white border-2 border-green-500 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Your Macro Requirements</h3>
            <p className="text-black mb-2"><u>Protein</u> : <span className="text-red-500 font-medium">{macros.protein} gms</span></p>
            <p className="text-black mb-2"><u>Carbs</u> : <span className="text-red-500 font-medium">{macros.carbs} gms</span></p>
            <p className="text-black mb-2"><u>Fats</u> : <span className="text-red-500 font-medium">{macros.fats} gms</span></p>
            <p className="text-black"><u>Calories</u> : <span className="text-red-500 font-medium">{macros.calories} kcals</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroGoals;
