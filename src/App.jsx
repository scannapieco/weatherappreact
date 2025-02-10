import React, { useState } from 'react';
import Navbar from './components/NavBar';
import WeatherResult from './components/WeatherResult';
import Forecast from './components/Forecast';
import Map from './components/Map';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (city) => {
        const apiKey = '8491fb59c30439353114b714c1d42f80'; // Tu API Key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

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

    return (
        <div className="App">
            <Navbar
                city={weatherData ? weatherData.name : null}
                localTime={weatherData ? getLocalTime(weatherData.timezone) : null}
                onSearch={handleSearch}
            />
            {error && <p className="error">{error}</p>}
            {weatherData && <WeatherResult data={weatherData} />}
            {forecastData && <Forecast forecast={forecastData} />}
            {weatherData && weatherData.coord && (
                <Map lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
            )}
        </div>
    );
};

export default App;