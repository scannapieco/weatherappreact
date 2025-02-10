import React from 'react';

const WeatherResult = ({ data }) => {
    if (!data) return null;

    const { name, main, weather } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const icon = weather[0].icon;

    return (
        <div className="weather-card">
            <h2>{name}</h2>
            <div className="weather-info">
                <img
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={weatherDescription}
                />
                <p className="temperature">{temperature}°C</p>
            </div>
            <p className="description">{weatherDescription}</p>
        </div>
    );
};

export default WeatherResult;