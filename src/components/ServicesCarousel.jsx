import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './StickyStyles.css'

const ServicesCarousel = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  
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

  return (
    <section className="sticky-section-dark">
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
            {services.map((service) => (
              <div key={service.id} className="scroll-card-modern" onClick={() => navigate('/services')}>
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
