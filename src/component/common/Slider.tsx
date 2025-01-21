import React from 'react';

const Slider = ({ changeSpeed }: { changeSpeed: (speed: number) => void }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSpeed(Number(e.target.value));
  };

  return (
    <div style={{ width: '300px', margin: '20px auto', textAlign: 'center' }}>
      <label
        htmlFor='slider'
        style={{ display: 'block', marginBottom: '10px' }}
      ></label>
      <input
        id='slider'
        type='range'
        min='20'
        max='60'
        onChange={handleChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Slider;
