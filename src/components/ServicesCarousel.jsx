import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './StickyStyles.css'
import './ServicesCarousel.css'

const ServicesCarousel = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const [sectionInView, setSectionInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionInView(true)
      },
      { threshold: 0.1 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const services = [
    {
      id: '01',
      title: language === 'ru' ? 'Автоперевозки' : '汽车运输',
      description: language === 'ru' 
        ? 'Регулярные рейсы из Китая по всем регионам РФ. Собственный парк партнеров и полный контроль.'
        : '从中国到俄罗斯各地区的定期航班。',
    },
    {
      id: '02',
      title: language === 'ru' ? 'Импорт' : '进口',
      description: language === 'ru'
        ? 'Комплексные решения: поиск поставщика, валютные операции и доставка до вашего склада.'
        : '综合解决方案：寻找供应商。',
    },
    {
      id: '03',
      title: language === 'ru' ? 'Экспорт' : '出口',
      description: language === 'ru'
        ? 'Развитие ваших продаж на рынках Азии и Ближнего Востока.'
        : '在亚洲和中东市场发展。',
    },
    {
      id: '04',
      title: language === 'ru' ? 'Таможенная очистка' : '海关清关',
      description: language === 'ru'
        ? 'Профессиональное декларирование и сопровождение внешнеэкономической деятельности.'
        : '专业申报和外贸支持。',
    }
  ]

  const icons = [
    /* Truck */
    <svg key="truck" className="service-card-icon" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path className="service-icon-path" d="M4 20h8v-8H4v8zm10 0h18V8H14v12zm20-6h6l-4-6h-2v6zM6 24h36" /></svg>,
    /* Ship */
    <svg key="ship" className="service-card-icon" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path className="service-icon-path" d="M4 22h40l-4-8H8L4 22zm8-6h8m-8 4h8m16-4h4m-4 4h4M2 26h44" /></svg>,
    /* Train / export */
    <svg key="train" className="service-card-icon" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path className="service-icon-path" d="M8 20V12h12v8H8zm20 0V12h12v8H28zM8 24h32M14 12h4m16 0h4" /></svg>,
    /* Customs / document */
    <svg key="doc" className="service-card-icon" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path className="service-icon-path" d="M12 4h20v24H12V4zm8 8h4m-4 4h4m-4 4h8" /></svg>
  ]

  return (
    <section className="sticky-section-dark services-carousel-section">
      <div className="container">
        <div className="sticky-layout">
          <div className="sticky-left">
            <h2 className="sticky-title-large">{t('services')}</h2>
            <p className="sticky-subtitle-large">
              {language === 'ru' 
                ? 'Реализуем логистические стратегии любой сложности, обеспечивая бесперебойность ваших поставок.' 
                : '我们实施任何复杂程度的物流战略，确保您的供应不间断。'}
            </p>
            <div className="sticky-accent-box">
              <div className="sticky-divider-line"></div>
              <strong>XGL</strong>
              <span>LOGISTICS GROUP</span>
            </div>
          </div>
          <div className="scroll-list-right">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="scroll-card-modern service-card"
                onClick={() => navigate('/services')}
              >
                <div className="service-card-icon-wrap">{icons[i]}</div>
                <div className="scroll-card-id">{service.id}</div>
                <div className="scroll-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
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
