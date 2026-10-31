
import { useState } from 'react'
import './SmartIrrigation.css'

function SmartIrrigation() {
  const [soilMoisture, setSoilMoisture] = useState(35)
  const [temperature, setTemperature] = useState(30)
  const [rainExpected, setRainExpected] = useState('No')

  const getAdvice = () => {
    if (rainExpected === 'Yes') {
      return {
        title: 'Rain Expected 🌧️',
        message: 'Check the rainfall forecast and avoid unnecessary irrigation.'
      }
    }

    if (soilMoisture < 30 && temperature >= 30) {
      return {
        title: 'Irrigation May Be Needed 💧',
        message: 'Soil moisture is low and temperature is high. Check the field and crop before watering.'
      }
    }

    if (soilMoisture < 40) {
      return {
        title: 'Monitor Soil Moisture 🌱',
        message: 'Soil moisture is moderate. Recheck your field before deciding to irrigate.'
      }
    }

    return {
      title: 'Moisture Level Looks Adequate ✅',
      message: 'Continue monitoring soil conditions and crop requirements.'
    }
  }

  const advice = getAdvice()

  return (
    <div className="irrigation-page">
      <h1>💧 Smart Irrigation Advisory</h1>
      <p>Enter field conditions to receive a basic irrigation suggestion.</p>

      <div className="irrigation-card">
        <label>Soil Moisture (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={soilMoisture}
          onChange={e => setSoilMoisture(
            Math.min(100, Math.max(0, Number(e.target.value)))
          )}
        />

        <label>Temperature (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={e => setTemperature(Number(e.target.value))}
        />

        <label>Is rain expected?</label>
        <select
          value={rainExpected}
          onChange={e => setRainExpected(e.target.value)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <div className="irrigation-advice">
          <h2>{advice.title}</h2>
          <p>{advice.message}</p>
        </div>
      </div>

      <p className="irrigation-note">
        Demo advisory only. Use a calibrated soil-moisture sensor,
        local weather information and crop-specific guidance for
        actual irrigation decisions.
      </p>
    </div>
  )
}

export default SmartIrrigation
