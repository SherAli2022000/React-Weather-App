import React, { useState, useEffect } from 'react';
import '../../App.css';

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to add "st", "nd", "rd", "th" suffix to day
  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  // Format the date as "10th October 2024"
  const formattedDate = `${getDayWithSuffix(currentTime.getDate())} ${currentTime.toLocaleString('default', { month: 'long' })} ${currentTime.getFullYear()}`;
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <span className='dateTime'>
     {formattedDate} | {formattedTime}
    </span>
  );
};

export default CurrentDateTime;
