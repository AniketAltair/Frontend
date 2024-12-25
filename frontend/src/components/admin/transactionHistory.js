import React from "react";
import TableComponent from "../common/table/tableComponent";
import {motion} from "framer-motion";
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const TransactionHistoryComponent = () => {

  const navigate = useNavigate();

  const columns = [
    { key: "id", label: "Id", sortable: true,add:false,edit:false,view:false},
    { key: "userEmail", label: "User Email", sortable: true,add:true,edit:false,view:true },
    { key: "planName", label: "PlanName", sortable: true,add:true,edit:false,view:true },
    { key: "paymentMethod", label: "PaymentMethod", sortable: true,add:true,edit:false,view:true },
    { key: "amount", label: "Amount", sortable: true,add:false,edit:true,view:true },
    { key: "transactionNumber", label: "Transaction Number", sortable: true,add:false,edit:false,view:true },
    { key: "timestamp", label: "TimeStamp", sortable: true,add:true,edit:false,view:true }
  ];

  const transactionHistoryData = [
    { id: 1, userEmail: "a@gmail.com", planName: "Short Plan", paymentMethod: "PhonePe", amount: "100", transactionNumber: "zadkbekb13114sbcdsfdwfefefw", timestamp: "20-12-2025 15:00:00"},
    { id: 2, userEmail: "b@gmail.com", planName: "Long Plan", paymentMethod: "GooglePay", amount: "1000", transactionNumber: "zadkbekb131dfdcdsfdwfefefw", timestamp: "20-12-2024 16:00:00"},
    { id: 1, userEmail: "c@gmail.com", planName: "Short Plan", paymentMethod: "PhonePe", amount: "100", transactionNumber: "dddddqdgeghhhrhthrhrhrhrh", timestamp: "20-11-2024 17:00:00"},
    ...Array(35)
      .fill()
      .map((_, index) => ({
        id: index + 4,
        userEmail: "x@gmail.com",
        planName: "Short Plan",
        paymentMethod: "PhonePe",
        amount: "100",
        transactionNumber: "lnlkdueghrwebdkwbdkd",
        timestamp: "20-10-2024 18:00:00"
      })),
  ];

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
    <div className="font-cursive p-4 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="border-2 border-red-500 flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-full w-12 h-12 mb-4 shadow-lg transition duration-200"
      >
        <AiOutlineLeft className="h-6 w-6" /> {/* Back arrow icon inside the circular button */}
      </button>
      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History Data</h2>
        <TableComponent data={transactionHistoryData} columns={columns}/>
      </div>
    </div>
    </motion.div>
  );
};

export default TransactionHistoryComponent;
