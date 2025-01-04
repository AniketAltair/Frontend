import React, { useEffect, useState } from 'react'

const FoodSearch = ({handleAddFoodItems}) => {

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

    const [foodData, setFoodData] = useState();
    const [selectedItems,setSelectedItems] = useState([]);

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

    const handleAddedFoodItems = () => {

        const selected = foodData.filter((item) => item.count > 0);
        if(selected.length===0){
            return;
        }
        console.log("filtered items : "+JSON.stringify(selected));
        setSelectedItems((prevSelected) => {
        const updatedSelected = [...prevSelected];
        selected.forEach((newItem) => {
            for (let i = 0; i < newItem.count; i++) {
            updatedSelected.push({
                id:newItem.id,
                foodName: newItem.foodName,
                image: newItem.image,
                quantityType: newItem.quantityType,
                intialData: [newItem.intialData[0],newItem.intialData[1],newItem.intialData[2],newItem.intialData[3],newItem.intialData[4]],
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

    }

    useEffect(() => {
        if (selectedItems.length > 0) {
            handleAddFoodItems(selectedItems);
            setSelectedItems([]);
        }
    }, [selectedItems]); 

    useEffect(()=>{
        setFoodData(initialData);
    },[])

  return (
    <>
    {foodData &&
    <div 
        className="mx-4 border-2 border-red-500 bg-white p-4 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between'>
                <input
                    type="text"
                    placeholder="Search food..."
                    className="w-full p-2 mb-4 border-2 border-red-500 rounded-lg text-black"/>
                <button
                    className="ml-2 mb-4 w-[30%] sm:w-[20%] py-2 px-4 text-blue-500 border-2 border-blue-500 bg-white rounded hover:bg-blue-200"
                    onClick={handleAddedFoodItems}>
                    Add
                </button>
            </div>
        

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
                    {item.count === 0 ? (
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
                        {item.count}
                        </div>
                    )}
                    {item.count > 0 && (
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
    }
    </>
    
  )
}

export default FoodSearch