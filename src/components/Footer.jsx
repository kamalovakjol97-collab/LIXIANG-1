import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { contacts } from '../config/contacts'
import Logo from './Logo'
import './Footer.css'

const TelegramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 12l3 3 5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15l2-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 10c0 .5.02 1 .06 1.49a4.5 4.5 0 0 0 2.95 3.45l.5.2.5-.3a5.5 5.5 0 0 1 2.98-1.02c.5 0 1 .02 1.48.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15c-1.5-.7-2.6-1.8-3.3-3.3A5.98 5.98 0 0 1 6 8a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-1.7 4.2L9 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Footer = () => {
  const { t, language } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-nav">
          <div className="footer-col footer-brand">
            <Logo />
            <p className="footer-copyright">© 2005–2026 {language === 'ru' ? 'ООО ГК ХЖЛ' : 'ООО ГК ХЖЛ'}</p>
            <Link to="/privacy" className="footer-link">{t('privacy')}</Link>
          </div>

          <div className="footer-col footer-services">
            <h3 className="footer-col-title">{t('footerServices')}</h3>
            <ul className="footer-list">
              <li><Link to="/services">{t('seaFreight')}</Link></li>
              <li><Link to="/services">{t('railFreight')}</Link></li>
              <li><Link to="/services">{t('roadFreight')}</Link></li>
              <li><Link to="/services">{t('customsClearance')}</Link></li>
              <li><Link to="/services">{t('shippingFromChina')}</Link></li>
              <li><Link to="/services">{t('shippingInRussia')}</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-company">
            <h3 className="footer-col-title">{t('footerCompany')}</h3>
            <ul className="footer-list">
              <li><Link to="/#why">{t('whyUs')}</Link></li>
              <li><Link to="/contacts">{t('documents')}</Link></li>
              <li><Link to="/contacts">{t('contacts')}</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-career">
            <h3 className="footer-col-title">{t('footerCareer')}</h3>
            <h3 className="footer-col-title">{t('footerNewsProjects')}</h3>
            <div className="footer-socials">
              <a href={contacts.telegramUrl} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <TelegramIcon />
              </a>
              <a href={contacts.whatsappUrl} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div className="footer-col footer-contact">
            <a href={contacts.phoneTel} className="footer-phone">{contacts.phoneDisplay}</a>
            <p className="footer-answer">{t('footerAnswerAny')}</p>
            <a href={contacts.whatsappUrl} className="footer-whatsapp" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a href={`mailto:${contacts.email}`} className="footer-email">{contacts.email}</a>
            <div className="footer-addresses">
              <p className="footer-address-line">{t('officeSpb')}</p>
              <p className="footer-address-schedule">{t('workSchedule')}: {t('workingHours')}</p>
              <p className="footer-address-line">{t('officeMoscow')}</p>
              <p className="footer-address-schedule">{t('workSchedule')}: пн.-пт. с 9:00 до 18:00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
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
    </footer>
  )
}

export default Footer
