import React from 'react';

const WorkoutBundleComponent = ({ bundle,handleEditWorkoutBundle,index,setSelectedBundleIndex,setIsAreYouSureModalOpen }) => {
  const { name,selectedExercises } = bundle;

  const uniqueMuscles = [
    ...new Set(
      selectedExercises.flatMap((exercise) => exercise.musclesInvolved)
    ),
  ];

  const handleViewBundle = () => {
    handleEditWorkoutBundle(bundle);
  }

  const handleRemove = (e) => {
    e.stopPropagation();
    setIsAreYouSureModalOpen(true);
    setSelectedBundleIndex(index);
  }

  return (
    <div 
        className="w-48 border-2 border-red-500 bg-white rounded-lg shadow-2xl p-4 flex-shrink-0"
        >
      {/* Bundle Name */}
      <h2 className="text-xl font-semibold mb-2 text-black ml-[25%]">{name}</h2>

      {/* Unique Muscles (Vertical Scrollable) */}
      <div 
        className="h-32 overflow-y-auto rounded p-2 mb-4"
        onClick={handleViewBundle}>
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

      {/* Buttons */}
      <div className="flex justify-center">
        <button 
          className="border-2 border-black bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
          onClick={(e)=>handleRemove(e)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default WorkoutBundleComponent;
