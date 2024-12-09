import React, { useState,useEffect } from 'react'
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const OAuth = ({title,setGoogleAccount,setFacebookAccount,handleOauth}) => {

  const handleGoogleLogin = (response) => {
    console.log(response);
    //get google acount from response and set it
    // as of now this :
    setGoogleAccount("aniketgoogleaccount");
    handleOauth();
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
            handleOauth();
            console.log("Facebook Account:", userData);
          });
        } else {
          console.error("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

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


  return (
    <>
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
              className="w-5 h-5 mr-[60px] sm:mr-[40px] md:mr-[50px] lg:mr-[80px]"
            />
            <span className="text-center text-[14px]">{title} with Google</span>
          </button>
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
              className="w-5 h-5 mr-[60px] sm:mr-[40px] md:mr-[50px] lg:mr-[80px]"
            />
            <span className="text-center text-[14px]">{title} with Facebook</span>
          </button>
        </div>
    </>
  )
}

export default OAuth;