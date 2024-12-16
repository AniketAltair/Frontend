import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import TableComponent from "../common/table/tableComponent";
import PopUp from "../common/tablepopUp/popUp";
import ToastComponent from "../common/toast/toastComponent";
import {useDispatch, useSelector} from "react-redux"
import {motion} from "framer-motion";
import {setCurrentTab} from "../common/redux/slice/currentTabSlice"

const Notifications = () => {

  const {toastMessage,isToastVisible,isToastValidType} = useSelector((state)=> state.toast);
  const dispatch = useDispatch();
  
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
    { id: 2,type: "Warning",message:"Hi there ! Planner is now included in Free Plan. Do try .",sendTo:[2,3,4,5]},
    { id: 3,type: "Marketing",message:"Hi there ! Planner is now included in Free Plan. Do try .",sendTo:[1,2,3,4,5]},
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
    <div className="font-cursive p-4 bg-gray-100 min-h-screen">
      <ToastComponent toastMessage={toastMessage} toastVisible={isToastVisible} istoastValidtype={isToastValidType}/>
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
