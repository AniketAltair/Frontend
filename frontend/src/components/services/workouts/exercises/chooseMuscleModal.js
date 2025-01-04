import React, { useState } from "react";

const ChooseMuscleModal = ({ muscleGroups, groupColors, isOpen, onClose }) => {
  if (!isOpen) return null;

  // State to track selected muscles
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  // Flatten the muscle groups and add group and part information
  const allMuscles = Object.entries(muscleGroups).flatMap(([parent, muscles]) =>
    muscles.map((muscle) => ({
      parent,
      part: typeof muscle === "string" ? muscle : muscle.part, // Handle string or object structure
      name: typeof muscle === "string" ? muscle : muscle.muscleGroup,
    }))
  );

  const handleMuscleSelect = (muscle) => {
    const isSelected = selectedMuscles.some(
      (item) => item.name === muscle.name && item.parent === muscle.parent
    );

    if (isSelected) {
      // Remove muscle if already selected
      setSelectedMuscles(
        selectedMuscles.filter(
          (item) => item.name !== muscle.name || item.parent !== muscle.parent
        )
      );
    } else {
      // Add muscle if not already selected
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75"
      onClick={() => onClose(selectedMuscles)} // Pass selected muscles on modal close
    >
      <div
        className="bg-yellow-300 p-3 rounded-lg shadow-lg w-96 h-[400px] overflow-y-auto border-2 border-black mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Display all muscles with their group color */}
        <div className="flex flex-wrap gap-4 justify-center">
          {allMuscles.map((muscle) => (
            <button
            key={`${muscle.name}-${muscle.parent}`}
            onClick={() => handleMuscleSelect(muscle)}
            className={`px-4 py-2 rounded-md border-2 border-black text-black transition duration-200 ${
              selectedMuscles.some(
                (item) => item.name === muscle.name && item.parent === muscle.parent
              )
                ? "bg-gray-500"
                : groupColors[muscle.parent]
            }`} // Change color based on selection
          >
            {muscle.name}
          </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseMuscleModal;
