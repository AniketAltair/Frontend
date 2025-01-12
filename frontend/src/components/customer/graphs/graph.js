import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialGraphData = {
  diet: {
    protein: Array.from({ length: 60 }, () => getRandomInt(0, 180)),
    carbs: Array.from({ length: 60 }, () => getRandomInt(0, 250)),
    fats: Array.from({ length: 60 }, () => getRandomInt(0, 100)),
    calories: Array.from({ length: 60 }, () => getRandomInt(0, 2500))
  },
  workout: {
    benchPress: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    latpullDown: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    bicepCurl: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    tricepPushDown: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    barbellSquats: { unit: 'kgs', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    threadmill: { unit: 's', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) },
    cycle: { unit: 's', data: Array.from({ length: 60 }, () => getRandomInt(0, 100)) }
  },
  sleep: Array.from({ length: 60 }, () => getRandomInt(0, 24))
};

const getLast60Days = () => {
  const dates = [];
  for (let i = 59; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-GB'));
  }
  return dates;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Graph = () => {
  const [activeTab, setActiveTab] = useState('Diet');
  const [selectedExercises, setSelectedExercises] = useState(['benchPress']); // Default first exercise
  const [selectedMacros, setSelectedMacros] = useState(['protein']); // Default macro
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usedColors, setUsedColors] = useState(new Set()); // Store used colors
  const [graphData,setGraphData] = useState(null);
  

  const dates = getLast60Days();

  const getRandomColor = (usedColors) => {
    return 'green';
  };

  // Dynamically generate colors for exercises based on selected ones
  const getExerciseColor = (exercise) => {
    return getRandomColor(usedColors);
  };

  const getGraphDataset = () => {
    const datasets = [];

    // Handling Diet Graph Data
    if (activeTab === 'Diet' && selectedMacros.length > 0) {
      const macroColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
      selectedMacros.forEach((macro, index) => {
        datasets.push({
          label: capitalizeFirstLetter(macro), // Capitalize first letter
          data: graphData.diet[macro],
          borderColor: macroColors[index % macroColors.length],
          fill: false,
        });
      });
    }

    // Handling Workout Graph Data
    if (activeTab === 'Workout' && selectedExercises.length > 0) {
      selectedExercises.forEach((exercise) => {
        const exerciseData = graphData.workout[exercise]?.data || []; // Extract exercise data
        datasets.push({
          label: `${capitalizeFirstLetter(exercise)} (${graphData.workout[exercise]?.unit || 'kg'})`, // Capitalize first letter
          data: exerciseData,
          borderColor: getExerciseColor(exercise), // Use unique color per exercise
          fill: false,
        });
      });
    }

    // Handling Sleep Graph Data
    if (activeTab === 'Sleep') {
      datasets.push({
        label: 'Sleep',
        data: graphData.sleep,
        borderColor: 'hsl(200, 70%, 50%)',
        fill: false,
      });
    }

    return datasets;
  };

  const chartData = {
    labels: dates,
    datasets: getGraphDataset(),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => {
            return `Date: ${tooltipItem[0].label}`; // Date displayed in tooltip title
          },
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            let value = dataset.data[index];
            let unit = '';
  
            // Add unit based on the active tab (Diet, Workout, Sleep)
            if (activeTab === 'Diet') {
              const macro = dataset.label.toLowerCase(); // Convert label to lowercase
              unit = macro === 'calories' ? ' kcals' : ' gms';
            } else if (activeTab === 'Workout') {
              unit = graphData.workout[dataset.label.split(' ')[0].toLowerCase()]?.unit || ' kgs'; // Extract unit from the label
            } else if (activeTab === 'Sleep') {
              unit = ' hrs';
            }
  
            return `${capitalizeFirstLetter(dataset.label)}: ${value}${unit}`; // Capitalize first letter
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        title: {
          display: false,
        },
        ticks: {
          display: false,
          autoSkip: false, // Auto skip labels if needed
          padding: 1, // Space between labels and the graph
          minRotation: 0, // Prevent label rotation
          maxRotation: 0, // Prevent label rotation
        },
        
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  

  const exercises = Object.keys(graphData.workout);
  const macros = Object.keys(graphData.diet);

  // Toggle exercise selection
  const toggleExerciseSelection = (exercise) => {
    setSelectedExercises([exercise]); // Only allow one exercise
    setIsModalOpen(false); // Close modal after selection
  };

  // Toggle macro selection
  const toggleMacroSelection = (macro) => {
    setSelectedMacros((prevSelected) =>
      prevSelected.includes(macro)
        ? prevSelected.filter((m) => m !== macro)
        : [...prevSelected, macro]
    );
  };

  useEffect(() => {
    // Default selections when component mounts

    // data get everytime when compoent loads, as bundle data can change, triggering data in graph
    // API to get graph data
    setGraphData(initialGraphData);
    console.log("graph component load");
    setSelectedMacros(['protein']);
    setSelectedExercises(['benchPress']);
  }, []);

  return (
    <div className="p-1 max-w-4xl mx-auto">
  <div className="flex justify-center gap-4 mb-2 mt-4">
    <button
      className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'Diet' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('Diet')}
    >
      Diet
    </button>
    <button
      className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'Workout' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('Workout')}
    >
      Workout
    </button>
    <button
      className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'Sleep' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('Sleep')}
    >
      Sleep
    </button>
  </div>

  <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
    {/* Scrollable container for the graph */}
    <div className="overflow-x-auto">
        <div className="w-full" style={{ minWidth: '500px', height: '300px' }}> {/* Adjust minWidth as per your data */} 
            <Line data={chartData} options={chartOptions} height={500} />
        </div>
    </div>
  </div>

  {activeTab === 'Diet' && (
    <div className="flex gap-1 mt-4">
      {macros.map((macro) => (
        <button
          key={macro}
          className={`px-4 py-2 rounded-lg font-medium ${selectedMacros.includes(macro) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => toggleMacroSelection(macro)}
        >
          {capitalizeFirstLetter(macro)} {/* Capitalize first letter */}
        </button>
      ))}
    </div>
  )}

  {activeTab === 'Workout' && (
    <div className="mt-4 text-center">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Select Exercise
      </button>
    </div>
  )}

  {isModalOpen && (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-2">
          {exercises.map((exercise) => (
            <li key={exercise}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${selectedExercises.includes(exercise) ? 'bg-blue-200' : ''}`}
                onClick={() => toggleExerciseSelection(exercise)}
                style={{
                  color: getExerciseColor(exercise),
                }}
              >
                {capitalizeFirstLetter(exercise)} {/* Capitalize first letter */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
</div>


  );
};

export default Graph;
