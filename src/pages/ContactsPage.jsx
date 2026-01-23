import { useLanguage } from '../context/LanguageContext'
import './ContactsPage.css'

const ContactsPage = () => {
  const { language } = useLanguage()

  return (
    <div className="contacts-page">
      <div className="contacts-hero">
        <div className="container">
          <h1 className="contacts-page-title">
            {language === 'ru' ? 'Контакты' : '联系方式'}
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="contacts-content">
          <div className="contacts-bg">
            <div className="contacts-brand">XGL</div>
          </div>
          <div className="contacts-info">
            <div className="contact-item">
              <h3 className="contact-label">
                {language === 'ru' ? 'ООО ГК ХЖЛ' : '有限责任公司 XGL'}
              </h3>
            </div>
            <div className="contact-item">
              <h4 className="contact-type">
                {language === 'ru' ? 'Email' : '电子邮件'}
              </h4>
              <a href="mailto:i@x-genity.ru" className="contact-value">
                i@x-genity.ru
              </a>
            </div>
            <div className="contact-item">
              <h4 className="contact-type">
                {language === 'ru' ? 'График работы' : '工作时间'}
              </h4>
              <p className="contact-value">
                {language === 'ru' 
                  ? 'Понедельник - Пятница: 10:00 - 19:00'
                  : '周一至周五：10:00 - 19:00'}
              </p>
            </div>
            <div className="contact-item">
              <h4 className="contact-type">
                {language === 'ru' ? 'Адрес' : '地址'}
              </h4>
              <p className="contact-value">
                {language === 'ru' 
                  ? 'Российская Федерация'
                  : '俄罗斯联邦'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage
