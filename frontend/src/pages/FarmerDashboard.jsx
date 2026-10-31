
import { useEffect, useState, useRef } from 'react'
import './FarmerDashboard.css'

import { getCrops, getOrders, getEnquiries } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

import WeatherForecast from './WeatherForecast'
import FarmerEnquiries from './FarmerEnquiries'
import MyOrders from './MyOrders'
import ManageOrders from './ManageOrders'
import MyCrops from './MyCrops'
import MarketIntelligence from './MarketIntelligence'
import SmartLogistics from './SmartLogistics'
import SmartAllocation from './SmartAllocation'
import GroupSelling from './GroupSelling'
import FutureHarvest from './FutureHarvest'
import CropRescue from './CropRescue'
import CropPassport from './CropPassport'
import CropDemand from './CropDemand'
import SmartIrrigation from './SmartIrrigation'
import CropRecommendation from './CropRecommendation'
import ProfitCalculator from './ProfitCalculator'
import FarmerNotifications from './FarmerNotifications'
import SalesAnalytics from './SalesAnalytics'

const API_URL = 'http://127.0.0.1:8001'

function FarmerDashboard() {
  const [activeSection, setActiveSection] = useState('My Crops')
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState('Ready')
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const recognitionRef = useRef(null)
  const { t, language } = useLanguage()

  const speechLanguage =
    language === 'Kannada' ? 'kn-IN' :
    language === 'Hindi' ? 'hi-IN' : 'en-IN'

  useEffect(() => {
    Promise.all([getCrops(), getOrders(), getEnquiries()])
      .catch(error => console.error('Dashboard loading error:', error))

    return () => {
      recognitionRef.current?.stop()
      window.speechSynthesis?.cancel()
    }
  }, [])

  const speak = (message) => {
    if (!window.speechSynthesis) {
      setStatus('Speech playback unavailable')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(message)
    speech.lang = speechLanguage
    speech.rate = 0.92

    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(item =>
      item.lang.toLowerCase().startsWith(speechLanguage.slice(0, 2))
    )

    if (voice) speech.voice = voice

    speech.onstart = () => setStatus('Speaking...')
    speech.onend = () => setStatus('Ready')
    speech.onerror = () => setStatus('Speech playback unavailable')

    window.speechSynthesis.speak(speech)
  }

  const sendMessage = async (text) => {
    const userMessage = text.trim()
    if (!userMessage || isThinking) return

    recognitionRef.current?.stop()
    setIsListening(false)
    window.speechSynthesis?.cancel()
    setQuestion('')
    setMessages(previous => [
      ...previous,
      { role: 'user', content: userMessage }
    ])
    setIsThinking(true)
    setStatus('Thinking...')

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          language: 'auto',
          history: messages.slice(-10).map(item => ({
            role: item.role,
            content: item.content
          }))
        })
      })

      const data = await response.json()

      if (!response.ok || !data.reply) {
        throw new Error(data.detail || 'AI response unavailable')
      }

      setMessages(previous => [
        ...previous,
        { role: 'assistant', content: data.reply }
      ])

      speak(data.reply)
    } catch (error) {
      console.error('Krushi AI error:', error)
      setStatus('Connection error. Check backend.')
    } finally {
      setIsThinking(false)
    }
  }

  const startVoiceAssistant = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setStatus('Voice input unsupported. Please type.')
      return
    }

    window.speechSynthesis?.cancel()

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.lang = speechLanguage
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setStatus('Listening...')
    }

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      sendMessage(spokenText)
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      setStatus(
        event.error === 'not-allowed'
          ? 'Allow microphone access in browser.'
          : 'Could not hear you. Try again.'
      )
    }

    recognition.onend = () => {
      setIsListening(false)
      recognitionRef.current = null
    }

    try {
      recognition.start()
    } catch (error) {
      console.error(error)
      setStatus('Could not start microphone. Try again.')
      setIsListening(false)
    }
  }

  const stopVoiceAssistant = () => {
    recognitionRef.current?.stop()
    window.speechSynthesis?.cancel()
    setIsListening(false)
    setStatus('Ready')
  }

  const menuItems = [
    { name: 'My Crops', label: 'myCrops', icon: '🌾' },
    { name: 'Farmer Enquiries', label: 'enquiries', icon: '📩' },
    { name: 'Market Prices', label: 'marketPrices', icon: '📊' },
    { name: 'Weather Forecast', label: 'Weather Forecast', icon: '🌦️' },
    { name: 'Crop Demand', label: 'Crop Demand', icon: '📈' },
    { name: 'Smart Irrigation', label: 'Smart Irrigation', icon: '💧' },
    { name: 'Crop Recommendation', label: 'Crop Recommendation', icon: '🌱' },
    { name: 'Profit Calculator', label: 'Profit Calculator', icon: '💰' },
    { name: 'Farmer Notifications', label: 'Farmer Notifications', icon: '🔔' },
    { name: 'Sales Analytics', label: 'Sales Analytics', icon: '📊' },
    { name: 'Smart Allocation', label: 'smartAllocation', icon: '🎯' },
    { name: 'Smart Logistics', label: 'smartLogistics', icon: '🚚' },
    { name: 'Group Selling', label: 'groupSelling', icon: '🤝' },
    { name: 'Future Harvest', label: 'futureHarvest', icon: '📅' },
    { name: 'Crop Rescue', label: 'cropRescue', icon: '🚨' },
    { name: 'Crop Passport', label: 'cropPassport', icon: '📱' },
    { name: 'My Orders', label: 'orders', icon: '📦' },
    { name: 'Manage Orders', label: 'manageOrders', icon: '🛠️' }
  ]

  const renderFeature = () => {
    switch (activeSection) {
      case 'My Crops': return <MyCrops />
      case 'Farmer Enquiries': return <FarmerEnquiries />
      case 'My Orders': return <MyOrders />
      case 'Manage Orders': return <ManageOrders />
      case 'Market Prices': return <MarketIntelligence />
      case 'Smart Allocation': return <SmartAllocation />
      case 'Smart Logistics': return <SmartLogistics />
      case 'Group Selling': return <GroupSelling />
      case 'Future Harvest': return <FutureHarvest />
      case 'Crop Rescue': return <CropRescue />
      case 'Crop Passport': return <CropPassport />
      case 'Weather Forecast': return <WeatherForecast />
      case 'Crop Demand': return <CropDemand />
      case 'Smart Irrigation': return <SmartIrrigation />
      case 'Crop Recommendation': return <CropRecommendation />
      case 'Profit Calculator': return <ProfitCalculator />
      case 'Farmer Notifications': return <FarmerNotifications />
      case 'Sales Analytics': return <SalesAnalytics />
      default: return <MyCrops />
    }
  }

  return (
    <div className="farmer-dashboard">
      <aside className="farmer-sidebar">
        <h2>🌱 Krushi-Route</h2>
        <p className="sidebar-label">{t('menu')}</p>

        <nav>
          {menuItems.map(item => (
            <a
              key={item.name}
              href="#"
              className={activeSection === item.name ? 'active' : ''}
              onClick={event => {
                event.preventDefault()
                setActiveSection(item.name)
              }}
            >
              {item.icon} {t(item.label)}
            </a>
          ))}
        </nav>

        <p className="sidebar-footer">{t('tagline')}</p>
      </aside>

      <main className="farmer-main">

        {/* Compact Voice Assistant */}
        <section className="krushi-mini-assistant">
          <span className="krushi-mini-icon">🌱</span>

          <button
            type="button"
            className={`krushi-mini-mic ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopVoiceAssistant : startVoiceAssistant}
            disabled={isThinking}
            title="Speak to Krushi AI"
          >
            {isListening ? '⏹' : '🎙️'}
          </button>

          <span className="krushi-mini-status">{status}</span>

          <form
            className="krushi-mini-form"
            onSubmit={event => {
              event.preventDefault()
              sendMessage(question)
            }}
          >
            <input
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder="Ask Krushi AI..."
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={isThinking || !question.trim()}
            >
              {isThinking ? '...' : 'Send'}
            </button>
          </form>
        </section>

        {messages.length > 0 && (
          <div className="krushi-mini-reply">
            <strong>
              {messages[messages.length - 1].role === 'assistant'
                ? 'Krushi AI:'
                : 'You:'}
            </strong>
            <span>{messages[messages.length - 1].content}</span>

            {messages[messages.length - 1].role === 'assistant' && (
              <button
                type="button"
                onClick={() => speak(messages[messages.length - 1].content)}
              >
                🔊
              </button>
            )}
          </div>
        )}

        <section className="farmer-feature-content">
          {renderFeature()}
        </section>
      </main>
    </div>
  )
}

export default FarmerDashboard
