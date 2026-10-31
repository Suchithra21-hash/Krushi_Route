
import { useEffect, useState } from 'react'
import { getEnquiries, getOrders } from '../services/api'
import './FarmerNotifications.css'

function FarmerNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const [enquiryResponse, orderResponse] = await Promise.all([
        getEnquiries(),
        getOrders()
      ])

      const enquiryAlerts = enquiryResponse.data.map(item => ({
        id: `enquiry-${item.id}`,
        title: 'New Buyer Enquiry',
        message: `Buyer ${item.buyer_name} sent an enquiry for crop #${item.crop_id}.`,
        type: 'enquiry'
      }))

      const orderAlerts = orderResponse.data.map(item => ({
        id: `order-${item.id}`,
        title: 'Order Update',
        message: `Order #${item.id} for ${item.crop_name} is ${item.status}.`,
        type: 'order'
      }))

      setNotifications([...enquiryAlerts, ...orderAlerts])
    } catch (error) {
      console.error('Notification loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()

    const interval = setInterval(fetchNotifications, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="notifications-page">
      <h1>🔔 Farmer Notifications</h1>
      <p>Stay updated about buyer enquiries and crop orders.</p>

      <button onClick={fetchNotifications}>
        🔄 Refresh Notifications
      </button>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className="notification-list">
          {notifications.map(item => (
            <div className="notification-card" key={item.id}>
              <span>{item.type === 'enquiry' ? '📩' : '📦'}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FarmerNotifications
