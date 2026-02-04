import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

const Header = () => {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = location.pathname === '/'

  const navLinks = [
    { to: '/services', label: t('services') },
    { to: '/history', label: language === 'ru' ? 'История' : '历史' },
    { to: '/contacts', label: t('contacts') },
    { to: '/faq', label: t('faq') },
  ]

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'inner-page' : ''}`}>
        <div className="container">
          <div className="header-content">
            <Logo />

            <nav className="header-nav" aria-label={language === 'ru' ? 'Основное меню' : '主导航'}>
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="nav-link">{label}</Link>
              ))}
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

              <button
                type="button"
                className="header-burger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={language === 'ru' ? 'Открыть меню' : '打开菜单'}
              >
                <span className={`header-burger-line ${menuOpen ? 'open' : ''}`} />
                <span className={`header-burger-line ${menuOpen ? 'open' : ''}`} />
                <span className={`header-burger-line ${menuOpen ? 'open' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`header-mobile-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div className={`header-mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={language === 'ru' ? 'Меню' : '菜单'}>
        <nav className="header-mobile-nav">
          {navLinks.map(({ to, label }) => (
            <Link to={to} className="header-mobile-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <a
            href="https://lkxgl.netlify.app/login"
            className="header-mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {language === 'ru' ? 'Личный кабинет XGL' : 'XGL 个人账户'}
          </a>
        </nav>
      </div>
    </>
  )
}

export default Header
