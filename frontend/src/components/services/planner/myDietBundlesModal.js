import React, { useEffect } from "react";

const MyDietBundlesModal = ({ bundles, onSelect, onClose,selectedDiet,currentDay}) => {
  const [selectedBundle, setSelectedBundle] = React.useState(null);

  const handleSelect = (id, name) => {
    setSelectedBundle(id); // Track selected bundle
    onSelect(id, name);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}>
      <div 
        className="border-2 border-red-500 p-4 bg-white rounded-lg w-[320px]"
        onClick={(e)=>(e.stopPropagation())}>
        <div className="py-4 flex gap-x-2 overflow-x-scroll">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`p-2 border-2 border-red-500 rounded-lg shadow-2xl
                ${(selectedDiet[currentDay] && selectedDiet[currentDay].bundleId === bundle.id) 
                  ? "bg-red-200" 
                  : "bg-white"} 
                cursor-pointer flex-shrink-0 w-[180px]`} // Ensure the element doesn't shrink
              onClick={() => handleSelect(bundle.id, bundle.name)}
            >
              <h3 className="text-lg font-bold mb-4 text-black">{bundle.name}</h3>
              <p className="text-green-500"><span className="text-red-500">Protein : </span>{bundle.macros.protein} gms</p>
              <p className="text-green-500"><span className="text-red-500">Carbs : </span>{bundle.macros.carbs} gms</p>
              <p className="text-green-500"><span className="text-red-500">Fats : </span>{bundle.macros.fats} gms</p>
              <p className="text-green-500"><span className="text-red-500">Calories : </span>{bundle.macros.calories} kcal</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDietBundlesModal
