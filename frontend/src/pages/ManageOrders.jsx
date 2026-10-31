
import { useEffect, useState } from 'react'
import { getOrders, updateOrderStatus } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function ManageOrders() {
  const { t } = useLanguage()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setError('')
      const response = await getOrders()
      setOrders(response.data)
    } catch (err) {
      console.error('Unable to fetch orders:', err)
      setError(t('manageOrdersError'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()

    const interval = setInterval(fetchOrders, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id)

      await updateOrderStatus(id, status)
      await fetchOrders()

      alert(t('orderStatusUpdated'))
    } catch (err) {
      console.error('Status update error:', err)
      alert(t('orderStatusError'))
    } finally {
      setUpdatingId(null)
    }
  }

  const confirmedCount = orders.filter(
    order => order.status === 'Confirmed'
  ).length

  const deliveredCount = orders.filter(
    order => order.status === 'Delivered'
  ).length

  const statusOptions = [
    { value: 'Confirmed', label: t('confirmed') },
    { value: 'Processing', label: t('processing') },
    { value: 'Ready for Pickup', label: t('readyForPickup') },
    { value: 'Delivered', label: t('delivered') }
  ]

  return (
    <div style={{ padding: '25px' }}>
      <h1>📦 {t('manageOrders')}</h1>
      <p>{t('trackUpdateOrders')}</p>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          margin: '20px 0',
          flexWrap: 'wrap'
        }}
      >
        <div className="stat-card">
          <h3>{t('totalOrders')}</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="stat-card">
          <h3>{t('confirmed')}</h3>
          <h2>{confirmedCount}</h2>
        </div>

        <div className="stat-card">
          <h3>{t('delivered')}</h3>
          <h2>{deliveredCount}</h2>
        </div>
      </div>

      <button
        onClick={fetchOrders}
        disabled={loading}
        style={{ padding: '10px 18px', cursor: 'pointer' }}
      >
        🔄 {t('refreshOrders')}
      </button>

      {loading ? (
        <p>{t('loadingOrders')}</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>{t('noFarmerOrders')}</p>
      ) : (
        orders.map(order => (
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
            <h3>
              {t('orderNumber')} #{order.id}
            </h3>

            <p>
              <strong>{t('crop')}:</strong> {order.crop_name}
            </p>

            <p>
              <strong>{t('buyer')}:</strong> {order.buyer_name}
            </p>

            <p>
              <strong>{t('currentStatus')}:</strong>{' '}
              {statusOptions.find(
                option => option.value === order.status
              )?.label || order.status}
            </p>

            <label>
              <strong>{t('updateStatus')}: </strong>
            </label>

            <select
              value={order.status}
              disabled={updatingId === order.id}
              onChange={e =>
                handleStatusChange(order.id, e.target.value)
              }
              style={{ padding: '8px', marginTop: '8px' }}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {updatingId === order.id && (
              <p>{t('updating')}</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default ManageOrders
