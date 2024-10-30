import React from 'react'
import '../../App.css';
import TimeWeather from '../timeWeather/TimeWeather';

function CurrentDayWeather({ weatherData, currentWeatherData }) {
  return (
    <div className='CurrentDayInfo'>
      <div className='condition'> {weatherData.length > 0 ? `${weatherData[0].weather.description}` : 'Heavy Rain'}</div>
      <div className='seperator' />
      <div className='timeBasedWeather'>
        {currentWeatherData.map((item, index) => (
          <TimeWeather key={index} data={item} />
        ))}
       

      </div>

    </div>
  )
}

export default CurrentDayWeather