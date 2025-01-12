import React, { useEffect, useState }  from 'react';
import { IoArrowBack } from 'react-icons/io5';

import {useDispatch,useSelector} from "react-redux";
import {
    setIsCustomerDashBoardVisible,
    setIsEditDietBundleVisible,
    setIsEditWorkoutBundleVisible,
    setCurrentBundleData,
    setCurrentDietBundleIndexData
} from "../../../common/redux/slice/customerDashBoardSlice";

import { MdCancel } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import FoodSearch from './foodSearch';
import TimeClock from '../../../common/items/timeClock';


const DietBundleData = () => {

  const [expandedMeals, setExpandedMeals] = useState({});
  const [data, setData] = useState();
  const [showfoodSearchModal, setShowfoodSearchModal] = useState(false);
  const [showTotalMacrosModal,setShowTotalMacrosModal] = useState(false);
  const [mealIndex,setMealIndex] = useState(0);
  const [activeTimePicker, setActiveTimePicker] = useState(null);
  const [time, setTime] = useState('');
  const [totalMacros,setTotalMacros] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  

  const { currentBundleData,currentDietBundleIndexData } = useSelector((state) => state.customerDashBoard);
  const dispatch = useDispatch();

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

  const handleRemoveFoodItem = (mealIndex, foodIndex) => {
    setData((prevData) => {
      if (!prevData || !prevData.meals) return prevData;
  
      // Use functional update for immutability
      const updatedMeals = prevData.meals.map((meal, index) => {
        if (index === mealIndex) {
          // Filter out the food item to remove
          return {
            ...meal,
            foodItems: meal.foodItems.filter((_, idx) => idx !== foodIndex),
          };
        }
        return meal;
      });
  
      const updatedData = { ...prevData, meals: updatedMeals };
  
      // Dispatch the updated data (ensure Redux is syncing correctly)
      dispatch((_, getState) => {
        const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
        dispatch(setCurrentBundleData({ 
          currentBundleData: { ...currentBundleData, diet: updatedData } 
        }));
      });

      return updatedData;
    });
  };
  
  
  const handleMealTimeChange = (mealIndex, time) => {
    setData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      updatedData.meals[mealIndex].time = time;

      dispatch((_, getState) => {
        const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
        dispatch(setCurrentBundleData({ 
          currentBundleData: { ...currentBundleData, diet: updatedData } 
        }));
      });

      return updatedData;
    });
  };
  
  const handleInputChange = (mealIndex, foodIndex, newQuantity) => {
    // Declare a debounced function to limit the rate of state updates

    if (debounceTimeout) {
        clearTimeout(debounceTimeout); // Clear the previous timeout if user types again
    }

    const timeout = setTimeout(() => {
        console.log("i");
        setData((prevData) => {
            if (!prevData) return prevData; // Return if there's no data to update
    
            // Deep copy to avoid direct mutation
            const updatedData = JSON.parse(JSON.stringify(prevData));
    
            const foodItem = updatedData.meals[mealIndex].foodItems[foodIndex];
            const multiplier = parseFloat((newQuantity / foodItem.intialData[0]).toFixed(2));
    
            
            // Update food item data
            foodItem.quantity = newQuantity;
            foodItem.protein = foodItem.intialData[1] * multiplier;
            foodItem.carbs = foodItem.intialData[2] * multiplier;
            foodItem.fats = foodItem.intialData[3] * multiplier;
            foodItem.calories = foodItem.intialData[4] * multiplier;
    
            // Check if there is a real change before dispatching
            if (JSON.stringify(prevData) !== JSON.stringify(updatedData)) {
              dispatch((_, getState) => {
                const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
                dispatch(setCurrentBundleData({ 
                  currentBundleData: { ...currentBundleData, diet: updatedData } 
                }));
              });          
            }
    
            return updatedData;
        });
    }, 100); // Wait for 300ms after the last change before executing

    setDebounceTimeout(timeout); // Store the new timeout ID
};

  const handleUpdateBundle = () => {

    const updatedData = JSON.parse(JSON.stringify(data)); // Deep copy to avoid mutating state directly

    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    // Remove meals with zero food items
    updatedData.meals = updatedData.meals.filter(meal => meal.foodItems.length > 0);

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
    

    // Update the state with corrected data if needed
    setData(updatedData);
    dispatch((_, getState) => {
      const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
      dispatch(setCurrentBundleData({ 
        currentBundleData: { ...currentBundleData, diet: updatedData } 
      }));
    });

    handleNavigateBackToMyDietBundle();

};

    const handleAddFoodItems = (addedFoodItems) => {

       
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

        dispatch((_, getState) => {
          const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
          dispatch(setCurrentBundleData({ 
            currentBundleData: { ...currentBundleData, diet: updatedData } 
          }));
        });
    

    };
    
    const handleAddMeal = () => {
       

        const updatedData = JSON.parse(JSON.stringify(data));

        updatedData.meals.push({
            name:`Meal ${currentDietBundleIndexData+1}`,
            time:"00:00",
            foodItems:[]
        })

        setData(updatedData);

        dispatch((_, getState) => {
          const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
          dispatch(setCurrentBundleData({ 
            currentBundleData: { ...currentBundleData, diet: updatedData } 
          }));
        });
        
        dispatch(setCurrentDietBundleIndexData({currentDietBundleIndexData:(currentDietBundleIndexData+1)}));

    }

    const handleRemoveMeal = (mealIndex) => {
       

        const updatedData = JSON.parse(JSON.stringify(data));

        updatedData.meals.splice(mealIndex,1);

        setData(updatedData);

        dispatch((_, getState) => {
          const currentBundleData = getState().customerDashBoard.currentBundleData; // Adjust path if needed
          dispatch(setCurrentBundleData({ 
            currentBundleData: { ...currentBundleData, diet: updatedData } 
          }));
        });      
      }

    const handleFoodSearch = (index) => {
        setMealIndex(index);
        setShowfoodSearchModal(true);
    }

    const onClose = () => {
        setShowfoodSearchModal(false);
        setShowTotalMacrosModal(false);
    }

    const handleShowMacros = () => {
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalCalories = 0;

      
  
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
  
      
      setTotalMacros([totalProtein,totalCarbs,totalFats,totalCalories]);
      setShowTotalMacrosModal(true);
  };

  const handleNavigateBackToMyDietBundle = () => {
    dispatch(setIsCustomerDashBoardVisible({isCustomerDashBoardVisible:true}));
    dispatch(setIsEditDietBundleVisible({isEditDietBundleVisible:false}));
    dispatch(setIsEditWorkoutBundleVisible({isEditWorkoutBundleVisible:false}));
}

  useEffect(()=>{

  },[data]);
  

    useEffect(() => {
        if (currentBundleData) {
            setData(JSON.parse(JSON.stringify(currentBundleData.diet))); // Deep copy during initialization
        }
    }, [currentBundleData]);    

    

  return (
    <div className="font-cursive bg-white p-2 rounded-md">
        <div className="flex items-center">
            <button
              onClick={() => handleNavigateBackToMyDietBundle()}
              className="border-2 border-black flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-md w-6 h-6 shadow-lg transition duration-200"
            >
              <IoArrowBack className="h-6 w-6" />
            </button>
            
          </div>

          <div className='flex gap-x-2'>
      <button
          className="mt-4 border-2 border-black flex items-center justify-center rounded-md p-1 text-sm text-black bg-green-500"
          onClick={handleAddMeal}>
          Add Meal
        </button>
        <button
          className="mt-4 border-2 border-black flex items-center justify-center rounded-md p-1 text-sm text-black bg-blue-300"
          onClick={handleShowMacros}>
          Macros?
        </button>
      </div>

      <div className="mt-2 border-2 border-red-500 bg-white p-4 rounded-lg shadow-lg max-w-xl w-full relative h-[500px] overflow-y-auto">
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
      </div>

      <button
        onClick={handleUpdateBundle}
        className="ml-3 w-[50%] sm:w-[20%] mt-6 py-2 px-4 text-blue-500 border-2 border-blue-500 bg-white rounded hover:bg-blue-200"
      >
        Update Bundle
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
  )
}

export default DietBundleData;
