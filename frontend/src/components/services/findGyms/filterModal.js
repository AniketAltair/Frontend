import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose }) => {
  const [radius, setRadius] = useState("NONE");
  const [rating, setRating] = useState("NONE");
  const [trainers, setTrainers] = useState("NONE");
  const [trainerRating, setTrainerRating] = useState("NONE");

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) onClose(); // Close modal if clicked outside
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="border-2 border-red-500  bg-white p-6 rounded-lg w-80 sm:w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-red-500 text-xl font-bold">Filter Gyms</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Radius (in km):</label>
            <select
              className="text-red-400 border-2 border-red-500 w-full px-4 py-2 rounded-md"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              <option value="NONE">NONE</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Gym Rating:</label>
            <select
              className="text-red-400 border-2 border-red-500 w-full px-4 py-2 rounded-md"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="NONE">NONE</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">No. of Trainers:</label>
            <select
              className="text-red-400 border-2 border-red-500 w-full px-4 py-2 rounded-md"
              value={trainers}
              onChange={(e) => setTrainers(e.target.value)}
            >
              <option value="NONE">NONE</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Avg. Trainer Rating:</label>
            <select
              className="text-red-400 border-2 border-red-500 w-full px-4 py-2 rounded-md"
              value={trainerRating}
              onChange={(e) => setTrainerRating(e.target.value)}
            >
              <option value="NONE">NONE</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="border-2 border-black px-6 py-2 bg-green-500 text-white rounded-md hover:bg-red-600"
              onClick={() => {
                // Handle the filtering logic here
                onClose();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
