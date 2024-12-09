import React, { useState } from "react";
import Logo from "../../assets/navbar/Logo.png";
import OAuth from "./oauth";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Loading from "../common/loading/loading";
import ToastComponent from "../common/toast/toastComponent";

const SignIn = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [googleAccount,setGoogleAccount] = useState(null);
  const [facebookAccount,setFacebookAccount] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [istoastValidtype,setIstoastValidtype] = useState(false);

  const toastHandler = (message,type) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
    setIstoastValidtype(type);
  }

  const validateEmail = () => {
    if(!email || email==""){
      toastHandler("Email is Empty",false);
      console.log("empty email");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      toastHandler("Invalid Email",false);
      console.log("Invalid Email");
      return false;
    }

    return true;
  }

  const validatePassword = () => {
    if(!password || password==""){
      toastHandler("Password is Empty",false);
      console.log("empty password");
      return false;
    }
    return true;
  }

  const validateOauthSignIn = () => {
    // perform some more frontend validations like, if  token contains info that we want
    console.log("validateOauthSignIn googleAccount: "+googleAccount);
    console.log("validateOauthSignIn facebookAccount: "+facebookAccount);
    return true;
  }

  const handleSendEmailPasswordToBackend = () => {
    // API call to check if password is correct in backend
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const userRole = 1;
        resolve(userRole); 
      }, 3000); 
    });
  }

  const handleSignIn = async () => {
    console.log(email);
    console.log(password);
    if(!validateEmail() || !validatePassword()){
      return;
    }

    const result = await handleSendEmailPasswordToBackend();
    if(result!=false){
      toastHandler("SignIn Successfull",true)
      if(result==1){
        navigate("/admindashboard")
      }else if(result==2){
        navigate("/profile")
      }else if(result==3){
        navigate("/gymdashboard")
      }else if(result==4){
        navigate("/trainerdashboard")
      }else{
        navigate("/customerdashboard")
      }
      return;
    }else{
      // here all those backend validations:
      // Email is not present
      // Password does not match
      // Server issue
      toastHandler("Server Issue",false)
      console.log("Invalid creds");
      return;
    }
  }

  const handleSendAccountInfoToBackend = () => {
    // API call to check if password is correct in backend
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const role = 5;
        resolve(role); 
      }, 3000); 
    });
  }

  const handleOauthSignIn = async () => {
    if(!validateOauthSignIn()){
      toastHandler("Invalid Oauth Creds",false);
      console.log("invalid oauth creds");
      return;
    }

    const result = await handleSendAccountInfoToBackend();
    if(result!=false){
      console.log("oauth sign in successfull");
      toastHandler("Oauth Sign In Successful",true)
      if(result==1){
        navigate("/admindashboard")
      }else if(result==2){
        navigate("/profile")
      }else if(result==3){
        navigate("/gymdashboard")
      }else if(result==4){
        navigate("/trainerdashboard")
      }else{
        navigate("/customerdashboard")
      }
      return true;
    }else{
      // here all those backend validations:
      // Email is not present
      // Server issue
      console.log("oauth sign in Unsuccessfull");
      toastHandler("Server issue",false)
      return false;
    }

  }

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="font-cursive"
    >
      {isLoading && <Loading/>}
      <ToastComponent toastMessage={toastMessage} toastVisible={toastVisible} istoastValidtype={istoastValidtype}/>
    <div className="font-cursive flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="border-2 border-red-500 bg-white shadow-2xl rounded-lg p-3  w-full max-w-sm overflow-x-auto">
        {/* Circular Image */}
        <div className="flex justify-center mb-3">
          <img
            src={Logo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-contain border-2 border-black p-1"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
          MACROMINDER
        </h1>

        {/* Email Input */}
        <div className="mb-4 flex items-center">
          <label className="text-[15px] font-medium text-gray-700 mr-11">
            Email:
          </label>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            className="text-black w-full flex-grow border-2 border-red-500 bg-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-1 flex items-center">
          <label className="text-[15px] font-medium text-gray-700 mr-4">
            Password:
          </label>
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            className="text-black w-full flex-grow border-2 border-red-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <p 
            onClick={()=>navigate("/forgotpassword")}
            className="text-sm text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>


        {/* Sign In Button */}
        <div className="mb-4">
          <button 
            onClick={handleSignIn}
            className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 focus:outline-none">
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">
            or Sign In Using
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <OAuth 
          title={"Sign In"} 
          setGoogleAccount={setGoogleAccount} 
          setFacebookAccount={setFacebookAccount}
          handleOauth={handleOauthSignIn}
        />

        {/* New User */}
        <div className="text-center">
          <p className="text-gray-700">
            New User?{" "}
            <span 
              onClick={()=>navigate("/signup/role")}
              className="text-blue-500 cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default SignIn;
