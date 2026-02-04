import { useLanguage } from '../context/LanguageContext'
import { contacts } from '../config/contacts'
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

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12l3 3 5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15l2-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10c0 .5.02 1 .06 1.49a4.5 4.5 0 0 0 2.95 3.45l.5.2.5-.3a5.5 5.5 0 0 1 2.98-1.02c.5 0 1 .02 1.48.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15c-1.5-.7-2.6-1.8-3.3-3.3A5.98 5.98 0 0 1 6 8a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-1.7 4.2L9 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <a href={contacts.phoneTel} className="top-bar-phone">{contacts.phoneDisplay}</a>
            <div className="top-bar-socials">
              <a href={contacts.telegramUrl} className="top-bar-social" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <TelegramIcon />
              </a>
              <a href={contacts.whatsappUrl} className="top-bar-social" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
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
