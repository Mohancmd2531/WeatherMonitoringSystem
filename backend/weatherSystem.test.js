const axios = require("axios");
const {
  getWeatherData,
  convertTemp,
  calculateDailySummary,
  checkAlerts,
} = require("./index.js"); // Adjust based on your export structure

jest.mock("axios");

describe("Weather Monitoring System Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("System Setup: Verify system starts and connects to OpenWeatherMap API", async () => {
    const validApiKey = "YOUR_API_KEY"; // Set your valid API key
    axios.get.mockResolvedValueOnce({ data: { weather: [], main: {} } });

    const response = await getWeatherData("London", validApiKey);
    expect(response).toBeDefined();
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("api.openweathermap.org")
    );
  });

  test("Data Retrieval: Retrieve weather data for specified location", async () => {
    const mockData = {
      weather: [{ description: "clear sky" }],
      main: { temp: 300 },
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const data = await getWeatherData("London", "YOUR_VALID_API_KEY");
    expect(data.weather[0].description).toBe("clear sky");
    expect(data.main.temp).toBe(300);
  });

  test("Temperature Conversion: Convert Kelvin to Celsius", () => {
    const kelvin = 300;
    const celsius = convertTemp(kelvin, "C");
    expect(celsius).toBeCloseTo(26.85, 2); // Approx 26.85°C
  });

  test("Daily Weather Summary: Calculate daily summaries correctly", () => {
    const weatherUpdates = [
      { temp: { day: 295 }, weather: [{ main: "Clear" }] },
      { temp: { day: 290 }, weather: [{ main: "Clouds" }] },
      { temp: { day: 300 }, weather: [{ main: "Clear" }] },
    ];
    const summary = calculateDailySummary(weatherUpdates);

    expect(summary.averageTemp).toBeCloseTo(295, 2);
    expect(summary.maxTemp).toBe(300);
    expect(summary.minTemp).toBe(290);
    expect(summary.dominantCondition).toBe("Clear");
  });

  test("Alerting Thresholds: Trigger alerts when thresholds are breached", () => {
    const thresholds = { temperature: 30 }; // Example threshold
    const weatherData = { temp: 32 }; // Simulated weather data

    const alerts = checkAlerts(weatherData, thresholds);
    expect(alerts).toContain("Temperature exceeds threshold!");
  });
});
