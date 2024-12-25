import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TimeDistributionGraph = ({ data }) => {
  const [barData, setBarData] = useState();
  const [barOptions, setBarOptions] = useState();

  useEffect(() => {
    // Extract values and sort them to find the top 3
    const values = data.map((item) => Object.values(item)[0]);
    const sortedValues = [...values].sort((a, b) => b - a); // Sort in descending order
    const top3Values = sortedValues.slice(0, 3); // Get the top 3 values

    const backgroundColors = values.map((value) =>
      top3Values.includes(value) ? 'rgba(255, 0, 0, 0.6)' : 'rgba(0, 128, 0, 0.6)' // Red for top 3, green for others
    );

    const dataSetToFormat = {
      labels: data.map((item) => Object.keys(item)[0]),
      datasets: [
        {
          label: 'Visitors',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
        },
      ],
    };

    setBarData(dataSetToFormat);

    const barOptions = {
      responsive: true,
      maintainAspectRatio: false, // Ensures custom dimensions can be applied
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setBarOptions(barOptions);
  }, [data]);

  return (
    <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
      {barData && barOptions ? (
        <div className='w-[300px] h-[300px] sm:w-[1400px] sm:h-[400px]'> {/* Set custom width and height */}
          <Bar data={barData} options={barOptions} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TimeDistributionGraph;
