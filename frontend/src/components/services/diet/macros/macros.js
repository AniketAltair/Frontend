import React, { useEffect, useState } from "react";
import CustomFoodItemsComponent from "./customFoodItemsComponent";
import CustomFoodItemDetailsModal from "./customFoodItemDetailsModal";
import AddNewCustomFoodItemModal from "./addNewCustomFoodItemModal";
import { FaPlusCircle } from "react-icons/fa";
import AreYouSureModal from "./areYouSureModal"

const Macros = () => {
    

    const initialFoodInfo = {
        id: 1,
        foodName: "Apple",
        image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",
        count: 0,
        quantityType: "unit",
        intialData: [1, 10, 20, 5, 100]
    };

    const initialMyFoodList = [
        {
            id: 1,
            foodName: "Apple",
            image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",
            count: 0,
            quantityType: "unit",
            intialData: [1, 10, 20, 5, 100]
        },  
        {
            id: 2,
            foodName: "Chicken",
            image: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_4318,h_4318,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
            count: 0,
            quantityType: "gms",
            intialData: [250, 47, 5, 10, 200]
        },
        {
            id: 3,
            foodName: "Bread",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCvMvBll2kFRe95_mBtOfQQ8E8P614GsVL9A&s",
            count: 0,
            quantityType: "unit",
            intialData: [2, 5, 10, 10, 50]
        }
    ];

    const [searchInput, setSearchInput] = useState("");
    const [foodInfo, setFoodInfo] = useState();
    const [myFoodList, setMyFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [newFoodItem, setNewFoodItem] = useState(null);
    const [isAreYouSureModalVisible,setIsAreYouSureModalVisible] = useState(false);
    const [removedFoodItemIndex,setRemovedFoodItemIndex] = useState(null);

    const handleSearch = () => {
        const trimmedInput = searchInput.trim();
        console.log("food name : " + trimmedInput);
    
        if (!trimmedInput) {
            return;
        }
    
        setFoodInfo(initialFoodInfo);
        //setFoodInfo(null);
        // API call to get the food item and set to foodInfo.  
    };

    const handleFoodClick = (food) => {
        console.log("food data : "+JSON.stringify(food));
        setSelectedFood(food);
    };

    const closeModal = () => {
        setNewFoodItem(null);
        setSelectedFood(null);
    };

    const handleAddNewFoodItem = () => {
        setNewFoodItem({
            foodName: "", 
            image: "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg", 
            count: 0, 
            quantityType:"unit" ,
            intialData:[0,0,0,0,0]
        });
    }

    const handleRemoveMyFoodItem = (removedFoodItemIndex) => {

        // API all to remove food from list

        const updatedMyFoodList = JSON.parse(JSON.stringify(myFoodList));
        updatedMyFoodList.splice(removedFoodItemIndex,1);
        setMyFoodList(updatedMyFoodList);

        setRemovedFoodItemIndex(null);
        setIsAreYouSureModalVisible(false);
    }

    const handleCloseAreYouSureModal = () => {
        setRemovedFoodItemIndex(null);
        setIsAreYouSureModalVisible(false);
    }

    useEffect(()=>{
        console.log("macros component loaded");
        //API call to get myFoodItems
        setMyFoodList(initialMyFoodList);
    },[])

    return (
        <div className="p-2 max-w-3xl mx-auto">
            <div className="flex rounded-lg items-center justify-between mb-4 gap-x-2">
                    <input
                        type="text"
                        placeholder="Search food"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="text-black border-2 border-red-500 p-2 w-full rounded-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="border-2 border-black px-2 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Search
                    </button>
            </div>
            {foodInfo ? (
                <div className="flex border-2 border-red-500 items-center gap-4 p-4 bg-red-100 rounded-lg mb-4">
                    <img
                        src={foodInfo.image}
                        alt={foodInfo.foodName}
                        className="border-2 border-black w-20 h-20 rounded-full object-cover"
                    />
                    <div className="text-black">
                        <p className="text-xs">({foodInfo.intialData[0]} {foodInfo.quantityType})</p>
                        <p className="text-sm">Protein: {foodInfo.intialData[1]} gms</p>
                        <p className="text-sm">Carbs: {foodInfo.intialData[2]} gms</p>
                        <p className="text-sm">Fats: {foodInfo.intialData[3]} gms</p>
                        <p className="text-sm">Calories: {foodInfo.intialData[4]} kcals</p>
                    </div>
                </div>
            ) : (null)}

            <div className="mt-2 flex items-center justify-between mb-6 ">
                <div className="flex items-center space-x-2">
                <button 
                    className="bg-green-500 border-2 border-black text-white px-2 py-1 rounded-md shadow hover:bg-green-600 flex items-center"
                    onClick={handleAddNewFoodItem}>
                    <FaPlusCircle className="text-black mr-2" /> Add New Food Item
                </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="flex gap-4">
                    {myFoodList.map((food,index) => (
                        <CustomFoodItemsComponent
                            index={index}
                            key={food.id}
                            food={food}
                            setIsAreYouSureModalVisible={setIsAreYouSureModalVisible}
                            setRemovedFoodItemIndex={setRemovedFoodItemIndex}
                            onClick={() => handleFoodClick(food)}
                        />
                    ))}
                </div>
            </div>
            {selectedFood && (
                <CustomFoodItemDetailsModal food={selectedFood} onClose={closeModal} />
            )}
            {newFoodItem &&
                <AddNewCustomFoodItemModal food={newFoodItem} onClose={closeModal}/>
            }
            {isAreYouSureModalVisible &&
                <AreYouSureModal
                    onConfirm={handleRemoveMyFoodItem}
                    onCancel={handleCloseAreYouSureModal}
                />
            }
        </div>
    );
};

export default Macros;
