const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cron = require("node-cron");
//require("dotenv").config();

const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose
  .connect("mongodb://localhost:27017/weather_db")
  .then(async () => {
    console.log("MongoDB Connected");
    // to cleadn db after every restart of server
    // await Weather.deleteMany({});
    // console.log("Weather collection cleared");
  })
  .catch((err) => console.log(err));

// Updated Weather Schema to include windSpeed and humidity
const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  feels_like: Number,
  condition: String,
  windSpeed: Number, // Added windSpeed
  humidity: Number, // Added humidity
  timestamp: Number,
  date: String,
});

const Weather = mongoose.model("Weather", WeatherSchema);

// Function to fetch weather data
const getWeatherData = async (city) => {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    const { main, weather, wind, dt } = response.data; // Include wind data
    const temperature = main.temp - 273.15; // Convert Kelvin to Celsius
    const feelsLike = main.feels_like - 273.15;
    const condition = weather[0].main;
    const timestamp = dt;
    const date = new Date(timestamp * 1000).toLocaleDateString();
    const time = new Date(timestamp * 1000).toLocaleTimeString(); // Get current time
    const windSpeed = wind.speed; // Get wind speed
    const humidity = main.humidity; // Get humidity

    return {
      city,
      temperature,
      feels_like: feelsLike,
      condition,
      windSpeed, // Include wind speed in the returned data
      humidity, // Include humidity in the returned data
      timestamp,
      date,
      time,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Fetch latest weather data and calculate aggregates
app.get("/api/weather", async (req, res) => {
  try {
    const latestWeatherData = await Weather.find().sort({ timestamp: -1 });
    const uniqueCities = [
      ...new Set(latestWeatherData.map((data) => data.city)),
    ];

    const aggregatedData = uniqueCities.map((city) => {
      const cityData = latestWeatherData.filter((data) => data.city === city);

      const latestEntry = cityData[0]; // Get latest entry
      const averageTemp =
        cityData.reduce((sum, data) => sum + data.temperature, 0) /
        cityData.length;
      const maxTemp = Math.max(...cityData.map((data) => data.temperature));
      const minTemp = Math.min(...cityData.map((data) => data.temperature));

      return {
        city: latestEntry.city,
        temperature: latestEntry.temperature,
        feels_like: latestEntry.feels_like,
        condition: latestEntry.condition,
        windSpeed: latestEntry.windSpeed, // Include wind speed in the response
        humidity: latestEntry.humidity, // Include humidity in the response
        date: latestEntry.date,
        average: averageTemp.toFixed(2),
        maximum: maxTemp.toFixed(2),
        minimum: minTemp.toFixed(2),
        time: new Date(latestEntry.timestamp * 1000).toLocaleTimeString(), // Add time
      };
    });

    res.json(aggregatedData);
  } catch (error) {
    console.error("Error fetching weather data from DB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cron job to fetch weather data every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  for (const city of cities) {
    const weatherData = await getWeatherData(city);
    if (weatherData) {
      const newWeather = new Weather(weatherData);
      await newWeather.save();
      console.log(`Weather data saved for ${city}`);
    }
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
