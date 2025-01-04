import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMyDietBundleVisible,
  setAddNewBundleVisibleVisible,
  setViewMyBundleVisible,
  setAddNewBundleData,
  setAddNewBundleMealIndexData,
  setAddNewBundleName,
  setAddNewBundleNumberOfMeals
} from '../../../common/redux/slice/myDietBundleSlice';
import { IoArrowBack } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import FoodSearch from './foodSearch';
import TimeClock from '../../../common/items/timeClock';

const AddNewBundle = () => {

  const [bundleName, setBundleName] = useState('');
  const [numMeals, setNumMeals] = useState(0);
  const [expandedMeals, setExpandedMeals] = useState({});
  const [data, setData] = useState();
  const [showfoodSearchModal, setShowfoodSearchModal] = useState(false);
  const [showTotalMacrosModal,setShowTotalMacrosModal] = useState(false);
  const [mealIndex,setMealIndex] = useState(0);
  const [activeTimePicker, setActiveTimePicker] = useState(null);
  const [time, setTime] = useState('');
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [totalMacros,setTotalMacros] = useState([]);
  

  const { addNewBundleData,
          addNewBundleMealIndexData,
          addNewBundleName,
          addNewBundleNumberOfMeals } = useSelector((state) => state.myDietBundle);
  const dispatch = useDispatch();


  const handleNavigateBackToMyDietBundle = () => {
    dispatch(setMyDietBundleVisible({ myDietBundleVisible: true }));
    dispatch(setAddNewBundleVisibleVisible({ addNewBundleVisible: false }));
    dispatch(setViewMyBundleVisible({ viewMyBundleVisible: false }));
  };

  const handleTimeChange = (mealIndex,newTime) => {
    setTime(newTime);
    handleMealTimeChange(mealIndex,newTime);
    setActiveTimePicker(null);
  };

  const toggleExpand = (mealIndex) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealIndex]: !prev[mealIndex],
    }));
  };


  const handleNumberOfMealInputChange = (value) => {
    console.log("handlenummeals : " + value);
  
    // Reset the state with newBundleData
    const newBundleData = {
      name: "",
      macros: {
        protein: 0,
        carbs: 0,
        fats: 0,
        calories: 0,
      },
      meals: [],
    };
  
    dispatch(setAddNewBundleNumberOfMeals({addNewBundleNumberOfMeals:value}));
    dispatch(setAddNewBundleData({ addNewBundleData: newBundleData }));
    dispatch(setAddNewBundleMealIndexData({ addNewBundleMealIndexData: newBundleData.meals.length }));
  
    // Clone the cleared data after resetting
    const updatedData = JSON.parse(JSON.stringify(newBundleData));
  
    // Add meals based on the selected value
    for (let i = 0; i < value; i++) {
      updatedData.meals.push({
        name: `Meal ${i + 1}`, // Ensure the naming starts from 1
        time: "00:00",
        foodItems: [],
      });
    }
  
    // Update the state and dispatch the new data
    setData(updatedData);
    dispatch(setAddNewBundleData({ addNewBundleData: updatedData }));
    dispatch(setAddNewBundleMealIndexData({ addNewBundleMealIndexData: updatedData.meals.length }));
  
    // Update the number of meals
    setNumMeals(value);
  };
  
  
  const handleRemoveFoodItem = (mealIndex, foodIndex) => {
    setData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      updatedData.meals[mealIndex].foodItems.splice(foodIndex, 1);

      dispatch(setAddNewBundleData({addNewBundleData:updatedData}));

      return updatedData;
    });
  };
  
  const handleMealTimeChange = (mealIndex, time) => {
    setData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      updatedData.meals[mealIndex].time = time;

      dispatch(setAddNewBundleData({addNewBundleData:updatedData}));

      return updatedData;
    });
  };
  
  const handleInputChange = (mealIndex, foodIndex, newQuantity) => {
    setData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      const foodItem = updatedData.meals[mealIndex].foodItems[foodIndex];
      const multiplier = parseFloat((newQuantity / foodItem.intialData[0]).toFixed(2));

      console.log("foodItem.intialData[0] : "+foodItem.intialData[0]);
      console.log("multiplier : "+multiplier);
  
      foodItem.quantity = newQuantity;
      foodItem.protein = foodItem.intialData[1]*multiplier;
      foodItem.carbs = foodItem.intialData[2]*multiplier;
      foodItem.fats = foodItem.intialData[3]*multiplier;
      foodItem.calories = foodItem.intialData[4]*multiplier;

      dispatch(setAddNewBundleData({addNewBundleData:updatedData}));

      return updatedData;
    });
  };

  const handleAddBundle = () => {

    setWarning(false);
    setWarningText("");

    if(bundleName===null || bundleName==="" || bundleName===" "){
      setWarningText("Enter Bundle Name !!!");
      setWarning(true);
      return;
    }

    // API call to check if bundle name is already present
    if(false){
      setWarningText("Bundle Name is already present !!!");
      setWarning(true);
      return;
    }

    const updatedData = JSON.parse(JSON.stringify(data)); // Deep copy to avoid mutating state directly

    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    // Remove meals with zero food items
    updatedData.meals = updatedData.meals.filter(meal => meal.foodItems.length > 0);

    //Return if no meals and no food items.
    if(updatedData.meals.length===0){
      console.log("inside if no meals")
      return;
    }

    // Order meals according to time
    updatedData.meals.sort((a, b) => {
        const timeA = a.time.split(":").join(""); // Convert time to a sortable string (e.g., "06:30" => "0630")
        const timeB = b.time.split(":").join(""); // Convert time to a sortable string
        return timeA - timeB;
    });

    // Set meal numbers in order
    updatedData.meals.forEach((meal, index) => {
        meal.name = `Meal ${index + 1}`;
    });

    // Combine food items with the same ID in the same meal
    updatedData.meals.forEach((meal) => {
        const foodItemMap = new Map();

        meal.foodItems.forEach((foodItem) => {
            if (foodItem.quantity === 0) {
                foodItem.quantity = foodItem.intialData[0];
                foodItem.protein = foodItem.intialData[1];
                foodItem.carbs = foodItem.intialData[2];
                foodItem.fats = foodItem.intialData[3];
                foodItem.calories = foodItem.intialData[4];
            }

            // If food item already exists, combine their data
            if (foodItemMap.has(foodItem.id)) {
                const existingItem = foodItemMap.get(foodItem.id);
                existingItem.quantity += foodItem.quantity;
                existingItem.protein += foodItem.protein;
                existingItem.carbs += foodItem.carbs;
                existingItem.fats += foodItem.fats;
                existingItem.calories += foodItem.calories;
            } else {
                foodItemMap.set(foodItem.id, { ...foodItem });
            }
        });

        // Reassign combined food items back to the meal
        meal.foodItems = Array.from(foodItemMap.values());
    });

    // Recalculate macros for the updated data
    updatedData.meals.forEach((meal) => {
        meal.foodItems.forEach((foodItem) => {
            totalProtein += foodItem.protein;
            totalCarbs += foodItem.carbs;
            totalFats += foodItem.fats;
            totalCalories += foodItem.calories;
        });
    });

    updatedData.macros.protein = totalProtein;
    updatedData.macros.carbs = totalCarbs;
    updatedData.macros.fats = totalFats;
    updatedData.macros.calories = totalCalories;

    // Log the updated data (for debugging)
    console.log("Updated Data:", JSON.stringify(updatedData));

    // Update the state with corrected data if needed
    setData(updatedData);

    // API call to update the new bundle in backend (Example: axios call)

    // Dispatch actions to update the visibility of components
    dispatch(setMyDietBundleVisible({ myDietBundleVisible: true }));
    dispatch(setAddNewBundleVisibleVisible({ addNewBundleVisible: false }));
    dispatch(setViewMyBundleVisible({ viewMyBundleVisible: false }));
};


  

    const handleAddFoodItems = (addedFoodItems) => {

        console.log("mealIndex: " + mealIndex);
        console.log("Added Food Items: " + JSON.stringify(addedFoodItems));
        console.log("Data before update: " + JSON.stringify(data));
    
        const updatedData = JSON.parse(JSON.stringify(data));
    
        updatedData.meals = updatedData.meals.map((meal, index) => {
            if (index === mealIndex) {
                return {
                    ...meal,
                    foodItems: [...meal.foodItems, ...JSON.parse(JSON.stringify(addedFoodItems))],
                };
            }
            return meal; 
        });
    
        setData(updatedData);

        dispatch(setAddNewBundleData({addNewBundleData:updatedData}));
            
        console.log("Data after update: " + JSON.stringify(updatedData));
    };

    const handleAddMeal = () => {
          console.log("add meal");
          const updatedData = JSON.parse(JSON.stringify(data));
          updatedData.meals.push({
              name:`Meal ${addNewBundleMealIndexData+1}`,
              time:"00:00",
              foodItems:[]
          })
          setData(updatedData);
          setNumMeals((prev)=>(prev+1));
          dispatch(setAddNewBundleData({addNewBundleData:updatedData}));
          dispatch(setAddNewBundleMealIndexData({addNewBundleMealIndexData:(addNewBundleMealIndexData+1)}));
      }
    
    const handleRemoveMeal = (mealIndex) => {
        console.log("remove meal");

        const updatedData = JSON.parse(JSON.stringify(data));

        updatedData.meals.splice(mealIndex,1);

        setNumMeals((prev=>(prev===1?null:(prev-1))));

        setData(updatedData);

        dispatch(setAddNewBundleData({addNewBundleData:updatedData}));
    }

    const handleFoodSearch = (index) => {
        setMealIndex(index);
        setShowfoodSearchModal(true);
    }

    const onClose = () => {
        setShowfoodSearchModal(false);
        setShowTotalMacrosModal(false);
    }

    const handleBundleNameChange = (name) => {
      setBundleName(name);
      dispatch(setAddNewBundleName({addNewBundleName:name}));
    }

    const handleShowMacros = () => {
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalCalories = 0;

      console.log("data : "+JSON.stringify(data));
  
      // Iterate through the meals
      data.meals.forEach(meal => {
          // For each meal, iterate through its food items
          meal.foodItems.forEach(item => {
              totalProtein += item.protein;
              totalCarbs += item.carbs;
              totalFats += item.fats;
              totalCalories += item.calories;
          });
      });
  
      console.log("Total Macros for all meals:");
      console.log("Protein: " + totalProtein);
      console.log("Carbs: " + totalCarbs);
      console.log("Fats: " + totalFats);
      console.log("Calories: " + totalCalories);
      setTotalMacros([totalProtein,totalCarbs,totalFats,totalCalories]);
      setShowTotalMacrosModal(true);
  };

    useEffect(() => {
        if (addNewBundleData) {
            console.log("addNewBundleData : "+JSON.stringify(addNewBundleData));
            setData(JSON.parse(JSON.stringify(addNewBundleData))); // Deep copy during initialization
        }
    }, [addNewBundleData]); 
    
    useEffect(()=>{
      if(addNewBundleName){
        setBundleName(addNewBundleName);
      }
      if(addNewBundleNumberOfMeals){
        setNumMeals(addNewBundleNumberOfMeals);
      }
    },[])

  return (

    <div className="flex-col font-cursive bg-white p-2 rounded-md">
      <div className="flex items-center">
        <button
          onClick={() => handleNavigateBackToMyDietBundle()}
          className="border-2 border-black flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-md w-6 h-6 shadow-lg transition duration-200"
        >
          <IoArrowBack className="h-6 w-6" />
        </button>
        {data && (
          <div className="text-lg ml-6 text-black">
            {data.name}
          </div>
        )}
      </div>

      {/* Bundle Name Input */}
      <div className="mt-3 flex flex-col mb-1">
        <label className="ml-2 text-lg font-semibold text-green-500">Bundle Name :</label>
        <input
          type="text"
          value={bundleName}
          onChange={(e) => handleBundleNameChange(e.target.value)}
          className="sm:w-[30%] ml-2 p-2 border-2 border-red-500 text-black rounded-md"
          placeholder="Enter bundle name"
        />
      </div>
      {
        warning &&
        <div className='ml-3 text-xs text-red-500'>
          {warningText}
        </div>
      }

      {/* Number of Meals Input */}
      <div className="flex flex-col mb-4">
        <label htmlFor="numMeals" className="ml-2 text-lg font-semibold text-green-500">
          Number of Meals:
        </label>
        <select
          id="numMeals"
          value={numMeals || ''}
          onChange={(e) => handleNumberOfMealInputChange(e.target.value ? parseInt(e.target.value) : null)}
          className="sm:w-[30%] ml-2 p-2 border-2 border-red-500 rounded-md text-black"
        >
          <option value="" disabled></option>
          {Array.from({ length: 10 }, (_, i) => (
            <option 
              key={i + 1} 
              value={i + 1}
              className='text-green-500'>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className='ml-2'>
        <button
          className="mt-4 border-2 border-black flex items-center justify-center rounded-md p-1 text-sm text-black bg-blue-300"
          onClick={handleShowMacros}>
          Macros?
        </button>
      </div>

      <div className="ml-2 mt-2 border-2 border-red-500 bg-white p-4 rounded-lg shadow-lg relative h-[500px] overflow-y-auto">
        {data &&
          data.meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="mb-4">
              <div className="flex justify-between items-center">
                <div className='flex'>
                <h4
                  className="text-lg text-black font-semibold underline cursor-pointer"
                  onClick={() => toggleExpand(mealIndex)}
                >
                  {meal.name}
                </h4>
                <MdCancel
                    className="text-xs text-black cursor-pointer"
                    onClick={()=>handleRemoveMeal(mealIndex)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                  <FaPlusCircle
                    className="border-[1px] border-black rounded-full text-green-600 cursor-pointer"
                    onClick={() => handleFoodSearch(mealIndex)}
                  />
                  <AiOutlineClockCircle
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setActiveTimePicker(mealIndex)}
                  />
                  <span className='text-xs text-blue-500'>{meal.time || '00:00'}</span>
                </div>
              </div>

                {activeTimePicker === mealIndex && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={()=>setActiveTimePicker(null)}>
                        <div 
                            onClick={(e)=>(e.stopPropagation())}>
                            <TimeClock value={time} handleTimeChange={handleTimeChange} mealIndex={mealIndex} />
                        </div>
                    </div>  
                )}

              {meal.foodItems.map((food, foodIndex) => (
                <div key={mealIndex.toString()+foodIndex.toString()} className="mt-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <MdCancel
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveFoodItem(mealIndex, foodIndex)}
                      />
                      <span className="text-red-500">{food.foodName}</span>
                    </div>
                    <button
                      className="text-black"
                      onClick={() => toggleExpand(`${mealIndex}-${foodIndex}`)}
                    >
                      <span className="text-green-500 mr-6">
                        {food.quantity} {food.quantityType}
                      </span>
                      &#9660;
                    </button>
                  </div>
                  {expandedMeals[`${mealIndex}-${foodIndex}`] && (
                    <div className="flex-col items-center">
                        <div className='flex items-center justify-between mt-2'>
                            <img
                                src={food.image}
                                alt={food.foodName}
                                className="w-14 mr-2 h-14 rounded-md border-2 border-black"
                            />
                            <div>
                                <input
                                    type="number"
                                    value={food.quantity}
                                    className="text-green-500 border-2 border-black rounded-md p-1 w-16"
                                    onChange={(e) =>
                                    handleInputChange(mealIndex, foodIndex, parseFloat(e.target.value) || 0)}
                                />
                                <span className='text-green-500 ml-2'>{food.quantityType}</span>
                            </div>
                        </div>
                        <div className="border-[1px] border-red-500 bg-red-200 p-1 rounded-md mt-2 text-sm text-black">
                            <p>Protein: {food.protein.toFixed(2)} gms</p>
                            <p>Carbs: {food.carbs.toFixed(2)} gms</p>
                            <p>Fats: {food.fats.toFixed(2)} gms</p>
                            <p>Calories: {food.calories.toFixed(2)} kcals</p>
                        </div>
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {(numMeals>=1) && <div className='flex'>
            <FaPlusCircle
              className="border-[1px] border-black rounded-full text-green-600 cursor-pointer"
              onClick={() => handleAddMeal()}
            />
            <span className='text-green-500 text-xs ml-2'>New Meal?</span>
          </div>}
      </div>

      <button
        onClick={handleAddBundle}
        className="ml-3 w-[50%] sm:w-[20%] mt-6 py-2 px-4 text-green-500 border-2 border-green-500 bg-white rounded hover:bg-blue-200"
      >
        Add Bundle
      </button>
      {showfoodSearchModal &&
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}>
            <FoodSearch 
                handleAddFoodItems={handleAddFoodItems}/>
      </div>
      }

{showTotalMacrosModal &&
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}>
          <div>
            <div>
              Protein : {totalMacros[0]}
            </div>
            <div>
              Carbs : {totalMacros[1]}
            </div>
            <div>
              Fats : {totalMacros[2]}
            </div>
            <div>
              Calories : {totalMacros[3]}
            </div>
          </div> 
        </div>
      }
      
      
    </div>
  );
};

export default AddNewBundle;
