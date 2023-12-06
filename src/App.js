import React, { useState } from 'react';
import './App.css';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch('https://cooperative-pink-codfish.cyclic.app/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cities: cityInput.split(',').map((city) => city.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data.weather);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h2>Weather App</h2>
      <label htmlFor="cityInput">Enter city names (comma-separated):</label>
      <input
        type="text"
        id="cityInput"
        placeholder="e.g., toronto, mumbai, london"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h3>Weather Results:</h3>
          <ul>
            {Object.entries(weatherData).map(([city, temperature]) => (
              <li key={city}>{`${city}: ${temperature}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;