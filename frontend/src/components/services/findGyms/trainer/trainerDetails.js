import React, { useState, useEffect } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddReviewModal from './addReviewModal';


const TrainerDetails = () => {

  const [trainerInfo, setTrainerInfo] = useState(null);
  const [trainerdata,setTrainerData] = useState({});
  const navigate = useNavigate();
  const {id,nameOfTrainer,age,yoe,imageLink,rating} = useSelector((state)=>(state.trainerDetails));
  const [showAddReviewModal, setShowAddReviewModal] = useState(false); // State for modal


  const toggleAddReviewModal = () => {
    setShowAddReviewModal(!showAddReviewModal);
  };

  const handleNavigate = (link) => {
    navigate(link);
  }

  useEffect(() => {
    // Manually setting values

    // console.log("nameOfgym "+nameOfGym);
    // console.log("imageLink "+imageLink);
    // console.log("locationLink "+locationLink);
    // console.log("rating "+rating);
    // console.log("lat "+lat);
    // console.log("lng "+lng);

    setTrainerData({
        id:id,
        nameOfTrainer:nameOfTrainer,
        age:age,
        yoe:yoe,
        imageLink:imageLink,
        rating:rating,
    })

    const data = {
      email: 'trainer@gmail.com',
      contactNumber: '+1234567890',
      pics: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKfXFIo-Qjd7VhrJ7LwB5BUX5BgQDcgpJ5A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsi95lJKfMaIYIlMG1tk-NwW7TkBNmhyNGQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNikLhhw3Di6c7SG2Bdp9y3ioa38OcJaI6_g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKfXFIo-Qjd7VhrJ7LwB5BUX5BgQDcgpJ5A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsi95lJKfMaIYIlMG1tk-NwW7TkBNmhyNGQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNikLhhw3Di6c7SG2Bdp9y3ioa38OcJaI6_g&s',
      ],
      availibility: [
        {start:"09:00",end:"13:00"},
        {start:"15:00",end:"19:00"},
        {start:"09:00",end:"13:00"},
        {start:"15:00",end:"19:00"}
      ],
      ratings: {
        avgRating: 4.5,
        reviews: [
          { email: 'a@gmail.com', rating: 3, message: 'Good trainerddddddddddddddddddddddddd' },
          { email: 'b@gmail.com', rating: 4, message: 'Good trainer' },
          { email: 'c@gmail.com', rating: 5, message: 'Excellent excellent dssssssssssssssssssssssssssssssssss!' },
        ],
      },
    };

    setTrainerInfo(data);
  }, [trainerdata.id]);

  if (!trainerInfo) return <div>Loading...</div>;

  const {
    email,
    contactNumber,
    availibility,
    pics,
    ratings
  } = trainerInfo;

  const getRatingStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? 'yellow' : 'gray'} />
      );
    }
    return stars;
  };

  return (
    <div className="font-cursive container mx-auto p-4 space-y-6">
        <button
            onClick={() => navigate(-1)} // Navigates to the previous page
            className="border-2 border-red-500 flex items-center justify-center text-red-500 bg-white hover:bg-red-200 rounded-full w-12 h-12 mb-4 shadow-lg transition duration-200">
                <AiOutlineLeft className="h-6 w-6" /> {/* Back arrow icon inside the circular button */}
        </button>
      {/* Gym Header */}
      <div className="flex items-center space-x-4">
        <img
          src={trainerdata.imageLink}
          alt={trainerdata.nameOfTrainer}
          className="w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] border-2 border-black object-cover rounded-full"
        />
        <div>
          <h1 className="text-red-500 ml-1 sm:ml-5 text-xl sm:text-2xl font-semibold">{trainerdata.nameOfTrainer}</h1>
        </div>
      </div>

      {/* Gym Information Card */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Email : </strong></p>
          <p className="text-red-500">{email}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Contact Number : </strong></p>
          <p className="text-red-500">{contactNumber}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Age : </strong></p>
          <p className="text-red-500">{age}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Years of experience :</strong></p>
          <p className="text-red-500">{yoe}</p>
        </div>
      </div>

      {/* Availibility Plans */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div 
          className="flex space-x-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
          }}>
          {trainerInfo.availibility.map((slot, index) => (
            <div
              key={index}
              className="flex item-center justify-center border-2 border-green-500 text-green-500 bg-white-100 p-2 rounded-full w-26 sm:w-48 flex-shrink-0 hover:bg-green-200"
            >
              <p className="text-[10px] sm:text-[15px] font-semibold">{slot.start} - {slot.end}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Images */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div 
          className="flex space-x-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
          }}>
          {pics.map((pic, index) => (
            <a
              key={index}
              href={pic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={pic}
                alt={`Trainer Pic ${index + 1}`}
                className="border-2 border-black w-[100px] h-[100px] sm:w-32 sm:h-32 object-cover rounded-lg"
              />
            </a>
          ))}
        </div>
      </div>


      {/* Ratings and Reviews */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div className="flex items-center space-x-2 mb-4 text-yellow-500">
            <span className='text-red-500 mr-2'> <u>Rating</u> : </span>
            {getRatingStars(ratings.avgRating)} 
            <span className="ml-6">({ratings.avgRating})</span>
        </div>

        <div 
          className="flex space-x-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
          }}>
          {ratings.reviews.map((review, index) => (
            <div
              key={index}
              className="border-2 border-red-500 bg-white text-black p-2 shadow-2xl rounded-lg w-64 flex-shrink-0"
            >
              <p className="text-red-500 font-semibold">{review.email}</p>
              <div className="my-2 flex text-yellow-500">
                {getRatingStars(review.rating)}
              </div>
              <div className='p-2 bg-red-200 border-[1px] border-black rounded-md break-words'>{review.message}</div>
            </div>
          ))}
        </div>

        <button 
            className="border-2 border-black bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
            onClick={toggleAddReviewModal}>
          Add Review
        </button>
      </div>

      {/* Render Modal */}
      {showAddReviewModal && (
        <AddReviewModal
          onClose={toggleAddReviewModal}
        />
      )}

    </div>
  );
}

export default TrainerDetails