import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaRedo } from 'react-icons/fa';
import CalendarComponent from '../../common/items/calendarComponent';
import MyDietBundlesModal from './myDietBundlesModal';
import MyWorkoutBundlesModal from './myWorkoutBundlesModal';

const Planner = () => {

  const initialMyDietBundles = [
    {
      id:1,
      name:"Bundle 1",
        macros:{
            protein:150,
            carbs:200,
            fats:150,
            calories:2200,
            }
    },
    {
      id:2,
      name:"Bundle 2",
        macros:{
            protein:160,
            carbs:210,
            fats:160,
            calories:2300,
            }
    },
    {
      id:3,
      name:"Bundle 3",
        macros:{
            protein:150,
            carbs:200,
            fats:150,
            calories:2400,
            }
    },
    {
      id:4,
      name:"Bundle 4",
        macros:{
            protein:160,
            carbs:210,
            fats:160,
            calories:2500,
            }
    },
  ];
  
  const initialMyWorkoutBundles = [
    {
      id:1,
      name:"Bundle 1",
        muscleGroupsInvolved:["Upper Chest","Triceps","Forearms"]
    },
    {
      id:2,
      name:"Bundle 2",
        muscleGroupsInvolved:["Upper Back","Biceps"]
    },
    {
      id:3,
      name:"Rest",
        muscleGroupsInvolved:[]
    },
    {
      id:4,
     name:"Bundle 4",
        muscleGroupsInvolved:["Outer Quads","Calves","Side Delts","Hamstrings","Lower Quads","Rear Delts"]
    },
  ];

  const plannerData = {
    selectedDate:new Date("Tue Jan 14 2025 22:07:08 GMT+0530"),
    sleepHours:["0","4","5","6"],
    selectedDiet:[
      {},
      {bundleId:1,bundleName:"Bundle 1"},
      {bundleId:3,bundleName:"Bundle 3"},
      {bundleId:2,bundleName:"Bundle 2"},
    ],
    selectedWorkout:[
      {},
      {bundleId:1,bundleName:"Bundle 1"},
      {bundleId:4,bundleName:"Bundle 4"},
      {bundleId:2,bundleName:"Bundle 2"},
    ]
  };
  
  const [isActive, setIsActive] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);

  const [interval, setInterval] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [sleepHours, setSleepHours] = useState({});
  const [selectedDiet, setSelectedDiet] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState({});

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  

  const [myDietBundles,setMyDietBundles] = useState(null);
  const [myWorkoutBundles,setMyWorkoutBundles] = useState(null);
  const [warning,setWarning] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(tomorrow.getDate() + 60);

  const generateDates = () => {
    const dates = [];
    let currentDate = new Date(tomorrow);
    while (currentDate <= maxDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const getCalendarRows = (dates) => {
    const rows = [];
    let currentRow = Array(7).fill(null);
    let dayIndex = dates[0].getDay();

    dates.forEach((date) => {
      currentRow[dayIndex] = date;
      dayIndex++;

      if (dayIndex === 7) {
        rows.push(currentRow);
        currentRow = Array(7).fill(null);
        dayIndex = 0;
      }
    });

    if (currentRow.some((date) => date !== null)) {
      rows.push(currentRow);
    }

    return rows;
  };

  const handleReset = () => {
    setSelectedDiet({});
    setSelectedWorkout({}); 
    setSelectedDate(null);
    setInterval('');
    setSleepHours({});
  };

  const handleSleepChange = (day, value) => {
    if (value >= 0 && value <= 24) {
      setSleepHours((prev) => ({ ...prev, [day]: value }));
    }
  };

  const dates = generateDates();
  const calendarRows = getCalendarRows(dates);

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDietSelect = (day, bundleId, bundleName) => {
    setSelectedDiet((prev) => ({
      ...prev,
      [day]: { bundleId, bundleName }, // Store both bundleId and bundleName for the selected day
    }));
    setShowDietModal(false);
  };

  const handleWorkoutSelect = (day,bundleId, bundleName) => {
    setSelectedWorkout((prev) => ({ ...prev, [day]: { bundleId, bundleName }}));
    setShowWorkoutModal(false);
  };

  const validate = () => {
    if(interval===0){
      setWarning("Interval value Missing !!!");
      return false;
    }
    if(selectedDate===null){
      setWarning("Starting Date value Missing !!!");
      return false;
    }
    if(Object.keys(selectedDiet).length === 0 || Object.keys(selectedWorkout).length === 0 || Object.keys(sleepHours).length === 0){
      setWarning("Select Bundles for all days !!!");
      return false;
    }

    return true;
  }

  const handleSave = () => {
    setWarning("");
    const savedData = Array.from({ length: interval }, (_, index) => ({
      day: index + 1,
      diet: selectedDiet[index + 1] || "Not Selected",
      workout: selectedWorkout[index + 1] || "Not Selected",
      sleep: sleepHours[index+1] || "Not Selected"
    }));

    // validation
    if(!validate()){
      console.log("Validation Failed");
      return;
    }
    console.log("validation pass");
  
    // API call to save Data in backend
    // Send Date and saved data to backend

  };

  const handleActivate = () => {

    if(!validate()){
      console.log("Validation Failed");
      return;
    }
    
    setIsActive(!isActive);
    console.log("isActive : "+(!isActive));

    //API call to set the planner activation value
  }

  useEffect(()=>{
    // API call to bring planner data
    setSelectedDate(plannerData.selectedDate);
    setInterval(plannerData.selectedDiet.length-1);
    setSelectedDiet(plannerData.selectedDiet);
    setSelectedWorkout(plannerData.selectedWorkout);
    setSleepHours(plannerData.sleepHours);

    // API call to bring myDietBundles and myWorkoutBundles
    setMyDietBundles(initialMyDietBundles);
    setMyWorkoutBundles(initialMyWorkoutBundles);
  },[])

  return (
    <div className="font-cursive flex flex-col items-center p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center w-full">
        <label className="text-black flex items-center text-lg font-semibold">
          Starting Date :
          {selectedDate && (
            <p className="ml-2 text-sm text-black">{formatDate(selectedDate)}</p>
          )}
          <FaCalendarAlt
            className="ml-3 text-red-500 cursor-pointer"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          />
        </label>
        
        <CalendarComponent
          isOpen={isCalendarOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dates={dates}
          rows={calendarRows}
          onClose={() => setIsCalendarOpen(false)}
        />
      </div>

      {/* Interval Section */}
      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold text-red-500">Interval:</label>
        <input
          type="number"
          className="text-black w-20 p-2 border-2 border-red-500 rounded-md"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
        <button
          onClick={handleReset}
          className="p-2 text-white bg-red-400 rounded-full hover:bg-red-600"
        >
          <FaRedo />
        </button>
      </div>

      {/* Day Cards Section */}
      {interval > 0 && (
        <div className="w-full space-y-4">
          {Array.from({ length: parseInt(interval) }, (_, index) => (
            <div
              key={index}
              className="p-4 bg-white border-2 border-red-500 rounded-lg shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-black">Day {index + 1} :</span>
                  <button 
                    className="text-sm py-2 px-3 text-black border border-black bg-red-400 rounded-full"
                    onClick={() => {
                      setCurrentDay(index + 1);
                      setShowDietModal(true);
                    }}>
                    Diet
                  </button>
                  <button 
                    className="text-sm p-2 text-black border border-black bg-green-500 rounded-full"
                    onClick={() => {
                      setCurrentDay(index + 1);
                      setShowWorkoutModal(true);
                    }}>
                    Workout
                  </button>
                  <input
                    type="number"
                    className="w-16 p-2 border-2 border-red-500 rounded-md text-black text-sm"
                    placeholder="0-24"
                    value={sleepHours[index + 1] || ''}
                    onChange={(e) => handleSleepChange(index + 1, e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-1 text-black flex justify-center text-[8px]">
                <span>( {(selectedDiet[index+1] && selectedDiet[index+1].bundleName || "Not Selected")} , {(selectedWorkout[index+1] && selectedWorkout[index+1].bundleName || "Not Selected")} )</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(warning!=="") &&
        <div className='text-xs text-red-500'>
          {warning}
        </div>
        }

      {/* Save and Toggle Button Section */}
      <div className="flex items-center space-x-4">
        <button 
          className="px-4 py-2 text-black bg-green-500 rounded-md border-2 border-black"
          onClick={handleSave}>
          Save
        </button>
        <button
          onClick={() => handleActivate()}
          className={`px-4 py-2 text-black rounded-md border-2 border-black ${
            isActive
              ? 'bg-red-500'
              : 'bg-green-500'
          }`}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      {/* Modals */}
      {myDietBundles && showDietModal && (
        <MyDietBundlesModal
          bundles={myDietBundles}
          currentDay={currentDay}
          selectedDiet={selectedDiet}
          onSelect={(bundleId,bundleName) => handleDietSelect(currentDay,bundleId,bundleName)}
          onClose={() => setShowDietModal(false)}
        />
      )}
      {myWorkoutBundles && showWorkoutModal && (
        <MyWorkoutBundlesModal
          bundles={myWorkoutBundles}
          currentDay={currentDay}
          selectedWorkout={selectedWorkout}
          onSelect={(bundleId,bundleName) => handleWorkoutSelect(currentDay, bundleId,bundleName)}
          onClose={() => setShowWorkoutModal(false)}
        />
      )}

      
    </div>
  );
};

export default Planner;
