
import { useState } from 'react'
import './AddCrop.css'
import { addCrop } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function AddCrop({ onCropAdded }) {
  const { t } = useLanguage()

  const [crop, setCrop] = useState({
    name: '',
    variety: '',
    area: '',
    harvestDate: '',
    quantity: '',
    farmerName: ''
  })

  const handleChange = (e) => {
    setCrop({
      ...crop,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      Number(crop.area) <= 0 ||
      Number(crop.quantity) <= 0
    ) {
      alert(t('validAreaQuantity'))
      return
    }

    try {
      await addCrop({
        ...crop,
        area: Number(crop.area),
        quantity: Number(crop.quantity)
      })

      alert(t('cropSaved'))

      if (onCropAdded) {
        onCropAdded()
      }

      setCrop({
        name: '',
        variety: '',
        area: '',
        harvestDate: '',
        quantity: '',
        farmerName: ''
      })
    } catch (error) {
      console.error('Crop registration error:', error)
      alert(t('cropSaveError'))
    }
  }

  return (
    <div className="add-crop-container">
      <div className="add-crop-card">
        <h2>🌱 {t('addNewCrop')}</h2>
        <p>{t('addCropDescription')}</p>

        <form onSubmit={handleSubmit}>
          <label>{t('farmerName')}</label>
          <input
            type="text"
            name="farmerName"
            placeholder={t('enterFarmerName')}
            value={crop.farmerName}
            onChange={handleChange}
            required
          />

          <label>{t('cropName')}</label>
          <input
            type="text"
            name="name"
            placeholder={t('enterCropName')}
            value={crop.name}
            onChange={handleChange}
            required
          />

          <label>{t('cropVariety')}</label>
          <input
            type="text"
            name="variety"
            placeholder={t('enterCropVariety')}
            value={crop.variety}
            onChange={handleChange}
            required
          />

          <label>{t('landAreaAcres')}</label>
          <input
            type="number"
            name="area"
            placeholder={t('enterLandArea')}
            min="0.01"
            step="0.01"
            value={crop.area}
            onChange={handleChange}
            required
          />

          <label>{t('expectedHarvestDate')}</label>
          <input
            type="date"
            name="harvestDate"
            value={crop.harvestDate}
            onChange={handleChange}
            required
          />

          <label>{t('expectedQuantityKg')}</label>
          <input
            type="number"
            name="quantity"
            placeholder={t('enterExpectedQuantity')}
            min="1"
            step="1"
            value={crop.quantity}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {t('saveCrop')} 🌾
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCrop
