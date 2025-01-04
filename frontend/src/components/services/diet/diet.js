import React, { useState } from 'react';
import Macros from './macros/macros';
import CreateDietBundles from './createDietBundles/createDietBundles';
import MyDietBundles from './myDietBundles/myDietBundles';
import MacroGoals from './macroGoals/macroGoals';
import Notifications from './notifications/notifications';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import AddNewBundle from './myDietBundles/addNewBundle';
import ViewMyBundle from './myDietBundles/viewMyBundle';

const Diet = () => {
  const [activeTab, setActiveTab] = useState('Macros');
  const [currentIndex, setCurrentIndex] = useState(0);
  const {myDietBundleVisible,addNewBundleVisible,viewMyBundleVisible,} = useSelector((state)=>(state.myDietBundle));

  const menuItems = [
    'Macros',
    'Create Diet Bundle',
    'My Diet Bundle',
    'MacroGoals',
    'Notifications',
  ];

  const handleDietTab = (item) => {
    setActiveTab(item);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % menuItems.length;
    setCurrentIndex(nextIndex);
    setActiveTab(menuItems[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    setCurrentIndex(prevIndex);
    setActiveTab(menuItems[prevIndex]);
  };

  return (
    <div className="font-cursive p-4 bg-gray-100 min-h-screen">
      {/* Submenu */}
      <div className="hidden sm:flex sm:items-center sm:justify-center flex-wrap gap-4 sm:gap-4 mb-6">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => handleDietTab(item)}
            className={`px-4 py-2 text-sm border-2 border-red-500 font-medium rounded-lg shadow-md transition-all duration-200 
              ${activeTab === item ? 'bg-red-200 text-black' : 'bg-white text-red-500 hover:bg-gray-200'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Submenu */}
      <div className="sm:hidden flex items-center justify-between mb-6 border-b-2 border-red-500 pb-2">
        <button
          onClick={handlePrev}
          className="px-2 py-2 w-15 h-15 bg-white border-2 border-red-500 text-red-500 rounded-full shadow-md flex items-center"
        >
          <AiOutlineLeft className="h-6 w-6" />
        </button>
        <div className="px-4 py-2 border-2 border-red-500 font-medium rounded-lg shadow-md bg-red-200 text-black">
          {menuItems[currentIndex]}
        </div>
        <button
          onClick={handleNext}
          className="px-2 py-2 w-15 h-15 bg-white border-2 border-red-500 text-red-500 rounded-full shadow-md flex items-center"
        >
          <AiOutlineRight className="h-6 w-6" />
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "Macros" && <Macros />}

      {activeTab === "Create Diet Bundle" && <CreateDietBundles />}
      
      {activeTab === "My Diet Bundle" && myDietBundleVisible && <MyDietBundles />}
      {activeTab === "My Diet Bundle" && addNewBundleVisible && <AddNewBundle />}
      {activeTab === "My Diet Bundle" && viewMyBundleVisible && <ViewMyBundle />}

      {activeTab === "MacroGoals" && <MacroGoals />}
      {activeTab === "Notifications" && <Notifications />}
    </div>
  );
};

export default Diet;
