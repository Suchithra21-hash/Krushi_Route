
import { useState } from 'react'
import './WeatherForecast.css'

function WeatherForecast() {
  const [city, setCity] = useState('Mysuru')
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'
    if ([1, 2].includes(code)) return '🌤️'
    if (code === 3) return '☁️'
    if ([45, 48].includes(code)) return '🌫️'
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'
    if ([95, 96, 99].includes(code)) return '⛈️'
    return '🌡️'
  }

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky'
    if ([1, 2].includes(code)) return 'Partly cloudy'
    if (code === 3) return 'Cloudy'
    if ([45, 48].includes(code)) return 'Fog'
    if ([51, 53, 55].includes(code)) return 'Drizzle'
    if ([61, 63, 65].includes(code)) return 'Rain'
    if ([80, 81, 82].includes(code)) return 'Rain showers'
    if ([95, 96, 99].includes(code)) return 'Thunderstorm'
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow'
    return 'Variable weather'
  }

  const fetchWeather = async (e) => {
    if (e) e.preventDefault()

    if (!city.trim()) {
      setError('Please enter a city name.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setWeather(null)

      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )

      if (!locationResponse.ok) {
        throw new Error('Unable to find location.')
      }

      const locationData = await locationResponse.json()

      if (!locationData.results || locationData.results.length === 0) {
        throw new Error('City not found. Please try another city.')
      }

      const place = locationData.results[0]

      setLocation(
        `${place.name}, ${place.admin1 || ''}, ${place.country || ''}`
      )

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=14&timezone=auto`
      )

      if (!weatherResponse.ok) {
        throw new Error('Unable to fetch weather data.')
      }

      const weatherData = await weatherResponse.json()
      setWeather(weatherData)
    } catch (err) {
      console.error('Weather error:', err)
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const getAdvisory = () => {
    if (!weather) return ''

    const rain = weather.daily.precipitation_probability_max
    const maxRain = Math.max(...rain)

    if (maxRain >= 70) {
      return '🌧️ High chance of rain in the forecast. Plan harvesting and outdoor drying carefully.'
    }

    if (maxRain >= 40) {
      return '🌦️ Rain is possible. Monitor local conditions before irrigation and harvesting.'
    }

    return '☀️ Lower rain probability in this forecast. Continue monitoring soil moisture and crop conditions.'
  }

  return (
    <div className="weather-page">
      <div className="weather-header">
        <h1>🌦️ Weather Forecast</h1>
        <p>Live weather updates and crop advisory for farmers</p>
      </div>

      <form className="weather-search" onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city or district"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <p className="weather-error">{error}</p>}

      {loading && <p className="weather-loading">Fetching weather data...</p>}

      {weather && (
        <>
          <div className="current-weather">
            <h2>📍 {location}</h2>

            <div className="current-weather-details">
              <span className="weather-icon">
                {getWeatherIcon(weather.current.weather_code)}
              </span>

              <div>
                <h1>
                  {Math.round(weather.current.temperature_2m)}°C
                </h1>
                <p>
                  {getWeatherDescription(weather.current.weather_code)}
                </p>
              </div>
            </div>

            <div className="weather-stats">
              <div>
                <span>Feels Like</span>
                <h3>{weather.current.apparent_temperature}°C</h3>
              </div>

              <div>
                <span>Humidity</span>
                <h3>{weather.current.relative_humidity_2m}%</h3>
              </div>

              <div>
                <span>Precipitation</span>
                <h3>{weather.current.precipitation} mm</h3>
              </div>
            </div>
          </div>

          <div className="forecast-section">
            <h2>📅 14-Day Weather Forecast</h2>

            <div className="forecast-grid">
              {weather.daily.time.map((date, index) => (
                <div className="forecast-card" key={date}>
                  <h4>
                    {new Date(date + 'T00:00:00').toLocaleDateString(
                      'en-IN',
                      { weekday: 'short', day: 'numeric', month: 'short' }
                    )}
                  </h4>

                  <span className="forecast-icon">
                    {getWeatherIcon(weather.daily.weather_code[index])}
                  </span>

                  <p>
                    {getWeatherDescription(weather.daily.weather_code[index])}
                  </p>

                  <h3>
                    {Math.round(weather.daily.temperature_2m_max[index])}° /
                    {' '}
                    {Math.round(weather.daily.temperature_2m_min[index])}°
                  </h3>

                  <p>
                    🌧️ {weather.daily.precipitation_probability_max[index]}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="crop-advisory">
            <h2>🌱 Smart Crop Advisory</h2>
            <p>{getAdvisory()}</p>
            <small>
              Advisory is based on forecast rain probability. Check local
              conditions before making farming decisions.
            </small>
          </div>

          <p className="weather-note">
            Weather data provided by Open-Meteo. Forecasts can change.
          </p>
        </>
      )}
    </div>
  )
}

export default WeatherForecast
