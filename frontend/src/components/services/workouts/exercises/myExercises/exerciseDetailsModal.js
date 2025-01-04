import React, { useRef, useEffect, useState } from "react";
import { initialMuscleGroups } from "../initialMuscleGroups";

const ExerciseDetailsModal = ({ exercise, onClose, onUpdate, onAdd }) => {
  const dropDownData = Object.values(initialMuscleGroups)
    .flat()
    .map((group) => group.muscleGroup);

  const modalRef = useRef(null);
  const [exerciseName, setExerciseName] = useState(exercise.name || "");
  const [exerciseImage, setExerciseImage] = useState(exercise.image || "");
  const [musclesInvolved, setMusclesInvolved] = useState(
    exercise.musclesInvolved || []
  );
  const [errors, setErrors] = useState({ name: false, muscles: false });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCardio, setIsCardio] = useState(musclesInvolved.length === 1 && musclesInvolved[0] === "Cardio");

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleImageClick = () => {
    document.getElementById("image-input").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setExerciseImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddMuscle = (value) => {
    if (value && !musclesInvolved.includes(value)) {
      setMusclesInvolved([...musclesInvolved, value]);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveMuscle = (muscle) => {
    setMusclesInvolved(musclesInvolved.filter((m) => m !== muscle));
  };

  const validateInputs = () => {
    const nameError = !exerciseName.trim();
    const musclesError = musclesInvolved.length === 0;
    setErrors({ name: nameError, muscles: musclesError });
    return !nameError && !musclesError;
  };

  const handleAddOrUpdate = () => {
    if (!validateInputs()) return;

    const updatedExercise = {
      ...exercise,
      name: exerciseName,
      image: exerciseImage,
      musclesInvolved,
    };

    if (exercise.id === undefined) {
      onAdd(updatedExercise);
    } else {
      onUpdate(updatedExercise);
    }
    onClose();
  };

  const handleCardioToggle = () => {
    setIsCardio(true);
    setMusclesInvolved(["Cardio"]);
  };

  const handleWeightTrainingToggle = () => {
    setIsCardio(false);
    setMusclesInvolved([]);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div
        ref={modalRef}
        className="border-2 border-red-500 bg-white rounded-lg p-6 w-11/12 md:w-1/2"
      >
        {/* Exercise Image */}
        <div className="flex items-center justify-center">
          <img
            src={exerciseImage || "placeholder-image.png"}
            alt="Exercise"
            onClick={handleImageClick}
            className="border-2 border-black w-[100px] h-[100px] object-cover rounded-md cursor-pointer mb-2"
          />
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Exercise Name */}
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="w-full px-3 py-2 border-2 border-red-500 text-black rounded-md"
          placeholder="Enter exercise name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Name cannot be empty</p>
        )}

        {/* Cardio or Weight Training Toggle Buttons */}
        {!isCardio ? (
          <button
            onClick={handleCardioToggle}
            className="mt-2 w-full bg-green-500 text-black py-2 rounded-md border-2 border-black"
          >
            This is Cardio
          </button>
        ) : (
          <button
            onClick={handleWeightTrainingToggle}
            className="mt-2 w-full bg-green-500 text-black py-2 rounded-md border-2 border-black"
          >
            This is Weight Training
          </button>
        )}

        {/* Custom Dropdown */}
        {!isCardio && (
          <div className="mt-2 relative">
            <button
              onClick={toggleDropdown}
              className="w-full px-3 py-2 border-2 border-red-500 text-black rounded-md bg-white text-left"
            >
              Select Muscle
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full bg-white border-2 border-red-500 rounded-md mt-1 max-h-40 overflow-y-auto">
                {dropDownData.map((muscle) => (
                  <li
                    key={muscle}
                    className="px-3 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAddMuscle(muscle)}
                  >
                    {muscle}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Error Message */}
        {errors.muscles && (
          <p className="text-red-500 text-sm mt-1">
            Muscle list cannot be empty
          </p>
        )}

        {/* Selected Muscles */}
        {!isCardio && (
          <div className="border-2 border-red-500 overflow-y-auto max-h-40 border rounded-md p-2 mt-2">
            {musclesInvolved.map((muscle) => (
              <div
                key={muscle}
                className="flex justify-between items-center bg-white px-2 py-1 mb-1 rounded-md border-2 border-green-500"
              >
                <span className="text-green-500">{muscle}</span>
                <button
                  onClick={() => handleRemoveMuscle(muscle)}
                  className="text-black"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add/Update Button */}
        <button
          onClick={handleAddOrUpdate}
          className={`mt-4 w-full bg-white ${
            exercise.id === undefined ? "text-green-500" : "text-blue-500"
          } py-2 rounded-md ${
            exercise.id === undefined ? "border-green-500" : "border-blue-500"
          } border-2`}
        >
          {exercise.id === undefined ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetailsModal;
