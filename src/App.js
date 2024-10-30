import './App.css';
import heavyRain from './images/heavyRain.jpg';
import fog from './images/fog.jpg';
import thunder from './images/thunder.jpg';
import sunny from './images/sunny.jpg';
import snow from './images/snow.jpg';

import CurrentDateTime from './components/currentTime/currentTime.jsx';
import CurrentDayWeather from './components/currentDayWeather/CurrentDayWeather.jsx';

import windIcon from '../src/images/wind.png';
import NextDayWeather from './components/nextDayWeather/NextDayWeather.jsx';
import React, { useState, useEffect } from 'react';




function App() {

  const [weatherData, setWeatherData] = useState([]);

  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  
  const [backgroundImageUrl, setBackgroundImage] = useState(heavyRain);
  

  const thunderstormList = [
    "Thunderstorm with light rain",
    "Thunderstorm with rain",
    "Thunderstorm with heavy rain",
    "Thunderstorm with light drizzle",
    "Thunderstorm with drizzle",
    "Thunderstorm with heavy drizzle",
    "Thunderstorm with Hail"
  ]

  const rainList = [
    "Light Drizzle",
    "Drizzle",
    "Heavy Drizzle",
    "Light Rain",
    "Moderate Rain",
    "Heavy Rain",
    "Freezing rain",
    "Light shower rain",
    "Shower rain",
    "Heavy shower rain"
  ]

  const fogList = [
    "Mist",
    "Smoke",
    "Haze",
    "Sand/dust",
    "Fog",
    "Freezing Fog"
  ]

  const sunnyList = [
    "Clear sky",
    "Few clouds",
    "Scattered clouds",
    "Broken clouds",
    "Overcast clouds"
  ]

  const snowList = [
    "Light snow",
    "Snow",
    "Heavy Snow",
    "Mix snow/rain",
    "Sleet",
    "Heavy sleet",
    "Snow shower",
    "Heavy snow shower",
    "Flurries"
  ]



  useEffect(() => {

    const checkWeatherDescription = (description) => {
      if (thunderstormList.includes(description)) {
        setBackgroundImage(thunder);
      } else if (rainList.includes(description)) {
        setBackgroundImage(heavyRain);
      } else if (fogList.includes(description)) {
        setBackgroundImage(fog);
      } else if (sunnyList.includes(description)) {
        setBackgroundImage(sunny);
      } else if (snowList.includes(description)) {
        setBackgroundImage(snow)
      } else {
        console.log("Description not categorized.");
      }
    };


    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?days=6&city=Islamabad,PK&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data.data);
        checkWeatherDescription(data.data[0].weather.description);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchCurrentWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/hourly?city=Islamabad,PK&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&hours=14`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentWeatherData(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };



    fetchWeatherData();
    fetchCurrentWeatherData();
  }, []);


  return (
    <div
      className='weatherApp'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${backgroundImageUrl})`,
      }}
    >
      <div className='page'>
        <div className='currentDayWeather'>
          <CurrentDateTime />
          <CurrentDayWeather weatherData={weatherData} currentWeatherData={currentWeatherData} />
        </div>
        <div className='futureDayWeather'>
          <div className='currentTemperature'>
            {weatherData.length > 0 ? `${weatherData[0].temp}°C` : '19°C'}
          </div>
          <div className='windDirection'>
            <img className="windIconImage" src={windIcon} alt="Wind Icon" />
            {weatherData.length > 0 ? (
              <span className="windText">
                {weatherData[0].wind_cdir_full}, {weatherData[0].wind_spd} km/h
              </span>
            ) : 'Loading...'}
          </div>
          <div className='seperator ' />

          <div className='nextDaysText'>The Next Days Forcast</div>
          <div className='nextDaysButtonsRow'>
            <div className='nextDaysButton'>
              5 Days
            </div>
          </div>

          <div className='daysWeather'>
            <NextDayWeather weatherData={weatherData[1]} />
            <NextDayWeather weatherData={weatherData[2]} />
            <NextDayWeather weatherData={weatherData[3]} />
            <NextDayWeather weatherData={weatherData[4]} />
            <NextDayWeather weatherData={weatherData[5]} />

          </div>


        </div>


      </div>
    </div>
  );
}

export default App;
