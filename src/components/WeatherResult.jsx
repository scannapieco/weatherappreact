import React, { useEffect, useState } from 'react';

const UNSPLASH_ACCESS_KEY = "tCGN8yPQV16fhzknyp0J9ljeH6mXkYIrBUZ4vDSwKgEq7NkxZWSjR6CL";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"; // Imagen genérica

const WeatherResult = ({ data }) => {
  const [cityImage, setCityImage] = useState(null);

  useEffect(() => {
    if (!data) return;
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(data.name + ' city')}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const json = await res.json();
        setCityImage(json.urls?.regular || FALLBACK_IMAGE);
      } catch (e) {
        setCityImage(FALLBACK_IMAGE);
      }
    };
    fetchImage();
  }, [data]);

  if (!data) return null;

  return (
    <div className="weather-card city-bg">
      {cityImage && (
        <img
          src={cityImage}
          alt={data.name}
          className="city-image"
        />
      )}
      <div className="weather-content">
        <h2 style={{ marginBottom: 12, textAlign: 'center' }}>
          {data.name}, {data.sys.country}
        </h2>
        <div className="weather-info" style={{ marginBottom: 18, justifyContent: 'center', alignItems: 'center', gap: 24 }}>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            style={{ width: 90, height: 90 }}
          />
          <div style={{ textAlign: 'left' }}>
            <p className="temperature" style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{Math.round(data.main.temp)}°C</p>
            <p className="description" style={{ margin: 0, fontSize: '1.1rem', textTransform: 'capitalize', color: '#f1c40f' }}>{data.weather[0].description}</p>
          </div>
        </div>
        <div className="weather-extra" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          marginTop: 18
        }}>
          <div style={{ textAlign: 'center' }}>
            <span role="img" aria-label="Sensación térmica" style={{ fontSize: '1.5rem' }}>🌡️</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{Math.round(data.main.feels_like)}°C</div>
            <div style={{ fontSize: '0.9rem', color: '#bbb' }}>Sensación</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span role="img" aria-label="Humedad" style={{ fontSize: '1.5rem' }}>💧</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.main.humidity}%</div>
            <div style={{ fontSize: '0.9rem', color: '#bbb' }}>Humedad</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span role="img" aria-label="Viento" style={{ fontSize: '1.5rem' }}>🌬️</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.wind.speed} m/s</div>
            <div style={{ fontSize: '0.9rem', color: '#bbb' }}>Viento</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;