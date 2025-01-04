import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const WorkoutModal = ({ workout, onClose }) => {
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [warning, setWarning] = useState(null);

  const handleAddToMyBundles = () => {
    
    setWarning(null);
    console.log("workout : "+JSON.stringify(workout));
    // API to check if the muscle bundle is already added to my workout bundles

    if(true){
        setWarning("Bundle already added !!!");
        return;
    }

    // API to send the workout to backend to save in my Bundles

    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="border-2 border-red-500 mx-2 bg-white p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-col overflow-y-auto h-[300px]">
          {workout.selectedExercises.map((exercise) => (
            <div key={exercise.id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="border-2 border-black rounded-md w-16 h-16 mr-4"
                  />
                  <p className="text-red-500">{exercise.name}</p>
                </div>
                <IoIosArrowDown 
                    className="ml-auto text-black w-5 h-5"
                    onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}/>
              </div>

              {expandedExercise === exercise.id && (
                <div className="mt-2 border-green-500 border-2 bg-green-100 text-black p-4 rounded-md">
                  {exercise.musclesInvolved.length === 1 &&
                  exercise.musclesInvolved[0] === "Cardio" ? (
                    <p>Duration: {exercise.details[0].duration} secs</p>
                  ) : (
                    <ul>
                      {exercise.details.map((detail, index) => (
                        <li key={index}>
                          Reps: {detail.reps}, Weight: {detail.weight} kg
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleAddToMyBundles}
            className="mt-1 px-4 py-2 bg-blue-400 text-black border-2 border-black rounded-md"
          >
            Add To My Bundles
          </button>
        </div>
       
        {warning && 
        <div className="text-red-500 text-xs">
            {warning}
        </div>
        }
      </div>
    </div>
  );
};

export default WorkoutModal;
