import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { profileImageLinks } from "../../Links/images/imageLinks";
import { Edit3 } from "lucide-react";
import ChangePasswordPopUp from "./changePasswordPopUp";
import LinkAccountsPopUp from "./linkAccountsPopUp";
import RemoveAccountPopUp from "./removeAccountPopUp"
import Loading from "../../common/loading/loading";
import {motion} from "framer-motion";

const Profile = () => {
  const [image, setImage] = useState(profileImageLinks.profilePicLink);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [showLinkAccountsPopup, setShowLinkAccountsPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [accountToRemove, setAccountToRemove] = useState(null);
  const [name, setName] = useState(""); // Default name
  const [email, setEmail] = useState(""); // Default email
  const [googleAccount, setGoogleAccount] = useState(""); // Default name
  const [facebookAccount, setFacebookAccount] = useState(""); // Default email
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openRemovePopup = (accountType) => {
    setAccountToRemove(accountType);
    setShowRemovePopup(true);
  };

  const confirmRemoveAccount = () => {
    if (accountToRemove === "google") {
      setGoogleAccount(null);
    } else if (accountToRemove === "facebook") {
      setFacebookAccount(null);
    }
    setShowRemovePopup(false);
  };

  const getUserImage = () => {
    // API to get S3image link of user image 
    return "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
  }

  const getUserName = () => {
    // API call to get user name
    return "Aniket";
  }

  const getUserEmail = () => {
    // API call to get user email or get it from redux store
    return "anikadh01@gmail.com";
  }

  const getUserGoogleAccount = () => {
    // API call to get user google acount info
    // if null means no google account linked
    return "initialaniketGoogleAccount";
  }

  const getUserFacebookAccount = () => {
    // API call to get user facebook account info
    // if null means has no facebook account linked
    return "ss";
  }

  const sendUpdatedData = () =>{

    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        resolve(true); 
      }, 3000); 
    });

  }

  const handleUpdate = async () => {

    // Check here is if image has changed.
    // then only send image via other API. 
    // this API stores the image in S3 and stores the new path in DB
    // Also deletes the old image from S3.

    console.log("name : "+name);
    console.log("email : "+email);
    console.log("googleAccount : "+googleAccount);
    console.log("facebookaccount : "+facebookAccount);

    //Api call to upate the above changes
    if(await sendUpdatedData()){
      console.log(true);
    }else{
      console.log(false);
    }

  }

  useEffect(()=>{
    console.log("when any account removed");
  },[googleAccount,facebookAccount])

  useEffect(()=>{

    console.log("initial state loaded");
    const userImage = getUserImage();
    const userName = getUserName();
    const userEmail = getUserEmail();
    const userGoogleAccount = getUserGoogleAccount();
    const userFacebookAccount = getUserFacebookAccount();

    setImage(userImage);
    setName(userName);
    setEmail(userEmail);
    setGoogleAccount(userGoogleAccount);
    setFacebookAccount(userFacebookAccount);
  },[])

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="font-cursive"
    >
    <div className="font-cursive flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex-grow flex justify-center items-center">
        {isLoading && <Loading/>}
        <div className="bg-white border-red-500 border-2 shadow-2xl rounded-xl p-3 w-full max-w-sm">
          {/* Profile Image */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-black"
                onClick={() => document.getElementById("fileInput").click()} // Trigger file input on image click
              />
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                key={fileInputKey} // This forces the input to reset after an image is selected
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="flex items-center mb-4">
            <label className="text-red-500 text-lg font-semibold mr-2">Name:</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              className="text-black flex-grow border-2 border-red-500 rounded-lg p-2 focus:outline-none focus:border-red-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center mb-4">
            <label className="text-red-500 text-lg font-semibold mr-2">Email:</label>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="text"
              className="text-black flex-grow border-2 border-red-500 rounded-lg p-2 focus:outline-none focus:border-red-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Change Password */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => setShowPopup(true)}
              className="border-2 border-black w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
            >
              Change Password
            </button>
            <button 
              onClick={() => setShowLinkAccountsPopup(true)}
              className="border-2 border-red-500 w-full text-red-700 rounded-lg py-2 hover:bg-red-100">
              Link Accounts
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-6">
          {googleAccount && (
            <div className="flex flex-col items-center">
              <div className="flex justify-end w-[40px] -mb-4 ml-10">
                <button
                  onClick={() => openRemovePopup("google")}
                  className="bg-red-500 font-bold text-white border-2 border-red-500 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <button className="border-2 border-black p-3 rounded-full hover:bg-red-100">
                <FaGoogle size={24} className="text-red-500" />
              </button>
            </div>
          )}
          {facebookAccount && (
            <div className="flex flex-col items-center">
              <div className="flex justify-end w-[40px] -mb-4 ml-10">
                <button
                  onClick={() => openRemovePopup("facebook")}
                  className="bg-red-500 font-bold text-white border-2 border-red-500 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <button className="border-2 border-black p-3 rounded-full hover:bg-red-100">
                <FaFacebook size={24} className="text-blue-600" />
              </button>
            </div>
          )}
        </div>


          {/* Update Button */}
          <button 
            onClick={handleUpdate}
            className="border-2 border-black w-full bg-red-500 text-white rounded-lg py-3 hover:bg-red-600">
            Update
          </button>
        </div>
      </div>

      {showPopup && (
        <ChangePasswordPopUp onClose={() => setShowPopup(false)} setIsLoading={setIsLoading}/>
      )}

      {showLinkAccountsPopup && (
        <LinkAccountsPopUp 
          onClose={() => setShowLinkAccountsPopup(false)} 
          setIsLoading={setIsLoading} 
          googleAccount={googleAccount}
          facebookAccount={facebookAccount}
          setGoogleAccount={setGoogleAccount}
          setFacebookAccount={setFacebookAccount}/>
      )}

      {showRemovePopup && (
        <RemoveAccountPopUp
          onClose={() => setShowRemovePopup(false)}
          onConfirm={confirmRemoveAccount}
          accountType={accountToRemove}
          accountName={
            accountToRemove === "google" ? googleAccount : facebookAccount
          }
        />
      )}
    </div>
    </motion.div>

    
  );
};

export default Profile;
