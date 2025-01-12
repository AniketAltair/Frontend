import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import CalendarComponent from "../../common/items/calendarComponent"; // Assuming the CalendarComponent exists and is correctly implemented
import Bundle from "./bundle";

import {useDispatch,useSelector} from "react-redux";
import {setCurrentBundleData,setCurrentDate,setCurrentDietBundleIndexData} from "../../common/redux/slice/customerDashBoardSlice";
import MyDietBundlesModal from "./myDietBundlesModal";
import MyWorkoutBundlesModal from "./myWorkoutBundlesModal";

const initialCurrentBundleData = {
	diet:{
	  id:1,
      name:"Bundle 1",
      macros:{
          protein:150,
          carbs:200,
          fats:150,
          calories:2200,
          },
      meals:[
        {
          name:"Meal 1",
          time:"06:00",
          foodItems: [
                 {id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 20, carbs : 40, fats : 10, calories : 200,intialData:[1,10,20,5,100]},
                 {id:5,foodName: "Milk", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 1, quantityType:"unit" ,protein : 10, carbs : 20, fats : 5, calories : 100,intialData:[1,10,20,5,100]},
                ]
        },
        {
          name:"Meal 2",
          time:"10:00",
          foodItems: [
                 {id:4,foodName: "Oats", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 50, quantityType:"gms" ,protein : 30, carbs : 10, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                 {id:8,foodName: "Milk2", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 200, quantityType:"ml" ,protein : 10, carbs : 20, fats : 5, calories : 200,intialData:[250,47,10,20,220]},
                 {id:6,foodName: "Peanut butter", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 32, quantityType:"gms" ,protein : 15, carbs : 20, fats : 5, calories : 300,intialData:[250,47,10,20,220]},
                ]
        },
        {
          name:"Meal 3",
          time:"14:00",
          foodItems: [
                 {id:2,foodName: "Chicken", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 250, quantityType:"gms" ,protein : 50, carbs : 4, fats : 15, calories : 400,intialData:[250,47,10,20,220]},
                 { id:10,foodName: "Roti", image: "https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png", quantity : 2,quantityType:"unit", protein : 5, carbs : 10, fats : 2, calories : 150,intialData:[1,3,10,2,100]}
                ]
        },
        {
          name:"Meal 4",
          time:"18:00",
          foodItems: [
                  {id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 20, carbs : 40, fats : 10, calories : 200,intialData:[1,10,20,5,100]},
          ]
        }
      ]
    },
	workout:{
      id: 1,
      name: "Bundle 1",
      selectedExercises: [
        {
          id: 1,
          name: "Push up",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 2,
          name: "Pull up",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Back", "Biceps"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 3,
          name: "Plank",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Chest", "Triceps", "Abs"],
          details:[
            {"reps":10,"weight":20},
            {"reps":10,"weight":20},
            {"reps":10,"weight":20}
          ]
        },
        {
          id: 4,
          name: "ThreadMill",
          image: "https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg",
          musclesInvolved: ["Cardio"],
          details:[
            {"duration":10},
            {"duration":10},
            {"duration":10}
          ]
        },
      ],
    },
	sleep:{
        name:"Sleep (hrs)",
        sleepInHours:8,
    }
}



const DailyBundle = ({ 
  myDietBundlesData,
  myWorkoutBundlesData,
  setToastMessage,
  setIsToastVisible,
  setIsToastValidType
 }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [myDietBundles,setMyDietBundles] = useState([]);
  const [myWorkoutBundles,setMyWorkoutBundles] = useState([]);
  const [isMyDietBundleModalOpen,setIsMyDietBundleModalOpen] = useState(false);
  const [isMyWorkoutBundleModalOpen,setIsMyWorkoutBundleModalOpen] = useState(false);

  const dispatch = useDispatch();
  const {currentBundleData,currentDate} = useSelector((state)=>(state.customerDashBoard))

  const formatDate = (date) => {
    if (!date) return;
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Set the start date to 60 days before today
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 60); // 60 days before today

  // Set the max date to today
  const maxDate = new Date();

  const generateDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= maxDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    return dates;
  };

  const getCalendarRows = (dates) => {
    const rows = [];
    let currentRow = Array(7).fill(null); // 7 days in a week
    let dayIndex = dates[0].getDay(); // Start from the day of the week of the first date

    dates.forEach((date) => {
      currentRow[dayIndex] = date;
      dayIndex++;

      if (dayIndex === 7) {
        rows.push(currentRow);
        currentRow = Array(7).fill(null); // Start a new row
        dayIndex = 0;
      }
    });

    if (currentRow.some((date) => date !== null)) {
      rows.push(currentRow);
    }

    return rows;
  };

  const dates = generateDates();
  const calendarRows = getCalendarRows(dates);

  const handleSleepChange = (newValue) => {  
    const updatedCurrentBundleData = currentBundleData
      ? JSON.parse(JSON.stringify(currentBundleData))
      : { sleep: {} }; // Initialize with an empty sleep object if null
  
    if (Object.keys(updatedCurrentBundleData.sleep).length===0) {
      console.log("here");
      updatedCurrentBundleData.sleep = {name:"Sleep (hrs)",sleepInHours:0};
    }
  
    updatedCurrentBundleData.sleep.sleepInHours = newValue;  
    dispatch(setCurrentBundleData({ currentBundleData: updatedCurrentBundleData }));
  };

  const handleDietBundleChange = (newValue) => {
    console.log("inside diet update : "+newValue);
    
  };

  const handleWorkoutBundleChange = (newValue) => {
    console.log("inside workout update : "+newValue);
    
  };

  const setToastData = (error) => {
    setToastMessage(error);
    setIsToastVisible(true);
    setTimeout(() => {
        setIsToastVisible(false);
    }, 3000);
    setIsToastValidType(false);
  };

  const handleValidateInput = () => {
    
    if(!selectedDate){
      setToastData("Select Date !!!");
      return false;
    }
    if(!currentBundleData.diet){
      setToastData("Choose Diet !!!");
      return;
    }
    if(currentBundleData.diet.meals.length===0){
      setToastData("Enter Diet Meals !!!");
      return;
    }
    if(!currentBundleData.workout){
      setToastData("Choose Workout !!!");
      return;
    }
    if(currentBundleData.workout.selectedExercises.length===0){
      setToastData("Enter Exercises !!!");
      return;
    }
    if(currentBundleData.sleep.sleepInHours<=0 || currentBundleData.sleep.sleepInHours===null){
      setToastData("Enter Sleep !!!");
      return;
    }
    return true;
  }
  const handleSave = () => {
    // validation

    if(!handleValidateInput()){
      return;
    }

    // API call to save latest bundle for diet, workout and sleep and given date.
    console.log(selectedDate);
    console.log(JSON.stringify(currentBundleData))
    
  }

  const handleOpenMyDietBundlesModal = () => {
    setIsMyDietBundleModalOpen(true);
  }

  const handleOpenMyWorkoutBundlesModal = () => {
    setIsMyWorkoutBundleModalOpen(true);
  }

  const handleOpenMySleepModal = () => {

  }

  const onClose = () => {
    setIsMyDietBundleModalOpen(false);
    setIsMyWorkoutBundleModalOpen(false);
  }

  const handleChangeDate = (value) => {
    setSelectedDate(value);
  
    if (value) {
      dispatch(setCurrentDate({ currentDate: value.toISOString() }));
    }
  
    console.log("date changed");
  
    // API to get data set for thid currentDate
    // if data === null, the set sleep in updatedCurrentBundleData as below.
    // else set the value as given
    const updatedCurrentBundleData = {
      sleep: { name: "Sleep (hrs)", sleepInHours: 0 },
    };
    dispatch(setCurrentBundleData({ currentBundleData: updatedCurrentBundleData }));

    //dispatch(setCurrentBundleData({ currentBundleData: initialCurrentBundleData }));
  
    // Dispatch diet bundle index data if `initialCurrentBundleData` is available
    if (initialCurrentBundleData?.diet?.meals?.length) {
      dispatch(setCurrentDietBundleIndexData({ currentDietBundleIndexData: initialCurrentBundleData.diet.meals.length }));
    }
  };
  

  useEffect(()=>{
    console.log("currentBundleData changed"+JSON.stringify(currentBundleData));
  },[currentBundleData]);

  useEffect(() => {
    const today = new Date();
    if(currentDate===null){
      setSelectedDate(today); // Set the selected date to today
      handleChangeDate(today);
    }else{
      setSelectedDate(new Date(currentDate));
    }
    if (myDietBundlesData && myWorkoutBundlesData) {
      setMyDietBundles(myDietBundlesData);
      setMyWorkoutBundles(myWorkoutBundlesData);
    }

  }, [myDietBundlesData,myWorkoutBundlesData]);

  return (
    <div className="mt-2 border-2 border-red-500 flex-col items-center justify-between p-4 bg-white shadow-2xl rounded-md">
      {/* Date and Calendar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <FaCalendarAlt
                className="text-red-500 cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            />
            <span className="text-lg font-semibold text-black">{formatDate(selectedDate)}</span>
        </div>
        <div>
            <button 
                className="px-2 py-2 bg-green-500 text-black border-2 border-black rounded-md"
                onClick={handleSave}>
                Save
            </button>
        </div>
      </div>

      {/* Planner Options */}
      <div className="mt-3 flex space-x-6 overflow-x-auto justify-between">
        {!currentBundleData?.diet && (
          <button 
            className="px-2 py-2 bg-red-200 text-red-500 border-2 border-red-500 rounded-md"
            onClick={handleOpenMyDietBundlesModal}>
              Diet
          </button>
        )}
        {!currentBundleData?.workout && (
          <button 
            className="px-2 py-2 bg-red-200 text-red-500 border-2 border-red-500 rounded-md"
            onClick={handleOpenMyWorkoutBundlesModal}>
              Workout
          </button>
        )}
      </div>

      {/* Planner Cards */}
      
        <div className="mt-4 flex space-x-4 overflow-x-auto">
          {/* Diet Card */}
          {currentBundleData && currentBundleData.diet && 
          <Bundle
            bundleData={currentBundleData.diet}
            bundleType="diet"
            onChangeBundle={handleDietBundleChange}
            myDietBundles={myDietBundles}
          />}
          {/* Workout Card */}
          {currentBundleData && currentBundleData.workout &&
            <Bundle
              bundleData={currentBundleData.workout}
              bundleType="workout"
              onChangeBundle={handleWorkoutBundleChange}
              myWorkoutBundles={myWorkoutBundles}
            />
           }

          {/* Sleep Card */}
          {currentBundleData && currentBundleData.diet && currentBundleData.workout &&
            <Bundle
            bundleData={(currentBundleData.sleep)}
            bundleType="sleep"
            onChangeBundle={handleSleepChange}
          />
          }
        </div>

        {isMyDietBundleModalOpen  &&
          <MyDietBundlesModal 
            onClose={onClose}
            myDietBundles={myDietBundles}/>
        }

        {isMyWorkoutBundleModalOpen  &&
          <MyWorkoutBundlesModal
            onClose={onClose}
            myWorkoutBundles={myWorkoutBundles}/>
        }

      {/* Calendar */}
      <CalendarComponent
        isOpen={isCalendarOpen}
        selectedDate={selectedDate}
        handleChangeDate={handleChangeDate}
        dates={dates}
        rows={calendarRows}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
};

export default DailyBundle;
