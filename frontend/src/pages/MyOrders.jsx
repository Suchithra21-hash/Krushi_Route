
import { useEffect, useState } from 'react'
import { getOrders } from '../services/api'

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Orders error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  fetchOrders()

  const interval = setInterval(fetchOrders, 10000)

  return () => clearInterval(interval)
}, [])

  return (
    <div style={{ padding: '25px' }}>
      <h1>📦 My Orders</h1>
      <div style={{
  background: '#e8f5e9',
  padding: '15px',
  borderRadius: '10px',
  margin: '15px 0'
}}>
  <h2>Total Orders: {orders.length}</h2>
  <p>Confirmed Orders: {
    orders.filter(order => order.status === 'Confirmed').length
  }</p>
</div>
      <p>View orders created from accepted buyer enquiries.</p>

      <button onClick={fetchOrders}>
        Refresh Orders
      </button>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No confirmed orders yet. Accept a buyer enquiry to create an order.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              padding: '20px',
              margin: '15px 0',
              background: '#f0f7ed',
              borderRadius: '12px'
            }}
          >
            <h3>Order #{order.id}</h3>
            <p>Enquiry Reference: #{order.enquiry_id}</p>
            <p>Buyer: {order.buyer_name}</p>
           <p>
  Status:
  <span style={{
    background: '#c8e6c9',
    color: '#1b5e20',
    padding: '5px 12px',
    borderRadius: '20px',
    marginLeft: '8px',
    fontWeight: 'bold'
  }}>
    {order.status}
  </span>
</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
