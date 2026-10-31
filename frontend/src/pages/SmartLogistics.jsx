
import { useState } from 'react'
import './SmartLogistics.css'
import { useLanguage } from '../context/LanguageContext'

function SmartLogistics() {
  const { t } = useLanguage()

  const [vehicle, setVehicle] = useState('Mini Truck')
  const [quantity, setQuantity] = useState(500)
  const [distance, setDistance] = useState(30)

  const vehicles = {
    'Mini Truck': 1000,
    'Pickup': 1500,
    'Large Truck': 5000
  }

  const vehicleLabels = {
    'Mini Truck': t('miniTruck'),
    'Pickup': t('pickup'),
    'Large Truck': t('largeTruck')
  }

  const capacity = vehicles[vehicle]
  const totalCost = distance * 30
  const validQuantity = quantity > 0 && quantity <= capacity

  const farmerCost = validQuantity
    ? (totalCost * quantity) / capacity
    : 0

  const remainingCapacity = Math.max(0, capacity - quantity)

  const groups = [
    { crop: 'Tomato', farmers: 4, destination: 'Mysuru Mandi', load: 800 },
    { crop: 'Ragi', farmers: 3, destination: 'Mandya Mandi', load: 1200 },
    { crop: 'Rice', farmers: 5, destination: 'Hassan Mandi', load: 2500 }
  ]

  const cropLabels = {
    Tomato: t('tomato'),
    Ragi: t('ragi'),
    Rice: t('rice')
  }

  return (
    <div className="logistics-page">
      <header className="logistics-header">
        <div>
          <h1>🚚 {t('smartLogistics')}</h1>
          <p>{t('logisticsSubtitle')}</p>
        </div>
        <span>{t('logisticsHub')}</span>
      </header>

      <section className="logistics-banner">
        <h2>{t('transportSmarter')} 🌿</h2>
        <p>{t('transportDescription')}</p>
      </section>

      <section className="logistics-calculator">
        <h2>🧮 {t('transportCostCalculator')}</h2>

        <label>{t('selectVehicle')}</label>
        <select
          value={vehicle}
          onChange={e => setVehicle(e.target.value)}
        >
          {Object.keys(vehicles).map(v => (
            <option key={v} value={v}>
              {vehicleLabels[v]}
            </option>
          ))}
        </select>

        <p>
          {t('vehicleCapacity')}: <strong>{capacity} kg</strong>
        </p>

        <label>{t('yourCropQuantity')}</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
        />

        <label>{t('travelDistance')}</label>
        <input
          type="number"
          min="1"
          value={distance}
          onChange={e => setDistance(Math.max(1, Number(e.target.value)))}
        />

        {validQuantity ? (
          <div className="logistics-results">
            <div>
              <p>{t('estimatedFullVehicleCost')}</p>
              <h2>₹{totalCost.toLocaleString('en-IN')}</h2>
            </div>

            <div>
              <p>{t('yourEstimatedShare')}</p>
              <h2>₹{farmerCost.toFixed(0)}</h2>
            </div>

            <div>
              <p>{t('remainingVehicleCapacity')}</p>
              <h2>{remainingCapacity} kg</h2>
            </div>
          </div>
        ) : (
          <p className="logistics-warning">
            {t('quantityExceedsCapacity')}
          </p>
        )}
      </section>

      <section className="transport-groups">
        <h2>🤝 {t('availableTransportGroups')}</h2>
        <p>{t('transportGroupsDescription')}</p>

        <div className="transport-grid">
          {groups.map(group => (
            <article className="transport-card" key={group.crop}>
              <span>🚛</span>
              <h3>
                {cropLabels[group.crop]} {t('transportGroup')}
              </h3>
              <p>{t('destination')}: {group.destination}</p>
              <p>{t('farmers')}: {group.farmers}</p>
              <p>{t('combinedLoad')}: {group.load} kg</p>

              <button
                onClick={() =>
                  alert(
                    t('interestRecorded') +
                    ' ' +
                    cropLabels[group.crop] +
                    '.'
                  )
                }
              >
                {t('expressInterest')}
              </button>
            </article>
          ))}
        </div>
      </section>

      <small className="logistics-note">
        {t('logisticsDisclaimer')}
      </small>
    </div>
  )
}

export default SmartLogistics
