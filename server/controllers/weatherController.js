const axios = require('axios');
const Weather = require('../models/weatherModel');

// Get current weather and save to DB
const getWeather = async (req, res) => {
  const { city } = req.body;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  console.log("🌆 City received:", city);
  console.log("🔑 API Key used:", API_KEY);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon, // added icon
      date: new Date()
    };

    // Save to MongoDB
    const savedWeather = new Weather(weatherData);
    await savedWeather.save();

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("❌ Error from OpenWeather API:", error.message);
    res.status(500).json({ message: "City not found or server error" });
  }
};

// Get last 10 weather searches
const getWeatherHistory = async (req, res) => {
  try {
    const history = await Weather.find().sort({ date: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    console.error("❌ Error fetching weather history:", error.message);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

// Delete a single weather history entry by ID
const deleteWeatherEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await Weather.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting entry:", error.message);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

module.exports = {
  getWeather,
  getWeatherHistory,
  deleteWeatherEntry,
};
