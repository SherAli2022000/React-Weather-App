import React from 'react';
import rainingCloud from '../../images/rainingCloud.png'; // Default icon or fallback icon

function formatDate(dateString) {
    if (!dateString) return 'date';
    const [year, month, day] = dateString.split('-');
    return `${day}`;
}

function getDayOfWeek(dateString) {
    if (!dateString) return 'day';
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
}

function NextDayWeather({ weatherData }) {

    return (
        <div className='nextDayWeatherInfo'>
            <div className='weatherIcon' style={{ height: '80%', width: '20%' }}>
                <img
                    className="weatherIconImage"
                    src={weatherData ? require(`../../images/icons/${weatherData.weather.icon}.png`) : rainingCloud}
                    alt="Weather Icon"
                />
            </div>
            <div className='weatherInfo'>
                <div className='weatherInfoRow'>
                    <div>{weatherData ? `${getDayOfWeek(weatherData.datetime)}, ${formatDate(weatherData.datetime)}` : 'date'}</div>
                    <div>{weatherData ? `${weatherData.high_temp}°C` : "temp"}</div>
                </div>

                <div className='weatherInfoRow'>
                    <div className='secondRow'>{weatherData ? weatherData.weather.description : "condition"}</div>
                    <div>{weatherData ? `${weatherData.low_temp}°C` : "temp"}</div>
                </div>
            </div>
        </div>
    );
}

export default NextDayWeather;
