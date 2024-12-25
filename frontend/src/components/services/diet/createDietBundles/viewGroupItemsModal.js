import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const ViewGroupItemsModal = ({ groupIndex,groupItems, isVisible, onClose,handleUpdateGroup }) => {

  if (!isVisible) return null;
  const [groupItemsList,setGroupItemsList] = useState([]);

  const handleRemoveItemFromHere = (index) => {
    setGroupItemsList((prevSelected) => prevSelected.filter((_, i) => i !== index));
  }

  const handleSave = () => {
    handleUpdateGroup(groupIndex,groupItemsList);
    onClose();
  }

  useEffect(()=>{
    setGroupItemsList(groupItems);
  },[])

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close the modal when clicking outside
    >
      <div 
        className="bg-white p-5 rounded-lg shadow-xl w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
      >
        <h2 className="text-lg font-bold mb-4 text-center">Group Items</h2>
        <div className="space-y-4">
          {groupItemsList.map((item, index) => (
            <div key={index} className="flex items-center gap-3 border-b pb-2">
              <MdCancel 
                className='text-red-500 w-[20px] h-[20px] border-[1px] border-black rounded-full'
                onClick={()=>{
                    handleRemoveItemFromHere(index)}}/>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-md border"
              />
              <span className="text-black text-sm font-medium">{item.foodName}</span>
            </div>
          ))}
        </div>
        <button 
           onClick={handleSave}
          className="mt-5 bg-green-500 text-white px-4 py-2 rounded-md w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ViewGroupItemsModal;
