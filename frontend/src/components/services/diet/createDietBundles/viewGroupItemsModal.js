import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const ViewGroupItemsModal = ({ groupIndex, groupItems, isVisible, onClose, handleUpdateGroup }) => {
  if (!isVisible) return null;

  const [groupItemsList, setGroupItemsList] = useState([]);
  const [visibleDetailsIndex, setVisibleDetailsIndex] = useState(null); // Track which item's details are visible

  const handleRemoveItemFromHere = (index) => {
    setGroupItemsList((prevSelected) => prevSelected.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    handleUpdateGroup(groupIndex, groupItemsList);
    onClose();
  };

  const handleOpenFoodDetails = (index) => {
    // Toggle visibility for the selected item
    setVisibleDetailsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleQuantityChange = (e, index) => {

    if(groupItemsList[index].quantityType==="unit"){
      return;
    }
    const newQuantity = e.target.value;
    if(newQuantity<0){
      return;
    }
    const initialQuantity = groupItemsList[index].initialMacroData[0];
    const factor = newQuantity / initialQuantity;
  
    // Calculate the new macros
    const newProtein = Math.floor(factor * groupItemsList[index].initialMacroData[1]);
    const newCarbs = Math.floor(factor * groupItemsList[index].initialMacroData[2]);
    const newFats = Math.floor(factor * groupItemsList[index].initialMacroData[3]);
    const newCalories = Math.floor(factor * groupItemsList[index].initialMacroData[4]);
  
    // Update the specific item in the list
    setGroupItemsList((prevList) =>
      prevList.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQuantity,
              protein: newProtein,
              carbs: newCarbs,
              fats: newFats,
              calories: newCalories,
            }
          : item
      )
    );
  };
  


  useEffect(() => {
    console.log(JSON.stringify(groupItems));
    setGroupItemsList(groupItems);
  }, [groupItems]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Close the modal when clicking outside
    >
      <div
        className="border-red-500 border-2 bg-white p-5 rounded-lg shadow-xl w-[90%] max-w-md h-[350px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
      >
        <div className="space-y-4">
          {groupItemsList.map((item, index) => (
            <div key={index} className="flex-col">
              <div className="flex items-center gap-3 border-b border-red-300 pb-2">
                <MdCancel
                  className="text-red-500 w-[20px] h-[20px] border-[1px] border-black rounded-full"
                  onClick={() => handleRemoveItemFromHere(index)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="border-black border-2 w-12 h-12 sm:w-16 sm:h-16 rounded-md"
                />
                <span className="text-black text-sm font-medium">{item.foodName}</span>
                <IoIosArrowDown
                  className="ml-auto text-black w-5 h-5"
                  onClick={() => handleOpenFoodDetails(index)}
                />
              </div>
              {/* Details section, visible only if this item's index matches visibleDetailsIndex */}
              {visibleDetailsIndex === index && (
                <div className="mt-2 bg-white border-2 border-green-500 p-4 rounded-lg shadow-md">
                  {/* Input and Quantity Type Row */}
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="number"
                      className="text-red-600 border-2 border-red-400 w-1/2 p-2 rounded-md"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, index)}
                      placeholder="Enter Quantity"
                    />
                    <div className="text-gray-700 font-medium ml-3">{item.quantityType}</div>
                  </div>

                  {/* Macronutrient Details */}
                  <div className="text-gray-700 font-medium">
                    <div className="flex justify-between py-1">
                      <span>Protein:</span>
                      <span>{item.protein} gms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Carbs:</span>
                      <span>{item.carbs} gms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Fats:</span>
                      <span>{item.fats} gms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Calories:</span>
                      <span>{item.calories} kcal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-5 border-black border-2 bg-green-500 text-white px-4 py-2 rounded-md w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewGroupItemsModal;
