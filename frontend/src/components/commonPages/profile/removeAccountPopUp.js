import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const RemoveAccountPopUp = ({ onClose, onConfirm, accountType, accountName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="border-2 border-red-500 bg-white rounded-lg p-2 w-full max-w-xs sm:max-w-sm">
        <h2 className="text-xs font-semibold text-red-600 mb-4 sm:text-sm">
          Are you sure you want to remove this account?
        </h2>
        <div className="flex flex-col items-center mb-4">
          {accountType === "google" ? (
            <FaGoogle size={20} className="text-red-500 mb-1" />
          ) : (
            <FaFacebook size={20} className="text-blue-600 mb-1" />
          )}
          <p className="text-sm text-gray-800 font-semibold">{accountName}</p>
        </div>
        <div className="flex justify-center mt-6">
        <button
            onClick={onConfirm}
            className="mr-5 border-2 border-green-500 hover:bg-green-500 text-black py-1 px-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="border-2 border-red-500 hover:bg-red-500 text-black py-1 px-1 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccountPopUp;
