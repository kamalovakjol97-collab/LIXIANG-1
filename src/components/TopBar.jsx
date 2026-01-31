import { useLanguage } from '../context/LanguageContext'
import './TopBar.css'

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const CaretDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PaperPlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.5 14.5a9.5 9.5 0 1 1-2.5-18.5 9.5 9.5 0 0 1 2.5 18.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a1 1 0 0 0 1 1h1a3 3 0 0 1 3 3v0a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TopBar = () => {
  const { t, language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'zh' : 'ru')
  }

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <button
              type="button"
              className="top-bar-lang"
              onClick={toggleLanguage}
              aria-label={language === 'ru' ? 'Переключить на 中文' : 'Switch to Russian'}
            >
              <span className="top-bar-lang-icon">
                <GlobeIcon />
              </span>
              <span className="top-bar-lang-code">{language === 'ru' ? 'RU' : '中文'}</span>
              <span className="top-bar-lang-caret">
                <CaretDown />
              </span>
            </button>
          </div>

          <div className="top-bar-center">
            <span className="top-bar-schedule">{t('topBarSchedule')}</span>
          </div>

          <div className="top-bar-right">
            <a href="tel:+79315084299" className="top-bar-phone">+ 7 931 508 4299</a>
            <div className="top-bar-socials">
              <a href="#" className="top-bar-social" aria-label="Telegram">
                <PaperPlaneIcon />
              </a>
              <a href="#" className="top-bar-social" aria-label="Ссылка">
                <GridIcon />
              </a>
              <a href="#" className="top-bar-social" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
