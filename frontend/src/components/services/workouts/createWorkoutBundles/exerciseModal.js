import React from 'react';

const ExerciseModal = ({ exercise, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="mx-4 border-2 border-red-500 bg-white p-6 rounded-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
      >
        <div className="flex flex-col items-center">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="border-2 border-black w-[100px] h-[100px] object-cover rounded-lg mb-1"
          />
          <h3 className="text-red-500 text-xl font-bold">{exercise.name}</h3>
          <div className="flex-col flex overflow-y-auto h-[100px]">
            <ul>
              {exercise.musclesInvolved.map((muscle, index) => (
                <li key={index} className="flex items-center justify-center border-[1px] border-green-500 text-sm text-black bg-green-200 rounded-full px-10 py-1 my-1">
                  {muscle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
