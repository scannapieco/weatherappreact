import React, { useEffect, useState } from 'react';

const CITIES = [
  { name: 'Buenos Aires', country: 'AR' },
  { name: 'Madrid', country: 'ES' },
  { name: 'New York', country: 'US' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'Rio de Janeiro', country: 'BR', display: 'Río de Janeiro' },
  { name: 'Mexico City', country: 'MX', display: 'Ciudad de México' },
  { name: 'London', country: 'GB', display: 'Londres' },
  { name: 'Oslo', country: 'NO' },
  { name: 'Rome', country: 'IT', display: 'Roma' },
  { name: 'Cairo', country: 'EG', display: 'El Cairo' }
];

const apiKey = '8491fb59c30439353114b714c1d42f80';

function MainCitiesWeather({ onCityClick }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all(
      CITIES.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&units=metric&lang=es`)
          .then(res => res.json())
      )
    ).then(setData);
  }, []);

  return (
    <div className="main-cities-weather">
      <h2>CIUDADES PRINCIPALES</h2>
      <div className="main-cities-list">
        {data.map((city, idx) => (
          <div
            className="main-city-card"
            key={idx}
            style={{ cursor: 'pointer' }}
            onClick={() => onCityClick && onCityClick(CITIES[idx].name)}
            title="Ver información de la ciudad"
          >
            <h3>{CITIES[idx].display || city.name}</h3>
            {city.weather && (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  alt={city.weather[0].description}
                  width={64}
                  height={64}
                />
                <div>{Math.round(city.main.temp)}°C</div>
                <div className="main-city-desc">{city.weather[0].description}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainCitiesWeather;