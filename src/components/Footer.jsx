import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()

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
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
