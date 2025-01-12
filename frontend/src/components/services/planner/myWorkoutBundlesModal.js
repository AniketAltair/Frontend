import React from 'react';

const MyWorkoutBundlesModal = ({ bundles, onSelect, onClose, currentDay, selectedWorkout}) => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}>
      <div 
        className="border-2 border-red-500 p-4 bg-white rounded-lg w-[320px]"
        onClick={(e)=>(e.stopPropagation())}>
        <div className="py-4 flex gap-x-2 overflow-x-scroll">
          {bundles.map((bundle, index) => (
            <div
              key={index}
              className={`flex-col flex items-center p-4 border-2 border-red-500 rounded-lg shadow-2xl ${(selectedWorkout[currentDay] && selectedWorkout[currentDay].bundleId === bundle.id)? "bg-red-200":"bg-white" } flex-shrink-0 w-[160px] `}
              onClick={() => onSelect(bundle.id,bundle.name)}
            >
              <h3 className="text-lg text-black font-bold mb-4">{(bundle.name === "Rest"?"":bundle.name)}</h3>
              {bundle.muscleGroupsInvolved.length > 0 ? (
                <ul className='h-[120px] overflow-y-auto'>
                  {bundle.muscleGroupsInvolved.map((muscle, idx) => (
                    <li 
                      key={idx}
                      className='border border-black bg-green-500 text-sm text-black py-1 px-2 m-1 rounded-full'>
                        {muscle}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-black'>Rest Day</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWorkoutBundlesModal;
