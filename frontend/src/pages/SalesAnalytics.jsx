
import { useEffect, useState } from 'react'
import { getOrders } from '../services/api'
import './SalesAnalytics.css'

function SalesAnalytics() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getOrders()
        setOrders(response.data)
      } catch (err) {
        console.error('Sales loading error:', err)
        setError('Unable to load sales data.')
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  const deliveredOrders = orders.filter(
    order => order.status === 'Delivered'
  )

  const totalOrders = orders.length
  const completedOrders = deliveredOrders.length

  return (
    <div className="sales-page">
      <h1>📊 Sales Analytics</h1>
      <p>Track your crop orders and sales performance.</p>

      {loading ? (
        <p>Loading sales data...</p>
      ) : error ? (
        <p className="sales-error">{error}</p>
      ) : (
        <>
          <div className="sales-summary">
            <div className="sales-card">
              <h3>Total Orders</h3>
              <h2>{totalOrders}</h2>
            </div>

            <div className="sales-card">
              <h3>Delivered Orders</h3>
              <h2>{completedOrders}</h2>
            </div>

            <div className="sales-card">
              <h3>Pending Orders</h3>
              <h2>{totalOrders - completedOrders}</h2>
            </div>
          </div>

          <h2>Delivered Sales History</h2>

          {deliveredOrders.length === 0 ? (
            <p>No completed sales yet.</p>
          ) : (
            <div className="sales-table-wrapper">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Crop</th>
                    <th>Buyer</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {deliveredOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.crop_name}</td>
                      <td>{order.buyer_name}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SalesAnalytics
