import React, { useState } from 'react';
import GymComponent from './gym/gymComponent';
import { FiFilter, FiMapPin } from "react-icons/fi";
import FilterModal from './filterModal';
import GoogleMap from './googleMapComponent';


const gymsData = [
  {
    id:1,
    name: "Fitflix Gym",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9qfqZlJMT-xBvGTFI_WNnAAijMV0l9wUoQ&s",
    locationLink: "https://maps.app.goo.gl/1kuohXqNbg9LmmDs6",
    rating: 4,
    plans: ["14000 / 12 months", "3000 / 1 month","14000 / 12 months", "3000 / 1 month","14000 / 12 months", "3000 / 1 month","14000 / 12 months", "3000 / 1 month","14000 / 12 months", "3000 / 1 month","14000 / 12 months", "3000 / 1 month"],
    lat: 12.959880026880182,
    lng: 77.71601202650041,
  },
  {
    id:2,
    name: "Fitness Gym",
    img: "https://marketplace.canva.com/EAF6K0hCbCc/1/0/1600w/canva-black-illustrative-sport-and-fitness-logo-Fzhl00soUis.jpg",
    locationLink: "https://maps.app.goo.gl/1kuohXqNbg9LmmDs6",
    rating: 4.5,
    plans: ["10000 / 12 months", "2000 / 1 month"],
    lat: 12.961526734091548,
    lng: 77.71702055930909,
  },
  {
    id:3,
    name: "Fitboy Gym",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9qfqZlJMT-xBvGTFI_WNnAAijMV0l9wUoQ&s",
    locationLink: "https://maps.app.goo.gl/GrqvSkBi4zPgdS6C7",
    rating: 4.2,
    plans: ["10000 / 12 months", "2000 / 1 month"],
    lat: 12.958369160698972,
    lng: 77.71420960417552,
  },
  {
    id:4,
    name: "Gym Far Away 1",
    img: "https://marketplace.canva.com/EAF6K0hCbCc/1/0/1600w/canva-black-illustrative-sport-and-fitness-logo-Fzhl00soUis.jpg",
    locationLink: "https://www.google.com/maps",
    rating: 4.5,
    plans: ["10000 / 12 months", "2000 / 1 month"],
    lat: 12.971387355657383,
    lng: 77.712584563822,
  },
  {
    id:5,
    name: "Gym Far Away 2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9qfqZlJMT-xBvGTFI_WNnAAijMV0l9wUoQ&s",
    locationLink: "https://www.google.com/maps",
    rating: 4.2,
    plans: ["10000 / 12 months", "2000 / 1 month"],
    lat: 12.951105270574356,
    lng: 77.7155654783917,
  },
  {
    id:6,
    name: "Gym Far Away 3",
    img: "https://marketplace.canva.com/EAF6K0hCbCc/1/0/1600w/canva-black-illustrative-sport-and-fitness-logo-Fzhl00soUis.jpg",
    locationLink: "https://www.google.com/maps",
    rating: 4.5,
    plans: ["10000 / 12 months", "2000 / 1 month"],
    lat: 12.967940291395275, 
    lng: 77.69329033832514,
  },
];

const FindGyms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [showMap, setShowMap] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleMaps = () => {
    setShowMap(true); // Toggle the map modal visibility
  };

  // Function to close the modal when clicked outside
  const closeMapModal = (e) => {
    if (e.target.id === 'map-modal') {
      setShowMap(false);
    }
  };

  

  return (
    <div className="font-cursive p-4">
      {/* Search Bar */}
      <div className="flex sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search gyms..."
          className="w-full sm:w-3/5 px-4 py-2 text-black border-2 border-red-500 rounded-md shadow-sm"
        />
        <div className="flex gap-2">
          <button
            className="px-2 py-2 border-2 border-red-500 bg-white-500 text-black rounded-md hover:bg-red-200 flex items-center gap-2"
            aria-label="Filter"
            onClick={toggleModal}
          >
            <FiFilter size={20} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="px-2 py-2 border-2 border-red-500 bg-white-500 text-blue-500 rounded-md hover:bg-red-200 flex items-center gap-2"
            aria-label="Filter"
            onClick={handleMaps}
          >
            <FiMapPin size={20} />
          </button>
        </div>
      </div>

      {/* Gym List */}
      <div className="space-y-4">
        {gymsData.map((gym, index) => (
          <GymComponent 
            key={index} data={gym}
          />
        ))}
      </div>

      {/* Google Map Modal (Displayed when `showMap` is true) */}
      {showMap && (
        <div
          id="map-modal"
          onClick={closeMapModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white w-3/4 h-2/3 sm:w-2/3 sm:h-3/4 p-4 rounded-md">
            <GoogleMap gymsData={gymsData} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};


export default FindGyms;
