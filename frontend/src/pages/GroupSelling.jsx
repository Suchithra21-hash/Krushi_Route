import { useState } from 'react'
import './GroupSelling.css'

function GroupSelling() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      crop: 'Tomato',
      farmers: 4,
      quantity: 800,
      mandi: 'Mysuru Mandi',
      status: 'Open',
      joined: false
    },
    {
      id: 2,
      crop: 'Ragi',
      farmers: 3,
      quantity: 1200,
      mandi: 'Mandya Mandi',
      status: 'Open',
      joined: false
    },
    {
      id: 3,
      crop: 'Rice',
      farmers: 5,
      quantity: 2500,
      mandi: 'Hassan Mandi',
      status: 'Open',
      joined: false
    }
  ])

  const [search, setSearch] = useState('')

  const joinGroup = (id) => {
    setGroups(previous =>
      previous.map(group =>
        group.id === id && !group.joined
          ? {
              ...group,
              farmers: group.farmers + 1,
              joined: true
            }
          : group
      )
    )
  }

  const totalFarmers = groups.reduce(
    (sum, group) => sum + group.farmers, 0
  )

  const totalQuantity = groups.reduce(
    (sum, group) => sum + group.quantity, 0
  )

  const filteredGroups = groups.filter(group =>
    `${group.crop} ${group.mandi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="group-selling">
      <div className="group-heading">
        <h1>🤝 Group Selling</h1>
        <p>Join nearby farmers and sell crops together.</p>
      </div>

      <div className="group-banner">
        <h2>Sell Together. Save More.</h2>
        <p>
          Combine crop quantities with other farmers to plan
          shared transportation and reach bigger markets.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        margin: '20px 0'
      }}>
        <div className="group-card">
          <h3>Available Groups</h3>
          <h2>{groups.length}</h2>
        </div>

        <div className="group-card">
          <h3>Total Farmers</h3>
          <h2>{totalFarmers}</h2>
        </div>

        <div className="group-card">
          <h3>Combined Quantity</h3>
          <h2>{totalQuantity.toLocaleString('en-IN')} kg</h2>
        </div>
      </div>

      <h2 className="group-section-title">Available Farmer Groups</h2>

      <input
        type="text"
        placeholder="Search crop or mandi..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="group-grid">
        {filteredGroups.map(group => (
          <div className="group-card" key={group.id}>
            <span className="group-status">{group.status}</span>

            <h3>🌾 {group.crop}</h3>

            <p><strong>Farmers:</strong> {group.farmers}</p>
            <p><strong>Total Quantity:</strong> {group.quantity} kg</p>
            <p><strong>Target Mandi:</strong> {group.mandi}</p>

            <button
              disabled={group.joined}
              onClick={() => joinGroup(group.id)}
            >
              {group.joined ? '✅ Joined' : 'Join Group'}
            </button>

            {group.joined && (
              <p style={{ color: 'green' }}>
                You have joined this demo group.
              </p>
            )}
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <p>No matching groups found.</p>
        )}
      </div>

      <p className="group-note">
        Demo groups: joining updates the displayed farmer count only.
        No real farmer connection or booking is created yet.
      </p>
    </div>
  )
}

export default GroupSelling