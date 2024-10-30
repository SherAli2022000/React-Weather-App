import React from 'react';
import rainingCloud from '../../images/rainingCloud.png';


function formatDate(dateString) {
    if (!dateString) return 'time';
    const [date,time] = dateString.split('T');
    const [hour, min, sec]= time.split(':')
    return `${hour}`;
}

function TimeWeather({ data}) {
    console.log("time",data)
    return (
        <div className='weatherCard'>
            <div className='cardtime'>{data ? `${formatDate(data.timestamp_local)}:00`:'datetime'}</div>
            <div className='seperator' />
            <div className='weatherIcon'>
                <img className="weatherIconImage" src={data ? require(`../../images/icons/${data.weather.icon}.png`) : rainingCloud} alt="Weather Icon" />
            </div>
            <div className='cardtime'>{data ? `${data.temp}°C` : 'temp'}</div>
        </div>
    );
}

export default TimeWeather;
