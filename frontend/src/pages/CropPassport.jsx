
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './CropPassport.css'

// Demo farmer database for hackathon prototype
const farmerDatabase = [
  {
    id: 'FR-2026-001',
    name: 'Ramesh Kumar',
    location: 'Mysuru, Karnataka',
    registrationType: 'Demo Farmer Registration',
    status: 'Active'
  },
  {
    id: 'FR-2026-002',
    name: 'Lakshmi Devi',
    location: 'Mandya, Karnataka',
    registrationType: 'Demo Farmer Registration',
    status: 'Active'
  },
  {
    id: 'FR-2026-003',
    name: 'Suresh Gowda',
    location: 'Hassan, Karnataka',
    registrationType: 'Demo Farmer Registration',
    status: 'Active'
  },
  {
    id: 'FR-2026-004',
    name: 'Geetha',
    location: 'Chamarajanagar, Karnataka',
    registrationType: 'Demo Farmer Registration',
    status: 'Active'
  }
]

function CropPassport() {
  const [farmerId, setFarmerId] = useState('')
  const [verifiedFarmer, setVerifiedFarmer] = useState(null)
  const [message, setMessage] = useState('')

  const handleVerify = () => {
    const enteredId = farmerId.trim().toUpperCase()

    if (!enteredId) {
      setVerifiedFarmer(null)
      setMessage('Please enter your Farmer Registration ID.')
      return
    }

    const farmer = farmerDatabase.find(
      item => item.id === enteredId && item.status === 'Active'
    )

    if (farmer) {
      setVerifiedFarmer(farmer)
      setMessage('Farmer record found in the demo database!')
    } else {
      setVerifiedFarmer(null)
      setMessage('Farmer ID not found. Please check your registration number.')
    }
  }

  const passportData = verifiedFarmer
    ? JSON.stringify({
        farmerId: verifiedFarmer.id,
        name: verifiedFarmer.name,
        location: verifiedFarmer.location,
        registrationType: verifiedFarmer.registrationType,
        status: verifiedFarmer.status,
        verification: 'Demo database match only'
      })
    : ''

  const downloadQR = () => {
    const svg = document.querySelector('.qr-container svg')

    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${verifiedFarmer.id}-passport.svg`
    link.click()

    URL.revokeObjectURL(url)
  }

  const resetVerification = () => {
    setFarmerId('')
    setVerifiedFarmer(null)
    setMessage('')
  }

  return (
    <div className="crop-passport">
      <header>
        <h1>🪪 Digital Farmer Passport</h1>
        <p>Farmer identity and registration verification system.</p>
      </header>

      <section className="passport-banner">
        <h2>One ID. One Verified Farmer Record.</h2>
        <p>
          Enter your Farmer Registration ID to check your record
          and generate your Digital Farmer Passport.
        </p>
      </section>

      <div className="farmer-verification">
        <h2>🔐 Verify Farmer Identity</h2>

        <label htmlFor="farmer-id">Farmer Registration ID</label>

        <input
          id="farmer-id"
          type="text"
          placeholder="Example: FR-2026-001"
          value={farmerId}
          onChange={e => {
            setFarmerId(e.target.value)
            setVerifiedFarmer(null)
            setMessage('')
          }}
        />

        <button type="button" onClick={handleVerify}>
          Verify Farmer ID
        </button>

        {message && (
          <p className={verifiedFarmer ? 'success-message' : 'error-message'} role="status">
            {message}
          </p>
        )}

        <p className="passport-note">
          Demo IDs: FR-2026-001, FR-2026-002,
          FR-2026-003 and FR-2026-004.
        </p>
      </div>

      {verifiedFarmer && (
        <div className="passport-layout">
          <section className="passport-details">
            <h2>✅ Farmer Identity Details</h2>

            <div className="verified-status">
              <span>●</span> Record Found in Demo Database
            </div>

            <p><strong>Farmer Name:</strong> {verifiedFarmer.name}</p>
            <p><strong>Registration ID:</strong> {verifiedFarmer.id}</p>
            <p><strong>Location:</strong> {verifiedFarmer.location}</p>
            <p><strong>Registration Type:</strong> {verifiedFarmer.registrationType}</p>
            <p><strong>Account Status:</strong> {verifiedFarmer.status}</p>

            <button type="button" onClick={resetVerification}>
              Verify Another Farmer
            </button>
          </section>

          <section className="passport-qr">
            <h2>Digital Farmer Passport QR</h2>

            <div className="qr-container">
              <QRCodeSVG
                value={passportData}
                size={210}
                level="M"
                includeMargin
              />
            </div>

            <h3>{verifiedFarmer.name}</h3>
            <p>{verifiedFarmer.id}</p>
            <p>Scan to view the demo farmer registration details.</p>

            <button type="button" onClick={downloadQR}>
              ⬇️ Download Farmer QR
            </button>

            <button type="button" onClick={() => window.print()}>
              🖨️ Print Farmer Passport
            </button>
          </section>
        </div>
      )}

      <p className="passport-note">
        Hackathon prototype: verification uses sample records only.
        It does not establish government registration or independently
        prove that a person is a farmer.
      </p>
    </div>
  )
}

export default CropPassport
