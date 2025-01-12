import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import SlidingMessagesComponent from "./slidingMessagesComponent";
import ProgressStats from "./progressStats";
import UserPersonalStats from "./userPersonalStats";
import ToastComponent from "../common/toast/toastComponent";
import SettingsData from "./settingsData";
import { useSelector } from "react-redux";
import BodyFatPercentCalculator from "./bodyFatPercentCalculator";
import DailyBundle from "./dietWorkoutBundle/dailyBundle";
import DietBundleData from "./dietWorkoutBundle/dietEdit/dietBundleData";
import WorkoutBundleData from "./dietWorkoutBundle/workoutEdit/workoutBundleData";
import Graph from "./graphs/graph";

const initialMessages = [
  "FitFlix has opened near you at 20 kms",
  "New Plan for subscription",
  "Welcome to 2025 !!!",
];

const initialProgressStats = {
  progressSoFar: "excellent",
  inputDaysMissed: 4,
  inputDaysMissedDates: ["06/01/2025", "01/01/2025", "25/12/2024", "12/12/2024"],
  dailyAvgActiveTime: 142,
};

const initialUserPersonalStats = {
  height: 174,
  weight: 85,
  age: 23,
  gender: "male",
  goal: "cutting",
};

const initalSettingsData = {
  isPlannerActive: false,
  isDietNotificationRemindersActive: false,
  isWorkoutNotificationRemindersActive: true,
};

const initialMyDietBundles = [
  {
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
  {
    id:2,
    name:"Bundle 2",
    macros:{
        protein:180,
        carbs:250,
        fats:100,
        calories:2000,
        },
    meals:[
      {
        name:"Meal 1",
        time:"06:00",
        foodItems: [
               {id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 20, carbs : 40, fats : 10, calories : 200,intialData:[1,47,10,20,220]},
               {id:2,foodName: "Banana", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 1, quantityType:"unit" ,protein : 10, carbs : 20, fats : 5, calories : 100,intialData:[1,47,10,20,220]},
              ]
      },
      {
        name:"Meal 2",
        time:"10:00",
        foodItems: [
               {id:4,foodName: "Oats", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 50, quantityType:"gms" ,protein : 30, carbs : 10, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
               {id:5,foodName: "Milk", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 200, quantityType:"ml" ,protein : 10, carbs : 20, fats : 5, calories : 200,intialData:[250,47,10,20,220]},
               {id:6,foodName: "Peanut butter", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 32, quantityType:"gms" ,protein : 15, carbs : 20, fats : 5, calories : 300,intialData:[250,47,10,20,220]},
               {id:9,foodName: "seeds", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 15, quantityType:"gms" ,protein : 5, carbs : 10, fats : 5, calories : 400,intialData:[250,47,10,20,220]},						 						 
              ]
      },
      {
        name:"Meal 3",
        time:"14:00",
        foodItems: [
               {id:7,foodName: "Chicken", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 250, quantityType:"gms" ,protein : 50, carbs : 4, fats : 15, calories : 400,intialData:[250,47,10,20,220]},
               {id:8,foodName: "Roti", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 3, quantityType:"unit" ,protein : 10, carbs : 40, fats : 5, calories : 100,intialData:[1,47,10,20,220]},
              ]
      },
      {
        name:"Meal 4",
        time:"18:00",
        foodItems: [
               {id:10,foodName: "Eggs", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 18, carbs : 20, fats : 25, calories : 200,intialData:[1,47,10,20,220]},
              ]
      }
    ]
  }
];

const initialMyWorkoutBundles = [
  {
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
  {
    id: 2,
    name: "Bundle 2",
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
    ],
  },
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CustomerDashBoardComponent = ({ 
  previousScrollPositionRef,
  messages,
  progressStats,
  userPersonalStats,
  settingsData,
  myDietBundlesData,
  myWorkoutBundlesData,
  graphData,
  setBundleDataChanged
 }) => {
  

  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [istoastValidtype, setIsToastValidType] = useState(true);

  useLayoutEffect(() => {
    // Only restore scroll position if it's not initially 0
    if (previousScrollPositionRef.current !== 0) {
      setTimeout(() => {
        window.scrollTo(0, previousScrollPositionRef.current);
      }, 50); // Delay to ensure layout is complete
    }

    return () => {
      const scrollPosition = window.scrollY;
      // Save scroll position only if it's greater than 0 (indicating user scrolled)
      if (scrollPosition > 0) {
        previousScrollPositionRef.current = scrollPosition;
      }
    };
  }, [previousScrollPositionRef]);


  return (
    <div className="font-cursive bg-gray-50 p-4">
      <ToastComponent
        toastMessage={toastMessage}
        toastVisible={toastVisible}
        istoastValidtype={istoastValidtype}
      />
      {/* Sliding Messages */}
      {messages && <SlidingMessagesComponent messages={messages} />}

      {/* Progress Stats */}
      {progressStats && <ProgressStats stats={progressStats} />}

      {/* User Personal Stats */}
      {userPersonalStats && (
        <UserPersonalStats
          stats={userPersonalStats}
          setToastMessage={setToastMessage}
          setIsToastVisible={setToastVisible}
          setIsToastValidType={setIsToastValidType}
        />
      )}

      {/* Settings Data */}
      {settingsData && <SettingsData settingsData={settingsData} />}

      {/* Body Fat Calculator */}
      <BodyFatPercentCalculator
        userPersonalStats={userPersonalStats}
        setToastMessage={setToastMessage}
        setToastVisible={setToastVisible}
        setIsToastValidType={setIsToastValidType}
      />

      {/* Daily Bundle */}
      {settingsData && <DailyBundle  
        myDietBundlesData={myDietBundlesData}
        myWorkoutBundlesData={myWorkoutBundlesData}
        setToastMessage={setToastMessage}
        setIsToastVisible={setToastVisible}
        setIsToastValidType={setIsToastValidType}
        setBundleDataChanged={setBundleDataChanged}
        />
      }

      {graphData &&
        <Graph
          graphData={graphData}
        /> 
      }
       
    </div>
  );
};

const CustomerDashBoard = () => {

  const [messages, setMessages] = useState([]);
  const [progressStats, setProgressStats] = useState({});
  const [userPersonalStats, setUserPersonalStats] = useState({});
  const [settingsData, setSettingsData] = useState({});
  const [myDietBundles, setMyDietBundles] = useState(null);
  const [myWorkoutBundles, setMyWorkoutBundles] = useState(null);
  const [bundleDataChanged, setBundleDataChanged] = useState(false);
  const [graphData,setGraphData] = useState({diet:{},workout:{},sleep:[]});

  const {
    isCustomerDashBoardVisible,
    isEditDietBundleVisible,
    isEditWorkoutBundleVisible,
  } = useSelector((state) => state.customerDashBoard);

  // Reference to store scroll position
  const previousScrollPositionRef = useRef(0);

  useEffect(()=>{
    console.log("graph data fetch");
    
    const updatedgraphdata = {
      diet: {
        protein: Array.from({ length: 60 }, () => getRandomInt(0, 180)),
        carbs: Array.from({ length: 60 }, () => getRandomInt(0, 250)),
        fats: Array.from({ length: 60 }, () => getRandomInt(0, 100)),
        calories: Array.from({ length: 60 }, () => getRandomInt(0, 2500))
      },
      workout: {
        benchPress: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        latpullDown: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        bicepCurl: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        tricepPushDown: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        barbellSquats: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        threadmill: { unit: 's', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
        cycle: { unit: 's', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) }
      },
      sleep: Array.from({ length: 60 }, () => getRandomInt(0, 24))
    };

    // API call to set all graph data
    setGraphData(updatedgraphdata);

  },[bundleDataChanged])

  useEffect(()=>{
    // API call to set all data
    console.log("initialLoad CustomerDashBoard");
    setMessages(initialMessages);
    setProgressStats(initialProgressStats);
    setUserPersonalStats(initialUserPersonalStats);
    setSettingsData(initalSettingsData);
    setMyDietBundles(initialMyDietBundles);
    setMyWorkoutBundles(initialMyWorkoutBundles);
  },[]);

  return (
    <>
      {isCustomerDashBoardVisible && (
        <CustomerDashBoardComponent 
          previousScrollPositionRef={previousScrollPositionRef}
          messages={messages}
          progressStats={progressStats}
          userPersonalStats={userPersonalStats}
          settingsData={settingsData}
          myDietBundlesData={myDietBundles}
          myWorkoutBundlesData={myWorkoutBundles}
          graphData={graphData}
          setBundleDataChanged={setBundleDataChanged}
          />
      )}
      {isEditDietBundleVisible && <DietBundleData />}
      {isEditWorkoutBundleVisible && <WorkoutBundleData />}
    </>
  );
};

export default CustomerDashBoard;
