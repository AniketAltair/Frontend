import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const SelectedItemsCard = ({selectedItems,handleMoveToMandatory,handleRemoveItem,handleViewItems,handleViewGroupItems}) => {
  return (
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
                    className="w-14 h-14 sm:w-20 sm:h-20 border-2 border-black rounded-md object-cover"
                    onClick={()=>handleViewItems(index)}/>
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
                    className="w-16 sm:w-20 sm:text-[15px] text-[10px] text-black bg-green-500 p-1 rounded-md border-2 border-black inline-block"
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
  )
}

export default SelectedItemsCard;