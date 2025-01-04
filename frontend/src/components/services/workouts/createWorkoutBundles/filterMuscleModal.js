import React, { useEffect } from 'react';
import { initialMuscleGroups } from '../exercises/initialMuscleGroups';

const FilterMuscleModal = ({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  handleSearchChange,
  searchTerm,
}) => {

  const dropDownData = [
    ...Object.values(initialMuscleGroups)
      .flat()
      .map((group) => group.muscleGroup),
    "Cardio",
  ];
  

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      console.log('Filters on modal close:', selectedFilters);  // Log selected filters when clicking outside
      onClose();
      handleSearchChange(searchTerm, selectedFilters);  // Trigger search change with updated filters
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener to detect clicks outside the modal
      document.body.addEventListener('click', handleClickOutside);
    } else {
      // Clean up the event listener when modal is closed
      document.body.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, selectedFilters]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <div className="border-2 border-red-500 bg-white p-6 rounded-lg shadow-lg w-80 max-h-[400px]">
        <div className="overflow-y-auto max-h-[300px]">
          <div className="flex flex-col space-y-2">
            {dropDownData.map((muscle) => (
              <label key={muscle} className="flex items-center text-green-500">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(muscle)}
                  onChange={() => onFilterChange(muscle)}
                  className="mr-2"
                />
                {muscle}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMuscleModal;
