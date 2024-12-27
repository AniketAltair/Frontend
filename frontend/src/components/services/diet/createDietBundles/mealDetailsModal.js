// MealDetailsModal.js
import React, { useState } from 'react';

const MealDetailsModal = ({ data, onClose }) => {
  const [expandedMeals, setExpandedMeals] = useState({});

  const toggleExpand = (mealIndex) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealIndex]: !prev[mealIndex],
    }));
  };

  return (
    <div className="mx-2 mt-10 border-2 border-red-500 bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative h-[500px] overflow-y-auto">
      {data.meals.map((meal, mealIndex) => (
        <div key={mealIndex} className="mb-4">
          <h4 className="text-lg text-black font-semibold underline cursor-pointer" onClick={() => toggleExpand(mealIndex)}>
            {meal.name}
          </h4>
          {meal.foodItems.map((food, foodIndex) => (
            <div key={food.id} className="mt-2">
              <div className="flex justify-between items-center">
                <span className='text-red-500'>
                  {food.foodName} 
                </span>
                <button
                  className="text-black"
                  onClick={() => toggleExpand(`${mealIndex}-${foodIndex}`)}>
                    <span className='text-green-500 mr-6'>
                        {food.quantity} {food.quantityType}
                    </span>
                    &#9660;
                </button>
              </div>
              {expandedMeals[`${mealIndex}-${foodIndex}`] && (
                <div className="border-[1px] border-red-500 bg-red-200 p-1 rounded-md mt-2 text-sm text-black">
                  <p>Protein: {food.protein} gms</p>
                  <p>Carbs: {food.carbs} gms</p>
                  <p>Fats: {food.fats} gms</p>
                  <p>Calories: {food.calories} kcals</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MealDetailsModal;
