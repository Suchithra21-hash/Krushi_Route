
import { useState } from 'react'
import './SmartAllocation.css'
import { useLanguage } from '../context/LanguageContext'

function SmartAllocation() {
  const { t } = useLanguage()

  const [quantity, setQuantity] = useState(1000)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const mandis = [
    { name: 'Mysuru Mandi', price: 2200, transport: 150, capacity: 1000 },
    { name: 'Mandya Mandi', price: 2450, transport: 250, capacity: 600 },
    { name: 'Hassan Mandi', price: 2300, transport: 200, capacity: 800 }
  ]

  const calculateAllocation = () => {
    const requested = Number(quantity)

    if (!Number.isFinite(requested) || requested <= 0) {
      setError(t('validCropQuantity'))
      setResults([])
      return
    }

    setError('')
    let remaining = requested

    const sorted = mandis
      .map(mandi => ({
        ...mandi,
        netPrice: mandi.price - mandi.transport
      }))
      .sort((a, b) => b.netPrice - a.netPrice)

    const allocation = []

    sorted.forEach(mandi => {
      const allocated = Math.min(remaining, mandi.capacity)

      if (allocated > 0) {
        allocation.push({
          ...mandi,
          allocated,
          percentage: (allocated / requested) * 100,
          totalReturn: (allocated / 100) * mandi.netPrice
        })

        remaining -= allocated
      }
    })

    setResults(allocation)
  }

  const totalReturn = results.reduce(
    (sum, item) => sum + item.totalReturn, 0
  )

  const totalAllocated = results.reduce(
    (sum, item) => sum + item.allocated, 0
  )

  const mandiNames = {
    'Mysuru Mandi': t('mysuruMandi'),
    'Mandya Mandi': t('mandyaMandi'),
    'Hassan Mandi': t('hassanMandi')
  }

  return (
    <div className="allocation-page">
      <h1>📊 {t('smartMultiMandiAllocation')}</h1>
      <p>{t('allocationSubtitle')}</p>

      <div className="allocation-input">
        <label>{t('totalCropQuantity')}</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />

        <button onClick={calculateAllocation}>
          {t('calculateSmartAllocation')}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {results.length > 0 && (
        <div className="allocation-results">
          <h2>{t('recommendedMarketAllocation')}</h2>

          <div className="allocation-card">
            <h3>📦 {t('allocationSummary')}</h3>
            <p>{t('totalQuantity')}: {quantity} kg</p>
            <p>{t('allocatedQuantity')}: {totalAllocated} kg</p>
            <p>
              {t('estimatedTotalReturn')}: ₹
              {totalReturn.toLocaleString('en-IN', {
                maximumFractionDigits: 2
              })}
            </p>
          </div>

          {results.map(item => (
            <div className="allocation-card" key={item.name}>
              <h3>📍 {mandiNames[item.name]}</h3>
              <p>{t('allocatedQuantity')}: {item.allocated} kg</p>
              <p>{t('allocationShare')}: {item.percentage.toFixed(1)}%</p>
              <p>{t('marketPrice')}: ₹{item.price}/{t('quintal')}</p>
              <p>{t('transportEstimate')}: ₹{item.transport}/{t('quintal')}</p>
              <p>{t('netPrice')}: ₹{item.netPrice}/{t('quintal')}</p>
              <p>
                {t('estimatedReturn')}: ₹
                {item.totalReturn.toLocaleString('en-IN', {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          ))}

          {totalAllocated < Number(quantity) && (
            <p style={{ color: '#b45309', fontWeight: 'bold' }}>
              ⚠️ {Number(quantity) - totalAllocated} kg {t('couldNotAllocate')}
            </p>
          )}
        </div>
      )}

      <p className="allocation-note">
        {t('allocationDisclaimer')}
      </p>
    </div>
  )
}

export default SmartAllocation
