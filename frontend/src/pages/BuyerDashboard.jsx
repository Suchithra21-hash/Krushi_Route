
import BuyerOrders from './BuyerOrders'
import { useEffect, useState } from 'react'
import './BuyerDashboard.css'
import { useLanguage } from '../context/LanguageContext'
import {
  getCrops,
  sendEnquiry,
  getEnquiries,
  getOrders
} from '../services/api'

function BuyerDashboard() {
  const { t } = useLanguage()

  const [crops, setCrops] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Crops')

  const fetchCrops = async () => {
    try {
      const response = await getCrops()
      setCrops(response.data)
    } catch (error) {
      console.error('Unable to fetch crops:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEnquiries = async () => {
    try {
      const response = await getEnquiries()
      setEnquiries(response.data)
    } catch (error) {
      console.error('Unable to fetch enquiries:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Unable to fetch orders:', error)
    }
  }

  const refreshDashboard = async () => {
    await Promise.all([
      fetchCrops(),
      fetchEnquiries(),
      fetchOrders()
    ])
  }

  useEffect(() => {
    refreshDashboard()
    const interval = setInterval(refreshDashboard, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleEnquiry = async (cropId) => {
    const buyerName = prompt(t('enterName'))
    if (!buyerName || !buyerName.trim()) return

    const message = prompt(t('enterEnquiry'))
    if (!message || !message.trim()) return

    try {
      const response = await sendEnquiry({
        crop_id: cropId,
        buyer_name: buyerName.trim(),
        message: message.trim()
      })

      alert(response.data.message)
      await fetchEnquiries()
      setActiveTab('Enquiries')
    } catch (error) {
      console.error('Enquiry error:', error)
      alert(t('enquiryError'))
    }
  }

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  )

  const pendingEnquiries = enquiries.filter(
    item => item.status === 'Pending'
  ).length

  const acceptedEnquiries = enquiries.filter(
    item => item.status === 'Accepted'
  ).length

  const rejectedEnquiries = enquiries.filter(
    item => item.status === 'Rejected'
  ).length

  return (
    <div className="buyer-dashboard">
      <header className="buyer-header">
        <div>
          <h1>🛒 {t('buyerDashboard')}</h1>
          <p>{t('buyerSubtitle')}</p>
        </div>
        <span className="buyer-status">{t('buyerPortal')}</span>
      </header>

      <section className="buyer-welcome">
        <h2>{t('buyerWelcome')}</h2>
        <p>{t('buyerWelcomeMessage')}</p>
      </section>

      <section style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        margin: '20px 0'
      }}>
        <div className="stat-card">
          <h3>🌾 {t('availableCrops')}</h3>
          <h2>{crops.length}</h2>
        </div>

        <div className="stat-card">
          <h3>📩 {t('myEnquiries')}</h3>
          <h2>{enquiries.length}</h2>
        </div>

        <div className="stat-card">
          <h3>⏳ {t('pending')}</h3>
          <h2>{pendingEnquiries}</h2>
        </div>

        <div className="stat-card">
          <h3>📦 {t('totalOrders')}</h3>
          <h2>{orders.length}</h2>
        </div>
      </section>

      <div style={{
        display: 'flex',
        gap: '12px',
        margin: '20px 0',
        flexWrap: 'wrap'
      }}>
        <button onClick={() => setActiveTab('Crops')}>
          🌾 {t('availableCrops')}
        </button>

        <button onClick={() => {
          fetchEnquiries()
          setActiveTab('Enquiries')
        }}>
          📩 {t('myEnquiries')}
        </button>

        <button onClick={() => setActiveTab('Orders')}>
          📦 {t('myOrders')}
        </button>

        <button onClick={refreshDashboard}>
          🔄 {t('refreshDashboard')}
        </button>
      </div>

      {activeTab === 'Crops' ? (
        <section className="buyer-crop-section">
          <h2>🌾 {t('availableFarmerCrops')}</h2>

          <input
            type="text"
            placeholder={t('searchCrops')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {loading ? (
            <p>{t('loadingCrops')}</p>
          ) : (
            <div className="buyer-crop-grid">
              {filteredCrops.map(crop => (
                <article className="buyer-crop-card" key={crop.id}>
                  <h3>{crop.name}</h3>
                  <p>{t('variety')}: {crop.variety}</p>
                  <p>{t('quantity')}: {crop.quantity} kg</p>
                  <p>{t('landArea')}: {crop.area} acres</p>
                  <p>{t('harvestDate')}: {crop.harvestDate}</p>
                  <p>{t('farmer')}: {crop.farmerName || t('notProvided')}</p>

                  <button onClick={() => handleEnquiry(crop.id)}>
                    {t('sendEnquiry')}
                  </button>
                </article>
              ))}

              {filteredCrops.length === 0 && (
                <p>{t('noCropsAvailable')}</p>
              )}
            </div>
          )}
        </section>
      ) : activeTab === 'Enquiries' ? (
        <section className="buyer-crop-section">
          <h2>📩 {t('myEnquiries')}</h2>

          <div style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            margin: '15px 0'
          }}>
            <div className="stat-card">
              <h3>{t('total')}</h3>
              <h2>{enquiries.length}</h2>
            </div>
            <div className="stat-card">
              <h3>{t('pending')}</h3>
              <h2>{pendingEnquiries}</h2>
            </div>
            <div className="stat-card">
              <h3>{t('accepted')}</h3>
              <h2>{acceptedEnquiries}</h2>
            </div>
            <div className="stat-card">
              <h3>{t('rejected')}</h3>
              <h2>{rejectedEnquiries}</h2>
            </div>
          </div>

          <button onClick={fetchEnquiries}>
            {t('refreshEnquiries')}
          </button>

          {enquiries.length === 0 ? (
            <p>{t('noEnquiries')}</p>
          ) : (
            enquiries.map(item => (
              <article
                className="buyer-crop-card"
                key={item.id}
                style={{ margin: '15px 0', padding: '18px' }}
              >
                <h3>{item.crop_name}</h3>
                <p>{t('buyer')}: {item.buyer_name}</p>
                <p>{t('message')}: {item.message || t('noMessage')}</p>
                <p>{t('status')}: <strong>{item.status}</strong></p>

                {item.status === 'Accepted' && (
                  <p style={{ color: 'green', fontWeight: 'bold' }}>
                    ✅ {t('enquiryAccepted')}
                  </p>
                )}

                {item.status === 'Rejected' && (
                  <p style={{ color: 'red', fontWeight: 'bold' }}>
                    ❌ {t('enquiryRejected')}
                  </p>
                )}

                {item.status === 'Pending' && (
                  <p style={{ color: '#b7791f', fontWeight: 'bold' }}>
                    ⏳ {t('waitingFarmer')}
                  </p>
                )}
              </article>
            ))
          )}
        </section>
      ) : (
        <BuyerOrders />
      )}
    </div>
  )
}

export default BuyerDashboard
