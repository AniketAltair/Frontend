import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";
import ViewGroupItemsModal from './viewGroupItemsModal';
import { useDispatch, useSelector } from 'react-redux';
import {setDietBundle} from "../../../common/redux/slice/dietBundleSlice"



const CreateDietBundles = () => {
  const initialData = [
    { foodName: "apple", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg", quantity: 0 },
    { foodName: "chicken", image: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_4318,h_4318,c_limit/RoastChicken_RECIPE_080420_37993.jpg", quantity: 0 },
    { foodName: "bread", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCvMvBll2kFRe95_mBtOfQQ8E8P614GsVL9A&s", quantity: 0 },
    { foodName: "oats", image: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA0NDg0MTk4MjY4OTM4MDE2/rolled-oats-istock.jpg", quantity: 0 },
    { foodName: "milk", image: "https://static.toiimg.com/thumb/msid-114346974,width-1280,height-720,resizemode-4/114346974.jpg", quantity: 0 },
    { foodName: "peanut butter", image: "https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png", quantity: 0 },
    { foodName: "oats2", image: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA0NDg0MTk4MjY4OTM4MDE2/rolled-oats-istock.jpg", quantity: 0 },
    { foodName: "milk2", image: "https://static.toiimg.com/thumb/msid-114346974,width-1280,height-720,resizemode-4/114346974.jpg", quantity: 0 },
    { foodName: "peanut butter2", image: "https://pinchofyum.com/wp-content/uploads/Homemade-Peanut-Butter-Square.png", quantity: 0 },
  ];

  const [foodData, setFoodData] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupCount, setGroupCount] = useState(1);  // Track group number (group 1, group 2, etc.)
  const [mandatoryItems, setMandatoryItems] = useState([]);
  const [groupItems, setGroupItems] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {selectedItemsState,mandatoryItemsState} = useSelector((state)=>(state.dietBundle));


  const handleIncrement = (index) => {
    setFoodData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setFoodData((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleAddFoodItems = () => {
    const selected = foodData.filter((item) => item.quantity > 0);

    if(selected.length===0){
      return;
    }
  
    setSelectedItems((prevSelected) => {
      const updatedSelected = [...prevSelected];
  
      selected.forEach((newItem) => {
        // Add the item for each quantity
        for (let i = 0; i < newItem.quantity; i++) {
          updatedSelected.push({
            foodName: newItem.foodName,
            image: newItem.image
          });
        }
      });
  
      return updatedSelected;
    });
  
    setFoodData((prev) => {
      return prev.map((item) => ({ ...item, quantity: 0 }));
    });
  };
  

  const handleAddFoodGroup = () => {
    // Filter the selected food items with quantity > 0
    const selectedGroup = foodData.filter((item) => item.quantity > 0);
  
    if (selectedGroup.length === 1 && selectedGroup[0].quantity === 1) {
      setFoodData((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
      return;
    }
  
    // Only add the group if there are selected items
    if (selectedGroup.length > 0) {
      setSelectedItems((prevSelected) => {
        const updatedSelected = [
          ...prevSelected,
          {
            name: `Group ${groupCount}`,
            items: selectedGroup.flatMap(({ foodName, image, quantity }) => {
              // Create an array of separate items for each quantity
              return Array.from({ length: quantity }, () => ({
                foodName,
                image,
              }));
            }),
          },
        ];
  
        return updatedSelected;
      });
  
      // Reset food quantities and increment the group counter
      setFoodData((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
      setGroupCount((prevCount) => prevCount + 1); // Increment group count for the next group
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

  const handleMoveToSelected = (item, index) => {
    const newSelectedItems = [...mandatoryItems];
    newSelectedItems.splice(index, 1);
    setMandatoryItems(newSelectedItems);
    setSelectedItems((prevSelected) => [...prevSelected, item]);
  };

  const handleViewGroupItems = (index,group) => {
    setGroupItems(group.items || []);
    setGroupIndex(index);
    setIsModalVisible(true);
  };

  const handleUpdateGroup = (index, newItems) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.map((item, i) =>
        i === index ? { ...item, items: newItems } : item
      );
    });
  };

  useEffect(() => {
    console.log("Updated Selected Items:", selectedItems);
    console.log("updated mandatory items :", mandatoryItems);
    dispatch(setDietBundle({selectedItemsState:selectedItems,mandatoryItemsState:mandatoryItems}));
  }, [selectedItems,mandatoryItems]);

  useEffect(()=>{
    setSelectedItems(selectedItemsState);
    setMandatoryItems(mandatoryItemsState);
  },[]);


  return (
    <div className="font-cursive p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="border-2 border-black px-3 py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
          onClick={handleAddFoodItems}
        >
          Add Food Items
        </button>
        <button
          className="border-2 border-black px-4 py-2 bg-green-500 text-black rounded-lg shadow-md hover:bg-green-600"
          onClick={handleAddFoodGroup}
        >
          Add Food Group
        </button>
      </div>

      <div className="border-2 border-red-500 bg-white p-4 rounded-lg shadow-2xl">
        <input
          type="text"
          placeholder="Search food..."
          className="w-full p-2 mb-4 border-2 border-red-500 rounded-lg text-black"
        />

        <div
          className="h-96 overflow-y-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-4 p-4">
            {foodData.map((item, index) => (
              <div key={item.foodName} className="border rounded-lg shadow-md flex flex-col">
                <div className="justify-between items-start">
                  <div className="flex justify-between items-center ml-auto">
                    {item.quantity === 0 ? (
                      <button
                        className="border-[1px] border-black w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full shadow-md"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    ) : (
                      <div
                        className="border-[1px] border-black w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full shadow-md cursor-pointer"
                        onClick={() => handleIncrement(index)}
                      >
                        {item.quantity}
                      </div>
                    )}
                    {item.quantity > 0 && (
                      <button
                        className="border-[1px] border-black w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md"
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                  <img
                    src={item.image}
                    alt={item.foodName}
                    className="border-2 border-black w-full h-24 sm:h-32 object-cover rounded-lg"
                  />
                </div>
            </div>                   
            ))}
          </div>
        </div>
      </div>

      {/* Selected Items and Mandatory Cards */}
      <div className="flex gap-4 mt-8">

       {/* Selected Items Card */}
       <div className="flex-1 border-2 border-red-500 p-2 rounded-lg shadow-2xl overflow-y-auto  h-[300px]">
       <h3 className="text-sm text-black ml-2 font-bold mb-4"><u>Selected Items</u></h3>
          <div className="space-y-4">
            {selectedItems.map((item, index) => (
              <div key={index}>
                {item.foodName ? (
                  <div className='flex items-center gap-x-3'>
                     <MdCancel 
                        className='text-red-500 w-[20px] h-[20px] border-[1px] border-black rounded-full'
                        onClick={()=>handleRemoveItem(index)}/>
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="w-14 h-14 sm:w-20 sm:h-20 border-2 border-black rounded-md object-cover"/>
                      <FaLongArrowAltRight 
                        className='text-red-500 text-[30px]'
                        onClick={() => handleMoveToMandatory(item, index)}/>
                  </div>
                ) : (
                  <div className='flex items-center gap-x-3'>
                    <MdCancel 
                        className='text-red-500 w-[20px] h-[20px] border-[1px] border-black rounded-full'
                        onClick={()=>handleRemoveItem(index)}/>
                    <div 
                      className="w-16 text-[10px] text-black bg-green-500 p-2 rounded-md border-2 border-black inline-block"
                      onClick={()=>handleViewGroupItems(index,item)}>
                      {item.name}
                    </div>
                    <FaLongArrowAltRight 
                      className='text-red-500 text-[30px]'
                      onClick={() => handleMoveToMandatory(item, index)}/>   
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



         {/* Mandatory Items Card */}
        <div className="flex-1 border-2 border-red-500 p-2 rounded-lg shadow-2xl overflow-y-auto h-[300px]">
          <h3 className="text-sm text-black ml-2 font-bold mb-4">
            <u>Mandatory</u>
          </h3>
          <div className="space-y-4">
            {mandatoryItems.map((item, index) => (
              <div key={index}>
                {item.foodName ? (
                  <div className='flex items-center gap-x-3'>
                    <FaLongArrowAltLeft
                      className='text-black text-[30px]'
                      onClick={()=>handleMoveToSelected(item,index)}
                      />
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="w-14 h-14 sm:w-20 sm:h-20 border-2 border-black rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div className='flex items-center gap-x-3'>
                    <FaLongArrowAltLeft
                      className='text-black text-[30px]'
                      onClick={()=>handleMoveToSelected(item,index)}
                      />
                    <div className="w-16 text-[10px] text-black bg-green-500 p-2 rounded-md border-2 border-black inline-block">
                      {item.name}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ViewGroupItemsModal 
        groupIndex={groupIndex}
        groupItems={groupItems} 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        handleUpdateGroup={handleUpdateGroup} 
      />

    </div>
  );
};

export default CreateDietBundles;
