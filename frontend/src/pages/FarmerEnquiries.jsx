import { useEffect, useState } from 'react'
import {
  getEnquiries,
  updateEnquiryStatus
} from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function FarmerEnquiries() {
  const { t } = useLanguage()

  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const fetchEnquiries = async () => {
    try {
      setError('')
      const response = await getEnquiries()
      setEnquiries(response.data)
    } catch (err) {
      console.error('Enquiry error:', err)
      setError(t('enquiriesError'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()

    const interval = setInterval(fetchEnquiries, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleStatus = async (id, status) => {
    try {
      setUpdatingId(id)

      await updateEnquiryStatus(id, status)
      await fetchEnquiries()

      alert(
        status === 'Accepted'
          ? t('enquiryAcceptSuccess')
          : t('enquiryRejectSuccess')
      )
    } catch (err) {
      console.error('Status update error:', err)
      alert(t('enquiryUpdateError'))
    } finally {
      setUpdatingId(null)
    }
  }

  const pending = enquiries.filter(
    item => item.status === 'Pending'
  ).length

  const accepted = enquiries.filter(
    item => item.status === 'Accepted'
  ).length

  const rejected = enquiries.filter(
    item => item.status === 'Rejected'
  ).length

  const getStatusColor = status => {
    if (status === 'Accepted') return '#d4edda'
    if (status === 'Rejected') return '#f8d7da'
    return '#fff3cd'
  }

  const getStatusLabel = status => {
    if (status === 'Accepted') return t('accepted')
    if (status === 'Rejected') return t('rejected')
    return t('pending')
  }

  return (
    <div style={{ padding: '25px' }}>
      <h1>📩 {t('farmerEnquiries')}</h1>
      <p>{t('manageBuyerMessages')}</p>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          margin: '20px 0'
        }}
      >
        <div className="stat-card">
          <h3>{t('totalEnquiries')}</h3>
          <h2>{enquiries.length}</h2>
        </div>

        <div className="stat-card">
          <h3>⏳ {t('pending')}</h3>
          <h2>{pending}</h2>
        </div>

        <div className="stat-card">
          <h3>✅ {t('accepted')}</h3>
          <h2>{accepted}</h2>
        </div>

        <div className="stat-card">
          <h3>❌ {t('rejected')}</h3>
          <h2>{rejected}</h2>
        </div>
      </div>

      <button
        onClick={fetchEnquiries}
        style={{ padding: '10px 18px', cursor: 'pointer' }}
      >
        🔄 {t('refreshEnquiries')}
      </button>

      {loading ? (
        <p>{t('loadingEnquiries')}</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : enquiries.length === 0 ? (
        <p>{t('noBuyerEnquiries')}</p>
      ) : (
        enquiries.map(item => (
          <div
            key={item.id}
            style={{
              padding: '20px',
              margin: '15px 0',
              background: '#f0f7ed',
              borderRadius: '12px',
              border: '1px solid #c8dfc1'
            }}
          >
            <h3>
              {t('buyer')}: {item.buyer_name}
            </h3>

            <p>
              {t('crop')}: {item.crop_name || ('Crop #' + item.crop_id)}
            </p>

            <p>
              {t('message')}: {item.message || t('noMessage')}
            </p>

            <p>
              {t('status')}:{' '}
              <strong
                style={{
                  background: getStatusColor(item.status),
                  padding: '5px 12px',
                  borderRadius: '15px'
                }}
              >
                {getStatusLabel(item.status)}
              </strong>
            </p>

            {item.status === 'Pending' && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px'
                }}
              >
                <button
                  disabled={updatingId === item.id}
                  onClick={() => handleStatus(item.id, 'Accepted')}
                >
                  {updatingId === item.id
                    ? t('updating')
                    : '✅ ' + t('accept')}
                </button>

                <button
                  disabled={updatingId === item.id}
                  onClick={() => handleStatus(item.id, 'Rejected')}
                >
                  ❌ {t('reject')}
                </button>
              </div>
            )}

            {item.status === 'Accepted' && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                ✅ {t('orderCreatedFromEnquiry')}
              </p>
            )}

            {item.status === 'Rejected' && (
              <p style={{ color: '#b00020', fontWeight: 'bold' }}>
                {t('enquiryRejectedMessage')}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default FarmerEnquiries