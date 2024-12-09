import React, { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const LinkAccountsPopUp = ({ onClose,setIsLoading,googleAccount,facebookAccount,setGoogleAccount,setFacebookAccount }) => {

  // Initialize Facebook SDK
  useEffect(() => {
    const loadFBScript = () => {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.onload = () => {
        window.FB.init({
          appId: "506401492418349", // Replace with your Facebook App ID
          cookie: true,
          xfbml: true,
          version: "v12.0", // Updated version to avoid the 'invalid version' error
        });
      };
      document.body.appendChild(script);
    };

    loadFBScript();
  }, []);

  const handleGoogleLogin = (response) => {
    console.log(response);
    //get google acount from response and set it
    // as of now this :
    setGoogleAccount("aniketgoogleaccount");
    if (response.profileObj) {
      setGoogleAccount(response.profileObj.email);
    } else {
      console.error("Failed to log in with Google.");
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: handleGoogleLogin,
  });

  const handleFacebookLink = () => {
    console.log("Facebook login started");
    window.FB.login(
      function (response) {
        console.log("response : " + JSON.stringify(response));
        if (response.status === "connected") {
          window.FB.api("/me", { fields: "name,email" }, function (userData) {
            setFacebookAccount(userData.email);
            console.log("Facebook Account:", userData);
          });
        } else {
          console.error("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  const handleSendNewAccounts = () => {
    // API call to send new linked account info.
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        resolve(true); 
      }, 3000); 
    });
  }

  const handleSave = async () => {
    console.log("Linked Accounts:");
    
    if(await handleSendNewAccounts()){
      console.log("Saved successfully");
      if (googleAccount) console.log("Google:", googleAccount);
      if (facebookAccount) console.log("Facebook:", facebookAccount);
    }else{
      console.log("Server issue.");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 font-cursive"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative mr-5 ml-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google Account */}
        <div className="mb-4">
          <button
            className="w-full py-2 px-3 border-2 border-red-500 rounded-lg bg-white text-black hover:bg-red-100 flex items-center"
            onClick={() => loginGoogle()}
          >
            {/* Google Logo */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5 mr-[30px] sm:mr-[40px] md:mr-[50px] lg:mr-[80px]"
            />
            <span className="text-center text-[14px]">Link Your Google Account</span>
          </button>
          {googleAccount && (
            <p className="mt-2 text-center text-xs text-red-500">
              Linked Account: {googleAccount}
            </p>
          
          )}
        </div>

        {/* Facebook Account */}
        <div className="mb-4">
          <button
            className="w-full py-2 px-3 border-2 border-red-500 rounded-lg bg-white text-black hover:bg-red-100 flex items-center"
            onClick={handleFacebookLink}
          >
            {/* Facebook Logo */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook Logo"
              className="w-5 h-5 mr-[30px] sm:mr-[40px] md:mr-[50px] lg:mr-[80px]"
            />
            <span className="text-center text-[14px]">Link Your Facebook Account</span>
          </button>
          {facebookAccount && (
            <p className="mt-2 text-center text-xs text-red-500">
              Linked Account: {facebookAccount}
            </p>
          )}
        </div>

        {/* Save Button */}
        <button
          className="w-full py-2 bg-white border-2 border-green-500 text-black rounded-lg hover:bg-green-200 mt-4"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LinkAccountsPopUp;
