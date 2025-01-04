import React, { useEffect, useState } from 'react';
import ViewGroupItemsModal from './viewGroupItemsModal';
import { useDispatch, useSelector } from 'react-redux';
import {setDietBundle,setMacrosInput} from "../../../common/redux/slice/dietBundleSlice"
import MacrosInput from './macrosInput';
import FoodSearch from './foodSearch';
import SelectedItemsCard from './selectedItemsCard';
import MandatoryItemsCard from './mandatoryItemsCard';
import ViewItemsModal from './viewItemsModal';
import DietBundleComponent from './dietBundleComponent';

const CreateDietBundles = () => {

  const initialData = [
    { id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg", count: 0, quantityType:"unit" ,intialData:[1,10,20,5,100]},
    { id:2,foodName: "Chicken", image: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_4318,h_4318,c_limit/RoastChicken_RECIPE_080420_37993.jpg",count: 0,quantityType:"gms",intialData:[250,47,10,20,220]},
    { id:3,foodName: "Bread", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCvMvBll2kFRe95_mBtOfQQ8E8P614GsVL9A&s", count: 0,quantityType:"unit", intialData:[200,14,24,15,160]},
    { id:4,foodName: "Oats", image: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA0NDg0MTk4MjY4OTM4MDE2/rolled-oats-istock.jpg", count: 0,quantityType:"unit", intialData:[100,10,20,5,100]},
    { id:5,foodName: "Milk", image: "https://static.toiimg.com/thumb/msid-114346974,width-1280,height-720,resizemode-4/114346974.jpg", count: 0,quantityType:"ml", intialData:[100,10,20,5,100]},
    { id:6,foodName: "Peanut Butter", image: "https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png", count: 0,quantityType:"unit", intialData:[100,10,20,5,100]},
    { id:7,foodName: "Oats2", image: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA0NDg0MTk4MjY4OTM4MDE2/rolled-oats-istock.jpg", count: 0,quantityType:"unit", intialData:[100,10,20,5,100]},
    { id:8,foodName: "Milk2", image: "https://static.toiimg.com/thumb/msid-114346974,width-1280,height-720,resizemode-4/114346974.jpg", count: 0,quantityType:"unit", intialData:[100,10,20,5,100]},
    { id:9,foodName: "Peanut Butter2", image: "https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png", count: 0,quantityType:"unit", intialData:[100,10,20,5,100]},
  ];


  const bundlesFromBackend = [
    {
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
                 {id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 20, carbs : 40, fats : 10, calories : 200,intialData:[250,47,10,20,220]},
                 {id:2,foodName: "Banana", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 1, quantityType:"unit" ,protein : 10, carbs : 20, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                ]
        },
        {
          name:"Meal 2",
          time:"06:00",
          foodItems: [
                 {id:4,foodName: "Oats", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 50, quantityType:"gms" ,protein : 30, carbs : 10, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                 {id:5,foodName: "Milk", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 200, quantityType:"ml" ,protein : 10, carbs : 20, fats : 5, calories : 200,intialData:[250,47,10,20,220]},
                 {id:6,foodName: "Peanut butter", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 32, quantityType:"gms" ,protein : 15, carbs : 20, fats : 5, calories : 300,intialData:[250,47,10,20,220]},
                 {id:9,foodName: "seeds", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 15, quantityType:"gms" ,protein : 5, carbs : 10, fats : 5, calories : 400,intialData:[250,47,10,20,220]},						 						 
                ]
        },
        {
          name:"Meal 3",
          time:"06:00",
          foodItems: [
                 {id:7,foodName: "Chicken", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 250, quantityType:"gms" ,protein : 50, carbs : 4, fats : 15, calories : 400,intialData:[250,47,10,20,220]},
                 {id:8,foodName: "Roti", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 3, quantityType:"unit" ,protein : 10, carbs : 40, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                ]
        },
        {
          name:"Meal 4",
          time:"06:00",
          foodItems: [
                 {id:10,foodName: "Eggs", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 18, carbs : 20, fats : 25, calories : 200,intialData:[250,47,10,20,220]},
                ]
        }
      ]
    },
    {
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
                 {id:1,foodName: "Apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 20, carbs : 40, fats : 10, calories : 200,intialData:[250,47,10,20,220]},
                 {id:2,foodName: "Banana", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 1, quantityType:"unit" ,protein : 10, carbs : 20, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                ]
        },
        {
          name:"Meal 2",
          time:"06:00",
          foodItems: [
                 {id:4,foodName: "Oats", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 50, quantityType:"gms" ,protein : 30, carbs : 10, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                 {id:5,foodName: "Milk", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 200, quantityType:"ml" ,protein : 10, carbs : 20, fats : 5, calories : 200,intialData:[250,47,10,20,220]},
                 {id:6,foodName: "Peanut butter", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 32, quantityType:"gms" ,protein : 15, carbs : 20, fats : 5, calories : 300,intialData:[250,47,10,20,220]},
                 {id:9,foodName: "seeds", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 15, quantityType:"gms" ,protein : 5, carbs : 10, fats : 5, calories : 400,intialData:[250,47,10,20,220]},						 						 
                ]
        },
        {
          name:"Meal 3",
          time:"06:00",
          foodItems: [
                 {id:7,foodName: "Chicken", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 250, quantityType:"gms" ,protein : 50, carbs : 4, fats : 15, calories : 400,intialData:[250,47,10,20,220]},
                 {id:8,foodName: "Roti", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 3, quantityType:"unit" ,protein : 10, carbs : 40, fats : 5, calories : 100,intialData:[250,47,10,20,220]},
                ]
        },
        {
          name:"Meal 4",
          time:"06:00",
          foodItems: [
                 {id:10,foodName: "Eggs", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",quantity : 2, quantityType:"unit" ,protein : 18, carbs : 20, fats : 25, calories : 200,intialData:[250,47,10,20,220]},
                ]
        }
      ]
    }
  ];


  const [foodData, setFoodData] = useState(initialData);
  const [createdBundleData, setCreatedBundleData] = useState(bundlesFromBackend);
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupCount, setGroupCount] = useState(1);  
  const [mandatoryItems, setMandatoryItems] = useState([]);
  const [groupItems, setGroupItems] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isFoodItemModalVisible, setIsFoodItemModalVisible] = useState(false);
  const [isCreatedDietBundlesVisible, setisCreatedDietBundlesVisible] = useState(false);
  const [itemModalIndex,setItemModalIndex] = useState(0);
  const [macrosDetails, setMacrosDetails] = useState({
      protein: "",
      proteinUnit: "gms",
      carbs: "",
      carbsUnit: "gms",
      fats: "",
      fatsUnit: "gms",
      calories: "",
      caloriesUnit: "kcals",
      meals: 1,
    });

  const dispatch = useDispatch();
  const {selectedItemsState,mandatoryItemsState} = useSelector((state)=>(state.dietBundle));
  const {macrosInput} = useSelector((state)=>(state.dietBundle));

  const handleIncrement = (index) => {
    setFoodData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setFoodData((prev) =>
      prev.map((item, i) =>
        i === index && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleAddFoodItems = () => {
    const selected = foodData.filter((item) => item.count > 0);
    if(selected.length===0){
      return;
    }
    setSelectedItems((prevSelected) => {
      const updatedSelected = [...prevSelected];
      selected.forEach((newItem) => {
        for (let i = 0; i < newItem.count; i++) {
          updatedSelected.push({
            id:newItem.id,
            foodName: newItem.foodName,
            image: newItem.image,
            quantityType: newItem.quantityType,
            initialMacroData: [newItem.intialData[0],newItem.intialData[1],newItem.intialData[2],newItem.intialData[3],newItem.intialData[4]],
            quantity : newItem.intialData[0],
            protein: newItem.intialData[1],
            carbs: newItem.intialData[2],
            fats: newItem.intialData[3],
            calories: newItem.intialData[4]
          });
        }
      });
      return updatedSelected;
    });
    setFoodData((prev) => {
      return prev.map((item) => ({ ...item, count: 0 }));
    });
  };
  
  const handleAddFoodGroup = () => {
    const selectedGroup = foodData.filter((item) => item.count > 0);
    if (selectedGroup.length === 1 && selectedGroup[0].count === 1) {
      setFoodData((prev) => prev.map((item) => ({ ...item, count: 0 })));
      return;
    }

    console.log("selectedgroup : "+JSON.stringify(selectedGroup));

    for(let i=0;i<selectedGroup.length;i++){
      selectedGroup[i].initialMacroData = selectedGroup[i].intialData;
      selectedGroup[i].quantity = selectedGroup[i].intialData[0];
      selectedGroup[i].protein = selectedGroup[i].intialData[1];
      selectedGroup[i].carbs = selectedGroup[i].intialData[2];
      selectedGroup[i].fats = selectedGroup[i].intialData[3];
      selectedGroup[i].calories = selectedGroup[i].intialData[4];
    }

    
    if (selectedGroup.length > 0) {
      setSelectedItems((prevSelected) => {
        const updatedSelected = [
          ...prevSelected,
          {
            name: `Group ${groupCount}`,
            items: selectedGroup.flatMap(({ foodName, image, count,quantityType,initialMacroData,quantity,protein,carbs,fats,calories }) => {
              return Array.from({ length: count }, () => ({
                foodName,
                image,
                quantityType,
                initialMacroData,
                quantity,
                protein,
                carbs,
                fats,
                calories
              }));
            }),
          },
        ];
        return updatedSelected;
      });
      setFoodData((prev) => prev.map((item) => ({ ...item, count: 0 })));
      setGroupCount((prevCount) => prevCount + 1);
    }
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevSelected) => prevSelected.filter((_, i) => i !== index));
  };

  const handleMoveToMandatory = (item, index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
    setMandatoryItems((prevMandatory) => [...prevMandatory, item]);
  };
  

  const handleViewGroupItems = (index,group) => {
    setGroupItems(group.items || []);
    setGroupIndex(index);
    setIsGroupModalVisible(true);
  };

  const handleViewItems = (index) => {
    console.log("index i : "+index);
    setItemModalIndex(index);
    setIsFoodItemModalVisible(true);
  };

  const handleUpdateGroup = (index, newItems) => {

    console.log("newItems : "+JSON.stringify(newItems));

    for(let i=0;i<newItems.length;i++){
      if(newItems[i].quantity==0){
        console.log("empty qty found");
        return;
      }
    }

    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.map((item, i) =>
        i === index ? { ...item, items: newItems } : item
      );
    });
  };

  const handleUpdateItem = (index,newData) => {
    if(newData.quantity==0){
      return;
    }
    setSelectedItems((prev)=>{
      return prev.map((item,i)=>
        i===index ? {...item,
          quantity:newData.quantity,
          protein:newData.protein,
          carbs:newData.carbs,
          fats:newData.fats,
          calories:newData.calories,
        }:item
      );
    });
  }

  const handleMoveToSelected = (item, index) => {
    const newSelectedItems = [...mandatoryItems];
    newSelectedItems.splice(index, 1);
    setMandatoryItems(newSelectedItems);
    setSelectedItems((prevSelected) => [...prevSelected, item]);
  };

  const handleCreateBundles = (macrosDetails, setWarning) => {
    const { protein, carbs, fats, calories, meals } = macrosDetails;
  
    if (!protein || !carbs || !fats || !calories || !meals) {
      setWarning("All fields are required! Please fill out all inputs.");
      return;
    }
  
    dispatch(setMacrosInput({ macrosInput: [protein, carbs, fats, calories, meals] }));
  
    // Function to calculate the sum of macros for a given array of items
    const calculateMacros = (items) => {
      return items.reduce((totals, item) => {
        if (item.items && Array.isArray(item.items)) {
          // If it's a group, recursively calculate macros for its items
          const groupMacros = calculateMacros(item.items);
          totals.protein += groupMacros.protein;
          totals.carbs += groupMacros.carbs;
          totals.fats += groupMacros.fats;
          totals.calories += groupMacros.calories;
        } else {
          // Otherwise, it's a food item, so just add its macros
          totals.protein += item.protein || 0;
          totals.carbs += item.carbs || 0;
          totals.fats += item.fats || 0;
          totals.calories += item.calories || 0;
        }
        return totals;
      }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
    };
  
    // Calculate macros for selected and mandatory items
    const selectedMacros = calculateMacros(selectedItems);
    const mandatoryMacros = calculateMacros(mandatoryItems);
  
    const totalProtein = selectedMacros.protein + mandatoryMacros.protein;
    const totalCarbs = selectedMacros.carbs + mandatoryMacros.carbs;
    const totalFats = selectedMacros.fats + mandatoryMacros.fats;
    const totalCalories = selectedMacros.calories + mandatoryMacros.calories;
  
    console.log(totalProtein + " " + totalCarbs + " " + totalFats + " " + totalCalories);
  
    if (totalProtein < protein) {
      setWarning("Insufficient Protein Provided, need " + (protein - totalProtein) + " more protein at least");
      return;
    }
    if (totalCarbs < carbs) {
      setWarning("Insufficient Carbs Provided, need " + (carbs - totalCarbs) + " more carbs at least");
      return;
    }
    if (totalFats < fats) {
      setWarning("Insufficient Fats Provided, need " + (fats - totalFats) + " more fats at least");
      return;
    }
    if (totalCalories < calories) {
      setWarning("Insufficient Calories Provided, need " + (calories - totalCalories) + " more calories at least");
      return;
    }
  
    // Clear warning if all inputs are filled
    setWarning("");
    console.log("Protein :" + macrosDetails.protein + " " + macrosDetails.proteinUnit);
    console.log("Carbs :" + macrosDetails.carbs + " " + macrosDetails.carbsUnit);
    console.log("Fats :" + macrosDetails.fats + " " + macrosDetails.fatsUnit);
    console.log("Calories :" + macrosDetails.calories + " " + macrosDetails.caloriesUnit);
    console.log("Number of meals :" + macrosDetails.meals);
  
    setisCreatedDietBundlesVisible(true);
  };
  

  const handleAddToMyBundles = (index,bundleName,setShowBundleNameWarning) => {
    
    console.log("handleAddToMyBundles pressed for : "+index);
    if(bundleName===null || bundleName==="" || bundleName===" "){
      return;
    }

    // here check with backend if the bundle name is taken or not (only for that user)
    // API call
    if(true){
      console.log("inside bundle name check")
      setShowBundleNameWarning(true);
    }else{
      // success
      // meaning no such bundle name exists for this user
      // API call to save the data to my bundles.
      // again the loading compo and all.
      setShowBundleNameWarning(false);
      console.log("bundle name : "+bundleName);

      // Once the bundle is added to my bundles, remove from here via removing from state createdBundles
      
    }
    
    //console.log("data stored in my bundles : "+JSON.stringify(createdBundleData[index]));
  }

  useEffect(() => {
    console.log("Updated Selected Items:", selectedItems);
    console.log("updated mandatory items :", mandatoryItems);
    dispatch(setDietBundle({selectedItemsState:selectedItems,mandatoryItemsState:mandatoryItems}));
  }, [selectedItems,mandatoryItems]);

  useEffect(()=>{
    setSelectedItems(selectedItemsState);
    setMandatoryItems(mandatoryItemsState);
    setMacrosDetails((prev)=>({...prev,
      protein:macrosInput[0],
      carbs:macrosInput[1],
      fats:macrosInput[2],
      calories:macrosInput[3],
      meals:macrosInput[4],
    }))
  },[]);


  return (
    <div className="font-cursive p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="border-2 border-black px-[4px] py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
          onClick={handleAddFoodItems}
        >
          Add Food Items
        </button>
        <button
          className="border-2 border-black px-[4px] py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
          onClick={handleAddFoodGroup}
        >
          Add Food Group
        </button>
      </div>

      <FoodSearch foodData={foodData} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>

      <div className="flex gap-4 mt-8">
        <SelectedItemsCard 
          selectedItems={selectedItems} 
          handleMoveToMandatory={handleMoveToMandatory}
          handleRemoveItem={handleRemoveItem} 
          handleViewItems={handleViewItems}
          handleViewGroupItems={handleViewGroupItems}/>

        <MandatoryItemsCard
          mandatoryItems={mandatoryItems}
          handleMoveToSelected={handleMoveToSelected}/>
      </div>

      <MacrosInput 
        macrosDetails={macrosDetails} 
        setMacrosDetails={setMacrosDetails}
        handleCreateBundles={handleCreateBundles}/>

      {isCreatedDietBundlesVisible && 
      <div className='flex overflow-x-auto '>
        {createdBundleData.map((bundle,index)=>(
          <DietBundleComponent index={index} data={bundle} handleAddToMyBundles={handleAddToMyBundles}/>
        ))}
      </div>}

      <ViewGroupItemsModal 
        groupIndex={groupIndex}
        groupItems={groupItems} 
        isVisible={isGroupModalVisible} 
        onClose={() => setIsGroupModalVisible(false)}
        handleUpdateGroup={handleUpdateGroup} 
      />

      <ViewItemsModal
        selectedItems={selectedItems}
        itemModalIndex={itemModalIndex}
        isVisible={isFoodItemModalVisible} 
        onClose={() => setIsFoodItemModalVisible(false)}
        handleUpdateItem={handleUpdateItem}
      />

    </div>
  );
};

export default CreateDietBundles;
