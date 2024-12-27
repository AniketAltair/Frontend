import React, { useState } from "react";

const MacrosInput = ({macrosDetails,setMacrosDetails,handleCreateBundles}) => {
  
  const [warning, setWarning] = useState(""); 

  const handleInputChange = (field, value) => {
    if(value<0){
      return;
    }
    setMacrosDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div className="border-2 border-red-500 my-8 p-2 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
      <div className="space-y-4">

        {/* Protein Input */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <label className="text-black text-lg sm:text-lg mb-2 sm:mb-0">Protein :</label>
          <div className="flex space-x-2 w-full sm:max-w-xs">
            <input
              type="number"
              className="text-red-500 border-2 border-red-500 w-full p-2 rounded-md"
              value={macrosDetails.protein}
              onChange={(e) => handleInputChange("protein", e.target.value)}
              placeholder="Enter Protein"
            />
            <div className="text-green-500 ml-2 flex justify-between items-center">
              gms 
            </div>
          </div>
        </div>

        {/* Carbs Input */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <label className="text-black text-lg sm:text-lg mb-2 sm:mb-0">Carbs :</label>
          <div className="flex space-x-2 w-full sm:max-w-xs">
            <input
              type="number"
              className="text-red-500 border-2 border-red-500 w-full p-2 rounded-md"
              value={macrosDetails.carbs}
              onChange={(e) => handleInputChange("carbs", e.target.value)}
              placeholder="Enter Carbs"
            />
            <div className="text-green-500 ml-2 flex justify-between items-center">
              gms 
            </div>
          </div>
        </div>

        {/* Fats Input */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <label className="text-black text-lg sm:text-lg mb-2 sm:mb-0">Fats :</label>
          <div className="flex space-x-2 w-full sm:max-w-xs">
            <input
              type="number"
              className="text-red-500 border-2 border-red-500 w-full p-2 rounded-md"
              value={macrosDetails.fats}
              onChange={(e) => handleInputChange("fats", e.target.value)}
              placeholder="Enter Fats"
            />
            <div className="text-green-500 ml-2 flex justify-between items-center">
              gms 
            </div>
          </div>
        </div>

        {/* Calories Input */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <label className="text-black text-lg sm:text-lg mb-2 sm:mb-0">Calories :</label>
          <div className="flex space-x-2 w-full sm:max-w-xs">
            <input
              type="number"
              className="text-red-500 border-2 border-red-500 w-full p-2 rounded-md"
              value={macrosDetails.calories}
              onChange={(e) => handleInputChange("calories", e.target.value)}
              placeholder="Enter Calories"
            />
            <div className="text-green-500 ml-2 flex justify-between items-center">
              kcals 
            </div>
          </div>
        </div>

        {/* Meals Input */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <label className="text-black text-lg mb-2 sm:mb-0">Number of meals in a day :</label>
          <div className="flex items-center border-2 border-red-500 rounded-md">
            <button
              type="button"
              onClick={() => handleInputChange("meals", Math.max(1, macrosDetails.meals - 1))}
              className="px-3 py-2 bg-red-500 text-white rounded-l-md hover:bg-red-600"
            >
              -
            </button>
            <div className="text-red-500 w-12 text-center text-lg">{macrosDetails.meals}</div>
            <button
              type="button"
              onClick={() => handleInputChange("meals", Math.min(10, macrosDetails.meals + 1))}
              className="px-3 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Warning Message */}
        {warning && (
          <div className="text-xs text-red-500 text-center mt-4">{warning}</div>
        )}

        {/* Button */}
        <div className="text-center mt-6">
          <button
            onClick={()=>handleCreateBundles(macrosDetails,setWarning)}
            className="border-2 border-black bg-green-500 text-white py-2 px-4 rounded-md w-full sm:max-w-xs"
          >
            Create Bundles
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default MacrosInput;
