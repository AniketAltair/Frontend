import React from "react";

const WorkoutCard = ({ workout, onOpenModal }) => {
  const uniqueMuscles = [
    ...new Set(
      workout.selectedExercises.flatMap((exercise) => exercise.musclesInvolved)
    ),
  ];

  return (
    <div className="border-2 border-red-500 bg-white shadow-2xl rounded-md p-4 w-[180px] flex-shrink-0">
      <h3 className="ml-[25%] text-sm text-black font-bold mb-2">{workout.name}</h3>

      {/* Vertical Scrollable Component */}
      <div className="flex-col flex  overflow-y-auto h-40">
        {uniqueMuscles.map((muscle, index) => (
          <button
            key={index}
            className="block text-black bg-green-400 border-2 border-black rounded-full text-xs mb-2"
            onClick={() => onOpenModal(workout)}
          >
            {muscle}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCard;
