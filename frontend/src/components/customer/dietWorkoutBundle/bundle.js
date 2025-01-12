import React, { useState } from "react";
import MyDietBundlesModal from "./myDietBundlesModal";
import MyWorkoutBundlesModal from "./myWorkoutBundlesModal";

import {useDispatch,useSelector} from "react-redux";
import {
    setIsCustomerDashBoardVisible,
    setIsEditDietBundleVisible,
    setIsEditWorkoutBundleVisible
} from "../../common/redux/slice/customerDashBoardSlice";

const Bundle = ({ bundleData, bundleType, onChangeBundle,myDietBundles,myWorkoutBundles }) => {

  const [isMyBundleModalOpen,setIsMyBundleModalOpen] = useState(false);

   const dispatch = useDispatch();

  const onClose = () => {
    setIsMyBundleModalOpen(false);
  }

  const renderMacros = (macros) => (
    <div className="space-y-2">
      {Object.entries(macros).map(([key, value]) => (
        <div key={key} className="flex justify-between text-gray-700">
          <span className="font-medium text-red-500">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <span className="text-green-500">{value}</span>
        </div>
      ))}
    </div>
  );

  const renderWorkoutMuscles = (exercises) => {
    const muscles = new Set();
    exercises.forEach((exercise) => {
      exercise.musclesInvolved.forEach((muscle) => muscles.add(muscle));
    });
    return (
      <div className="space-y-2 overflow-y-auto h-[150px]">
        {Array.from(muscles).map((muscle) => (
          <div key={muscle} className="text-black text-sm border border-black rounded-full bg-green-500 px-4 py-1 flex justify-center">
            {muscle}
          </div>
        ))}
      </div>
    );
  };

  const handleSleepChange = (e) => {
    const newSleepValue = e.target.value;
    onChangeBundle(newSleepValue);
  };

  const handleDietChange = () => {
    dispatch(setIsCustomerDashBoardVisible({isCustomerDashBoardVisible:false}));
    dispatch(setIsEditDietBundleVisible({isEditDietBundleVisible:true}));
    dispatch(setIsEditWorkoutBundleVisible({isEditWorkoutBundleVisible:false}));
  }

  const handleWorkoutChange = () => {
    dispatch(setIsCustomerDashBoardVisible({isCustomerDashBoardVisible:false}));
    dispatch(setIsEditDietBundleVisible({isEditDietBundleVisible:false}));
    dispatch(setIsEditWorkoutBundleVisible({isEditWorkoutBundleVisible:true}));
  }

  return (
    <>
    {bundleData && 
        <div className="border-2 border-red-500 bg-white rounded-lg shadow-2xl p-4 w-64 min-w-[240px] flex-shrink-0 flex-col flex justify-between">
      <h3 className="text-xl font-semibold text-gray-800">{bundleData.name}</h3>

      {bundleType === "diet" && (
        <div 
          className="mt-4"
          onClick={() => handleDietChange()}>
          {renderMacros(bundleData.macros)}
        </div>
      )}

      {bundleType === "workout" && (
        <div 
          className="mt-4"
          onClick={() => handleWorkoutChange()}>
          {renderWorkoutMuscles(bundleData.selectedExercises)}
        </div>
      )}

      {bundleType === "sleep" && (
        <div className="mt-4">
          <input
            type="number"
            value={bundleData.sleepInHours || ""}
            className="text-black w-full p-2 border-2 border-red-500 rounded-md mt-2"
            onChange={handleSleepChange}
          />
        </div>
      )}

      {bundleType === "diet" &&
      <button
        className="mt-4 px-4 py-2 bg-white-500 text-blue-500 border-2 border-blue-500 font-semibold rounded-md w-full hover:bg-blue-300"
        onClick={()=>(setIsMyBundleModalOpen(true))}>
            Change Bundle
      </button>
      }

    {bundleType === "workout" &&
      <button
        className="mt-4 px-4 py-2 bg-white-500 text-blue-500 border-2 border-blue-500 font-semibold rounded-md w-full hover:bg-blue-300"
        onClick={()=>(setIsMyBundleModalOpen(true))}>
            Change Bundle
      </button>
      }

      {
        bundleType === "diet" && isMyBundleModalOpen  &&
        <MyDietBundlesModal 
        onClose={onClose}
        myDietBundles={myDietBundles}/>
      }

      {
        bundleType === "workout" && isMyBundleModalOpen  &&
        <MyWorkoutBundlesModal
          onClose={onClose}
          myWorkoutBundles={myWorkoutBundles}/>
      }
      
    </div>
    }
    </>
  );
};

export default Bundle;
