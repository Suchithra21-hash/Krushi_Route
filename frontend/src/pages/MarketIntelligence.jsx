
import { useState } from 'react'
import './MarketIntelligence.css'

function MarketIntelligence() {
  const [selectedCrop, setSelectedCrop] = useState('Ragi')

  const marketData = [
    { name: 'Ragi', price: 4200, unit: 'Quintal', change: '+5.2%', trend: 'up' },
    { name: 'Rice', price: 3100, unit: 'Quintal', change: '+2.4%', trend: 'up' },
    { name: 'Maize', price: 2250, unit: 'Quintal', change: '-1.8%', trend: 'down' },
    { name: 'Tur Dal', price: 8500, unit: 'Quintal', change: '+3.1%', trend: 'up' },
    { name: 'Groundnut', price: 6200, unit: 'Quintal', change: '+1.5%', trend: 'up' },
    { name: 'Jowar', price: 3400, unit: 'Quintal', change: '-0.9%', trend: 'down' }
  ]

  const currentCrop = marketData.find(
    crop => crop.name === selectedCrop
  )

  return (
    <div className="market-page">

      <div className="market-header">
        <div>
          <h1>Market Intelligence</h1>
          <p>Understand crop prices and make informed selling decisions.</p>
        </div>
        <span className="market-location">📍 Mysuru, Karnataka</span>
      </div>

      <div className="market-notice">
        <strong>Market price demo</strong>
        <p>
          These are sample values for displaying the dashboard.
          They are not live or verified market prices.
        </p>
      </div>

      <div className="market-summary">
        <div className="market-card">
          <span>🌾</span>
          <p>Tracked Crops</p>
          <h2>{marketData.length}</h2>
        </div>

        <div className="market-card">
          <span>📈</span>
          <p>Prices Increasing</p>
          <h2>{marketData.filter(crop => crop.trend === 'up').length}</h2>
        </div>

        <div className="market-card">
          <span>📉</span>
          <p>Prices Decreasing</p>
          <h2>{marketData.filter(crop => crop.trend === 'down').length}</h2>
        </div>
      </div>

      <div className="market-section">
        <h2>Crop Market Prices</h2>
        <p className="market-subtitle">
          Select a crop to view its sample price.
        </p>

        <div className="market-table-wrapper">
          <table className="market-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Price / Quintal</th>
                <th>Change</th>
                <th>Trend</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {marketData.map(crop => (
                <tr key={crop.name}>
                  <td><strong>{crop.name}</strong></td>
                  <td>₹{crop.price.toLocaleString('en-IN')}</td>
                  <td className={crop.trend}>
                    {crop.change}
                  </td>
                  <td>
                    {crop.trend === 'up' ? '↗ Increasing' : '↘ Decreasing'}
                  </td>
                  <td>
                    <button
                      className="market-view-button"
                      onClick={() => setSelectedCrop(crop.name)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {currentCrop && (
        <div className="market-detail">
          <h2>{currentCrop.name} Price Details</h2>
          <div className="market-detail-price">
            ₹{currentCrop.price.toLocaleString('en-IN')}
            <span> / {currentCrop.unit}</span>
          </div>
          <p>
            Sample price movement: <strong className={currentCrop.trend}>
              {currentCrop.change}
            </strong>
          </p>
        </div>
      )}

    </div>
  )
}

export default MarketIntelligence
