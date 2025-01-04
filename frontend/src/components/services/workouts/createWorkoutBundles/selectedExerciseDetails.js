import React from 'react';

const ControlButton = ({ onClick, disabled, label, position, buttonType }) => {
  const buttonClass = () => {
    if (buttonType === 'sets') return 'bg-black text-white'; // Black for sets
    if (buttonType === 'reps') return 'bg-red-500 text-black'; // Red for reps
    if (buttonType === 'weight') return 'bg-green-500 text-black'; // Green for weight
    return 'bg-gray-200 text-black'; // Default
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 ${position === 'left' ? 'rounded-l' : 'rounded-r'} ${buttonClass()}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

const ControlGroup = ({ label, value, onIncrease, onDecrease, minValue, type }) => (
  <div className="flex items-center mb-2 text-black">
    <div 
        className='flex items-center gap-x-4 border-2 border-black rounded-md flex justify-between'
        onClick={(e)=>(e.stopPropagation())}>
        <ControlButton
        onClick={onDecrease}
        disabled={value <= minValue}
        label="-"
        position="left"
        buttonType={type}
        />
        <div className="px-1">{value}</div>
        <ControlButton
        onClick={onIncrease}
        label="+"
        position="right"
        buttonType={type}
        />
    </div>
    <span className="ml-2 text-xs text-black">({label})</span>
  </div>
);

const SelectedExerciseDetails = ({
  exerciseDetails,
  updateRepsOrWeightOrDuration,
  updateSets,
  closeDetailsModal,
}) => {
  return (
    <>
      {exerciseDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeDetailsModal}
        >
          <div
            className="bg-white border-2 border-red-500 w-80 p-4 rounded-lg shadow-lg flex-col flex items-start overflow-y-auto h-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className='text-lg text-red-500 mb-3'>
              <u>{exerciseDetails.name}</u>
            </div>
            {/* Sets Control */}
            <ControlGroup
              label="Sets"
              value={exerciseDetails.details.length}
              onIncrease={() => updateSets(1)}
              onDecrease={() => updateSets(-1)}
              minValue={1}
              type="sets"
            />

            {/* Reps and Weight Controls */}
            {exerciseDetails.details.map((detail, index) => (
              <div key={index} className="mb-4">
                {/* Reps */}
                {detail.reps && <ControlGroup
                  label="Reps"
                  value={detail.reps}
                  onIncrease={() => updateRepsOrWeightOrDuration(index, 'reps', 1)}
                  onDecrease={() => updateRepsOrWeightOrDuration(index, 'reps', -1)}
                  minValue={1}
                  type="reps"
                />}
                {/* Weight */}
                {detail.weight && <ControlGroup
                  label="Weight (kg) "
                  value={detail.weight}
                  onIncrease={() => updateRepsOrWeightOrDuration(index, 'weight', 0.5)}
                  onDecrease={() => updateRepsOrWeightOrDuration(index, 'weight', -0.5)}
                  minValue={0}
                  type="weight"
                />}
                {/* Duration */}
                {detail.duration && <ControlGroup
                  label="Time (min) "
                  value={detail.duration}
                  onIncrease={() => updateRepsOrWeightOrDuration(index, 'duration', 1)}
                  onDecrease={() => updateRepsOrWeightOrDuration(index, 'duration', -1)}
                  minValue={0}
                  type="weight"
                />}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedExerciseDetails;
