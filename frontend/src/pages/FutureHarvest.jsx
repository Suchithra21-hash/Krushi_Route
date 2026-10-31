import { useState } from 'react'
import './FutureHarvest.css'

function FutureHarvest() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      crop: 'Tomato',
      quantity: 800,
      harvestDate: '2026-11-15',
      location: 'Mysuru',
      status: 'Available'
    },
    {
      id: 2,
      crop: 'Ragi',
      quantity: 1200,
      harvestDate: '2026-11-25',
      location: 'Mandya',
      status: 'Available'
    },
    {
      id: 3,
      crop: 'Rice',
      quantity: 2000,
      harvestDate: '2026-12-10',
      location: 'Hassan',
      status: 'Available'
    }
  ])

  const [search, setSearch] = useState('')

  const handleBooking = (id) => {
    setBookings(previous =>
      previous.map(item =>
        item.id === id
          ? { ...item, status: 'Interest Received' }
          : item
      )
    )

    alert('Buyer interest recorded in this demo!')
  }

  const totalQuantity = bookings.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const availableCount = bookings.filter(
    item => item.status === 'Available'
  ).length

  const filteredBookings = bookings.filter(item =>
    `${item.crop} ${item.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const daysUntil = date => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const harvest = new Date(`${date}T00:00:00`)
    return Math.ceil(
      (harvest - today) / (1000 * 60 * 60 * 24)
    )
  }

  return (
    <div className="future-harvest">
      <header>
        <h1>🌱 Future Harvest Booking</h1>
        <p>Discover crops before harvest and plan purchases early.</p>
      </header>

      <section className="future-banner">
        <h2>Plan Today. Harvest Tomorrow.</h2>
        <p>
          Farmers can showcase expected crops in advance.
          Buyers can express interest and plan their requirements.
        </p>
      </section>

      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        margin: '20px 0'
      }}>
        <div className="future-card">
          <h3>Total Listings</h3>
          <h2>{bookings.length}</h2>
        </div>

        <div className="future-card">
          <h3>Available Listings</h3>
          <h2>{availableCount}</h2>
        </div>

        <div className="future-card">
          <h3>Total Harvest Quantity</h3>
          <h2>{totalQuantity.toLocaleString('en-IN')} kg</h2>
        </div>
      </div>

      <h2 className="future-title">Upcoming Harvests</h2>

      <input
        type="text"
        placeholder="Search crop or location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="future-grid">
        {filteredBookings.map(item => {
          const days = daysUntil(item.harvestDate)

          return (
            <article className="future-card" key={item.id}>
              <span className="future-status">
                {item.status}
              </span>

              <h3>🌾 {item.crop}</h3>
              <p><strong>Expected Quantity:</strong> {item.quantity} kg</p>
              <p><strong>Harvest Date:</strong> {item.harvestDate}</p>
              <p><strong>Location:</strong> {item.location}</p>

              <p>
                <strong>Harvest Countdown:</strong>{' '}
                {days > 0
                  ? `${days} days remaining`
                  : days === 0
                    ? 'Expected today'
                    : 'Harvest date passed'}
              </p>

              <button
                disabled={item.status !== 'Available'}
                onClick={() => handleBooking(item.id)}
              >
                {item.status === 'Available'
                  ? 'Express Buyer Interest'
                  : 'Interest Recorded'}
              </button>
            </article>
          )
        })}

        {filteredBookings.length === 0 && (
          <p>No matching harvest listings found.</p>
        )}
      </div>

      <p className="future-note">
        Demo data only. This records interest in the current screen;
        it does not create a real purchase or reservation.
      </p>
    </div>
  )
}

export default FutureHarvest