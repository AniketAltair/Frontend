import React, { useEffect, useState } from "react";

import ChickenMuscle from "../../../../assets/muscles/chickenMuscle/ChickenMuscle.png";
import HeartPumping from "../../../../assets/heart/HeartPumping.png";

import ChooseMuscleModal from "./chooseMuscleModal";
import MuscleImages from "./muscleImages";

import {initialMuscleGroups} from "./initialMuscleGroups";
import ExercisesImages from "./exercisesImages";
import { FaPlusCircle } from "react-icons/fa";

import {useDispatch} from "react-redux";

import {setExercisesVisible,setMyExercisesVisible} from "../../../common/redux/slice/exercisesSlice";

const Exercises = () => {

  const InitialExerciseResponseData = [
                  {muscle:"UpperChest",
                  exercises: [{name:"Chest Flyes",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpea7wpAz1eaRoTOGSB5MXvanGVEM1MYJqT4hQnGxzw-reHXrZg2Fq_NhV0IYuXwVMQCk&usqp=CAU"},
                            {name:"Bench Press",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1uYYwbm88BcN-woYvk6DZ8Sdb9ThjGl-xLw&s"},
                            {name:"Chest Flyes2",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpea7wpAz1eaRoTOGSB5MXvanGVEM1MYJqT4hQnGxzw-reHXrZg2Fq_NhV0IYuXwVMQCk&usqp=CAU"},
                            {name:"Bench Press2",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1uYYwbm88BcN-woYvk6DZ8Sdb9ThjGl-xLw&s"}]},
                  {muscle:"UpperBack",
                  exercises: [{name:"Lat Pull Down",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sX9fqSn-bNaLj4aIUQK7ucpR0WLGlAmDfA&s"},
                            {name:"Rowing",image:"https://static.vecteezy.com/system/resources/previews/027/786/582/non_2x/woman-grasping-cable-attachment-on-machine-flat-line-color-character-editable-outline-full-body-person-on-white-seated-row-exercise-simple-cartoon-spot-illustration-for-web-graphic-design-vector.jpg"}]}             
                ]

  const InitialCardioExerciseResponseData = [
    {muscle:"Cardio",
    exercises: [{name:"Cycling",image:"https://cdn.pixabay.com/photo/2020/10/24/12/38/woman-5681398_1280.png"},
              {name:"Threadmill",image:"https://t4.ftcdn.net/jpg/01/70/07/47/360_F_170074762_PpziEJruY5JmGKAvkHCpbpLJm8auWlil.jpg"},
              {name:"Stair Master",image:"https://www.shutterstock.com/image-vector/man-character-doing-cardio-stair-260nw-2042716523.jpg"},
              {name:"Cycling2",image:"https://cdn.pixabay.com/photo/2020/10/24/12/38/woman-5681398_1280.png"},
              {name:"Threadmill2",image:"https://t4.ftcdn.net/jpg/01/70/07/47/360_F_170074762_PpziEJruY5JmGKAvkHCpbpLJm8auWlil.jpg"},
              {name:"Stair Master2",image:"https://www.shutterstock.com/image-vector/man-character-doing-cardio-stair-260nw-2042716523.jpg"},
      ]
    }];

  const initialGroupColors = {
    chest: "bg-red-300",
    back: "bg-green-300",
    shoulder: "bg-red-300",
    biceps: "bg-green-300",
    triceps: "bg-red-300",
    forearms: "bg-green-300",
    abs: "bg-red-300",
    legs: "bg-green-300",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState();
  const [groupColors, setGroupColors] = useState();
  const [heartImage, setHeartImage] = useState(false);
  const [exerciseResponseData, setExerciseResponseData] = useState([]);

  const [muscleGroupMap,setMuscleGroupMap] = useState(new Map()); 
  const [activeMuscleIndex, setActiveMuscleIndex] = useState({});

  const dispatch = useDispatch();


  const handleMuscleSelect = (muscles) => {
    setHeartImage(false)
    setSelectedMuscles(muscles);
    setIsModalOpen(false);
    
    const updatedMap = new Map();
  
    muscles.forEach((muscle) => {
      let musclesIncluded = updatedMap.get(muscle.part) || [];
      
      musclesIncluded.push(muscle.name.replace(/ /g, ""));

      console.log("muscle name :" + muscle.name.replace(" ",""));
  
      updatedMap.set(muscle.part, musclesIncluded);
    });
  
    setMuscleGroupMap(updatedMap);
    handleEquipments(muscles);
  };

  const handleCardio = () => {
    setMuscleGroupMap(new Map());
    setHeartImage(true);

    // API call to get cardio exercises
    // here we dont have any input we send. has a seperate api

    setExerciseResponseData(InitialCardioExerciseResponseData);
    // send that to ExerciseList 
  }

  const handleEquipments = (muscles) => {
    console.log("muscles : "+JSON.stringify(muscles));

    // has all muscle names like "Upper Chest","Lower Back" in an array.
    const muscleNames = muscles.map((muscle)=>(muscle.name));
    
    // API call, send all muscles to backend and get list of exercises

    setExerciseResponseData(InitialExerciseResponseData);

    // Response : [{muscle:"UpperChest",
    //              machines: [{name:"Chest Flyes",image:"imageLink"},
    //                         {name:"Pec Dec",image:"imageLink"}]},
    //              {muscle:"UpperBack",
    //              machines: [{name:"Lat Pull Down",image:"imageLink"},
    //                         {name:"Rowing",image:"imageLink"}]}             
    //             ]

    // make a ExerciseList component and send this data there.
    // only shows machines, non clickable.
    // if pressed cardio, should pass on the cardio machines data.
    // write code in handle cardio
  }

  const handleMyExercises = () => {
    dispatch(setExercisesVisible({exercisesVisible:false}));
    dispatch(setMyExercisesVisible({myExercisesVisible:true}));
  }

  useEffect(() => {
    console.log(" initialize Index map : ");
    // Initialize activeMuscleIndex for all muscle groups
    const initialIndexMap = {};
    muscleGroupMap.forEach((muscles, group) => {
      initialIndexMap[group] = 0;
    });
    console.log("initialized Index map :"+JSON.stringify(initialIndexMap));
    setActiveMuscleIndex(initialIndexMap);
}, [muscleGroupMap]);

useEffect(() => {
    console.log(" update Index map : ");
    const interval = setInterval(() => {
        setActiveMuscleIndex((prev) => {
            const updatedIndexMap = { ...prev };
            muscleGroupMap.forEach((muscles, group) => {
                if (muscles.length > 0) {
                    updatedIndexMap[group] = (updatedIndexMap[group] + 1) % muscles.length;
                }
            });
            return updatedIndexMap;
        });
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval);
}, [muscleGroupMap]);

  useEffect(() => {
    // API call to bring all muscle data 
    setMuscleGroups(initialMuscleGroups);
    setGroupColors(initialGroupColors);
    setSelectedMuscles([
      { name: "Upper Chest", parent: "chest", part: "UpperFront" },
    ])
  }, []);

  return (
    <div className="flex flex-col items-center p-2">

  {muscleGroupMap.size === 0 && (
    <div className="flex justify-start mt-4 gap-4 w-full">
      <img
        src={heartImage ? HeartPumping : ChickenMuscle}
        alt={"ChickenMuscle"}
        className="ml-[80px] rounded-md w-40 h-40 object-cover"
      />
    </div>
  )}

  <MuscleImages
    muscleGroupMap={muscleGroupMap}
    activeMuscleIndex={activeMuscleIndex}
  />

  {/* Buttons aligned to the left */}
  <div className="flex justify-start mt-4 gap-4 w-full">
    <button
      onClick={() => setIsModalOpen(true)}
      className="ml-2 px-6 py-3 bg-green-500 text-black border-2 border-black rounded-lg shadow-xl"
    >
      Which Muscle?
    </button>

    <button
      onClick={() => handleCardio()}
      className="ml-2 px-6 py-3 bg-green-500 text-black border-2 border-black rounded-lg shadow-xl"
    >
      Cardio?
    </button>
  </div>

  {(muscleGroupMap.size!==0 || heartImage) &&
  <ExercisesImages
    exerciseResponseData={exerciseResponseData}
  />
  }

<div className="flex justify-start mt-4 gap-4 w-full">
      <button 
        className="ml-2 bg-white-500 text-green-500 border-2 border-green-500 px-4 py-2 rounded-md flex items-center hover:bg-green-200"
        onClick={handleMyExercises}>
        My Exercises
      </button>
    </div>

  {/* Modal Component */}
  <ChooseMuscleModal
    muscleGroups={muscleGroups}
    groupColors={groupColors}
    isOpen={isModalOpen}
    onClose={handleMuscleSelect}
  />
</div>


  );
};

export default Exercises;
