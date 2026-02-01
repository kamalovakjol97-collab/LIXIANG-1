import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-company">ООО ГК ХЖЛ</p>
            <p className="footer-email">
              <a href="mailto:i@x-genity.ru">i@x-genity.ru</a>
            </p>
            <p className="footer-address">
              {t('workingHours')}
            </p>
          </div>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">{t('privacy')}</a>
            <p className="footer-year">© 2024</p>
            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label={t('backToTop')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              <span>{t('backToTop')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
