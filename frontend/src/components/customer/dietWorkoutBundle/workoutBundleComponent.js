import React, { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {setCurrentBundleData} from "../../common/redux/slice/customerDashBoardSlice";

const WorkoutBundleComponent = ({ data,index,onClose }) => {

  const { id,name,selectedExercises } = data;

  const dispatch = useDispatch();
  const {currentBundleData} = useSelector((state)=>(state.customerDashBoard))

  const handleChangeBundle = () => {
      const updatedCurrentBundleData = JSON.parse(JSON.stringify(currentBundleData));
      updatedCurrentBundleData.workout = data;
      dispatch(setCurrentBundleData({currentBundleData:updatedCurrentBundleData}));
      onClose();
    }

  const uniqueMuscles = [
    ...new Set(
      selectedExercises.flatMap((exercise) => exercise.musclesInvolved)
    ),
  ];

  return (
   
    <div 
        className="w-48 border-2 border-red-500 bg-white rounded-lg shadow-2xl p-4 flex-shrink-0"
        onClick={handleChangeBundle}>
      {/* Bundle Name */}
      <h2 className="text-xl font-semibold mb-2 text-black ml-[25%]">{name}</h2>

      {/* Unique Muscles (Vertical Scrollable) */}
      <div 
        className="h-32 overflow-y-auto rounded p-2 mb-4">
        <ul className="space-y-1">
          {uniqueMuscles.map((muscle, index) => (
            <li
              key={index}
              className="border-2 border-black text-black bg-green-500 p-1 rounded-full flex justify-center"
            >
              {muscle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutBundleComponent;
