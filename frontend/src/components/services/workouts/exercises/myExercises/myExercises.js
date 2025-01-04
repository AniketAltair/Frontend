import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setExercisesVisible, setMyExercisesVisible } from '../../../../common/redux/slice/exercisesSlice';
import { IoArrowBack } from 'react-icons/io5';
import MyExerciseComponent from './myExerciseComponent';
import ExerciseDetailsModal from './exerciseDetailsModal';
import { FaPlusCircle } from 'react-icons/fa';
import AreYouSureModal from '../../../../common/areYouSureModal/areYouSureModal';

const MyExercises = () => {
  const initialMyExercisesData = [
    {
      id:1,
      name: 'Push Up',
      image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
      musclesInvolved: ['Chest', 'Triceps'],
    },
    {
      id:2,
      name: 'Pull Up',
      image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
      musclesInvolved: ['Upper Back', 'Biceps'],
    },
    {
      id:3,
      name: 'Plank',
      image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
      musclesInvolved: ['Abs'],
    },
  ];

  const [myExercisesData, setMyExercisesData] = useState([]);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] = useState(false);
  const [selectedMyExerciseIndex, setSelectedMyExerciseIndex] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const dispatch = useDispatch();

  const handleNavigateBackToExercises = () => {
    dispatch(setExercisesVisible({ exercisesVisible: true }));
    dispatch(setMyExercisesVisible({ myExercisesVisible: false }));
  };

  const handleOnClose = () => {
    setSelectedMyExerciseIndex(null);
    setIsAreYouSureModalOpen(false);
  };

  const handleRemoveExercise = () => {
    setMyExercisesData((prev) => prev.filter((_, id) => id !== selectedMyExerciseIndex));
    setSelectedMyExerciseIndex(null);
    setIsAreYouSureModalOpen(false);
  };

  const handleOpenExerciseDetails = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleAddNewExercise = () => {
    const newExercise = {
        name:"",
        image:"https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg",
        musclesInvolved:[]
    }
    setSelectedExercise(newExercise);
  }

  const handleCloseExerciseDetails = () => {
    setSelectedExercise(null);
  };

  const handleAddExercise = (addedExercise) => {

    console.log("exercise : "+JSON.stringify(addedExercise));

    // API call to update the exercise in backend
    // Once successfull do this like below state change.
    // get new exercise id from backend and set it here
    console.log("here in handleadd")
    console.log("exer : "+JSON.stringify(addedExercise))
    addedExercise.id = 4;   
    setMyExercisesData((prev) =>
      [...prev,addedExercise]
    );
  };

  const handleUpdateExercise = (updatedExercise) => {

    console.log("exercise : "+JSON.stringify(updatedExercise));

    // API call to update the exercise in backend
    // Once successfull do this like below state change.
    setMyExercisesData((prev) =>
      prev.map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise))
    );
  };

  useEffect(() => {
    console.log("h");
    setMyExercisesData(initialMyExercisesData);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <button
        onClick={handleNavigateBackToExercises}
        className="border-2 border-black flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-md w-6 h-6 shadow-lg transition duration-200"
      >
        <IoArrowBack className="h-6 w-6" />
      </button>

      <div className="flex overflow-x-auto space-x-4 py-2">
        {myExercisesData.map((exercise, index) => (
          <MyExerciseComponent
            key={exercise.name}
            data={exercise}
            index={index}
            setSelectedMyExerciseIndex={setSelectedMyExerciseIndex}
            setIsAreYouSureModalOpen={setIsAreYouSureModalOpen}
            onExerciseClick={() => handleOpenExerciseDetails(exercise)}
          />
        ))}
      </div>

      <div className="flex justify-start mt-4 gap-4 w-full">
        <button 
            className="ml-2 bg-white-500 text-green-500 border-2 border-green-500 px-4 py-2 rounded-md flex items-center hover:bg-green-200"
            onClick={handleAddNewExercise}>
          <FaPlusCircle className="mr-2" /> Add Exercise
        </button>
      </div>

      {isAreYouSureModalOpen && (
        <AreYouSureModal onConfirm={handleRemoveExercise} onCancel={handleOnClose} />
      )}

      {selectedExercise && (
        <ExerciseDetailsModal
          exercise={selectedExercise}
          onClose={handleCloseExerciseDetails}
          onUpdate={handleUpdateExercise}
          onAdd={handleAddExercise}
        />
      )}
    </div>
  );
};

export default MyExercises;
