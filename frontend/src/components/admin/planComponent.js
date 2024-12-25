import React, { useState } from 'react';
import Modal from './planDetailsModal';  // Import the Modal component
import { useDispatch } from 'react-redux';
import {setIsLoading} from "../common/redux/slice/loadingSlice"

const PlanComponent = ({ 
  title, 
  cost, 
  validity,
  count, 
  features,
  featureDataSet
 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCost, setEditedCost] = useState(cost);
  const [editedValidity, setEditedValidity] = useState(validity);
  const [editedFeatures, setEditedFeatures] = useState(features);
  const [newFeature, setNewFeature] = useState('');
  const dispatch = useDispatch();

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle the feature removal
  const removeFeature = (feature) => {
    setEditedFeatures(editedFeatures.filter((f) => f !== feature));
  };

  // Handle adding new features
  const addFeature = () => {
    if (newFeature && !editedFeatures.includes(newFeature)) {
      setEditedFeatures([...editedFeatures, newFeature]);
      setNewFeature('');
    }
  };

  const handleSaveEdit = () => {
    if(editedCost==null || editedCost==""){
      setEditedCost(0);
    }
    if(editedValidity==null || editedValidity==""){
      setEditedValidity(0);
    }
    console.log('Cost:', editedCost);
    console.log('Validity:', editedValidity);
    console.log('Features:', editedFeatures);
    setIsEditing(false);

    handlePlanDataSave();
  };

  const handlePlanDataSave = () => {
    // API to send Data to backend
    
    dispatch(setIsLoading({isLoading:true}));
    setTimeout(()=>{
      dispatch(setIsLoading({isLoading:false}));
      window.location.reload();
    },2000)


  }

  return (
    <div className="max-w-sm w-full mx-auto my-6 bg-white shadow-xl border-2 border-red-600 rounded-lg p-6">
      {/* Card Header */}
      <div className="text-center text-2xl font-semibold text-red-500 mb-4">
        {title || 'Free Plan'}
      </div>

      {/* Cost and Validity Section in a Single Card */}
      <div className="border-2 border-red-500 bg-white shadow-2xl p-4 rounded-md mb-6">
        <div className="text-lg font-medium text-black mb-2">
          Cost:{' '}
          <span
            className="ml-9 font-bold text-red-600 animate-pulse inline-block transform scale-100 transition-transform duration-200 ease-in-out hover:scale-150"
          >
            {cost === 0 ? 'Free' : `₹ ${cost}`}
          </span>
        </div>
        <div className="text-lg font-medium text-black">
          Validity:{' '}
          <span
            className="ml-2 font-bold text-red-600 animate-pulse inline-block transform scale-100 transition-transform duration-200 ease-in-out hover:scale-150"
          >
            {validity === 0 ? 'Forever' : `${validity} days`}
          </span>
        </div>
      </div>

      {/* More Details Section */}
      <div
        onClick={toggleModal}
        className="text-center text-sm text-blue-600 cursor-pointer underline mb-4"
      >
        More Details
      </div>

      {/* Modal for More Details and Edit */}
      {isModalOpen && (
        <Modal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          toggleModal={toggleModal}
          editedCost={editedCost}
          setEditedCost={setEditedCost}
          editedValidity={editedValidity}
          setEditedValidity={setEditedValidity}
          editedFeatures={editedFeatures}
          setEditedFeatures={setEditedFeatures}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
          handleSaveEdit={handleSaveEdit}
          featureDataSet={featureDataSet}
        />
      )}
    </div>
  );
};

export default PlanComponent;
