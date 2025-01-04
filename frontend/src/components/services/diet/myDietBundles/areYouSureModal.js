import React from "react";

const AreYouSureModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="border-2 border-red-500 bg-white rounded-lg p-6 w-80 shadow-lg">
        <h3 className="text-sm text-black font-semibold mb-4 text-center">
          Remove this Bundle?
        </h3>
        <div className="flex justify-around">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded transition"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded transition"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSureModal;
