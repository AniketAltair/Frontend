import React, { useEffect } from 'react'
import DietBundleComponent from './dietBundleComponent'
import WorkoutBundleComponent from './workoutBundleComponent'

const MyWorkoutBundlesModal = ({onClose,myWorkoutBundles}) => {
    
  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}>
        <div
            className="flex gap-x-2 items-center border-red-500 border-2 bg-white p-5 rounded-lg shadow-xl w-[90%] max-w-md h-[240px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
               {myWorkoutBundles.map((data,index)=>(
                    <WorkoutBundleComponent
                        key={index} 
                        index={index} 
                        data={data}
                        onClose={onClose}/>
                ))}
        </div>
    </div>
  )
}

export default MyWorkoutBundlesModal