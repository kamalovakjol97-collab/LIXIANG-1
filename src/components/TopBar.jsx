import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './TopBar.css'

const TopBar = () => {
  const { t, language } = useLanguage()
  const [exchangeRates, setExchangeRates] = useState({
    cny: '12.50',
    usd: '92.30',
    date: new Date().toLocaleDateString('ru-RU')
  })

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // Получаем курс ЦБ РФ
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        const data = await response.json()
        
        // USD к RUB (ЦБ + 3%)
        const usdRate = (data.Valute.USD.Value * 1.03).toFixed(2)
        
        // CNY к RUB через USD (ЦБ + 3%)
        // 1 CNY = USD/CNY * USD/RUB
        const cnyToUsd = data.Valute.CNY?.Value || 7.2 // Если нет CNY, используем примерное значение
        const cnyRate = ((1 / cnyToUsd) * data.Valute.USD.Value * 1.03).toFixed(2)
        
        setExchangeRates({
          cny: cnyRate,
          usd: usdRate,
          date: new Date().toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        })
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
        // Используем значения по умолчанию при ошибке
        setExchangeRates({
          cny: '12.50',
          usd: '92.30',
          date: new Date().toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        })
      }
    }

    fetchExchangeRates()
    // Обновляем каждые 4 часа
    const interval = setInterval(fetchExchangeRates, 4 * 60 * 60 * 1000)
    
    return () => clearInterval(interval)
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
              <span className="rate-date">{exchangeRates.date}</span>
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
