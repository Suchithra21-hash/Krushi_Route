import { useState } from 'react'
import './CropRescue.css'

function CropRescue() {
  const [crop, setCrop] = useState('Tomato')
  const [quantity, setQuantity] = useState('')
  const [location, setLocation] = useState('')
  const [urgency, setUrgency] = useState('High')
  const [result, setResult] = useState(null)

  const handleRescue = (e) => {
    e.preventDefault()

    const qty = Number(quantity)

    if (!Number.isFinite(qty) || qty <= 0 || !location.trim()) {
      alert('Please enter valid crop quantity and location.')
      return
    }

    setResult({
      crop,
      quantity: qty,
      location: location.trim(),
      urgency,
      requestId: `CR-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN')
    })
  }

  const resetForm = () => {
    setCrop('Tomato')
    setQuantity('')
    setLocation('')
    setUrgency('High')
    setResult(null)
  }

  return (
    <div className="crop-rescue">
      <header>
        <h1>🚨 Crop Rescue</h1>
        <p>Find alternative selling opportunities for your crops.</p>
      </header>

      <section className="rescue-banner">
        <h2>Don't Let Your Harvest Go Unsold!</h2>
        <p>
          Share your crop details to explore alternative markets
          and possible buyer connections.
        </p>
      </section>

      {!result ? (
        <section className="rescue-form-card">
          <h2>Submit Crop Rescue Request</h2>

          <form onSubmit={handleRescue}>
            <label>Crop Name</label>
            <select
              value={crop}
              onChange={e => setCrop(e.target.value)}
            >
              <option>Tomato</option>
              <option>Rice</option>
              <option>Ragi</option>
              <option>Maize</option>
              <option>Onion</option>
              <option>Potato</option>
            </select>

            <label>Available Quantity (kg)</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />

            <label>Farmer Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Enter your nearest town"
              required
            />

            <label>Urgency Level</label>
            <select
              value={urgency}
              onChange={e => setUrgency(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button type="submit">
              🔍 Find Rescue Opportunities
            </button>
          </form>
        </section>
      ) : (
        <section className="rescue-result">
          <h2>🌱 Rescue Request Summary</h2>

          <p><strong>Request ID:</strong> {result.requestId}</p>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Crop:</strong> {result.crop}</p>
          <p><strong>Quantity:</strong> {result.quantity} kg</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p>
            <strong>Urgency:</strong>{' '}
            <span style={{
              color: result.urgency === 'High'
                ? '#dc2626'
                : result.urgency === 'Medium'
                  ? '#d97706'
                  : '#15803d',
              fontWeight: 'bold'
            }}>
              {result.urgency}
            </span>
          </p>

          <div className="rescue-message">
            <h3>Request Prepared Successfully!</h3>
            Your crop rescue details are ready. Real buyer matching
            and request submission will require backend integration.
          </div>

          <button onClick={resetForm}>
            ➕ Submit Another Request
          </button>
        </section>
      )}

      <p className="rescue-note">
        Prototype feature: requests are stored only in the current
        page state. No real buyer matching or request submission yet.
      </p>
    </div>
  )
}

export default CropRescue