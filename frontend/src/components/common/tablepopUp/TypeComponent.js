import React from 'react';

const TypeComponent = (key, value,currentData,setCurrentData, action) => {
  let selectedType = '';

  const handleChange = (event) => {
    selectedType = event.target.value;
    setCurrentData((prev)=>({...prev,[key]:event.target.value}));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
      <select
        id="type-select"
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
        <option value="Marketing">Marketing</option>
        <option value="Warning">Warning</option>
      </select>
    </div>
  );
};

export default TypeComponent;
