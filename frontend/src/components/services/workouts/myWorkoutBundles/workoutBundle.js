import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setIsMyWorkOutBundleVisible,
  setIsSelectedMyWorkoutBundleVisible,
  setSelectedMyWorkoutBundleData,
  setUpdatedSelectedExercisesState} from "../../../common/redux/slice/exercisesSlice";
import { IoArrowBack } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { FaFilter, FaListAlt } from 'react-icons/fa';
import SearchExercisesComponent from '../createWorkoutBundles/searchExercisesComponent';
import SelectedExerciseDetails from '../createWorkoutBundles/selectedExerciseDetails';
import AreYouSureModal from '../../../common/areYouSureModal/areYouSureModal';
import FilterMuscleModal from '../createWorkoutBundles/filterMuscleModal';

const WorkoutBundle = () => {

    const initialExercisesData = [
        {
          id: 1,
          name: 'Push Up',
          image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
          musclesInvolved: ['Chest', 'Triceps'],
        },
        {
          id: 2,
          name: 'Pull Up',
          image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
          musclesInvolved: ['Upper Back', 'Biceps'],
        },
        {
          id: 3,
          name: 'Plank',
          image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
          musclesInvolved: ['Abs','Chest', 'Triceps'],
        },
        {
          id: 4,
          name: 'Cardio exercise',
          image: 'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg',
          musclesInvolved: ['Cardio'],
        },
        // Add other exercises here...
      ];

    const [bundleName,setBundleName] = useState("");
    const [selectedExercises,setSelectedExercises] = useState([]);
    const [exerciseDetails, setExerciseDetails] = useState(null); // For storing exercise details
    const [searchTerm, setSearchTerm] = useState('');
    const [exercisesData, setExercisesData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [warning, setWarning] = useState('');
    const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] = useState(false);

    const dispatch = useDispatch();
    const {selectedMyWorkoutBundleData,updatedSelectedExercisesState} = useSelector((state)=>(state.exercises));

    const handleUpdateNewExercises = (searchValue, filterValue) => {
        console.log('searchterm : ' + searchValue);
        console.log('filters : ' + filterValue);
      };
    
      const handleSearchChange = (searchValue, filterValue) => {
        setSearchTerm(searchValue);
        setSelectedFilters(filterValue);
        handleUpdateNewExercises(searchValue, filterValue); // Trigger the update when search or filter changes
      };
    
      const handleFilterChange = (muscle) => {
        let updatedFilters = selectedFilters.includes(muscle)
          ? selectedFilters.filter((filter) => filter !== muscle)
          : [...selectedFilters, muscle];
    
        setSelectedFilters(updatedFilters);
      };
    
      const handleFilterToggle = () => {
        setIsFilterModalOpen((prev) => !prev);
      };
    
      const handleAddExercise = (exercise) => {
    
        if (!selectedExercises.some((selected) => selected.id === exercise.id)) {
    
          let exerciseWithDetails = {};
    
          if(exercise.musclesInvolved.length===1 && exercise.musclesInvolved[0]==="Cardio"){
    
            exerciseWithDetails = {
              ...exercise,
              details: [
                {duration : 10 },
                {duration : 10 },
                {duration : 10 }
              ]
            };
    
          }else{
    
            exerciseWithDetails = {
              ...exercise,
              details: [
                { reps: 12, weight: 20 },
                { reps: 12, weight: 20 },
                { reps: 12, weight: 20 }
              ]
            };
            
          }
    
          let updatedSelectedExercises = [...selectedExercises, exerciseWithDetails];
          setSelectedExercises(updatedSelectedExercises);
          dispatch(setUpdatedSelectedExercisesState({updatedSelectedExercisesState:updatedSelectedExercises}));
          console.log('Selected Exercises: ', updatedSelectedExercises);
        }
      };
    
      const handleRemoveExercise = (exerciseId) => {
        let updatedExercises = selectedExercises.filter(
          (exercise) => exercise.id !== exerciseId
        );
        setSelectedExercises(updatedExercises);
        dispatch(setUpdatedSelectedExercisesState({updatedSelectedExercisesState:updatedExercises}));

      };
    
      const handleShowDetails = (exercise) => {
        console.log("oooppa : "+JSON.stringify(exercise));
        setExerciseDetails({ ...exercise });
      };
    
      const updateRepsOrWeightOrDuration = (index, field, increment) => {
        console.log("1");
        setExerciseDetails((prev) => {
          const updatedDetails = prev.details.map((detail, idx) => {
            if (idx === index) {
              const currentValue = detail[field];
              const newValue = field === "weight" 
                ? Math.max(currentValue + increment, 0) 
                : Math.max(currentValue + increment, 1);
              return { ...detail, [field]: newValue }; // Create a new object with updated value
            }
            return detail; // Keep other details unchanged
          });
      
          const updatedExercise = { ...prev, details: updatedDetails };
          console.log("11");
          updateExercisesInParent(updatedExercise); // Save back to parent
          return updatedExercise;
        });
      };
      
      const updateSets = (increment) => {
        setExerciseDetails((prev) => {
          const updatedDetails = [...prev.details];
          if (increment > 0) {
            (updatedDetails[0].reps===undefined)?updatedDetails.push({duration:10}):updatedDetails.push({ reps: 12, weight: 20 }); 
          } else if (updatedDetails.length > 1) {
            updatedDetails.pop(); // Remove last set if more than 1 exists
          }
          const updatedExercise = { ...prev, details: updatedDetails };
          updateExercisesInParent(updatedExercise); // Save back to parent
          return updatedExercise;
        });
      };
    
      const updateExercisesInParent = (updatedExercise) => {
        console.log("2");
        setSelectedExercises((prevExercises) => {
          let updatedExercises = prevExercises.map((exercise) =>
            exercise.id === updatedExercise.id ? updatedExercise : exercise
          );
          dispatch(setUpdatedSelectedExercisesState({updatedSelectedExercisesState:updatedExercises}));
          return updatedExercises;
        });
      };
    
      const closeDetailsModal = () => {
        if (exerciseDetails) {
          updateExercisesInParent(exerciseDetails); // Save the final state
        }
        setExerciseDetails(null); // Close modal
      };
    
      const handleBundleName = (value) => {
        setBundleName(value);
      }
    
      const handleUpdateBundle = () => {
        
        const updatedBundle = JSON.parse(JSON.stringify(selectedMyWorkoutBundleData));
        updatedBundle.selectedExercises = selectedExercises;
        console.log("updated bundle : "+JSON.stringify(updatedBundle));
        console.log('Selected Exercises:', selectedExercises);
        console.log('Unique Muscles:', uniqueMuscles);

         // API call to update exercise
        // send the updatedBundle to backend with id in url.
          
        // Clear data
        setBundleName('');
        setSelectedExercises([]);
        setIsAreYouSureModalOpen(false);

        dispatch(setUpdatedSelectedExercisesState({updatedSelectedExercisesState:[]}));

        dispatch(setSelectedMyWorkoutBundleData({selectedMyWorkoutBundleData:null}))
        dispatch(setIsMyWorkOutBundleVisible({isMyWorkOutBundleVisible:true}));
        dispatch(setIsSelectedMyWorkoutBundleVisible({isSelectedMyWorkoutBundleVisible:false}));
      };
    
      const handleSetAreYouSureModal = () => {
        setWarning(null);
        if (!bundleName.trim()) {
          setWarning("Bundle Name cannot be empty !!!")
          return;
        }
        if (selectedExercises.length === 0) {
          setWarning("Select some exercises !!!")
          return;
        }

        // API call to check if bundle name already exists
        if(false){
          setWarning("Bundle Name already exists !!!");
          return;
        }

        setIsAreYouSureModalOpen(true);
      }

      const handleOnClose = () => {
        setIsAreYouSureModalOpen(false);
      }

    const handleNavigateBackToMyWorkoutBundles = () => {
        dispatch(setSelectedMyWorkoutBundleData({selectedMyWorkoutBundleData:null}))
        dispatch(setIsMyWorkOutBundleVisible({isMyWorkOutBundleVisible:true}));
        dispatch(setIsSelectedMyWorkoutBundleVisible({isSelectedMyWorkoutBundleVisible:false}));
    }

    const uniqueMuscles = [
        ...new Set(
          selectedExercises.flatMap((exercise) => exercise.musclesInvolved)
        ),
      ];
    

    useEffect(()=>{
        console.log("Sel ; "+JSON.stringify(selectedMyWorkoutBundleData))
        setExercisesData(initialExercisesData);
        setBundleName(selectedMyWorkoutBundleData.name);
        setSelectedExercises(updatedSelectedExercisesState);
    },[]);

  return (
    <div>
        <div className='flex items-center space-x-4 mb-2'>
          <button
              onClick={handleNavigateBackToMyWorkoutBundles}
              className="border-2 border-black flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-md w-6 h-6 shadow-lg transition duration-200"
              >
              <IoArrowBack className="h-6 w-6" />
          </button>
          <div className='text-black text-lg'>
              {bundleName}
          </div>
        </div>
        <div className='flex-col'>
            

            {/* Search Bar */}
            <div className="mb-2 flex items-center">
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value, selectedFilters)}
                className="text-black w-full p-3 rounded-md border-2 border-red-500"
                placeholder="Search exercises..."
                />
                <div className="bg-white border-2 border-red-500 rounded-md p-1 ml-1 flex items-center justify-center">
                  <button
                    className="p-2 rounded-full text-black"
                    onClick={handleFilterToggle}
                  >
                    <FaFilter size={20} />
                  </button>
                </div>
            </div>

            {/* Exercise List */}
            {exercisesData && (
                <SearchExercisesComponent
                exercisesData={exercisesData}
                onAddExercise={handleAddExercise}
                />
            )}

            <div className="flex">
                {/* Left Div - Selected Exercises */}
                <div className="w-1/2 h-80 overflow-y-scroll border-2 border-red-500 rounded-md my-1 mr-1 p-2">
                    {selectedExercises.map((exercise) => (
                    <div key={exercise.id} className="flex items-center justify-center sm:gap-x-6 md:gap-x-8 lg:gap-x-10 mb-4">
                        {/* Cancel Button */}
                        <MdCancel 
                        className='text-red-500 w-[20px] h-[20px] border-[1px] border-black rounded-full mr-2'
                        onClick={()=> handleRemoveExercise(exercise.id)}/>
                        {/* Exercise Image */}
                        <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-14 h-14 border-[1px] rounded-md border-black object-cover mr-2"
                        />
                        {/* Exercise Details */}
                        <FaListAlt 
                        className="mr-1 text-black"  
                        onClick={() => handleShowDetails(exercise)}/>
                    </div>
                    ))}
                </div>
        
                {/* Right Div - Unique Muscles */}
                <div className="w-1/2 h-80 overflow-y-scroll border-2 border-red-500 rounded-md mt-1 p-2 flex-col flex items-center">
                    {uniqueMuscles.map((muscle, index) => (
                    <div key={index} className="text-black text-sm border-2 border-black bg-green-500 rounded-full py-1 px-3 mb-2">
                        {muscle}
                    </div>
                    ))}
                </div>
            </div>
        </div>

        
      {/* Exercise Details Modal */}
      <SelectedExerciseDetails
        exerciseDetails={exerciseDetails}
        updateRepsOrWeightOrDuration={updateRepsOrWeightOrDuration}
        updateSets={updateSets}
        closeDetailsModal={closeDetailsModal}
      />

     { warning &&
        <div className='text-xs text-red-500'>
          {warning}
        </div>
      }
      <button
        onClick={()=>handleSetAreYouSureModal()}
        className="bg-blue-400 text-black border-2 border-black px-4 py-2 rounded-md mt-2"
      >
        Update Bundle
      </button>

      {/* Filter Modal */}
      <FilterMuscleModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />

      {isAreYouSureModalOpen && (
        <AreYouSureModal onConfirm={handleUpdateBundle} onCancel={handleOnClose} />
      )}

    </div>
  )
}

export default WorkoutBundle