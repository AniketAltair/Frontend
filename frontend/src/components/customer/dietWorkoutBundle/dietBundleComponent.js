import React, { useEffect, useState } from 'react';

import {useDispatch,useSelector} from "react-redux";
import {setCurrentBundleData} from "../../common/redux/slice/customerDashBoardSlice";

const DietBundleComponent = ({ index, data,onClose }) => {

  const dispatch = useDispatch();
  const {currentBundleData} = useSelector((state)=>(state.customerDashBoard))

  const handleChangeBundle = () => {
    const updatedCurrentBundleData = currentBundleData 
      ? JSON.parse(JSON.stringify(currentBundleData)) 
      : {};
      
    if (!updatedCurrentBundleData && !updatedCurrentBundleData.diet) {
      updatedCurrentBundleData.diet = {}; // Initialize as an empty object or any default structure as needed
    }
    updatedCurrentBundleData.diet = data;
    dispatch(setCurrentBundleData({currentBundleData:updatedCurrentBundleData}));
    onClose();
  }

  return (
    <div 
      className="flex-none w-[65%] sm:w-[65%] p-2 mx-2 bg-white shadow-2xl rounded-lg border-2 border-red-500"
      onClick={handleChangeBundle}>
        <div className='py-2 text-black'>
            <u>{data.name}</u>
        </div>
      <div className="cursor-pointer" >
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
    </div>
  );
};

export default DietBundleComponent;
