import React from 'react';

const Forecast = ({ forecast }) => {
  if (!forecast) return null;

  // Filtra solo un pronóstico por día (por ejemplo, el del mediodía)
  const daily = [];
  const seenDates = new Set();
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date) && item.dt_txt.includes('12:00:00')) {
      daily.push(item);
      seenDates.add(date);
    }
  });

  return (
    <div className="forecast">
      <h3>Pronóstico Extendido</h3>
      <div className="forecast-grid">
        {daily.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-card">
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {new Date(item.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p className="description">{item.weather[0].description}</p>
            <p>🌡️ <b>{Math.round(item.main.temp_max)}°C</b> / <span style={{ color: '#00bfff' }}>{Math.round(item.main.temp_min)}°C</span></p>
            <p>💧 {item.main.humidity}%</p>
            <p>🌬️ {item.wind.speed} m/s <span style={{ display: 'inline-block', transform: `rotate(${item.wind.deg}deg)` }}>🡺</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;