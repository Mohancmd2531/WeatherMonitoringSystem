import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertedCities, setAlertedCities] = useState(new Set()); // Track alerted cities

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/weather");
        console.log(response.data); // Check the response data
        setWeatherData(response.data); // Set the weather data
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Array to hold names of cities with temperatures exceeding 30 degrees
    const citiesExceeding30 = [];

    weatherData.forEach((data) => {
      if (data.temperature > 35 && !alertedCities.has(data.city)) {
        citiesExceeding30.push(data.city); // Add city to the list
        setAlertedCities((prev) => new Set(prev).add(data.city)); // Add to alerted cities
      }
    });

    // Show a single alert if there are cities exceeding 30 degrees
    if (citiesExceeding30.length > 0) {
      alert(
        `Alert: Temperatures exceed 35 degrees in: ${citiesExceeding30.join(
          ", "
        )}`
      );
    }
  }, [weatherData]); // Trigger this effect whenever weatherData changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Weather Monitoring System</h1>
      <table className="weather-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Feels Like (°C)</th>
            <th>Condition</th>
            <th>Wind Speed (m/s)</th>
            <th>Humidity (%)</th>
            <th>Date</th>
            <th>Time</th>
            <th>Average Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data, index) => (
            <tr key={index}>
              <td>{data.city}</td>
              <td>{data.temperature.toFixed(2)}</td>
              <td>{data.feels_like.toFixed(2)}</td>
              <td>{data.condition}</td>
              <td>{data.windSpeed.toFixed(2)}</td>
              <td>{data.humidity}</td>
              <td>{data.date}</td>
              <td>{data.time}</td>
              <td>{data.average}</td>
              <td>{data.maximum}</td>
              <td>{data.minimum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
