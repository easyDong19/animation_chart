import React, { useState } from 'react';

const Slider = ({ changeSpeed }: { changeSpeed: (speed: number) => void }) => {
  const [value, setValue] = useState(40); // 기본값

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    changeSpeed(newValue); // 부모 컴포넌트에 값 전달
  };

  return (
    <div className='slider-container'>
      <input
        id='slider'
        type='range'
        min='20'
        max='60'
        value={value}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, #64748B 0%, #64748B ${
            ((value - 20) / 40) * 100
          }%, #E2E8F0 ${((value - 20) / 40) * 100}%, #E2E8F0 100%)`,
        }}
        className='slider'
      />
      <div className='slider-labels'>
        <span>Fast</span>
        <span>Slow</span>
      </div>
      <style>
        {`
          .slider-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 20px;
          }
          .slider {
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            border-radius: 3px;
            outline: none;
          }
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            background: #64748B;
            cursor: pointer;
            position: relative;
            z-index: 2;
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #64748B;
            border: 3px solid white;
            cursor: pointer;
            position: relative;
            z-index: 2;
          }
          .slider-labels {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
          }
          .slider-labels span {
            color: #94A3B8;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
