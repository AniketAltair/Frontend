import React, { useEffect } from 'react';

const Modal = ({
  isEditing,
  setIsEditing,
  toggleModal,
  editedCost,
  setEditedCost,
  editedValidity,
  setEditedValidity,
  editedFeatures,
  setEditedFeatures,
  newFeature,
  setNewFeature,
  addFeature,
  removeFeature,
  handleSaveEdit,
  featureDataSet
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
          {isEditing ? (
            <input
              type="number"
              value={editedCost}
              onChange={handleCostChange}
              className="text-black w-full mt-2 border-2 border-red-500 rounded-md p-2 "
            />
          ) : (
            <span className="text-[17px] ml-4 mt-2 text-red-600 font-bold">{`₹ ${editedCost}`}</span>
          )}
        </div>

        {/* Validity */}
        <div className="mb-4">
          <span className="text-[17px] font-medium text-black">Validity:</span>
          {isEditing ? (
            <input
              type="number"
              value={editedValidity}
              onChange={handleValidityChange}
              className="text-black w-full mt-2 border-2 border-red-500 rounded-md p-2"
            />
          ) : (
            <span className="text-[17px] ml-4 mt-2 text-red-600 font-bold">{`${editedValidity} days`}</span>
          )}
        </div>

        {/* Features */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          <div className="text-[17px] font-medium text-black">Features:</div>
          {isEditing ? (
            <>
              {/* Add New Feature */}
              <div className="flex items-center mt-2">
                <select
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="text-black border-2 border-red-500 rounded-md p-2 w-full"
                >
                  <option value="">Select Feature</option>
                  {featureDataSet && featureDataSet.map((item)=>(
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <button
                  onClick={addFeature}
                  className="ml-2 border-2 border-red-500 bg-white-500 text-red-500 p-2 rounded-md hover:bg-red-200"
                >
                  Add
                </button>
              </div>

              {/* Existing Features */}
              <div className="mt-4">
                {editedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-md justify-between mb-2 border-2 border-green-500 pb-2"
                  >
                    <div className="text-black">{feature}</div>
                    <button
                      onClick={() => removeFeature(feature)}
                      className="text-black"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between mt-6">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
