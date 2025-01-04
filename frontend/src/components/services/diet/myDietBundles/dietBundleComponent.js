import React, { useEffect, useState } from 'react';

const DietBundleComponent = ({ index, data, handleNavigateToViewMyBundle,handleRemoveBundle,handleOpenModal }) => {

  const handleAddBundleClick = () => {
  };

  return (
    <div className="flex-none w-[65%] sm:w-[20%] p-2 mx-2 bg-white shadow-2xl rounded-lg border-2 border-red-500">
        <div className='py-2 text-black'>
            <u>{data.name}</u>
        </div>
      <div className="cursor-pointer" onClick={()=>handleNavigateToViewMyBundle(data)} >
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-red-500">Protein :</strong> {data.macros.protein} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-red-500">Carbs :</strong> {data.macros.carbs} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-1">
          <strong className="text-red-500">Fats :</strong> {data.macros.fats} gms
        </p>
        <p className="text-sm text-green-500 font-medium mb-4">
          <strong className="text-red-500">Calories :</strong> {data.macros.calories} kcals
        </p>
      </div>

      <button
        onClick={()=>handleOpenModal(index)}
        className="w-full text-white bg-red-500 rounded-md border-2 border-black">
        Remove
      </button>

    </div>
  );
};

export default DietBundleComponent;
