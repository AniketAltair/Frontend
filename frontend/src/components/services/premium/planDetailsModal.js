import React, { useEffect } from 'react';

const Modal = ({
  toggleModal,
  editedCost,
  setEditedCost,
  editedValidity,
  setEditedValidity,
  editedFeatures
}) => {

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal(); 
    }
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setEditedCost(value); 
    }
  };
  

  const handleValidityChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setEditedValidity(value); 
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div className="border-red-500 border-2 bg-white w-[90%] sm:w-full sm:max-w-md p-6 rounded-lg shadow-xl">

        {/* Cost */}
        <div className="mb-4">
          <span className="text-[17px] font-medium text-black">Cost:</span>
          {editedCost===0?
          <span className="text-[17px] ml-4 mt-2 text-red-600 font-bold">Free</span>:
          <span className="text-[17px] ml-4 mt-2 text-red-600 font-bold">{`₹ ${editedCost}`}</span>}
        </div>

        {/* Validity */}
        <div className="mb-4">
          <span className="text-[17px] font-medium text-black">Validity:</span>
          {editedValidity===0?
          <span className='text-[17px] ml-4 mt-2 text-red-600 font-bold'>Forever</span>:
          <span className="text-[17px] ml-4 mt-2 text-red-600 font-bold">{`${editedValidity} days`}</span>}
          
        </div>

        {/* Features */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          <div className="text-[17px] font-medium text-black">Features:</div>
          <div className="mt-2">
              {editedFeatures.length > 0 ? (
                editedFeatures.map((feature, index) => (
                  <div key={index} className="border-green-500 border-2 p-1 rounded-md text-black mb-2 hover:bg-green-200 ">
                    {feature}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No features added yet</div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
