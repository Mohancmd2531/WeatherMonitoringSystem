# Weather Monitoring System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

The Weather Monitoring System is a MERN stack application that allows users to monitor weather conditions in real time. It fetches data from the OpenWeatherMap API and stores it in a MongoDB database, providing users with features like displaying the latest weather data, average temperatures, and humidity.

## Features

- Display latest weather data for multiple cities
- Calculate and show average, maximum, and minimum temperatures
- Beautifully designed frontend with responsive tables
- Efficient data management with local MongoDB storage
- Real-time updates and rollups for weather data

## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **API**: OpenWeatherMap API
- **Testing**: Chai, Chai HTTP

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Weather_APP

   ```

2. Install the backend dependencies:
   cd backend
   npm install

3. Install the frontend dependencies:
   cd frontend
   npm install

4. Set up your MongoDB connection in the backend. Make sure you have MongoDB installed and running locally.

5. Start the backend server:
   cd backend
   node index.js

6. Start the frontend server:
   cd frontend
   npm start

## Usage

Access the application at http://localhost:3000 (or your configured port).
Enter the names of the cities you want to monitor.
View the latest weather data, including wind speed, humidity, and temperature averages.

## API Endpoints

Method Endpoint Description
GET /api/weather Fetch latest weather data for cities

## Frontend

The frontend is built with React.js and includes the following components:

CityInput: For entering city names.
WeatherTable: Displays weather data in a tabular format.

## Backend

The backend is implemented using Node.js and Express.js. It includes:

Mongoose models for MongoDB schemas.
Routes for handling API requests.
Controllers for processing the business logic.

## Database

The application uses a local MongoDB database named ast-rules to store weather data. All data is deleted upon server restart for a fresh start.

## Testing

To run tests for the backend API, follow these steps:
Navigate to the backend directory:
cd backend
npm test

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any feature requests or bug reports.

![Weather_APP](https://github.com/user-attachments/assets/5995bde3-655a-4181-98ad-cf9a9a1e161b)

