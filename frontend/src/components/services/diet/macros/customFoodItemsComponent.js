import React from "react";

const CustomFoodItemsComponent = ({ index,food,onClick,setRemovedFoodItemIndex,setIsAreYouSureModalVisible }) => {

    const RemoveMyFoodItem = (e) => {
        e.stopPropagation();
        setRemovedFoodItemIndex(index);
        setIsAreYouSureModalVisible(true);
    }

    return (
        <div 
            className="p-4 border-2 border-red-500 bg-white rounded-lg shadow-md min-w-[170px]"
            onClick={onClick}>
            <h3 className="text-black text-center font-semibold mb-2">{food.foodName}</h3>
            <img
                src={food.image}
                alt={food.foodName}
                className="border-2 border-black w-full h-24 object-cover rounded-md mb-2"
            />
            <div className="text-green-500">
                <p className="text-sm">Protein: {food.intialData[1]} gms</p>
                <p className="text-sm">Carbs: {food.intialData[2]} gms</p>
                <p className="text-sm">Fats: {food.intialData[3]} gms</p>
                <p className="text-sm">Calories: {food.intialData[4]} kcals</p>
            </div>
            
            <button 
                className="border-2 border-black mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={(e)=>RemoveMyFoodItem(e)}>
                Remove
            </button>
        </div>
    );
};

export default CustomFoodItemsComponent;
