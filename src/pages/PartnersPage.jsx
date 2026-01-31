import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './PartnersPage.css'

// Партнёры с [xgl-log.ru/partnery/](https://xgl-log.ru/partnery/)
// logo — путь к файлу в /assets/partners/ (добавьте PNG по необходимости)
const PARTNERS = [
  { id: '25pallet', nameRu: 'ООО «25 ПАЛЛЕТ»', nameZh: '25 ПАЛЛЕТ', logo: '/assets/partners/25pallet.png' },
  { id: 'atrans', nameRu: 'ООО «АТРАНС ГЛОБАЛ»', nameZh: 'АТРАНС ГЛОБАЛ', logo: '/assets/partners/atrans.png' },
  { id: 'petrolesport', nameRu: 'АО «ПЕТРОЛЕСПОРТ»', nameZh: 'ПЕТРОЛЕСПОРТ', logo: '/assets/partners/petrolesport.png', subtitleRu: 'Глобал Порт Петролеспорт', subtitleZh: 'Глобал Порт Петролеспорт' },
  { id: 'k2', nameRu: 'ООО «К2»', nameZh: 'К2', logo: '/assets/partners/k2.png' },
  { id: 'konteo', nameRu: 'ООО «КОНТЭО»', nameZh: 'КОНТЭО', logo: '/assets/partners/konteo.png' },
  { id: 'loginof', nameRu: 'ООО «ЛОГИНОФ»', nameZh: 'ЛОГИНОФ', logo: '/assets/partners/loginof.png' },
  { id: 'logistics-terminal', nameRu: 'АО «ЛОГИСТИКА-ТЕРМИНАЛ»', nameZh: 'ЛОГИСТИКА-ТЕРМИНАЛ', logo: '/assets/partners/logistics-terminal.png' },
  { id: 'logoper', nameRu: 'ООО «ЛОГОПЕР»', nameZh: 'ЛОГОПЕР', logo: '/assets/partners/logoper.png' },
  { id: 'tfl', nameRu: 'ООО «ТФЛ ЛОГИСТИКА»', nameZh: 'ТФЛ ЛОГИСТИКА', logo: '/assets/partners/tfl.png' },
  { id: 'navico', nameRu: 'Navico Egypt', nameZh: 'Navico Egypt', logo: '/assets/partners/navico.png' },
  { id: 'ningbo-forever', nameRu: 'Ningbo Forever Import and Export Co., Ltd.', nameZh: 'Ningbo Forever', logo: '/assets/partners/ningbo-forever.png' },
  { id: 'ovp', nameRu: 'OVP Shipping', nameZh: 'OVP Shipping 海液通航', logo: '/assets/partners/ovp.png' },
  { id: 'bronka', nameRu: 'Порт Бронка', nameZh: '布龙卡港', logo: '/assets/partners/bronka.png' },
  { id: 'c-shipping', nameRu: 'C-Shipping', nameZh: 'C-Shipping', logo: '/assets/partners/c-shipping.png' },
  { id: 'safetrans', nameRu: 'Safetrans line', nameZh: 'Safetrans line', logo: '/assets/partners/safetrans.png' },
  { id: 'torgmoll', nameRu: 'Torgmoll', nameZh: 'Torgmoll', logo: '/assets/partners/torgmoll.png' },
  { id: 'transit', nameRu: 'TRANSIT', nameZh: 'TRANSIT', logo: '/assets/partners/transit.png' },
  { id: 'four-logistics', nameRu: 'FOUR LOGISTICS', nameZh: 'FOUR LOGISTICS', logo: '/assets/partners/four-logistics.png' },
  { id: 'nb-group', nameRu: 'ООО «НБ ГРУПП»', nameZh: 'НБ ГРУПП', logo: '/assets/partners/nb-group.png' },
  { id: 'hua-yun', nameRu: 'HUA YUN Co., Ltd.', nameZh: 'HUA YUN', logo: '/assets/partners/hua-yun.png' },
]

const getInitials = (name) => {
  const words = name.replace(/[«»""]/g, '').trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const PartnersPage = () => {
  const { language } = useLanguage()

  return (
    <div className="partners-page">
      <header className="partners-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Партнёры' : '合作伙伴'}</span>
          </nav>
          <h1 className="partners-page-title">
            {language === 'ru' ? 'Партнёры' : '合作伙伴'}
          </h1>
          <p className="partners-hero-subtitle">
            {language === 'ru'
              ? 'Надёжные партнёры в логистике Китай–Россия'
              : '中俄物流领域的可靠合作伙伴'}
          </p>
        </div>
      </header>

      <section className="partners-intro">
        <div className="container">
          <p>
            {language === 'ru'
              ? 'Мы работаем с ведущими операторами портов, терминалов и перевозчиками. Партнёрская сеть позволяет предлагать клиентам оптимальные маршруты и условия.'
              : '我们与领先的港口、码头运营商和承运人合作。合作伙伴网络使我们能够为客户提供最优路线和条件。'}
          </p>
        </div>
      </section>

      <div className="container">
        <div className="partners-grid">
          {PARTNERS.map((partner) => {
            const name = language === 'ru' ? partner.nameRu : partner.nameZh
            const subtitle = language === 'ru' ? partner.subtitleRu : partner.subtitleZh
            return (
              <article key={partner.id} className="partner-card">
                <div className="partner-card-logo-wrap">
                  <img
                    src={partner.logo}
                    alt=""
                    className="partner-card-logo"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling?.classList.add('visible')
                    }}
                  />
                  <div className="partner-card-initials" aria-hidden="true">
                    {getInitials(name)}
                  </div>
                </div>
                <div className="partner-card-body">
                  <h2 className="partner-card-name">{name}</h2>
                  {subtitle && <p className="partner-card-subtitle">{subtitle}</p>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PartnersPage
