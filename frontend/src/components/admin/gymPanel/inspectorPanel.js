import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import TableComponent from "../../common/table/tableComponent";
import ToastComponent from "../../common/toast/toastComponent"
import PopUp from "../../common/tablepopUp/popUp";
import {useDispatch, useSelector} from "react-redux"
import {motion} from "framer-motion";
import {setCurrentTab} from "../../common/redux/slice/currentTabSlice"

const InspectorPanel = () => {

  const {toastMessage,isToastVisible,isToastValidType} = useSelector((state)=> state.toast);
  const dispatch = useDispatch();
  
  const columns = [
    { key: "id", label: "Id", sortable: true,add:false,edit:false,view:false},
    { key: "name", label: "Name", sortable: true,add:true,edit:false,view:true },
    { key: "email", label: "Email", sortable: true,add:true,edit:false,view:true },
    { key: "joiningdate", label: "JoiningDate", sortable: true,add:false,edit:false,view:true },
    { key: "status", label: "Status", sortable: true,add:false,edit:true,view:true },
    { key: "view", label: "View", sortable: false,add:false,edit:true,view:true },
    { key: "edit", label: "Edit", sortable: false,add:false,edit:true,view:true },
  ];

  const InspectorData = [
    { id: 1, name: "Inspec1", email: "anikadh01@gmail.com", joiningdate: "11-12-2024",status:"Active" },
    { id: 2, name: "Inspec2", email: "sss@gmail.com",joiningdate: "14-12-2024",status:"Active"  },
    { id: 3, name: "Inspec3", email: "fffff@gmail.com",joiningdate: "13-12-2024",status:"Inactive" },
    ...Array(95)
      .fill()
      .map((_, index) => ({
        id: index + 4,
        name: `Message ${index + 4}`,
        email: "xxx@gmail.com",
        joiningdate: `25-12-2025`,
        status:"Active",
      })),
  ];

  const [newData,setNewData] = useState(null);
  const [popUpAction,setPopUpAction] = useState("");

  const handleOpenPopUp = () => {
    setNewData({
      Name: "",
      Email: "",
      Password: "",
      Status:"",
    });
    setPopUpAction("add");
  }

  const handleClosePopup = () => {
    setNewData(null);
  }

  useEffect(()=>{
    dispatch(setCurrentTab({currentTab:"Inspector"}));
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
            <FaPlusCircle className="mr-2" /> Add Inspector
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Inspector Data</h2>
        <TableComponent data={InspectorData} columns={columns}/>
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

export default InspectorPanel;
