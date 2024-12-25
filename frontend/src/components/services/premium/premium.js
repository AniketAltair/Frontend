import React, { useEffect, useState } from 'react';
import PlanComponent from './planComponent';  
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setPremiumPlanDetails} from "../../common/redux/slice/premiumPlanSlice"
import ToastComponent from '../../common/toast/toastComponent';

const Premium = () => {
  const navigate = useNavigate();
  const [plansData,setPlansData] = useState([]);
  const [userPlanData,setUserPlanData] = useState({});
  const dispatch = useDispatch();
  const {toastMessage,isToastVisible,isToastValidType} = useSelector((state)=> state.toast);
  

  const handleGetPlansData = () => {
    //API call to get ALL Plan Data
    const data = [
      {
        "title":"Free Plan",
        "cost":0,
        "validity":0,
        "count":85,
        "features":["Diet","Workouts","Planner","Assistant","Find Gyms"]
      },
      {
        "title":"Short Plan",
        "cost":100,
        "validity":30,
        "count":10,
        "features":["Diet","Workouts","Planner","Assistant","Find Gyms","Recommendations"]
      },
      {
        "title":"Long Plan",
        "cost":1000,
        "validity":365,
        "count":5,
        "features":["Diet","Workouts","Planner","Assistant","Find Gyms","Recommendations"]
      }
    ];
    return data;
  }

  const handleNavigate = () => {
    navigate("/premium/transactionhistory")
  }

  const handleGetUserPlanData = () => {
    //API call to get user Plan Data
    const data = {
      "planStatus":"Inactive",
      "numberOfDaysRemaining":150
    };
    return data;
  }

  const handleBuyNow = (amount,validity,features) => {
    console.log("buy now");
    dispatch(setPremiumPlanDetails({planAmount:amount,planValidity:validity,planfeatures:features}));
    navigate("/premium/buynow");
  }

  useEffect(()=>{
    const data = handleGetPlansData();
    setPlansData(data);

    const dataUserPlan = handleGetUserPlanData();
    setUserPlanData(dataUserPlan);

  },[])

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
    <ToastComponent toastMessage={toastMessage} toastVisible={isToastVisible} istoastValidtype={isToastValidType}/>
    <div className="font-cursive min-h-screen bg-white flex flex-col py-6 px-4">
      {/* Transaction History Button */}
      <button 
        className="sm:ml-[50px] border-2 border-red-500 w-full max-w-xs bg-white text-red-500 py-3 px-6 rounded-md shadow-lg mb-8 hover:bg-red-200 transition duration-200"
        onClick={handleNavigate}>
        Transaction History
      </button>

      {/* Membership Status Section */}
      {userPlanData && (
        <div className="sm:px-11 mb-6 sm:mb-10">
          <p className="text-black text-xs sm:text-xl font-semibold">
            Membership: 
            <span
              className={`ml-1 sm:ml-5 font-bold ${
                userPlanData.planStatus === "Active" ? "text-green-500" : "text-red-500"
              }`}
            >
              {userPlanData.planStatus === "Active"
                ? `Active (${userPlanData.numberOfDaysRemaining} more days remaining)`
                : "Inactive"}
            </span>
          </p>
        </div>
      )}

      

      {/* Plans Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plansData.map((plan)=>(
          <div key={plan.title} className="flex flex-col items-center justify-between">
            <PlanComponent 
              title={plan.title} 
              cost={plan.cost} 
              validity={plan.validity} 
              features={plan.features} 
            />
            {plan.cost===0?null:
            <button
              disabled={userPlanData.planStatus === "Active"}
              onClick={()=>handleBuyNow(plan.cost,plan.validity,plan.features)}
              className="mt-1 py-2 px-6 bg-green-500 border-2 border-black text-white rounded-full shadow-lg focus:outline-none w-full sm:w-auto">
              Buy Now
            </button>}
          </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
}

export default Premium;