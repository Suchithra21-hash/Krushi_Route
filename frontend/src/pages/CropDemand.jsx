
import { useState } from 'react'
import './CropDemand.css'

function CropDemand() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato')

  const demandData = [
    { crop: 'Tomato', demand: 85, price: 28, trend: 'High' },
    { crop: 'Rice', demand: 72, price: 42, trend: 'High' },
    { crop: 'Ragi', demand: 65, price: 38, trend: 'Medium' },
    { crop: 'Maize', demand: 55, price: 24, trend: 'Medium' },
    { crop: 'Onion', demand: 90, price: 35, trend: 'High' },
    { crop: 'Potato', demand: 60, price: 26, trend: 'Medium' }
  ]

  const crop = demandData.find(item => item.crop === selectedCrop)

  return (
    <div className="crop-demand-page">
      <h1>📈 Crop Demand Forecast</h1>
      <p>Explore estimated crop demand and market trends.</p>

      <div className="demand-selector">
        <label>Select Crop: </label>
        <select
          value={selectedCrop}
          onChange={e => setSelectedCrop(e.target.value)}
        >
          {demandData.map(item => (
            <option key={item.crop} value={item.crop}>
              {item.crop}
            </option>
          ))}
        </select>
      </div>

      {crop && (
        <div className="demand-highlight">
          <h2>{crop.crop}</h2>
          <h3>{crop.demand}% Estimated Demand Index</h3>
          <div className="demand-bar">
            <div
              className="demand-fill"
              style={{ width: `${crop.demand}%` }}
            />
          </div>
          <p>Sample reference price: ₹{crop.price}/kg</p>
          <p>Demand category: <strong>{crop.trend}</strong></p>
        </div>
      )}

      <h2>Crop Demand Comparison</h2>

      <div className="demand-grid">
        {demandData.map(item => (
          <div className="demand-card" key={item.crop}>
            <h3>{item.crop}</h3>
            <h2>{item.demand}%</h2>
            <p>{item.trend} Demand</p>
            <p>₹{item.price}/kg (sample)</p>
          </div>
        ))}
      </div>

      <p className="demand-note">
        Demo data only. These values are not live market measurements
        or verified future predictions.
      </p>
    </div>
  )
}

export default CropDemand
