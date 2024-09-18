// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');

    const apiKey = ''; // Replace with your actual API key

    const getWeather = async () => {
        try {
            // Fetch current weather
            const currentResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeatherData(currentResponse.data);

            // Fetch 5-day forecast
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            setForecastData(forecastResponse.data);
            setError('');
        } catch (err) {
            setError('City not found');
            setWeatherData(null);
            setForecastData(null);
        }
    };

    const getDailyForecast = () => {
        if (!forecastData) return [];

        const dailyForecast = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    temperature: item.main.temp,
                    condition: item.weather[0].description,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    icon: item.weather[0].icon, // Get the icon code
                };
            } else {
                // Average the temperature, humidity, and wind speed
                dailyForecast[date].temperature += item.main.temp;
                dailyForecast[date].humidity += item.main.humidity;
                dailyForecast[date].windSpeed += item.wind.speed;
            }
        });

        // Average values
        for (const date in dailyForecast) {
            dailyForecast[date].temperature = (dailyForecast[date].temperature / 8).toFixed(2);
            dailyForecast[date].humidity = (dailyForecast[date].humidity / 8).toFixed(2);
            dailyForecast[date].windSpeed = (dailyForecast[date].windSpeed / 8).toFixed(2);
        }

        return Object.entries(dailyForecast).slice(1, 5);
    };

    const dailyForecast = getDailyForecast();

    return (
        <div>
            <h1>Weather App</h1>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name"
            />
            <button onClick={getWeather}>Get Weather</button>
            
            {error && <p>{error}</p>}
            
            {weatherData && (
                <div>
                    <h2>Current Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                        alt={weatherData.weather[0].description} 
                    /> {/* Display current weather icon */}
                </div>
            )}

            {dailyForecast.length > 0 && (
                <div>
                    <h2>4-Day Forecast</h2>
                    <ul>
                        {dailyForecast.map(([date, data]) => (
                            <li key={date}>
                                <strong>{date}</strong>: 
                                Temperature: {data.temperature} °C, 
                                Condition: {data.condition}, 
                                Humidity: {data.humidity} %, 
                                Wind Speed: {data.windSpeed} m/s
                                <img 
                                    src={`https://openweathermap.org/img/wn/${data.icon}.png`} 
                                    alt={data.condition} 
                                /> {/* Display forecast icon */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Weather;
