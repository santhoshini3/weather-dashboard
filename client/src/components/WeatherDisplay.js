import React from 'react';
import './WeatherDisplay.css'; // optional: for advanced styling if needed

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <div className="weather-display enhanced-display">
      <div className="weather-header">
        <h2>{weather.city}</h2>
        <img src={iconUrl} alt="Weather icon" className="weather-icon" />
      </div>
      <div className="weather-details">
        <p><strong>🌡️ Temperature:</strong> {weather.temperature}°C</p>
        <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
        <p><strong>🌬️ Wind Speed:</strong> {weather.wind} m/s</p>
        <p><strong>📅 Date:</strong> {new Date(weather.date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
