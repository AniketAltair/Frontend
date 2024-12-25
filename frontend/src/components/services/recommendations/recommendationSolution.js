import React, { useEffect, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Loading from '../../common/loading/loading';
import { setIsLoading } from "../../common/redux/slice/loadingSlice";
import { useDispatch, useSelector } from 'react-redux';

const RecommendationSolution = () => {

  const navigate = useNavigate();
  const [userRecommendationsData,setUserRecommendationsData] = useState({});
  const {isLoading} = useSelector((state)=>(state.loading));
  const dispatch = useDispatch();

  const handleGetUserRecommendations = () => {

    dispatch(setIsLoading({ isLoading: true }));
    // Ideally we will be having API call here to backend.
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          totalDays: 30,
          availableDataDays: 25,
          currentStats:{
            "currentHeight":174,
            "currentWeight":85,
            "currentGoal":"Cutting",
          },
          averageMacrosConsumed:{
            "protein":175,
            "carbs":250,
            "fats":80,
            "calories":2000,
          },
          muscleGroupsTrained:[
            {"Chest":8},
            {"Back":8},
            {"Triceps":8},
            {"Biceps":8},
            {"Hamstrings":8},
            {"Quads":8},
          ],
          averageSleep:7,
          totalRestDays:8,
          recommendations:{
            expectedMacros:{
                "protein":185,
                "carbs":220,
                "fats":70,
                "calories":2200,
            },
            muscleGroupsToFocus:[
                {"Chest":1},
                {"Back":2},
                {"Triceps":8},
                {"Biceps":4}
              ],
            recovery:"You need to take more rest days compared. Add one more week rest per week for better growth.",
            sleep:"You need to take more rest days compared. Add one more week rest per week for better growth.",
            suggestions:[
                "Try to take more rest time between sets",
                "Try to add same type of movements in one session, like adding push movements like chest and triceps together.",
                "Try to add one arm day weekly.",
                "Try to add more fiber to your meal",
                "Drink water daily, 3-4 liters",
                "Setup reminders and alarms for daily workouts.",
                "Make sure to have a scheduled plan.",
            ]

          }

        };
        dispatch(setIsLoading({ isLoading: false }));
        resolve(data);
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetUserRecommendations();
      setUserRecommendationsData(data);
    };

    fetchData();
  }, []); 

  return (
    <>
    {isLoading && <Loading />}
    {!isLoading &&
        <>
    <button
        onClick={() => navigate(-1)}
        className="ml-4 mt-20 border-2 border-red-500 flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-full w-12 h-12 mb-4 shadow-lg transition duration-200">
            <AiOutlineLeft className="h-6 w-6" /> 
    </button>
    <div className="font-cursive min-h-screen bg-white p-2">
    <div className="border-2 border-red-500 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Total Days Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between">
            <span className='text-red-400'>Total Days: </span>
            <span className='text-green-600'>{userRecommendationsData.totalDays}</span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Total Number of Days Data Available: </span>
            <span className='text-green-600'>{userRecommendationsData.availableDataDays}</span>
        </div>
        </div>

        {/* Current Height, Weight, and Goal Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Current Stats</div>
        <div className="flex justify-between">
            <span className='text-red-400'>Current Height (in cms): </span>
            <span className='text-green-600'>
                {userRecommendationsData.currentStats?.currentHeight ? `${userRecommendationsData.currentStats.currentHeight} cm` : 'N/A'}
            </span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Current Weight (in kg): </span>
            <span className='text-green-600'>
                {userRecommendationsData.currentStats?.currentWeight? `${userRecommendationsData.currentStats.currentWeight} kg` : 'N/A'}
            </span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Current Goal: </span>
            <span className='text-green-600'>
                {userRecommendationsData.currentStats?.currentGoal? `${userRecommendationsData.currentStats.currentGoal}` : 'N/A'}
            </span>
        </div>
        </div>

        {/* Average Macros Consumption Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Average Macros Consumption</div>
        <div className="flex justify-between">
            <span className='text-red-400'>Protein: </span>
            <span className='text-green-600'>
                {userRecommendationsData.averageMacrosConsumed?.protein? `${userRecommendationsData.averageMacrosConsumed.protein} gms` : 'N/A'} 
            </span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Carbs: </span>
            <span className='text-green-600'>
                {userRecommendationsData.averageMacrosConsumed?.carbs? `${userRecommendationsData.averageMacrosConsumed.carbs} gms` : 'N/A'} 
            </span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Fats: </span>
            <span className='text-green-600'>
                {userRecommendationsData.averageMacrosConsumed?.fats? `${userRecommendationsData.averageMacrosConsumed.fats} gms` : 'N/A'}
            </span>
        </div>
        <div className="flex justify-between">
            <span className='text-red-400'>Calories: </span>
            <span className='text-green-600'>
                {userRecommendationsData.averageMacrosConsumed?.calories? `${userRecommendationsData.averageMacrosConsumed.calories} kcals` : 'N/A'} 
            </span>
        </div>
        </div>

        {/* Muscle Groups Trained Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Muscle Groups Trained</div>
        <div 
            className="text-red-400 space-y-2 max-h-[150px] overflow-y-auto"
            style={{
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For Internet Explorer and Edge
            }}>
            {userRecommendationsData?.muscleGroupsTrained?.map((muscleGroup, index) => (
                <div
                    key={index} 
                    className="bg-white p-2 rounded-md shadow-sm border-2 border-red-500"
                >
                    {Object.entries(muscleGroup).map(([key, value]) => (
                    <div key={key}>
                        {key}: <span className="text-green-600">({value} sets)</span>
                    </div>
                    ))}
                </div>
            ))}
        </div>
        </div>


        {/* Average Sleep Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Average Sleep</div>
        <div className="flex justify-between">
            <span className="text-red-400">Sleep: </span>
            <span className='text-green-600'>{userRecommendationsData?.averageSleep? `${userRecommendationsData.averageSleep} hours` : 'N/A'}</span>
        </div>
        </div>

        {/* Total Rest Days Card */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Total Rest Days</div>
        <div className="flex justify-between">
            <span className="text-red-400">Rest Days: </span>
            <span className='text-green-600'>{userRecommendationsData?.totalRestDays? `${userRecommendationsData.totalRestDays} days` : 'N/A'}</span>
        </div>
        </div>

        {/* Recommendations Card */}
        <div className=" border-2 border-green-500 p-4 rounded-lg shadow-sm space-y-6">
        <div className="font-semibold text-lg mb-2 underline text-green-500">Recommendations</div>

        {/* Expected Macros */}
        <div >
            <div className="font-semibold text-sm sm:text-lg underline text-black">Expected macros</div>
            <div className="flex justify-between">
            <span className="text-red-400">Protein: </span>
            <span className='text-green-600'>
                {userRecommendationsData?.recommendations?.expectedMacros?.protein? `${userRecommendationsData.recommendations.expectedMacros.protein} gms` : 'N/A'}
            </span>
            </div>
            <div className="flex justify-between">
            <span className="text-red-400">Carbs: </span>
            <span className='text-green-600'>
                {userRecommendationsData?.recommendations?.expectedMacros?.carbs? `${userRecommendationsData.recommendations.expectedMacros.carbs} gms` : 'N/A'}
            </span>
            </div>
            <div className="flex justify-between">
            <span className="text-red-400">Fats: </span>
            <span className='text-green-600'>
                {userRecommendationsData?.recommendations?.expectedMacros?.fats? `${userRecommendationsData.recommendations.expectedMacros.fats} gms` : 'N/A'}
            </span>
            </div>
            <div className="flex justify-between">
            <span className="text-red-400">Calories: </span>
            <span className='text-green-600'>
                {userRecommendationsData?.recommendations?.expectedMacros?.calories? `${userRecommendationsData.recommendations.expectedMacros.calories} kcals` : 'N/A'}
            </span>
            </div>
        </div>

        {/* Muscle Groups to Focus On */}
        <div className="border-2 border-red-500 p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-sm sm:text-lg mb-2 underline text-black">Muscle Groups to focus</div>
        <div 
            className="text-red-400 space-y-2 max-h-[150px] overflow-y-auto"
            style={{
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For Internet Explorer and Edge
            }}>
            {userRecommendationsData?.recommendations?.muscleGroupsToFocus?.map((muscleGroup, index) => (
                <div
                    key={index} 
                    className="bg-white p-2 rounded-md shadow-sm border-2 border-red-500"
                >
                    {Object.entries(muscleGroup).map(([key, value]) => (
                    <div key={key}>
                        {key}: <span className="text-green-600">({value} sets)</span>
                    </div>
                    ))}
                </div>
            ))}
        </div>
        </div>

        {/* Recovery Suggestions */}
        <div>
            <div className="font-semibold text-sm sm:text-lg underline text-black">How about recovery?</div>
            <div className="text-red-400">
                {userRecommendationsData?.recommendations?.recovery? `${userRecommendationsData.recommendations.recovery}` : 'N/A'}
            </div>
        </div>

        {/* Sleep Suggestions */}
        <div>
            <div className="font-semibold text-sm sm:text-lg underline text-black">What about Sleep?</div>
            <div className="text-red-400">{userRecommendationsData?.recommendations?.sleep? `${userRecommendationsData.recommendations.sleep}` : 'N/A'}</div>
        </div>

        {/* Workout Suggestions */}
        <div>
            <div className="font-semibold text-sm sm:text-lg underline text-black">Suggestions regarding your workout:</div>
            <ul className="text-red-400 list-disc pl-6 space-y-2">
                {userRecommendationsData?.recommendations?.suggestions?.map((suggestion)=>(
                    <li>{suggestion}</li>
                ))}
            </ul>
        </div>
        </div>
    </div>
    </div>
    </>}
</>
  )
}

export default RecommendationSolution
