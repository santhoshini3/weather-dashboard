import React, { useState } from 'react';
import weatherImg from '../assets/weather-illustration.png'; // adjust path if needed

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity('');
  };

  return (
    <div className="weather-form-container">
      <img
        src={weatherImg}
        alt="Weather illustration"
        className="weather-hero"
      />

      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default WeatherForm;
