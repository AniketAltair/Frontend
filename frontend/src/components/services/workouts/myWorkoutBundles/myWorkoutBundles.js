import React, { useEffect, useState } from 'react';
import WorkoutBundleComponent from './workoutBundleComponent';
import {useDispatch} from 'react-redux';
import {setIsMyWorkOutBundleVisible,
  setIsSelectedMyWorkoutBundleVisible,
  setSelectedMyWorkoutBundleData,
  setUpdatedSelectedExercisesState} from "../../../common/redux/slice/exercisesSlice";
import AreYouSureModal from '../../../common/areYouSureModal/areYouSureModal';


const MyWorkoutBundles = () => {

  const initialMyWorkoutBundles = [
    {
      id: 1,
      name: "Bundle 1",
      selectedExercises: [
        {
          id: 1,
          name: "Push up",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 2,
          name: "Pull up",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Back", "Biceps"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 3,
          name: "Plank",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps", "Abs"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 4,
          name: "ThreadMill",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Cardio"],
          details:[
            {"duration":10},
            {"duration":10},
            {"duration":10}
          ]
        },
      ],
    },
    {
      id: 2,
      name: "Bundle 2",
      selectedExercises: [
        {
          id: 1,
          name: "Push up",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 3,
          name: "Plank",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps", "Abs"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
      ],
    },
  ];

  const [myBundlesData,setMyBundlesData] = useState();
  const [selectedBundleIndex, setSelectedBundleIndex] = useState(null);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] = useState(false);
  
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setSelectedBundleIndex(null);
    setIsAreYouSureModalOpen(false);
  };

  const handleRemoveBundle = () => {
    setMyBundlesData((prev) => prev.filter((_, id) => id !== selectedBundleIndex));
    setSelectedBundleIndex(null);
    setIsAreYouSureModalOpen(false);
  };

  const handleEditWorkoutBundle = (value) => {
    dispatch(setUpdatedSelectedExercisesState({updatedSelectedExercisesState:value.selectedExercises}));
    dispatch(setSelectedMyWorkoutBundleData({selectedMyWorkoutBundleData:value}));
    dispatch(setIsMyWorkOutBundleVisible({isMyWorkOutBundleVisible:false}));
    dispatch(setIsSelectedMyWorkoutBundleVisible({isSelectedMyWorkoutBundleVisible:true}));
  }

  useEffect(()=>{
    console.log("l");
    // API call to get my bundle info 
    setMyBundlesData(initialMyWorkoutBundles);
  },[])

  return (
    <div className="p-4">
      <div className="flex overflow-x-auto space-x-4">
        {myBundlesData && myBundlesData.map((bundle,index) => (
          <WorkoutBundleComponent 
            key={bundle.id} 
            bundle={bundle}
            index={index}
            setSelectedBundleIndex={setSelectedBundleIndex}
            setIsAreYouSureModalOpen={setIsAreYouSureModalOpen}
            handleEditWorkoutBundle={handleEditWorkoutBundle}/>
        ))}
      </div>
      {isAreYouSureModalOpen && (
        <AreYouSureModal onConfirm={handleRemoveBundle} onCancel={handleOnClose} />
      )}
    </div>
  );
};

export default MyWorkoutBundles;
