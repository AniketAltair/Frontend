import React, { useEffect, useState } from 'react'
import DietBundleComponent from './dietBundleComponent';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {setMyDietBundleVisible,
        setAddNewBundleVisibleVisible,
        setViewMyBundleVisible,
        setviewMyBundleData,
        setviewMyBundleMealIndexData,
        setAddNewBundleData,
        setAddNewBundleMealIndexData,
        setAddNewBundleName,
        setAddNewBundleNumberOfMeals} from '../../../common/redux/slice/myDietBundleSlice'
import AreYouSureModal from './areYouSureModal';

const MyDietBundles = () => {

  const bundlesFromBackend = [
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

  const [createdBundleData, setCreatedBundleData] = useState(bundlesFromBackend);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBundleIndex, setSelectedBundleIndex] = useState(null);

  const dispatch = useDispatch();

  
  const handleRemoveBundle = (index) => {
    setCreatedBundleData((prevData) =>
      prevData.filter((_, idx) => idx !== index)
    );
    setIsModalOpen(false);
  };

  const handleOpenModal = (index) => {
    setSelectedBundleIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBundleIndex(null);
  };

  const handleNavigateToViewMyBundle = (data) => {
    console.log("data in handleNavigateToViewMyBundle "+JSON.stringify(data));
    dispatch(setviewMyBundleData({viewMyBundleData:data}));
    dispatch(setviewMyBundleMealIndexData({viewMyBundleMealIndexData:(data.meals.length)}));
    dispatch(setViewMyBundleVisible({viewMyBundleVisible:true}));
    dispatch(setMyDietBundleVisible({myDietBundleVisible:false}));
  }

  const handleNavigateToAddNewBundle = () => {
    const newBundleData = {
      name:"",
      macros:{
        protein:0,
        carbs:0,
        fats:0,
        calories:0
      },
      meals:[],
    };
    dispatch(setAddNewBundleName({addNewBundleName:""}));
    dispatch(setAddNewBundleNumberOfMeals({addNewBundleNumberOfMeals:0}));
    dispatch(setAddNewBundleData({addNewBundleData:newBundleData}));
    dispatch(setAddNewBundleMealIndexData({addNewBundleMealIndexData:(newBundleData.meals.length)}));
    dispatch(setAddNewBundleVisibleVisible({addNewBundleVisible:true}));
    dispatch(setMyDietBundleVisible({myDietBundleVisible:false}));
  }

  useEffect(()=>{
    // API call to bring all the my bundles data
    console.log("API call to import data");
  },[])
 

  return (
    <div>
      <div className="flex font-cursive p-4 overflow-x-auto rounded-md">
       {createdBundleData.map((bundle,index)=>(     
        <DietBundleComponent 
          index={index} 
          data={bundle} 
          handleNavigateToViewMyBundle={handleNavigateToViewMyBundle}
          handleRemoveBundle={handleRemoveBundle}
          handleOpenModal={handleOpenModal}/>
       ))}
      </div>
       <div className="mt-2 ml-6 flex items-center justify-between mb-6 ">
          <div className="flex items-center space-x-2">
            <button 
              className="bg-green-500 border-2 border-black text-white px-2 py-1 rounded-md shadow hover:bg-green-600 flex items-center"
              onClick={handleNavigateToAddNewBundle}>
              <FaPlusCircle className="text-black mr-2" /> Add New Bundle
            </button>
          </div>
        </div>

        {isModalOpen && (
        <AreYouSureModal
          onConfirm={() => handleRemoveBundle(selectedBundleIndex)}
          onCancel={handleCloseModal}
        />
      )}
    </div>
    
  )
}

export default MyDietBundles