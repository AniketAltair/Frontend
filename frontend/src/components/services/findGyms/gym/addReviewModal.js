import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const AddReviewModal = ({onClose}) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [message, setMessage] = useState('');
  const maxChars = 500;

  const handleStarClick = (index) => {
    setSelectedStars(index);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleAddReview = () => {
    console.log('Star Rating:', selectedStars);
    console.log('Message:', message);
    onClose();
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="border-2 border-red-500 bg-white rounded-lg p-6 w-11/12 max-w-md relative">

        {/* Stars */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              size={30}
              onClick={() => handleStarClick(index)}
              className={`cursor-pointer transition-colors duration-200 ${
                index <= selectedStars ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Textarea */}
        <textarea
          className="text-black w-full border-2 border-red-500 rounded-lg p-4 resize-none"
          rows="5"
          maxLength={maxChars}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
        <div className="text-right text-sm text-black mt-2">
          {message.length}/{maxChars}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddReview}
          className="border-2 border-black bg-green-500 text-white px-6 py-2 rounded-lg ml-[25%] w-[50%] mt-4 hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;
