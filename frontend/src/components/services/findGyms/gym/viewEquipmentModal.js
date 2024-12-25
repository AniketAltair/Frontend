import React from 'react';

const ViewEquipmentsModal = ({ equipmentList, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}>
      <div 
        className="border-2 border-red-500 bg-white p-4 w-3/4 max-h-[70%] overflow-y-auto rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for modern browsers
      >
        <style>
          {`/* Hide scrollbar for Chrome, Safari, and Edge */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }`}
        </style>

        {Object.entries(equipmentList).map(([category, equipments], index) => (
          <div key={index} className="mb-6">
            <h3 className="text-black text-lg font-semibold underline mb-2">{category}</h3>
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              {equipments.map((equipment, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg flex-shrink-0 text-center w-24 sm:w-32"
                >
                  <img
                    src={equipment.imageLink}
                    alt={equipment.equipmentName}
                    className="border-2 border-red-500 rounded-md mb-2 object-fill w-full h-24 sm:h-32"
                  />
                  <p className="text-green-500 font-medium text-sm sm:text-base">
                    {equipment.equipmentName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEquipmentsModal;
