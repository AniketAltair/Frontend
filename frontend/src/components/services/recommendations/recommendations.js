import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../../common/toast/toastComponent';
import {setToastMessage,setIsToastVisible,setIsToastValidType} from '../../common/redux/slice/toastSlice'

const Recommendations = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();
  const {toastMessage,isToastVisible,isToastValidType} = useSelector((state)=> state.toast);
  const dispatch = useDispatch();


  const toggleCard = () => {
    setShowCard(prevState => !prevState);
  };

  const handleCheckUserHasCompleted30Days = () => {
    // API to check if user has completed atleast 30 days
    return true;
  }

  const handleCheckUserHasCurrentStats = () => {
    // API to check is user height, weight and current goal is aviable
    return true;
  }

  const handleProvideRecommendations = () => {

    if(!handleCheckUserHasCompleted30Days()){
      dispatch(setToastMessage({ toastMessage: "User must have completed 30 days atleast"}));
      dispatch(setIsToastVisible({ isToastVisible: true }));
      dispatch(setIsToastValidType({ isToastValidType: false }));
      setTimeout(() => {
        dispatch(setIsToastVisible({ isToastVisible: false }));
      }, 3000);
      return;
    }

    if(!handleCheckUserHasCurrentStats()){
      dispatch(setToastMessage({ toastMessage: "Height,Weight and Goal data is required !!!"}));
      dispatch(setIsToastVisible({ isToastVisible: true }));
      dispatch(setIsToastValidType({ isToastValidType: false }));
      setTimeout(() => {
        dispatch(setIsToastVisible({ isToastVisible: false }));
      }, 3000);
      return;
    }

    navigate("/recommendations/recommendationsolution");
  }

  return (
    <div className="font-cursive container mx-auto p-4">
       <ToastComponent toastMessage={toastMessage} toastVisible={isToastVisible} istoastValidtype={isToastValidType}/>
       <button 
        className="border-2 border-red-500 bg-white-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-200"
        onClick={handleProvideRecommendations}
        >
          Provide Recommendations
        </button>

        <div className="bg-white rounded-lg p-6 mb-6">
          <ul className="text-red-500 list-inside space-y-2">
            <li className="relative pl-4 before:content-['*'] before:absolute before:left-0 before:text-red-500">
              Recommendations will only be provided if user has completed 30 days using the application.
            </li>
            <li className="relative pl-4 before:content-['*'] before:absolute before:left-0 before:text-red-500">
              Make sure to input your data daily or set a Planner so that recommendation system knows about past 30 days performance.
            </li>
            <li className="relative pl-4 before:content-['*'] before:absolute before:left-0 before:text-red-500">
              Make sure you have provided height, weight and current goal in Dashboard.
            </li>
          </ul>
        </div>

      <button
          onClick={toggleCard}
          className="border-2 border-green-500 bg-white text-green-500 py-2 px-4 rounded-md hover:bg-green-200 focus:outline-none"
        >
          How to use?
        </button>

      {showCard && (
        <div className="mt-5 text-black bg-white border-2 border-red-500 shadow-md rounded-lg p-6 mb-6">
          <ul className="list-inside list-disc space-y-2">
            <li>Go to Planner Section.</li>
            <li>Setup Interval, meaning, how many days repetition you follow.</li>
            <li>Setup Food bundle, Workout Bundle and Sleep per day.</li>
            <li>Then save the data and make sure Planner is Activated.</li>
            <li>Now according to Planner, Recommendation system will know what were the macros and workouts and sleep daily.</li>
            <li>Or else without Planner, you can set Food and Workout and Sleep data daily in Dashboard.</li>
            <li>Recommendation System will use this data to study patterns and provide what to improve and do next.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
