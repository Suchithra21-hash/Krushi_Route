
import { useEffect, useState } from 'react'
import './MyCrops.css'
import AddCrop from '../components/AddCrop'
import { getCrops } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function MyCrops() {
  const { t } = useLanguage()

  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true)

      try {
        const response = await getCrops()

        // Support both direct arrays and { data: [...] }
        const cropList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : []

        setCrops(cropList)
      } catch (error) {
        console.error('Unable to load crops:', error)
        setCrops([])
      } finally {
        setLoading(false)
      }
    }

    fetchCrops()
  }, [refreshKey])

  return (
    <div className="my-crops-page">
      <header>
        <h1>🌾 {t('myCrops')}</h1>
        <p>{t('manageFarmProduce')}</p>
      </header>

      <AddCrop
        onCropAdded={() => setRefreshKey(key => key + 1)}
      />

      <section className="saved-crops">
        <h2>{t('registeredCrops')}</h2>

        {loading ? (
          <p>{t('loadingYourCrops')}</p>
        ) : crops.length === 0 ? (
          <p>{t('noRegisteredCrops')}</p>
        ) : (
          <div className="saved-crop-grid">
            {crops.map((crop, index) => (
              <article
                className="saved-crop-card"
                key={crop.id ?? index}
              >
                <h3>🌱 {crop.name}</h3>

                <p>
                  <strong>{t('variety')}:</strong> {crop.variety || '—'}
                </p>

                <p>
                  <strong>{t('area')}:</strong> {crop.area ?? '—'} {t('acres')}
                </p>

                <p>
                  <strong>{t('quantity')}:</strong> {crop.quantity ?? '—'} kg
                </p>

                <p>
                  <strong>{t('harvest')}:</strong> {crop.harvestDate || '—'}
                </p>

                <p>
                  <strong>{t('farmer')}:</strong>{' '}
                  {crop.farmerName || t('notProvided')}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default MyCrops
