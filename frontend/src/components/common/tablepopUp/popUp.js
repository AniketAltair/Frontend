import React, { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { renderField } from "./renderFields";
import Loading from "../loading/loading";
import { setToastMessage, setIsToastValidType, setIsToastVisible } from "../redux/slice/toastSlice";
import { setIsLoading } from "../redux/slice/loadingSlice";
import SendToComponent from "./SendToComponent";
import TypeComponent from "./TypeComponent";


const PopUp = ({ isOpen, data, onClose, action }) => {
  const popupRef = useRef(null);
  const [currentData, setCurrentData] = useState({ ...data });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const {currentTab} = useSelector((state)=>(state.currentTab));
  const {isLoading} = useSelector((state)=>(state.loading));


  const sendDataToServer = () => {
    return new Promise((resolve) => {
      dispatch(setIsLoading({isLoading:true}));
      setTimeout(() => {
        dispatch(setIsLoading({isLoading:false}));
        resolve(true);
      }, 3000);
    });
  };

  const toastHandler = (message, type) => {
    dispatch(setToastMessage({ toastMessage: message }));
    dispatch(setIsToastVisible({ isToastVisible: true }));
    dispatch(setIsToastValidType({ isToastValidType: type }));
    setTimeout(() => {
      dispatch(setIsToastVisible({ isToastVisible: false }));
    }, 3000);
  };

  const inputHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    for (const field of Object.keys(currentData)) {
      if (field === "Email") {
        if (!currentData[field] || currentData[field].trim() === "") {
          newErrors[field] = "Email cannot be empty.";
        } else if (!emailRegex.test(currentData[field])) {
          newErrors[field] = "Invalid email format.";
        }
      } else if (field === "Password") {
        if (!currentData[field] || currentData[field].trim() === "") {
          newErrors[field] = "Password cannot be empty.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    // over here we can get state of current tab
    // like if user panel, than we get currentTab as User
    // so now we can redirect to APIs of user from here
    // similiarly if we have inspector tab, current tab will be Inspector
    console.log("currentData : "+JSON.stringify(currentData));
    console.log("Current tab : "+currentTab);
    if (inputHandler()) {
      if (await sendDataToServer()) {
        toastHandler("Data Saved", true);
      } else {
        toastHandler("Server issue", false);
      }
      onClose();
    }
  };

  const handleEdit = async () => {
    console.log("currentData : "+JSON.stringify(currentData));
    console.log("Current tab : "+currentTab);
    if (inputHandler()) {
      if (await sendDataToServer()) {
        toastHandler("Data Edited", true);
      } else {
        toastHandler("Server issue", false);
      }
      onClose();
    }
  };

  const handleDelete = async () => {
    if (inputHandler()) {
      if (await sendDataToServer()) {
        toastHandler("Data Deleted", true);
      } else {
        toastHandler("Server issue", false);
      }
      onClose();
    }
  };

  useEffect(() => {
    console.log("dddaattaa : "+JSON.stringify(data));
    setCurrentData({ ...data });
    setErrors({});
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      {isLoading && <Loading />}
      <div
        ref={popupRef}
        className="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full mx-4 sm:mx-6 md:mx-10 overflow-y-auto max-h-screen text-[11px] sm:text-[15px]"
      >
        <div>
          {data &&
            Object.entries(data).map(([key, value]) => (
              <>
                {((key === "Type") && (currentTab==="Notifications")) && (
                  <p key={`${key}-${value}`} className="mb-2 text-black">
                    <strong className="text-red-700 mr-2">{key}:</strong>
                    <TypeComponent value={value} action={action} setCurrentData={setCurrentData}/>
                  </p>
                )}
                {(key === "SendTo") && (
                  <p key={`${key}-${value}`} className="mb-2 text-black">
                    <strong className="text-red-700 mr-2">{key}:</strong>
                    <SendToComponent value={value} setCurrentData={setCurrentData} action={action}/>
                  </p>
                )}
                {((key === "Address") || (key === "Message")) && (
                  <p key={`${key}-${value}`} className="mb-2 text-black">
                    <strong className="text-red-700 mr-2">{key}:</strong>
                    {renderField(key, value, currentData, setCurrentData, action,currentTab)}
                  </p>
                )}
                {(key === "Email" || key === "Password") && (
                  <div key={key} className="mb-4">
                    <p className="text-black flex items-center">
                      <strong className="text-red-700 mr-2">{key}:</strong>
                      {renderField(key, value, currentData, setCurrentData, action,currentTab)}
                    </p>
                    {errors[key] && <p className="text-red-500 text-[5px]">{errors[key]}</p>}
                  </div>
                )}
                {key !== "Email" && 
                 key !== "Password" && 
                 key !== "Id" && 
                 key !== "Address" && 
                 key !== "Message" && 
                 key !== "SendTo" && 
                 (currentTab!=="Notifications") && // for conflict with user panel type and notification type
                 (<p key={`${key}-${value}`} className="mb-2 text-black flex items-center">
                    <strong className="text-red-700 mr-2">{key}:</strong>
                    {renderField(key, value, currentData, setCurrentData, action,currentTab)}
                  </p>
                )}
              </>
            ))}
        </div>
        {action === "edit" && (
          <div className="flex justify-center space-x-4">
            <button
              className="border-2 border-green-500 px-2 py-2 bg-white text-green-500 rounded-md hover:bg-green-500 hover:text-white shadow-md"
              onClick={handleEdit}
            >
              EDIT
            </button>
            <button
              className="border-2 border-red-500 px-2 py-2 bg-white text-red-500 rounded-md hover:bg-red-500 hover:text-white shadow-md"
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        )}
        {action === "add" && (
          <div className="flex justify-center space-x-4">
            <button
              className="border-2 border-green-500 px-2 py-2 bg-white text-green-500 rounded-md hover:bg-green-500 hover:text-white shadow-md"
              onClick={handleSave}
            >
              ADD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
