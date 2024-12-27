import React from 'react'

const FoodSearch = ({foodData,handleIncrement,handleDecrement}) => {
  return (
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
  )
}

export default FoodSearch