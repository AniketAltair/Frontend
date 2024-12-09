import React, { useState } from "react";

const ChangePasswordPopUp = ({ onClose,setIsLoading }) => {
  const [toastMessage, setToastMessage] = useState(""); // Consolidated message state
  const [toastType, setToastType] = useState(""); // Tracks success or error
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // Tracks OTP sent state
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false); // Tracks OTP confirmation state
  const [isPasswordSaved,setisPasswordSaved] = useState(false);


  const handleOTPpresentinDB = () =>{
    // API to check if OTP is present in DB
    return new Promise((resolve, reject) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          resolve(true); 
        }, 1000); 
      });
  }

  const handleSendOtp = async () => {
    if(await handleOTPpresentinDB()){
        setToastMessage("OTP Sent");
        setToastType("success");
        setIsOtpSent(true); // Enable OTP input and Confirm OTP button
        setIsOtpConfirmed(false); // Reset OTP confirmation if resending OTP
        setOtp(""); // Clear the OTP input field
    }else{
        setToastMessage("OTP Not Sent");
        setToastType("Server Error");
    }
    
  };

  const handleCheckOTPwithBackend = () => {

    // API to check it otp === value from backend
    return new Promise((resolve, reject) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          resolve(true); 
        }, 1000); 
      });
  }

  const handleConfirmOtp = async () => {
    // API call to confirm otp with backend
    if(await handleCheckOTPwithBackend()){
        setVerified(true);
        setToastMessage("Verified");
        setToastType("success");
        setIsOtpConfirmed(true); // Disable Confirm OTP button
    }else{
        setVerified(false);
        setToastMessage("Incorrect OTP");
        setToastType("error");
    }
    
  };

  const handleSendNewPassword = () => {

    return new Promise((resolve, reject) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          resolve(true); 
        }, 3000); 
        setTimeout(() => {
            onClose();
            resolve(true); 
          }, 6000); 
      });
      
  }

  const handleSave = async () => {
    if (newPassword === confirmPassword) {
      setisPasswordSaved(true);
      console.log(newPassword);
      if(await handleSendNewPassword()){
        setToastMessage("Password changed successfully!");
        setToastType("success");
      }else{
        setToastMessage("Server Issue, try later");
        setToastType("error");
      }
      
    } else {
      setToastMessage("Passwords do not match.");
      setToastType("error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="border-2 border-red-500 bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        {/* Toast Message */}
        {toastMessage && (
          <div
            className={`absolute top-0 left-0 right-0 text-white text-center py-2 rounded-t-lg ${
              toastType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toastMessage}
          </div>
        )}

        {/* Send OTP */}
        <div className="mb-4">
          <button
            onClick={handleSendOtp}
            className={`border-2 border-red-500 mt-5 w-full py-2 text-red-500 rounded-lg ${
              isOtpSent ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-red-100"
            }`}
            disabled={isOtpSent || isPasswordSaved}
          >
            Send OTP
          </button>
        </div>

        {/* Enter OTP */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={!isOtpSent || isOtpConfirmed} // Disabled if OTP not sent or already confirmed
          />
        </div>

        {/* Confirm OTP */}
        <div className="mb-4">
          <button
            onClick={handleConfirmOtp}
            className={`border-2 border-red-500 w-full py-2 text-red-500 rounded-lg ${
              (!isOtpSent || isOtpConfirmed)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white hover:bg-red-100"
            }`}
            disabled={!isOtpSent || isOtpConfirmed || isPasswordSaved} // Disabled if OTP not sent or already confirmed
          >
            Confirm OTP
          </button>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={!verified}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={!verified}
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleSave}
            className="border-2 border-black py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={!verified || isPasswordSaved}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="border-2 border-black py-2 px-4 bg-white-300 text-black rounded-lg hover:bg-red-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopUp;
