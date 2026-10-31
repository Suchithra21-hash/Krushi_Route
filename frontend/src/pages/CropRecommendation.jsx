
import { useState } from 'react'
import './CropRecommendation.css'

const cropData = [
  {
    name: 'Ragi',
    soil: ['Red Soil', 'Sandy Soil'],
    season: ['Kharif', 'Rabi'],
    minMoisture: 15,
    maxMoisture: 50,
    weather: ['Sunny', 'Cloudy'],
    minTemp: 18,
    maxTemp: 32,
    water: 'Low'
  },
  {
    name: 'Rice',
    soil: ['Clay Soil', 'Alluvial Soil'],
    season: ['Kharif'],
    minMoisture: 60,
    maxMoisture: 100,
    weather: ['Rainy', 'Cloudy'],
    minTemp: 20,
    maxTemp: 35,
    water: 'High'
  },
  {
    name: 'Maize',
    soil: ['Red Soil', 'Black Soil', 'Alluvial Soil'],
    season: ['Kharif', 'Rabi'],
    minMoisture: 35,
    maxMoisture: 70,
    weather: ['Sunny', 'Cloudy'],
    minTemp: 18,
    maxTemp: 32,
    water: 'Medium'
  },
  {
    name: 'Groundnut',
    soil: ['Red Soil', 'Sandy Soil'],
    season: ['Kharif', 'Rabi'],
    minMoisture: 25,
    maxMoisture: 60,
    weather: ['Sunny', 'Cloudy'],
    minTemp: 20,
    maxTemp: 32,
    water: 'Medium'
  },
  {
    name: 'Pulses',
    soil: ['Black Soil', 'Red Soil'],
    season: ['Kharif', 'Rabi'],
    minMoisture: 20,
    maxMoisture: 50,
    weather: ['Sunny', 'Cloudy'],
    minTemp: 18,
    maxTemp: 30,
    water: 'Low'
  },
  {
    name: 'Cotton',
    soil: ['Black Soil', 'Alluvial Soil'],
    season: ['Kharif'],
    minMoisture: 30,
    maxMoisture: 65,
    weather: ['Sunny', 'Cloudy'],
    minTemp: 20,
    maxTemp: 35,
    water: 'Medium'
  }
]

function CropRecommendation() {
  const [soil, setSoil] = useState('Red Soil')
  const [season, setSeason] = useState('Kharif')
  const [moisture, setMoisture] = useState(40)
  const [weather, setWeather] = useState('Sunny')
  const [temperature, setTemperature] = useState(28)
  const [results, setResults] = useState(null)

  const recommendCrops = () => {
    const moistureValue = Number(moisture)
    const temperatureValue = Number(temperature)

    if (
      moisture === '' ||
      temperature === '' ||
      moistureValue < 0 ||
      moistureValue > 100 ||
      temperatureValue < 0 ||
      temperatureValue > 60
    ) {
      alert('Enter valid soil moisture (0–100%) and temperature (0–60°C).')
      return
    }

    const scoredCrops = cropData.map(crop => {
      let score = 0
      const reasons = []

      if (crop.soil.includes(soil)) {
        score += 3
        reasons.push('Suitable soil type')
      }

      if (crop.season.includes(season)) {
        score += 2
        reasons.push('Suitable growing season')
      }

      if (
        moistureValue >= crop.minMoisture &&
        moistureValue <= crop.maxMoisture
      ) {
        score += 2
        reasons.push('Soil moisture is within the preferred demo range')
      }

      if (crop.weather.includes(weather)) {
        score += 2
        reasons.push('Weather condition matches the demo preference')
      }

      if (
        temperatureValue >= crop.minTemp &&
        temperatureValue <= crop.maxTemp
      ) {
        score += 1
        reasons.push('Temperature is within the demo range')
      }

      return { ...crop, score, reasons }
    })

    const sorted = scoredCrops
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    setResults(sorted)
  }

  return (
    <div className="crop-recommendation">
      <h1>🌱 Smart Crop Recommendation</h1>
      <p>
        Enter your farm conditions to find crops that may be suitable.
      </p>

      <div className="recommendation-form">
        <label>Soil Type</label>
        <select value={soil} onChange={e => setSoil(e.target.value)}>
          <option>Red Soil</option>
          <option>Black Soil</option>
          <option>Clay Soil</option>
          <option>Alluvial Soil</option>
          <option>Sandy Soil</option>
        </select>

        <label>Soil Moisture (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={moisture}
          onChange={e => setMoisture(e.target.value)}
          placeholder="Example: 40"
        />
        <small>Enter a value from 0 to 100.</small>

        <label>Season</label>
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option>Kharif</option>
          <option>Rabi</option>
        </select>

        <label>Current Weather</label>
        <select value={weather} onChange={e => setWeather(e.target.value)}>
          <option>Sunny</option>
          <option>Cloudy</option>
          <option>Rainy</option>
        </select>

        <label>Temperature (°C)</label>
        <input
          type="number"
          min="0"
          max="60"
          value={temperature}
          onChange={e => setTemperature(e.target.value)}
          placeholder="Example: 28"
        />

        <button onClick={recommendCrops}>
          🌾 Get Crop Recommendations
        </button>
      </div>

      {results && (
        <div className="recommendation-results">
          <h2>🌿 Recommended Crops</h2>
          <p>These are the top three matches for your entered conditions.</p>

          {results.map((crop, index) => (
            <div className="recommended-crop" key={crop.name}>
              <div>
                <h3>{index + 1}. {crop.name}</h3>
                <p>Water requirement: {crop.water}</p>
                <p>Matching score: {crop.score}/10</p>
                <ul>
                  {crop.reasons.map(reason => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>

              <span>
                {crop.score >= 8
                  ? 'Strong match'
                  : crop.score >= 5
                    ? 'Possible match'
                    : 'Low match'}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="recommendation-note">
        Prototype advisory: recommendations use sample rule-based ranges.
        Weather is entered manually and is not fetched from a live weather
        service. Soil moisture should ideally come from a calibrated sensor.
        Confirm crop suitability with local agricultural experts before planting.
      </p>
    </div>
  )
}

export default CropRecommendation
