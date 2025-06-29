import MainCitiesWeather from './components/MainCitiesWeather';
import React, { useState } from 'react';
import Navbar from './components/NavBar';
import WeatherResult from './components/WeatherResult';
import Forecast from './components/Forecast';
import Map from './components/Map';
import './App.css';

// SVG según día/noche
function WeatherSVG({ isDay }) {
  if (isDay === null) return null;
  if (isDay) {
    // Sol animado
    return (
      <div className="svg-bg">
        <svg width="100%" height="180" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="sun" cx="200" cy="90" r="50" fill="#ffe259" opacity="0.8"/>
        </svg>
      </div>
    );
  } else {
    // Luna y estrellas animadas
    return (
      <div className="svg-bg">
        <svg width="100%" height="180" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="moon" cx="200" cy="90" r="40" fill="#fffde4" opacity="0.7"/>
          <circle className="star" cx="300" cy="50" r="2" fill="#fff" />
          <circle className="star" cx="350" cy="70" r="1.5" fill="#fff" />
          <circle className="star" cx="400" cy="40" r="1.8" fill="#fff" />
        </svg>
      </div>
    );
  }
}

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    const apiKey = '8491fb59c30439353114b714c1d42f80';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    setLoading(true);
    setError(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl).then((res) => {
          if (!res.ok) throw new Error('Error en la solicitud del clima');
          return res.json();
        }),
        fetch(forecastUrl).then((res) => {
          if (!res.ok) throw new Error('Error en la solicitud del pronóstico');
          return res.json();
        }),
      ]);

      if (weatherResponse.cod === '404' || forecastResponse.cod === '404') {
        setError('Ciudad no encontrada. Intenta de nuevo.');
        setWeatherData(null);
        setForecastData(null);
      } else {
        setError(null);
        setWeatherData(weatherResponse);
        setForecastData(forecastResponse);
      }
    } catch (error) {
      setError('Error al obtener los datos del clima. Intenta de nuevo.');
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el horario local
  const getLocalTime = (timezone) => {
    const now = new Date();
    const localTime = new Date(now.getTime() + timezone * 1000);
    return localTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleGoHome = () => {
    setWeatherData(null);
    setForecastData(null);
    setError(null);
  };

  // Determina si es de día o de noche en la ciudad buscada
  let isDay = null;
  if (weatherData && weatherData.sys) {
    const nowUTC = Math.floor(Date.now() / 1000);
    const localTime = nowUTC + weatherData.timezone;
    const hour = new Date(localTime * 1000).getUTCHours();
    isDay = hour >= 6 && hour < 19;
  }

  return (
    <div className="App">
      {/* SVG animado según día/noche */}
      <WeatherSVG isDay={isDay} />

      <Navbar
        city={weatherData ? weatherData.name : null}
        localTime={weatherData ? getLocalTime(weatherData.timezone) : null}
        onSearch={handleSearch}
        onTitleClick={handleGoHome}
      />

      {/* Mostrar ciudades principales solo si no hay clima buscado */}
      {!weatherData && !loading && !error && (
        <MainCitiesWeather onCityClick={handleSearch} />
      )}

      {loading && (
        <div className="weather-loader">
          <svg
            className="loader-sun"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            style={{ cursor: 'pointer' }}
            onClick={handleGoHome}
            title="Volver a la página principal"
          >
            <circle cx="32" cy="32" r="16" fill="#ffe259" />
            <g stroke="#ffe259" strokeWidth="3">
              <line x1="32" y1="4"x2={"32"} y2="18"/>
              <line x1="32" y1="46" x2="32" y2="60"/>
              <line x1="4" y1="32" x2="18" y2="32"/>
              <line x1="46" y1="32" x2="60" y2="32"/>
              <line x1="12" y1="12" x2="22" y2="22"/>
              <line x1="52" y1="12" x2="42" y2="22"/>
              <line x1="12" y1="52" x2="22" y2="42"/>
              <line x1="52" y1="52" x2="42" y2="42"/>
            </g>
          </svg>
          <div style={{color:'#ffe259', marginTop:8}}>Cargando clima...</div>
          <div style={{fontSize: '0.9rem', color:'#fff', marginTop:4}}>Haz click en el sol para volver</div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherResult data={weatherData} />}
      {forecastData && <Forecast forecast={forecastData} />}
      {weatherData && weatherData.coord && (
        <Map lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
      )}
        {/* Footer con enlaces a GitHub y LinkedIn */}
      <footer className="footer">
        <span>
          Hecho por Diego Garcia &nbsp;|&nbsp;
          <a href="https://github.com/scannapieco" target="_blank" rel="noopener noreferrer">GitHub</a>
          &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/diegogarciascannapieco/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </span>
      </footer>
    </div>
    
  );
};

export default App;