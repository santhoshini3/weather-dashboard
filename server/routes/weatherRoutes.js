const express = require('express');
const router = express.Router();
const { getWeather, getWeatherHistory, deleteWeatherEntry } = require('../controllers/weatherController');

router.post('/', getWeather);
router.get('/history', getWeatherHistory);
router.delete('/history/:id', deleteWeatherEntry); // DELETE route

module.exports = router;
