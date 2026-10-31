
import { useState } from 'react'
import './ProfitCalculator.css'

function ProfitCalculator() {
  const [quantity, setQuantity] = useState(1000)
  const [price, setPrice] = useState(30)
  const [seedCost, setSeedCost] = useState(2000)
  const [fertilizerCost, setFertilizerCost] = useState(3000)
  const [labourCost, setLabourCost] = useState(4000)
  const [transportCost, setTransportCost] = useState(1500)

  const revenue = Number(quantity) * Number(price)

  const expenses =
    Number(seedCost) +
    Number(fertilizerCost) +
    Number(labourCost) +
    Number(transportCost)

  const profit = revenue - expenses

  return (
    <div className="profit-page">
      <h1>💰 Farmer Profit Calculator</h1>
      <p>Estimate your crop revenue, expenses and expected profit.</p>

      <div className="profit-layout">
        <div className="profit-form">
          <h2>Enter Farm Details</h2>

          <label>Crop Quantity (kg)</label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <label>Expected Selling Price (₹/kg)</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <label>Seed Cost (₹)</label>
          <input
            type="number"
            min="0"
            value={seedCost}
            onChange={e => setSeedCost(e.target.value)}
          />

          <label>Fertilizer Cost (₹)</label>
          <input
            type="number"
            min="0"
            value={fertilizerCost}
            onChange={e => setFertilizerCost(e.target.value)}
          />

          <label>Labour Cost (₹)</label>
          <input
            type="number"
            min="0"
            value={labourCost}
            onChange={e => setLabourCost(e.target.value)}
          />

          <label>Transport Cost (₹)</label>
          <input
            type="number"
            min="0"
            value={transportCost}
            onChange={e => setTransportCost(e.target.value)}
          />
        </div>

        <div className="profit-result">
          <h2>📊 Estimated Results</h2>

          <div>
            <p>Expected Revenue</p>
            <h2>₹{revenue.toLocaleString('en-IN')}</h2>
          </div>

          <div>
            <p>Total Expenses</p>
            <h2>₹{expenses.toLocaleString('en-IN')}</h2>
          </div>

          <div>
            <p>{profit >= 0 ? 'Estimated Profit' : 'Estimated Loss'}</p>
            <h1 className={profit >= 0 ? 'profit-positive' : 'profit-negative'}>
              ₹{Math.abs(profit).toLocaleString('en-IN')}
            </h1>
          </div>
        </div>
      </div>

      <p className="profit-note">
        These are estimates based on the values entered. Actual revenue and
        expenses may vary.
      </p>
    </div>
  )
}

export default ProfitCalculator
