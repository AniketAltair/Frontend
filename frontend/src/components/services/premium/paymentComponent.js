import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {setToastMessage,setIsToastVisible,setIsToastValidType} from '../../common/redux/slice/toastSlice'

const PaymentComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {planAmount,planValidity,planfeatures} = useSelector((state)=>(state.premiumPlan));

  const handlePayNow = () => {
    let message = "";
    let type = true;
    // If payment sucessful, thes sucess message
    message = "Payment Sucessful !!!";
    type = true;
    // else 
    // message = "payment unsucessful"
    // type = false
    
    dispatch(setToastMessage({ toastMessage: message }));
    dispatch(setIsToastVisible({ isToastVisible: true }));
    dispatch(setIsToastValidType({ isToastValidType: type }));
    setTimeout(() => {
      dispatch(setIsToastVisible({ isToastVisible: false }));
    }, 3000);
    navigate(-1);
  }

  return (
    <>
    {/* Back Button */}
    <button
        onClick={() => navigate(-1)}
        className="ml-4 mt-20 mb-2 flex items-center justify-center border-2 border-red-500 text-red-500 bg-white hover:bg-red-100 rounded-full w-12 h-12 shadow-lg transition duration-200"
        aria-label="Go Back">
        <AiOutlineLeft className="h-6 w-6" />
    </button>
    <div className="font-cursive min-h-screen flex flex-col items-center bg-white p-4">
      {/* Payment Card */}
      <div className="bg-white border-2 border-red-500 rounded-lg shadow-lg p-6 w-full max-w-lg sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Payment Details
        </h2>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Amount: <span className="text-green-500">₹ {planAmount}</span>
          </p>
        </div>

        {/* Details */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">Details:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Validity for <strong className='text-green-500'>{planValidity}</strong> days</li>
            <li>
              <u>Features include</u>:
              <ul className="list-disc list-inside ml-6 space-y-1">
                {planfeatures.map((item)=>(
                    <li>{item}</li>
                ))}
              </ul>
            </li>
            <li>Plan will start immediately after payment</li>
            <li className="text-red-500 font-semibold">Non-refundable</li>
          </ul>
        </div>

        {/* Pay Now Button */}
        <button
          className="w-full border-2 border-black bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
          onClick={handlePayNow}
        >
          Pay Now
        </button>
      </div>
    </div>
    </>
  );
};

export default PaymentComponent;
