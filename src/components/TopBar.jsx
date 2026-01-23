import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './TopBar.css'

const TopBar = () => {
  const { t, language } = useLanguage()
  const [exchangeRates, setExchangeRates] = useState({
    cny: '12.50',
    usd: '92.30'
  })

  // В реальном проекте здесь будет API запрос к курсу валют
  useEffect(() => {
    // Можно добавить реальный API для получения курса валют
    // Например: fetch('https://api.exchangerate-api.com/v4/latest/CNY')
  }, [])

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span className="working-hours">{t('workingHours')}</span>
          </div>
          <div className="top-bar-right">
            <div className="exchange-rates">
              <span className="rate-item">
                <span className="rate-label">CNY/RUB:</span>
                <span className="rate-value">{exchangeRates.cny}</span>
              </span>
              <span className="rate-divider">|</span>
              <span className="rate-item">
                <span className="rate-label">USD/RUB:</span>
                <span className="rate-value">{exchangeRates.usd}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
