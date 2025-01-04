import React, { useEffect, useState } from "react";
import WorkoutCard from "./workoutCard";
import WorkoutModal from "./workoutModal";

import { initialSuggestedBeginnerWorkouts,
  initialSuggestedIntermediateWorkouts,
  initialSuggestedAdvancedWorkouts
 } from "./workoutsData"; 

const SuggestedWorkouts = () => {

  const [suggestedWorkoutsBeginners,setSuggestedWorkoutsBeginners] = useState([]);
  const [suggestedWorkoutsIntermediate,setSuggestedWorkoutsIntermediate] = useState([]);
  const [suggestedWorkoutsAdvanced,setSuggestedWorkoutsAdvanced] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [modalData, setModalData] = useState(null);

  const getWorkoutsByLevel = () => {
    if (selectedLevel === "Beginner") return suggestedWorkoutsBeginners;
    if (selectedLevel === "Intermediate") return suggestedWorkoutsIntermediate;
    if (selectedLevel === "Advanced") return suggestedWorkoutsAdvanced;
    return [];
  };

  const handleOpenModal = (workout) => setModalData(workout);
  const handleCloseModal = () => setModalData(null);

  useEffect(()=>{
    // API call to bring suggested workout from backend.
    // set it to all 3.

    setSuggestedWorkoutsBeginners(initialSuggestedBeginnerWorkouts);
    setSuggestedWorkoutsIntermediate(initialSuggestedIntermediateWorkouts);
    setSuggestedWorkoutsAdvanced(initialSuggestedAdvancedWorkouts);
  },[]);

  return (
    <div className="flex-col flex items-center">
      {/* Level Buttons */}
      <div className="flex mb-4 gap-2">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <button
            key={level}
            className={`px-2 py-1 rounded-md text-black border-2 border-black ${
              selectedLevel === level ? "bg-red-500" : "bg-red-300"
            }`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable Component */}
      <div className="flex overflow-x-auto w-full gap-4 scrollbar-hide">
        {getWorkoutsByLevel().map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      
      {/* Modal */}
      {modalData && <WorkoutModal workout={modalData} onClose={handleCloseModal} />}
    </div>
  );
};

export default SuggestedWorkouts;
