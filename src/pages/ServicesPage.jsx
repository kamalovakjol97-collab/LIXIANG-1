import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import './ServicesPage.css'

const ServicesPage = () => {
  const { language } = useLanguage()
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Наши услуги' : '我们的服务'}</span>
          </div>
          <h1 className="services-page-title">
            {language === 'ru' ? 'Логистические услуги XGL' : 'XGL 物流服务'}
          </h1>
        </div>
      </div>

      <Services />

      <div className="container">
        <div className="services-bottom-cta">
          <h2 className="bottom-cta-title">
            {language === 'ru' ? 'Логистика, которая помогает бизнесу работать быстрее' : '助您业务提速的物流'}
          </h2>
          <button className="btn-primary" onClick={scrollToForm}>
            {language === 'ru' ? 'Рассчитать стоимость' : '计算费用'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
