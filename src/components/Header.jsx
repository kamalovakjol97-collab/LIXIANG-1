import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

const Header = () => {
  const { t, language } = useLanguage()
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Logo />
          <nav className="header-nav">
            <Link to="/services" className="nav-link">{t('services')}</Link>
            <Link to="/projects" className="nav-link">{language === 'ru' ? 'Проекты' : '项目'}</Link>
            <Link to="/news" className="nav-link">{t('news')}</Link>
            <Link to="/history" className="nav-link">{language === 'ru' ? 'История' : '历史'}</Link>
            <Link to="/faq" className="nav-link">{language === 'ru' ? 'FAQ' : '常见问题'}</Link>
            <Link to="/contacts" className="nav-link">{t('contacts')}</Link>
          </nav>
          <div className="header-right">
            <LanguageSwitcher />
            <button className="header-cta" onClick={scrollToForm}>
              {t('calculate')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
