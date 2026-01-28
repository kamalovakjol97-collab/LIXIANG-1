import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

const Header = () => {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCabinetClick = () => {
    navigate('/lk')
  }

  const isHome = location.pathname === '/'

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'inner-page' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Logo />
          
          <nav className="header-nav">
            <Link to="/services" className="nav-link">{t('services')}</Link>
            <Link to="/projects" className="nav-link">{language === 'ru' ? 'Проекты' : '项目'}</Link>
            <Link to="/news" className="nav-link">{t('news')}</Link>
            <Link to="/history" className="nav-link">{language === 'ru' ? 'История' : '历史'}</Link>
            <Link to="/contacts" className="nav-link">{t('contacts')}</Link>
          </nav>
          
          <div className="header-right">
            <button className="btn-primary header-cta" onClick={handleCabinetClick}>
              {language === 'ru' ? 'Личный кабинет XGL' : 'XGL 个人账户'}
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
