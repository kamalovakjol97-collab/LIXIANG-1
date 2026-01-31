import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import ParallaxJourney from '../components/ParallaxJourney'
import './HistoryPage.css'

const HistoryPage = () => {
  const { language } = useLanguage()

  return (
    <div className="history-page">
      <div className="history-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Наша история' : '我们的历史'}</span>
          </div>
          <h1 className="history-page-title">
            {language === 'ru' ? 'Наша история' : '我们的历史'}
          </h1>
          <p className="history-hero-subtitle">
            {language === 'ru'
              ? 'Листайте вниз — путешествие от первого грузовика до современной логистики'
              : '向下滚动 — 从第一辆卡车到现代物流的旅程'}
          </p>
        </div>
      </div>

      <ParallaxJourney />
    </div>
  )
}

export default HistoryPage
