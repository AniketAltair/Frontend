import React, { useEffect, useState } from 'react';
import MealDetailsModal from './mealDetailsModal';

const DietBundleComponent = ({ index, data, handleAddToMyBundles }) => {
  const [showModal, setShowModal] = useState(false);
  const [bundleName, setBundleName] = useState(''); // State for input field
  const [showBundleNameWarning, setShowBundleNameWarning] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-container') {
      setShowModal(false);
    }
  };

  const handleInputChange = (e) => {
    setBundleName(e.target.value); // Update state as input changes
  };

  const handleAddBundleClick = () => {
    handleAddToMyBundles(index, bundleName,setShowBundleNameWarning); // Pass index and bundleName to parent
  };

  useEffect(()=>{

  },[showBundleNameWarning])

  return (
    <div className="flex-none w-[65%] sm:w-[30%] p-2 mx-2 bg-white shadow-lg rounded-lg border-2 border-red-500">
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-black">Protein :</strong> {data.macros.protein} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-black">Carbs :</strong> {data.macros.carbs} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-black">Fats :</strong> {data.macros.fats} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-4">
          <strong className="text-black">Calories :</strong> {data.macros.calories} kcals
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter Bundle Name"
        value={bundleName} // Controlled input
        onChange={handleInputChange} // Update value on change
        className="w-full mb-2 p-2 border-2 border-red-500 text-black rounded-md"
      />

      {showBundleNameWarning &&
      <div className='mb-2 text-xs text-red-500'>
        Bundle Name Exists !!!
      </div>}
      

      <button
        onClick={handleAddBundleClick}
        className="w-full py-2 px-2 text-white bg-green-500 rounded-md border-2 border-black"
      >
        Add to My Bundles
      </button>

      {showModal && (
        <div
          id="modal-container"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <MealDetailsModal data={data} onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
};

export default DietBundleComponent;
