import React, { useEffect, useState } from 'react';
import PlanComponent from './planComponent';  
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../common/loading/loading';

const Plans = () => {

  const navigate = useNavigate();
  const [plansData,setPlansData] = useState([]);
  const [featureDataSet,setFeatureDataSet] = useState([]);
  const {isLoading} = useSelector((data)=>(data.loading));


  const handleNavigate = () => {
    navigate("/plans/transactionhistory")
  }

  const handleGetPlansData = () => {
    //API call to get Plan Data
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

  const handleGetFeatureDataSet = () => {
    // API call to get feature data set from backend
    const data = ["Diet","Workouts","Planner","Recommendations","AI Assistant","Find Gyms"];
    return data;
  }

  useEffect(()=>{
    const data = handleGetPlansData();
    setPlansData(data);

    const featuresData = handleGetFeatureDataSet();
    setFeatureDataSet(featuresData);
  },[])

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
      {isLoading && <Loading/>}
    <div className="font-cursive min-h-screen bg-gray-100 flex flex-col py-6 px-4">
      {/* Transaction History Button */}
      <button 
        className="sm:ml-[50px] border-2 border-red-500 w-full max-w-xs bg-white text-red-500 py-3 px-6 rounded-md shadow-lg mb-8 hover:bg-red-200 transition duration-200"
        onClick={handleNavigate}>
        Transaction History
      </button>

      {/* Plans Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plansData.map((plan)=>(
          <PlanComponent title={plan.title} cost={plan.cost} validity={plan.validity} count={plan.count} features={plan.features} featureDataSet={featureDataSet}/>
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default Plans;
