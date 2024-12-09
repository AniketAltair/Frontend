import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[100]">
      <div className="flex flex-col items-center">
        <img 
          src="/WeightLiftingLoading.gif"
          alt="Loading"
          className="w-56 h-48 rounded-full sm:w-48 sm:h-40 below-400:w-[100px] below-400:h-[100px]"
        />
        <p className="mt-4 text-white text-lg ">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
