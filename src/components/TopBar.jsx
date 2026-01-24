import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import './TopBar.css'

const TopBar = () => {
  const { t } = useLanguage()
  const [exchangeRates, setExchangeRates] = useState({
    cny: '12.50',
    usd: '92.30',
    date: new Date().toLocaleDateString('ru-RU')
  })

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', { mode: 'cors' })
        if (!response.ok) throw new Error('API Error')
        const data = await response.json()
        const usdRate = (data.Valute?.USD?.Value * 1.03).toFixed(2)
        const cnyRate = (data.Valute?.CNY?.Value * 1.03).toFixed(2)
        
        setExchangeRates({
          cny: cnyRate,
          usd: usdRate,
          date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
        })
      } catch (error) {
        console.error('Rates fetch failed', error)
      }
    }
    fetchExchangeRates()
  }, [])

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <LanguageSwitcher />
            <span className="divider">|</span>
            <span className="working-hours">{t('workingHours')}</span>
          </div>
          
          <div className="top-bar-right">
            <div className="exchange-rates">
              <span className="rate-item">CNY/RUB {exchangeRates.cny}</span>
              <span className="rate-item">USD/RUB {exchangeRates.usd}</span>
            </div>
            <span className="divider">|</span>
            <a href="tel:+79315084299" className="top-phone">+7 (931) 508-42-99</a>
            <div className="top-socials">
              <a href="#" className="social-icon">W</a>
              <a href="#" className="social-icon">T</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
