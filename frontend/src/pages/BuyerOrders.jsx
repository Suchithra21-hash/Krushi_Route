
import { useEffect, useState } from 'react'
import { getOrders } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function BuyerOrders() {
  const { t } = useLanguage()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setError('')
      const response = await getOrders()
      setOrders(response.data)
    } catch (err) {
      console.error('Buyer orders error:', err)
      setError(t('ordersError'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const confirmed = orders.filter(
    order => order.status === 'Confirmed'
  ).length

  const delivered = orders.filter(
    order => order.status === 'Delivered'
  ).length

  const steps = [
    { value: 'Confirmed', label: 'confirmed' },
    { value: 'Processing', label: 'processing' },
    { value: 'Ready for Pickup', label: 'readyForPickup' },
    { value: 'Delivered', label: 'delivered' }
  ]

  const getStatusColor = status => {
    if (status === 'Delivered') return '#d4edda'
    if (status === 'Processing') return '#fff3cd'
    if (status === 'Ready for Pickup') return '#d1ecf1'
    return '#e8e8e8'
  }

  const getStatusLabel = status => {
    const step = steps.find(item => item.value === status)
    return step ? t(step.label) : status
  }

  return (
    <div style={{ padding: '25px' }}>
      <h1>📦 {t('myPurchases')}</h1>
      <p>{t('trackPurchases')}</p>

      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        margin: '20px 0'
      }}>
        <div className="stat-card">
          <h3>{t('totalOrders')}</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="stat-card">
          <h3>{t('confirmed')}</h3>
          <h2>{confirmed}</h2>
        </div>

        <div className="stat-card">
          <h3>{t('delivered')}</h3>
          <h2>{delivered}</h2>
        </div>
      </div>

      <button
        onClick={fetchOrders}
        style={{ padding: '10px 18px', cursor: 'pointer' }}
      >
        🔄 {t('refreshOrders')}
      </button>

      {loading ? (
        <p>{t('loadingOrders')}</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>{t('noOrders')}</p>
      ) : (
        orders.map(order => {
          const currentIndex = steps.findIndex(
            step => step.value === order.status
          )

          return (
            <div
              key={order.id}
              style={{
                padding: '20px',
                margin: '15px 0',
                background: '#f0f7ed',
                borderRadius: '12px',
                border: '1px solid #c8dfc1'
              }}
            >
              <h3>{t('orderNumber')} #{order.id}</h3>

              <p>
                <strong>{t('crop')}:</strong> {order.crop_name}
              </p>

              <p>
                <strong>{t('buyer')}:</strong> {order.buyer_name}
              </p>

              <p>
                <strong>{t('orderStatus')}:</strong>{' '}
                <span style={{
                  background: getStatusColor(order.status),
                  padding: '5px 12px',
                  borderRadius: '15px'
                }}>
                  {getStatusLabel(order.status)}
                </span>
              </p>

              <p>
                <strong>{t('enquiryReference')}:</strong> #{order.enquiry_id}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '5px',
                marginTop: '20px',
                padding: '12px',
                background: 'white',
                borderRadius: '10px'
              }}>
                {steps.map((step, index) => (
                  <div
                    key={step.value}
                    style={{
                      textAlign: 'center',
                      flex: 1,
                      color: index <= currentIndex ? 'green' : 'gray',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ fontSize: '20px' }}>
                      {index <= currentIndex ? '🟢' : '⚪'}
                    </div>
                    {t(step.label)}
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default BuyerOrders
