import React from 'react';

const Forecast = ({ forecast }) => {
    if (!forecast) return null;

    return (
        <div className="forecast">
            <h3>Pronóstico Extendido</h3>
            <div className="forecast-grid">
                {forecast.list.slice(0, 5).map((item, index) => (
                    <div key={index} className="forecast-card">
                        <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                        />
                        <p>{item.weather[0].description}</p>
                        <p>🌡️ Máx: {item.main.temp_max}°C</p>
                        <p>🌡️ Mín: {item.main.temp_min}°C</p>
                        <p>🌬️ Viento: {item.wind.speed} m/s</p>
                        <p>🧭 Dirección: {item.wind.deg}°</p>
                        <p>☀️ UV: {item.uvi || 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;