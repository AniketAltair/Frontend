import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setTrainerDetails} from '../../../common/redux/slice/trainerDetailsSlice'

const   TrainerComponent = ({ data }) => {

  const { id ,name,age,yoe,img, rating} = data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Generate star ratings
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const handleViewTrainerDetails = () => {
    console.log("details");
    console.log(JSON.stringify(data));
    console.log("details over");
    dispatch(setTrainerDetails({id:id,nameOfTrainer:name,age:age,yoe:yoe,imageLink:img,rating:rating}));
    navigate("/findgyms/trainerdetails");
  }

  return (
    <div 
      className="border-2 border-red-500 rounded-md shadow-2xl p-4"
      onClick={handleViewTrainerDetails}>
      <div className="flex items-start gap-4">
        {/* Trainer Image */}
        <img
          src={img}
          alt={name}
          className="w-20 h-20 object-cover rounded-[50%] border-2 border-black"
        />

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          {/* Gym Name */}
          <h2 className="text-red-500 text-xl font-semibold">{name}</h2>

          <div className='text-black flex justify-between'>  
            <strong>Age : </strong> <span className='text-green-500'>{age}</span>
          </div>

          <div className='text-black flex justify-between'>  
            <strong>Years of Experience : </strong><span className='text-green-500'>{yoe}</span>
          </div>

        </div>
      </div>

      

      {/* Ratings */}
        <div className="flex items-center ml-[95px]">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
            <AiFillStar key={i} className="text-yellow-500" />
        ))}

        {/* Half Star */}
        {halfStar && (
            <span className="relative">
            <AiFillStar className="text-yellow-500" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            <AiOutlineStar className="absolute top-0 left-0 text-yellow-500" />
            </span>
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
            <AiOutlineStar key={i} className="text-gray-300" />
        ))}
        </div>
    </div>
  );
};

export default TrainerComponent;
