import React, { useEffect, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TrainerComponent from './trainerComponent';

const trainerData = [
  {
    id:1,
    name:"Trainer 1",
    age:25,
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbmJNrUvgzqwOmoTze_lNI33PM5bu3_tMdA&s",
    yoe:4,
    rating:4.5
  },
  {
    id:2,
    name:"Trainer 2",
    age:20,
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbmJNrUvgzqwOmoTze_lNI33PM5bu3_tMdA&s",
    yoe:10,
    rating:3
  },
  {
    id:3,
    name:"Trainer 3",
    age:18,
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbmJNrUvgzqwOmoTze_lNI33PM5bu3_tMdA&s",
    yoe:5,
    rating:4.2
  }
];

const Trainers = () => {

  const [trainers,setTrainers] = useState([]);
  const {id,nameOfGym} = useSelector((state)=>(state.gymDetails));
  const navigate = useNavigate();

  useEffect(()=>{
    setTrainers(trainerData);
  },[])
  

  return (
    <div className="font-cursive container mx-auto p-4 space-y-6">
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="border-2 border-red-500 flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-full w-12 h-12 mb-4 shadow-lg transition duration-200">
            <AiOutlineLeft className="h-6 w-6" /> {/* Back arrow icon inside the circular button */}
     </button>
      {/* Search Bar */}
      <div className="flex sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search trainers..."
            className="w-full sm:w-3/5 px-4 py-2 text-black border-2 border-red-500 rounded-md shadow-sm"
          />
      </div>
     {/* Gym List */}
     <div className="space-y-4">
        {trainers.map((trainer, index) => (
          <TrainerComponent 
            key={index} data={trainer}
          />
        ))}
      </div>
    </div>
    
  )
}

export default Trainers