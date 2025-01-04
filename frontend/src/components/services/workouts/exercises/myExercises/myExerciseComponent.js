import React, { useEffect } from 'react';

const MyExerciseComponent = ({ data,setSelectedMyExerciseIndex,index,setIsAreYouSureModalOpen,onExerciseClick }) => {

  const handleRemove = (e) => {
    e.stopPropagation();
    setIsAreYouSureModalOpen(true);
    setSelectedMyExerciseIndex(index);
  }

  return (
    <div 
      className="w-[160px] h-[280px] flex-shrink-0 h-auto flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border-2 border-black"
      onClick={onExerciseClick}>
      <h3 className="text-lg text-red-500 font-semibold text-center mb-2">{data.name}</h3>
      <img
        src={data.image}
        alt={data.name}
        className="w-[100px] h-[100px] border-2 border-black object-cover rounded-lg mb-2"
      />
      <div className="h-[60px] overflow-y-auto">
        <ul className="text-sm text-gray-700 space-y-1">
          {data.musclesInvolved.map((muscle, index) => (
            <li key={index} className="text-green-500 text-center">
              {muscle}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-4 p-2 bg-red-500 text-black text-sm rounded-md border-2 border-black"
        onClick={(e)=>handleRemove(e)}
      >
        Remove
      </button>
    </div>
  );
};

export default MyExerciseComponent;
