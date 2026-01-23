import { useLanguage } from '../context/LanguageContext'
import './Geography.css'

const Geography = () => {
  const { t, language } = useLanguage()

  return (
    <section className="geography">
      <div className="container">
        <h2 className="section-title">{t('geography')}</h2>
        <div className="geography-content">
          <div className="geography-visual">
            <div className="location location-china">
              <span className="location-label">{language === 'ru' ? 'Китай' : '中国'}</span>
            </div>
            <div className="route-line">
              <div className="route-arrow">→</div>
            </div>
            <div className="location location-transit">
              <span className="location-label">{language === 'ru' ? 'транзит' : '过境'}</span>
            </div>
            <div className="route-line">
              <div className="route-arrow">→</div>
            </div>
            <div className="location location-russia">
              <span className="location-label">{language === 'ru' ? 'Россия' : '俄罗斯'}</span>
            </div>
          </div>
          <p className="geography-text">
            {language === 'ru' 
              ? 'Основное направление — логистика из Китая в Россию и обратно'
              : '主要方向 — 从中国到俄罗斯及反向的物流'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Geography
