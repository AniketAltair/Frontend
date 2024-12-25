import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import TableComponent from "../common/table/tableComponent";
import PopUp from "../common/tablepopUp/popUp";
import ToastComponent from "../common/toast/toastComponent";
import {useDispatch, useSelector} from "react-redux"
import {motion} from "framer-motion";
import {setCurrentTab} from "../common/redux/slice/currentTabSlice"
import {setIsLoading} from "../common/redux/slice/loadingSlice"
import Loading from "../common/loading/loading";
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ToggleButton = ({ isOn, onToggle }) => {
  return (
    <div 
      className={`border-2 border-red-500 w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
        ${isOn ? 'bg-red-400' : 'bg-gray-200'}`}
      onClick={onToggle}
    >
      {/* Sliding Circle */}
      <div 
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 
          ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </div>
  );
};

const Notifications = () => {

  const [isFirstToggleOn, setIsFirstToggleOn] = useState(false);
  const [isSecondToggleOn, setIsSecondToggleOn] = useState(false);
  const {toastMessage,isToastVisible,isToastValidType} = useSelector((state)=> state.toast);
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=>(state.loading));
  
  const columns = [
    { key: "id", label: "Id", sortable: true,add:false,edit:false,view:false},
    { key: "type", label: "Type", sortable: true,add:false,edit:true,view:true },
    { key: "message", label: "Message", sortable: true,add:false,edit:true,view:true },
    { key: "sendTo", label: "SendTo", sortable: true,add:false,edit:true,view:true },
    { key: "send", label: "Send", sortable: false,add:false,edit:true,view:true },
    { key: "view", label: "View", sortable: false,add:false,edit:true,view:true },
    { key: "edit", label: "Edit", sortable: false,add:false,edit:true,view:true },
  ];

  const notificationData = [
    // if sendTo = [0], meaning this message goes to all.
    // if sendTo = [0,1] meaning send to all gyms
    // if sendTo = [0,2] meaning send to all trainers
    // if sendTo = [0,3] meaning send to all customers
    { id: 1,type: "Marketing",message:"Hi there ! Planner is now included in Free Plan. Do try .",sendTo:[1,2,3,4,5]},
    { id: 2,type: "Warning",message:"message 2",sendTo:[2,3,4,5]},
    { id: 3,type: "Marketing",message:"message 3",sendTo:[1,2,3,4,5]},
    ...Array(35)
      .fill()
      .map((_, index) => ({
        id: index + 4,
        type:"Marketing",
        message:"Test message",
        sendTo:[2,4]
      })),
  ];

  const [newData,setNewData] = useState(null);
  const [popUpAction,setPopUpAction] = useState("");

  const handleOpenPopUp = () => {
    setNewData({
      Type: "",
      Message: "",
      SendTo: []
    });
    setPopUpAction("add");
  }

  const handleClosePopup = () => {
    setNewData(null);
  }

  const handleFirstToggle = () => {
    // API to set the new value (true or false of whatsapp/email notification)
    console.log("first switch value : "+(!isFirstToggleOn));
    // (!isFirstToggleOn) is the current change made to switch
    dispatch(setIsLoading({isLoading:true}));
    setTimeout(() => {
      dispatch(setIsLoading(({isLoading:false})));
    }, 2000);
    setIsFirstToggleOn(!isFirstToggleOn);
  };
  const handleSecondToggle = () => {
     // API to set the new value (true or false of whatsapp/email notification)
     console.log("second switch value : "+(!isSecondToggleOn));
     // (!isFirstToggleOn) is the current change made to switch
     dispatch(setIsLoading({isLoading:true}));
     setTimeout(() => {
       dispatch(setIsLoading(({isLoading:false})));
     }, 2000);
     setIsSecondToggleOn(!isSecondToggleOn);
  }

  useEffect(()=>{
    dispatch(setCurrentTab({currentTab:"Notifications"}));
  },[])

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
    {isLoading && <Loading/>}
    <div className="font-cursive p-4 bg-gray-100 min-h-screen"> 
      <ToastComponent toastMessage={toastMessage} toastVisible={isToastVisible} istoastValidtype={isToastValidType}/>
      {/* Toggle Switch Section */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaWhatsapp className="text-green-500 text-2xl" />
          <ToggleButton isOn={isFirstToggleOn} onToggle={handleFirstToggle} />
        </div>
        <div className="flex items-center space-x-2">
          <MdEmail className="text-blue-500 text-2xl" />
          <ToggleButton isOn={isSecondToggleOn} onToggle={handleSecondToggle} />
        </div>
      </div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 flex items-center"
            onClick={handleOpenPopUp}>
            <FaPlusCircle className="mr-2" /> Create Notifications
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Data</h2>
        <TableComponent data={notificationData} columns={columns}/>
      </div>

      <PopUp
        isOpen={!!newData}
        data={newData}
        onClose={handleClosePopup}
        action={popUpAction}
      />
    </div>
    </motion.div>
  );
};

export default Notifications;
