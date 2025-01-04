import React, { useState } from 'react';
import ExerciseModal from './exerciseModal';
import { FaPlusCircle } from 'react-icons/fa';

const SearchExercisesComponent = ({ exercisesData, onAddExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleImageClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  const handleAddClick = (exercise) => {
    onAddExercise(exercise); // Call the parent function to add the exercise
  };

  return (
    <div className="border-2 border-red-500 rounded-lg bg-white overflow-y-scroll h-50 p-4">
     <div className="flex flex-wrap">
      {exercisesData.map((exercise) => (
        <div
          key={exercise.id}
          className="flex-col flex justify-center items-center mb-4 mx-2 relative"
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            className="border-2 border-black w-[70px] h-[70px] object-cover rounded-lg mb-2 cursor-pointer"
            onClick={() => handleImageClick(exercise)}
          />
          <FaPlusCircle
            onClick={() => handleAddClick(exercise)}
            className="absolute top-0 right-0 bg-white text-green-500 rounded-full"
          />
          <p className="text-xs font-semibold text-green-500 truncate max-w-[10ch]">
            {exercise.name}
          </p>
        </div>
      ))}
    </div>


      {selectedExercise && (
        <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchExercisesComponent;
