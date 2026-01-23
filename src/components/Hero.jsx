import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-background-image"></div>
      <div className="container">
        <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="hero-title">
            {language === 'ru' 
              ? 'От двери до двери: Китай — Россия. Чётко и по делу.'
              : '门到门：中国 — 俄罗斯。清晰务实。'}
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
