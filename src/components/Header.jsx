import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

const Header = () => {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'inner-page' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Logo />
          
          <nav className="header-nav">
            <Link to="/services" className="nav-link">{t('services')}</Link>
            <Link to="/history" className="nav-link">{language === 'ru' ? 'История' : '历史'}</Link>
            <Link to="/contacts" className="nav-link">{t('contacts')}</Link>
            <Link to="/faq" className="nav-link">{t('faq')}</Link>
          </nav>
          
          <div className="header-right">
            <a href="https://lkxgl.netlify.app/login" className="header-cta" target="_blank" rel="noopener noreferrer">
              <span className="header-cta-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="header-cta-text">
                {language === 'ru' ? 'Личный кабинет XGL' : 'XGL 个人账户'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
