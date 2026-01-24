import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './ServicesCarousel.css'

const ServicesCarousel = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  
  const services = [
    {
      id: 'auto',
      title: language === 'ru' ? 'Автоперевозки' : (language === 'ky' ? 'Автоунаа ташуу' : '汽车运输'),
      description: language === 'ru' 
        ? 'Регулярные рейсы из Китая по всем регионам РФ. Собственный парк партнеров и полный контроль.'
        : '从中国到俄罗斯各地区的定期航班。',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80'
    },
    {
      id: 'import',
      title: language === 'ru' ? 'Импорт' : (language === 'ky' ? 'Импорт' : '进口'),
      description: language === 'ru'
        ? 'Комплексные решения: поиск поставщика, валютные операции и доставка до вашего склада.'
        : '综合解决方案：寻找供应商。',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80'
    },
    {
      id: 'export',
      title: language === 'ru' ? 'Экспорт' : (language === 'ky' ? 'Экспорт' : '出口'),
      description: language === 'ru'
        ? 'Развитие ваших продаж на рынках Азии и Ближнего Востока.'
        : '在亚洲和中东市场发展。',
      image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?w=1200&q=80'
    }
  ]

  return (
    <section className="services-sticky-section">
      <div className="container">
        <div className="sticky-layout">
          <div className="sticky-left">
            <h2 className="section-title-sticky">{t('services')}</h2>
            <p className="sticky-subtitle">
              {language === 'ru' ? 'Мы предлагаем полный спектр логистических решений для вашего бизнеса.' : '我们为您的业务提供全方位的物流解决方案。'}
            </p>
          </div>
          <div className="scroll-right">
            {services.map((service) => (
              <div key={service.id} className="service-scroll-card" onClick={() => navigate('/services')}>
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-card-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="btn-text">{language === 'ru' ? 'Подробнее' : '更多'} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel
