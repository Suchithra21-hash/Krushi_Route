
import { useState } from 'react'
import FarmerDashboard from './pages/FarmerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import {
  LanguageProvider,
  useLanguage
} from './context/LanguageContext'
import './App.css'

function MainApp() {
  const [role, setRole] = useState('farmer')
  const { language, setLanguage, t } = useLanguage()

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        padding: '15px',
        background: '#e8f5e9'
      }}>
        <button
          onClick={() => setRole('farmer')}
          style={{ padding: '12px 25px', cursor: 'pointer' }}
        >
          👨‍🌾 {t('farmer')}
        </button>

        <button
          onClick={() => setRole('buyer')}
          style={{ padding: '12px 25px', cursor: 'pointer' }}
        >
          🛒 {t('buyer')}
        </button>

        <label>
          {t('language')}:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '10px',
              marginLeft: '8px',
              borderRadius: '6px'
            }}
          >
            <option value="English">English</option>
            <option value="Kannada">ಕನ್ನಡ</option>
            <option value="Hindi">हिन्दी</option>
          </select>
        </label>
      </div>

      {role === 'farmer' ? (
        <FarmerDashboard />
      ) : (
        <BuyerDashboard />
      )}
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  )
}

export default App
