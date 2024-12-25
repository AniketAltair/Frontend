import React, { useState, useEffect } from 'react';

const TypeComponent = ({value,action,setCurrentData}) => {
  const [selectedType, setSelectedType] = useState(value);
  const [typesData,setTypesData] = useState([]);

  const handleGetTypes = () => {
    //API to get types from backend
    const data = ["Marketing","Warning","Offer"];
    return data;
  }

  useEffect(() => {

    const data = handleGetTypes();
    setTypesData(data);

    if(action==="add"){
      setCurrentData((prev) => ((data.length==0)?{ ...prev, "Type": '' }:{ ...prev, "Type": data[0] }));
    }

    
  }, [setCurrentData]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedType(value); // Update local state
    setCurrentData((prev) => ({ ...prev, "Type": value })); // Update parent state
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px', marginTop: '10px'}}>
      <select
        id="type-select"
        value={selectedType} 
        onChange={handleChange}
        style={{
          padding: '2px',
          fontSize: '15px',
          borderRadius: '5px',
          border: '1px solid #8B0000', // Red-500 border
          color: '#8B0000', // Red-500 text
          backgroundColor: '#ffffff', // White background
          cursor: 'pointer',
          marginLeft: '5px', // Fixed margin
        }}
      >
        {typesData.map((item)=>(
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeComponent;
