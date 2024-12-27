import React, { useEffect, useState } from "react";

const ViewItemsModal = ({ onClose, isVisible, selectedItems, itemModalIndex, handleUpdateItem }) => {
  if (!isVisible) return null;

  const [newData, setNewData] = useState({
    quantity: selectedItems[itemModalIndex].quantity,
    protein: selectedItems[itemModalIndex].protein,
    carbs: selectedItems[itemModalIndex].carbs,
    fats: selectedItems[itemModalIndex].fats,
    calories: selectedItems[itemModalIndex].calories,
  });

  const handleChange = (e) => {

    if(selectedItems[itemModalIndex].quantityType==="unit"){
      return;
    }
    let newQuantity = e.target.value;
    if(newQuantity<0){
      return;
    }

    const initialQuantity = selectedItems[itemModalIndex].initialMacroData[0];
    const factor = newQuantity / initialQuantity;

    const newProtein = Math.floor(factor * selectedItems[itemModalIndex].initialMacroData[1]);
    const newCarbs = Math.floor(factor * selectedItems[itemModalIndex].initialMacroData[2]);
    const newFats = Math.floor(factor * selectedItems[itemModalIndex].initialMacroData[3]);
    const newCalories = Math.floor(factor * selectedItems[itemModalIndex].initialMacroData[4]);

    setNewData((prev) => ({
      ...prev,
      quantity: e.target.value,
      protein: newProtein,
      carbs: newCarbs,
      fats: newFats,
      calories: newCalories,
    }));
  };

  useEffect(() => {}, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="border-red-500 border-2 bg-white p-5 rounded-lg shadow-xl w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Item Name at Top */}
        <h2 className="text-xl font-bold text-center text-red-500 mb-3">
          {selectedItems[itemModalIndex].foodName}
        </h2>

        {/* Item Image */}
        <div className="flex justify-center mb-4">
          <img
            src={selectedItems[itemModalIndex].image}
            alt={selectedItems[itemModalIndex].foodName}
            className="w-24 h-24 rounded-md border-2 border-black"
          />
        </div>

        {/* Input and Quantity Type */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="number"
            className="text-red-500 border-2 border-red-500 w-2/3 p-2 rounded-md"
            value={newData.quantity}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Quantity"
          />
          <span className="text-gray-700 text-sm">{selectedItems[itemModalIndex].quantityType}</span>
        </div>

        {/* Macronutrients Details */}
        <div className="space-y-2">
          <div className="text-gray-700 text-sm flex justify-between">
            <strong>Protein : </strong> 
            <span>{newData.protein} gms</span>
          </div>
          <div className="text-gray-700 text-sm flex justify-between">
            <strong>Carbs:</strong> 
            <span>{newData.carbs} gms</span>
          </div>
          <div className="text-gray-700 text-sm flex justify-between">
            <strong>Fats:</strong> 
            <span>{newData.fats} gms</span>
          </div>
          <div className="text-gray-700 text-sm flex justify-between">
            <strong>Calories:</strong> 
            <span>{newData.calories} kcals</span>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => {
            handleUpdateItem(itemModalIndex, newData);
            onClose();
          }}
          className="mt-5 border-black border-2 bg-green-500 text-white px-4 py-2 rounded-md w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewItemsModal;
