import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const SendToComponent = ({value, setCurrentData, action}) => {
  // List of email options
  const initialOptions = [
    "example1@gmail.com",
    "example2@yahoo.com",
    "example3@hotmail.com",
    "example4@gmail.com",
    "example5@yahoo.com",
    "example6@hotmail.com",
    "example7@gmail.com",
    "example8@yahoo.com",
    "example9@hotmail.com",
    "example10@gmail.com",
  ];

  const [options, setOptions] = useState(initialOptions); // Dropdown options
  const [selectedEmails, setSelectedEmails] = useState([]); // Selected email list
  const [searchTerm, setSearchTerm] = useState(''); // Search input state
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  // Handle typing in search bar
  const handleSearch = (e) => {
    const value = e.target.value;
    // API call here to fetch all the top 10 as per value. (Apply debouncing if required).
    setSearchTerm(value);
    setShowDropdown(value.length > 0); // Show dropdown only when typing starts
  };

  const handleSetCurrentEmailList = (updatedEmails) => {
    setCurrentData((prev) => ({ ...prev, ["SendTo"]: updatedEmails }));
  };
  
  // Handle selection of an email
  const handleSelect = (email) => {
    const updatedEmails = [...selectedEmails, email];
    setSelectedEmails(updatedEmails);
    handleSetCurrentEmailList(updatedEmails);
    setOptions(options.filter((item) => item !== email));
    setSearchTerm(''); // Clear the search bar
    setShowDropdown(false); // Hide dropdown
  };
  
  // Remove an email from the selected list
  const handleRemove = (email) => {
    const updatedEmails = selectedEmails.filter((item) => item !== email);
    setSelectedEmails(updatedEmails);
    handleSetCurrentEmailList(updatedEmails);
    setOptions([...options, email]); // Add it back to options
  };

  // Filter options based on search term
  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    // In case of action view and edit, currentData will have sendTo ids
    // fetch email ids from those ids in order and show them here.
    // if sendTo = [0], meaning this message goes to all.
    // if sendTo = [0,1] meaning send to all gyms
    // if sendTo = [0,2] meaning send to all trainers
    // if sendTo = [0,3] meaning send to all customers

  },[])

  useEffect(()=>{
    console.log("email values : "+value);
    
  },[]);

  return (
    <div className="p-4 bg-white border-red-500 border-2 rounded-md">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(searchTerm.length > 0)} // Show dropdown if typing started
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click on options
          className="text-black w-full p-2 border-red-500 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Dropdown Options */}
        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white border-red-500 border-2 rounded-md shadow-md max-h-48 overflow-y-auto z-10">
            {filteredOptions.map((email, index) => (
              <li
                key={index}
                onClick={() => handleSelect(email)}
                className="p-2 cursor-pointer hover:bg-red-100"
              >
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Emails Display */}
      <div className="flex space-x-2 overflow-x-auto p-2 border-red-500 border-2 rounded-md bg-white">
        {selectedEmails.map((email, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-red-100 text-black border-red-500 border-2 px-3 py-1 rounded-full shadow"
          >
            <span className="text-sm font-medium">{email}</span>
            <button
              onClick={() => handleRemove(email)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        {selectedEmails.length === 0 && (
          <p className="text-black text-sm">No recipients added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SendToComponent;
