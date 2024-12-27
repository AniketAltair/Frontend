import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const MandatoryItemsCard = ({mandatoryItems,handleMoveToSelected}) => {
  return (
    <div className="flex-1 border-2 border-red-500 p-2 rounded-lg shadow-2xl overflow-y-auto h-[300px]">
    <h3 className="text-sm text-black ml-2 font-bold mb-4">
      <u>Mandatory</u>
    </h3>
    <div className="space-y-4">
      {mandatoryItems.map((item, index) => (
        <div key={index} className='flex justify-end'>
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
              <div className="w-16 sm:w-20 sm:text-[15px] text-[10px] text-black bg-green-500 p-2 rounded-md border-2 border-black inline-block">
                {item.name}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  )
}

export default MandatoryItemsCard