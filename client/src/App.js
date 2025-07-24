import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import History from './components/History';
import './App.css';


const App = () => {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const fetchWeather = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/api/weather', { city });
      setWeather(response.data);
      fetchHistory(); // refresh history after new search
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      alert('Failed to fetch weather. Check server or API.');
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/weather/history');
      setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/weather/history/${id}`);
      fetchHistory(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting entry:', error.message);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const updated = !prev;
      localStorage.setItem('darkMode', updated);
      return updated;
    });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* ✅ Toggle at top-right */}
      <div className="toggle-container">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />{' '}
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </label>
      </div>
      <h1>🌦️ Weather Dashboard</h1>
      <WeatherForm onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} />
      <History history={history} onDelete={handleDelete} />
    </div>
  );
};

export default App;
