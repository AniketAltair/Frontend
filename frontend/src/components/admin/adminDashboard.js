import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {motion} from "framer-motion";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register required chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {

   const lineGraphData = {
    labels: [
      "01-12-2024",
      "02-12-2024",
      "03-12-2024",
      "04-12-2024",
      "05-12-2024",
      "06-12-2024",
      "07-12-2024",
      "08-12-2024",
      "09-12-2024",
      "10-12-2024",
      "11-12-2024",
      "12-12-2024",
    ],
    datasets: [
      {
        label: "Total Users",
        data: [50, 56, 60, 70, 75, 82, 90, 95, 101, 102, 115, 120],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Active Users",
        data: [0, 0, 2, 7, 7, 8, 9, 9, 9, 15, 17, 20],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Paid Users",
        data: [0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 5, 5],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const pieChartDataActive = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        label: "User Distribution",
        data: [20, 100],
        backgroundColor: ["rgb(34, 197, 94)", "rgb(244, 63, 94)"], 
        hoverBackgroundColor: ["rgba(16, 185, 129, 0.8)", "rgba(249, 115, 115, 0.8)"], 
        borderWidth: 1,
      },
    ],
  };

  const pieChartDataPaid = {
    labels: ["Premium Users", "Free Users"],
    datasets: [
      {
        label: "User Distribution",
        data: [5, 115],
        backgroundColor: ["rgb(34, 197, 94)", "rgb(244, 63, 94)"], 
        hoverBackgroundColor: ["rgba(16, 185, 129, 0.8)", "rgba(249, 115, 115, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  const lineGraphOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize according to the container's size
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users vs Day Number",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    elements: {
      arc: {
        // Adding shadow effect for each pie segment
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowColor: "black", // Subtle shadow color
  
        // Adding border style
        borderWidth: 10,
        borderColor: "black", // White border color for 
        offset:20
      },
    },
    animation: {
      animateRotate: true, // Optional: Enables rotation animation
    },
  };
  

  const [pieChartData,setPieChartData] = useState(pieChartDataActive);

  const handlePieChartData = (data) => {
    setPieChartData(data);
  }
 

  

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
    <div className="font-cursive p-6 bg-gray-100 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total users", value: 120 },
          { title: "Active users", value: 20 },
          { title: "Paid users", value: 5 },
          { title: "Avg. time spent", value: "150 s" },
        ].map((card, index) => (
          <div
            key={index}
            className="border-2 border-red-500 bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-black">{card.title}</h3>
            <p className="text-2xl font-bold text-red-500 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line Graph */}
        <div className="border-2 border-red-500 col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4">
            Users Trends
          </h3>
          <div className="w-full h-[300px] sm:h-[400px]"> {/* Set the chart container to take full width */}
            <Line data={lineGraphData} options={lineGraphOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div 
          className="border-2 border-red-500 bg-white shadow-lg rounded-lg p-6 w-[265px] sm:w-full"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 20px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Active vs Paid Users
          </h3>
          <Pie data={pieChartData} options={pieChartOptions} />
          <div className="flex justify-center space-x-4 mt-5">
            <button 
              className="px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
              onClick={()=>handlePieChartData(pieChartDataActive)}
            >
              Active
            </button>
            <button 
              className="px-2 py-2 bg-white text-green-500 border-2 border-green-500 rounded hover:bg-green-500 hover:text-white"
              onClick={()=>handlePieChartData(pieChartDataPaid)}
            >
              Paid
            </button>
          </div>
        </div>

      </div>
    </div>
    </motion.div>
  );
};

export default AdminDashboard;
