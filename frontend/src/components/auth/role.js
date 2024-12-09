import React from "react";
import Logo from "../../assets/navbar/Logo.png";
import {Dumbbell,HeartHandshake,UsersRound} from 'lucide-react';
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

const Role = () => {

    const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="font-cursive"
    >
    <div className="font-cursive flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="border-2 border-red-500 bg-white shadow-2xl rounded-lg p-3  w-full max-w-sm">
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

        {/* Gym Owner Card */}
        <div 
            onClick={()=>navigate("/signup",{ state: { role: 3 } })}
            className="flex border-2 border-red-500 bg-white p-3 mb-6 rounded-lg shadow-md hover:bg-red-100 hover:scale-110 sm:hover:scale-130 transition-all duration-300">
          <span className="flex items-center justify-center mr-10 ml-4">
            <Dumbbell className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] text-black" />
          </span>
          <span className="text-center text-md sm:text-xl font-medium text-gray-700">Are you a Gym Owner?</span>
        </div>

        {/* Trainer Card */}
        <div 
            onClick={()=>navigate("/signup",{ state: { role: 4 } })}
            className="flex border-2 border-red-500 bg-white p-3 mb-6 rounded-lg shadow-md hover:bg-red-100 hover:scale-110 sm:hover:scale-130 transition-all duration-300">
          <span className="flex items-center justify-center mr-10 ml-4">
            <Dumbbell className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] text-black" />
          </span>
          <span className="text-center text-md sm:text-xl font-medium text-gray-700">Are you a Trainer?</span>
        </div>

        {/* Customer Card */}
        <div 
            onClick={()=>navigate("/signup",{ state: { role: 5 } })}
            className="flex border-2 border-red-500 bg-white p-3 mb-6 rounded-lg shadow-md hover:bg-red-100 hover:scale-110 sm:hover:scale-130 transition-all duration-300">
          <span className="flex items-center justify-center mr-10 ml-4">
            <Dumbbell className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] text-black" />
          </span>
          <span className="text-center text-md sm:text-xl font-medium text-gray-700">Are you a Customer?</span>
        </div>

        {/* Back to login link */}
        <div 
            onClick={()=>navigate("/signin")}
            className="text-center">
          <p className="text-sm text-blue-500 cursor-pointer hover:underline">
            Back to login?
          </p>
        </div>
       
      </div>
    </div>
    </motion.div>
  );
};

export default Role;
