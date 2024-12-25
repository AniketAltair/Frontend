import React, { useState, useEffect } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FaStar,FaStarHalfAlt  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewEquipmentsModal from './viewEquipmentModal';
import AddReviewModal from './addReviewModal';
import TimeDistributionGraph from './timeDistributionGraph';

const GymDetails = () => {
  const [gymInfo, setGymInfo] = useState(null);
  const [gymdata,setGymData] = useState({});
  const navigate = useNavigate();
  const {id,nameOfGym,imageLink,locationLink,rating,plans,lat,lng} = useSelector((state)=>(state.gymDetails));
  const [showEquipmentsModal, setShowEquipmentsModal] = useState(false); // State for modal
  const [showAddReviewModal, setShowAddReviewModal] = useState(false); // State for modal

  const toggleEquipmentsModal = () => {
    setShowEquipmentsModal(!showEquipmentsModal);
  };

  const toggleAddReviewModal = () => {
    setShowAddReviewModal(!showAddReviewModal);
  };

  const handleNavigate = (link) => {
    navigate(link);
  }

  useEffect(() => {
    // Manually setting values

    console.log("nameOfgym "+nameOfGym);
    console.log("imageLink "+imageLink);
    console.log("locationLink "+locationLink);
    console.log("rating "+rating);
    console.log("lat "+lat);
    console.log("lng "+lng);

    setGymData({
        id:id,
        nameOfGym:nameOfGym,
        imageLink:imageLink,
        locationLink:locationLink,
        rating:rating,
        plans:plans,
        lat:lat,
        lng:lng
    })

    const data = {
      gymStatus: 'CLOSED', // 'OPEN', 'CLOSED', or 'TEMPORARILY CLOSED'
      ownerName: 'John Doe',
      email: 'johndoe@gmail.com',
      contactNumber: '+1234567890',
      operationalTime: {
        opening: '06:00',
        closing: '22:00',
      },
      address: '123 Fitness Street, Gym City, GCzzzzzzzzzzzzzzzzzzzzzzz',
      pics: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtItzYtdmYl0q3bdeSi7vlhrDQmDoVSDDMg&s',
      ],
      timeDistribution: [
        { '00:00': '0' },
        { '01:00': '0' },
        { '02:00': '0' },
        { '03:00': '0' },
        { '04:00': '0' },
        { '05:00': '0' },
        { '06:00': '5' },
        { '07:00': '5' },
        { '08:00': '6' },
        { '09:00': '12' },
        { '10:00': '12' },
        { '11:00': '3' },
        { '12:00': '2' },
        { '13:00': '0' },
        { '14:00': '0' },
        { '15:00': '0' },
        { '16:00': '1' },
        { '17:00': '3' },
        { '18:00': '20' },
        { '19:00': '25' },
        { '20:00': '30' },
        { '21:00': '27' },
        { '22:00': '10' },
        { '23:00': '2' },
      ],
      equipmentList: {
        CHEST: [
          {
            equipmentName: 'Bench Press',
            imageLink: 'https://img.freepik.com/premium-vector/bench-press-isometric_592324-1018.jpg',
          },
          {
            equipmentName: 'Pec Fly',
            imageLink: 'https://c8.alamy.com/comp/2XCDGPP/active-senior-man-in-sportswear-exercising-on-chest-press-machine-2XCDGPP.jpg',
          },
          {
            equipmentName: 'Dumbell Press',
            imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmI6eFoWXyL_9-5ML3ELawR1q82BRBSIVkw&s',
          },
          {
            equipmentName: 'Dumbell Press',
            imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmI6eFoWXyL_9-5ML3ELawR1q82BRBSIVkw&s',
          },
        ],
        BACK: [
          {
            equipmentName: 'Lat Pull Down',
            imageLink: 'https://c8.alamy.com/comp/2K1PXWH/vector-illustration-of-a-woman-doing-lat-pulldown-2K1PXWH.jpg',
          },
          {
            equipmentName: 'Reverse Pec Dec',
            imageLink: 'https://c8.alamy.com/comp/2K1PXWH/vector-illustration-of-a-woman-doing-lat-pulldown-2K1PXWH.jpg',
          },
          {
            equipmentName: 'Cable Pullover',
            imageLink: 'https://c8.alamy.com/comp/2K1PXWH/vector-illustration-of-a-woman-doing-lat-pulldown-2K1PXWH.jpg',
          },
        ],
        LEGS: [
          {
            equipmentName: 'Hack Squats',
            imageLink: 'https://media.istockphoto.com/id/964318598/vector/sporty-fitness-bodybuilder-athlete-instructor-teacher-woman-doing-exercise-squat-pose-example.jpg?s=612x612&w=0&k=20&c=SKxtQrlkhXjQkcJOX2UlPWtxQdIuQFKbbCnp4BW6Rpk=',
          },
          {
            equipmentName: 'Leg Press',
            imageLink: 'https://media.istockphoto.com/id/964318598/vector/sporty-fitness-bodybuilder-athlete-instructor-teacher-woman-doing-exercise-squat-pose-example.jpg?s=612x612&w=0&k=20&c=SKxtQrlkhXjQkcJOX2UlPWtxQdIuQFKbbCnp4BW6Rpk=',
          },
          {
            equipmentName: 'Squats',
            imageLink: 'https://media.istockphoto.com/id/964318598/vector/sporty-fitness-bodybuilder-athlete-instructor-teacher-woman-doing-exercise-squat-pose-example.jpg?s=612x612&w=0&k=20&c=SKxtQrlkhXjQkcJOX2UlPWtxQdIuQFKbbCnp4BW6Rpk=',
          },
        ],
        ARMS:[
          {
            equipmentName: 'preacher curl',
            imageLink: 'https://via.placeholder.com/150',
          },  
        ]
      },
      ratings: {
        avgRating: 3.5,
        reviews: [
          { email: 'a@gmail.com', rating: 3, message: 'Good gym sssssssssssssssssssssssssssssssss' },
          { email: 'b@gmail.com', rating: 4, message: 'Good gym' },
          { email: 'c@gmail.com', rating: 5, message: 'Excellent gymssssssssssssssssssssssssssssssssssssssssssssss!' },
        ],
      },
    };

    setGymInfo(data);
  }, [gymdata.id]);

  if (!gymInfo) return <div>Loading...</div>;

  const {
    gymStatus,
    ownerName,
    email,
    contactNumber,
    operationalTime,
    address,
    pics,
    timeDistribution,
    equipmentList,
    ratings,
  } = gymInfo;

  const getStatusClass = (status) => {
    return status === 'OPEN' ? 'bg-green-500' : 'bg-red-500';
  };

  const getRatingStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating); 
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStars;
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }
    if (halfStars) {
      stars.push(<FaStarHalfAlt key={fullStars + 1} color="gold" />);
    }
      for (let i = 1; i <= emptyStars; i++) {
      stars.push(<FaStar key={fullStars + halfStars + i} color="gray" />);
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
          src={gymdata.imageLink}
          alt={gymdata.nameOfGym}
          className="w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] border-2 border-black object-cover rounded-full"
        />
        <div>
          <div className="text-red-500 ml-1 sm:ml-5 text-xl sm:text-2xl font-semibold">{gymdata.nameOfGym}</div>
          <div
            className={`inline-block ml-[4px] sm:ml-[20px] mt-2 px-1 py-1 border-2 border-black text-[8px] w-sm:text-sm text-white rounded-full ${getStatusClass(
              gymStatus
            )}`}
          >
            {gymStatus}
          </div>
        </div>
      </div>

      {/* Gym Information Card */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Owner Name : </strong></p>
          <p className="text-red-500">{ownerName}</p>
        </div>
        
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Email : </strong></p>
          <p className="text-red-500">{email}</p>
        </div>
        
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Contact Number : </strong></p>
          <p className="text-red-500">{contactNumber}</p>
        </div>
        
        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Operational Time : </strong></p>
          <p className="text-red-500">
            <span className="text-green-500">{operationalTime.opening}</span> to{' '}
            <span className="text-green-500">{operationalTime.closing}</span>
          </p>
        </div>

        <div className="flex justify-between mb-2">
          <p className="text-red-500"><strong className="text-black">Location: </strong></p>
          <p>
            <a
              href={gymdata.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Map
            </a>
          </p>
        </div>
        
        <div className="text-black"><strong>Address:</strong></div>
        <div className="border-[1px] p-1 border-black text-red-500 rounded-md">{address}</div>
      </div>


      {/* Gym Images */}
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
                alt={`Gym Pic ${index + 1}`}
                className="border-2 border-black w-[100px] h-[100px] sm:w-32 sm:h-32 object-cover rounded-lg"
              />
            </a>
          ))}
        </div>
      </div>


      {/* Membership Plans */}
      <div className="border-2 border-red-500 bg-white p-4 shadow-2xl rounded-lg">
        <div 
          className="flex space-x-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
          }}>
          {gymdata.plans.map((plan, index) => (
            <div
              key={index}
              className="flex item-center justify-center border-2 border-green-500 text-green-500 bg-white-100 p-2 rounded-full w-26 sm:w-48 flex-shrink-0 hover:bg-green-200"
            >
              <p className="text-[10px] sm:text-[15px] font-semibold">{plan}</p>
            </div>
          ))}
        </div>
      </div>

      <TimeDistributionGraph data={timeDistribution}/>

      {/* View Equipments and Trainers */}
      <div className="flex justify-center space-x-[50px] sm:space-x-[200px] ">
        <button 
            className="text-[12px] sm:text-[15px] border-2 border-green-500 bg-white-500 text-green-500 py-2 px-2 rounded-lg w-[120px] sm:w-[200px] hover:bg-green-200"
            onClick={toggleEquipmentsModal}>
          View Equipments
        </button>
        <button 
            className="text-[12px] sm:text-[15px] border-2 border-green-500 bg-white-500 text-green-500 py-2 px-2 rounded-lg w-[120px] sm:w-[200px] hover:bg-green-200"
            onClick={() => handleNavigate("/findgyms/trainers")}>
          View Trainers
        </button>
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
       {showEquipmentsModal && (
        <ViewEquipmentsModal
          equipmentList={gymInfo.equipmentList}
          onClose={toggleEquipmentsModal}
        />
      )}
      {/* Render Modal */}
      {showAddReviewModal && (
        <AddReviewModal
          onClose={toggleAddReviewModal}
        />
      )}

    </div>
  );
};

export default GymDetails;
