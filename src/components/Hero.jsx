import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-video-bg">
        <div className="hero-overlay"></div>
      </div>
      {/* Фоновые текстуры в стиле туши/гор (китайская живопись) */}
      <div className="hero-ink-bg" aria-hidden="true">
        <svg className="hero-ink-layer hero-ink-layer-1" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 400 Q200 200 400 350 T800 300" stroke="currentColor" strokeWidth="80" strokeLinecap="round" opacity="0.04" />
        </svg>
        <svg className="hero-ink-layer hero-ink-layer-2" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 500 Q400 100 700 400" stroke="currentColor" strokeWidth="120" strokeLinecap="round" opacity="0.03" />
        </svg>
        <svg className="hero-ink-layer hero-ink-layer-3" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="500" cy="200" rx="200" ry="120" opacity="0.025" fill="currentColor" />
        </svg>
      </div>
      
      <div className="container">
        <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="hero-tag">
            {language === 'ru' ? 'Международная логистика с душой' : '有灵魂的国际物流'}
          </div>
          <h1 className="hero-title">
            {language === 'ru' 
              ? 'Надежные решения для вашего бизнеса'
              : '为您业务提供可靠解决方案'}
          </h1>
          <p className="hero-subtitle">
            {language === 'ru' 
              ? 'Организация сложных цепей поставок из Китая в Россию. Экспедирование, таможня и доставка «от двери до двери».'
              : '组织从中国到俄罗斯的复杂供应链。货运代理、海关和门到门配送。'}
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToForm}>
              {language === 'ru' ? 'Рассчитать стоимость' : '计算费用'}
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="hero-bottom-bar">
        <div className="container">
          <div className="bottom-bar-grid">
            <div className="bar-item"><span>01</span> {language === 'ru' ? 'Морской сервис' : '海运服务'}</div>
            <div className="bar-item"><span>02</span> {language === 'ru' ? 'Железнодорожный сервис' : '铁路服务'}</div>
            <div className="bar-item"><span>03</span> {language === 'ru' ? 'Автоперевозки' : '汽车运输'}</div>
            <div className="bar-item"><span>04</span> {language === 'ru' ? 'Таможенное оформление' : '海关清关'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
