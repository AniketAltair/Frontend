import React from 'react';

const ExercisesImages = ({ exerciseResponseData }) => {
  return (
    <div className="mt-4 p-4 space-y-4 w-full">
      {exerciseResponseData.map((muscleGroup) => (
        <div key={muscleGroup.muscle} className="bg-white p-2 rounded-md border-2 border-black flex-col w-full">
          {/* Render the title only for Cardio and others */}
          {muscleGroup.muscle.toLowerCase() !== 'cardio' && (
            <h3 className="text-red-500 text-lg font-semibold">
              {muscleGroup.muscle}
            </h3>
          )}

          <div
            className={`flex gap-5 py-2 ${
              muscleGroup.muscle.toLowerCase() === 'cardio' ? 'flex-wrap ml-5 overflow-y-auto h-[400px]' : 'overflow-x-auto'
            }`}
          >
            {muscleGroup.exercises.map((exercise) => (
              <div
                key={exercise.name}
                className="flex-shrink-0 w-[100px] h-[140px] flex flex-col items-center"
              >
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="border-2 border-black w-[100px] h-[100px] object-cover rounded-lg"
                />
                <p className="text-green-500 text-center text-sm mt-2">{exercise.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExercisesImages;
