import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setGymDetails} from '../../../common/redux/slice/gymDetailsSlice'

const GymComponent = ({ data }) => {

  const { id,name,img, locationLink, rating, plans,lat,lng } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Generate star ratings
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const handleViewGymDetails = () => {
    console.log("details");
    console.log(JSON.stringify(data));
    console.log("details over");
    dispatch(setGymDetails({id:id,nameOfGym:name,imageLink:img,locationLink:locationLink,rating:rating,plans:plans,lat:lat,lng:lng}));
    navigate("/findgyms/gymdetails");
  }

  return (
    <div 
      className="border-2 border-red-500 rounded-md shadow-2xl p-4"
      onClick={handleViewGymDetails}>
      <div className="flex items-start gap-4">
        {/* Gym Image */}
        <img
          src={img}
          alt={name}
          className="w-24 h-24 object-cover rounded-[50%] border-2 border-black"
        />

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          {/* Gym Name */}
          <h2 className="text-red-500 text-xl font-semibold">{name}</h2>

          {/* Location */}
          <a
            href={locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            view on map
          </a>

          {/* Plans */}
          <div className="mt-2">
            <div 
                className="flex gap-2 overflow-x-auto scrollbar-hide"
                style={{
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For Internet Explorer and Edge
                }}>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="px-2 text-black border-2 border-black bg-green-500 rounded-full text-sm whitespace-nowrap"
                >
                  {plan}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ratings */}
        <div className="flex items-center ml-[110px]">
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

export default GymComponent;
