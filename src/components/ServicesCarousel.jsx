import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './ServicesCarousel.css'

const ServicesCarousel = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const services = [
    {
      id: 'auto',
      title: language === 'ru' ? 'Автоперевозки' : '汽车运输',
      description: language === 'ru' 
        ? 'Автоперевозки из Китая и по РФ — надёжная доставка грузов'
        : '从中国和俄罗斯境内的汽车运输 - 可靠的货物交付',
      background: 'auto',
      image: '🚛'
    },
    {
      id: 'import',
      title: language === 'ru' ? 'Импорт' : '进口',
      description: language === 'ru'
        ? 'Сборный груз, контейнерные перевозки, опасные грузы'
        : '拼箱、集装箱运输、危险品',
      background: 'import',
      image: '📦'
    },
    {
      id: 'export',
      title: language === 'ru' ? 'Экспорт' : '出口',
      description: language === 'ru'
        ? 'Экспорт в Китай, Египет, Вьетнам'
        : '出口到中国、埃及、越南',
      background: 'export',
      image: '🌍'
    },
    {
      id: 'customs',
      title: language === 'ru' ? 'Таможенное оформление' : '清关',
      description: language === 'ru'
        ? 'ТО импортного и экспортного груза, транзитные декларации'
        : '进出口货物清关、过境申报',
      background: 'customs',
      image: '📋'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const goToService = (serviceId) => {
    navigate(`/services#${serviceId}`)
  }

  return (
    <section className="services-carousel">
      <div className="container">
        <h2 className="section-title">{t('services')}</h2>
        <div className="carousel-wrapper">
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            ←
          </button>
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`carousel-slide slide-${service.background}`}
                >
                  <div className="slide-overlay">
                    <div className="slide-content">
                      <div className="slide-brand">XGL</div>
                      <h3 className="slide-title">{service.title}</h3>
                      <p className="slide-description">{service.description}</p>
                      <div className="slide-actions">
                        <button 
                          className="slide-btn-primary"
                          onClick={() => goToService(service.id)}
                        >
                          {language === 'ru' ? 'Подробнее узнать об услуге →' : '了解更多服务 →'}
                        </button>
                        <button 
                          className="slide-btn-secondary"
                          onClick={() => {
                            const formElement = document.getElementById('application-form')
                            if (formElement) {
                              formElement.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                        >
                          {language === 'ru' ? 'Запросить расчёт' : '请求报价'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            →
          </button>
        </div>
        <div className="carousel-dots">
          {services.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel
