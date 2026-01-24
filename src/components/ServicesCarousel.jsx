import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './ServicesCarousel.css'

const ServicesCarousel = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const services = [
    {
      id: 'auto',
      title: language === 'ru' ? 'Автоперевозки' : '汽车运输',
      description: language === 'ru' 
        ? 'Регулярные рейсы из Китая по всем регионам РФ. Собственный парк партнеров и полный контроль.'
        : '从中国到俄罗斯各地区的定期航班。合作伙伴自有车队和全面控制。',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80'
    },
    {
      id: 'import',
      title: language === 'ru' ? 'Импорт' : '进口',
      description: language === 'ru'
        ? 'Комплексные решения: поиск поставщика, валютные операции и доставка до вашего склада.'
        : '综合解决方案：寻找供应商、外汇业务和配送到您的仓库。',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80'
    },
    {
      id: 'export',
      title: language === 'ru' ? 'Экспорт' : '出口',
      description: language === 'ru'
        ? 'Развитие ваших продаж на рынках Азии и Ближнего Востока. Полное сопровождение сделок.'
        : '在亚洲和中东市场发展您的销售。全程交易支持。',
      image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?w=1200&q=80'
    },
    {
      id: 'customs',
      title: language === 'ru' ? 'Таможня' : '清关',
      description: language === 'ru'
        ? 'Профессиональное декларирование и минимизация рисков. Работаем со всеми категориями товаров.'
        : '专业申报和风险最小化。我们处理所有类别的货物。',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, services.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % services.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)

  return (
    <section className="services-carousel-section" ref={sectionRef}>
      <div className="container">
        <div className="carousel-header">
          <h2 className="section-title">{t('services')}</h2>
          <div className="carousel-nav">
            <button className="nav-btn prev" onClick={prevSlide}>←</button>
            <button className="nav-btn next" onClick={nextSlide}>→</button>
          </div>
        </div>
        
        <div 
          className="carousel-container-premium"
          onMouseEnter={() => setIsScrolled(true)}
          onMouseLeave={() => setIsScrolled(false)}
        >
          <div 
            className="carousel-track-premium"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service) => (
              <div key={service.id} className="carousel-slide-premium">
                <div className="service-premium-card" onClick={() => navigate('/services')}>
                  <div className="service-premium-img">
                    <img src={service.image} alt={service.title} />
                    <div className="service-premium-overlay"></div>
                  </div>
                  <div className="service-premium-content">
                    <h3 className="service-premium-title">{service.title}</h3>
                    <p className="service-premium-desc">{service.description}</p>
                    <div className="service-premium-footer">
                      <span className="learn-more">{language === 'ru' ? 'Подробнее' : '更多详情'} →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="carousel-dots-modern">
          {services.map((_, index) => (
            <div 
              key={index} 
              className={`dot-modern ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel
