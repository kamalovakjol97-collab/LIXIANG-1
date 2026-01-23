import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('heroTitle')}
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
          <button className="hero-cta" onClick={scrollToForm}>
            {t('calculate')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
