import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './ServicesPage.css'

const ServicesPage = () => {
  const { language } = useLanguage()
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const servicesData = {
    ru: [
      {
        id: 'auto-ru',
        title: 'Автовывоз из портов Владивостока',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        subs: [
          'Оперативная подача транспорта в порты ВМТП, ВМКТ.',
          'Прямые договоры с терминалами и линиями.',
          'Возможность перевозки тяжеловесных 20-футовых контейнеров.',
          'Собственное экспедирование и контроль погрузки.'
        ]
      },
      {
        id: 'russia-ru',
        title: 'Грузоперевозки по России',
        image: '/assets/service-auto.png',
        subs: [
          'Региональные и межгородские перевозки (FTL, LTL).',
          'Доставка до двери в Москве, СПб и любом городе РФ.',
          'Специализированный транспорт для негабаритных грузов.',
          'Страхование и полное документальное сопровождение.'
        ]
      },
      {
        id: 'rail-ru',
        title: 'ЖД перевозки',
        image: '/assets/service-import.png',
        subs: [
          'Регулярные контейнерные поезда из Китая в РФ.',
          'Повагонные и платформенные отправки спецтехники.',
          'Услуги слежения и охраны груза в пути.',
          'Приемка и раскредитация на станциях назначения.'
        ]
      },
      {
        id: 'containers-ru',
        title: 'Контейнерные перевозки грузов',
        image: '/assets/service-export.png',
        subs: [
          'Полный цикл FCL перевозок (20/40 футов).',
          'Морской фрахт через порты Дальнего Востока и СПб.',
          'Оптимизация маршрутов для снижения транзитных сроков.',
          'Работа со всеми типами контейнеров (Open Top, Flat Rack).'
        ]
      },
      {
        id: 'customs-ru',
        title: 'Таможенное оформление',
        image: '/assets/service-customs.png',
        subs: [
          'Расчёт и минимизация таможенных платежей.',
          'Классификация товаров по ТН ВЭД.',
          'Оформление ГТД и получение разрешительной документации.',
          'Консалтинг по ВЭД и аудит цепочек поставок.'
        ]
      }
    ],
    zh: [
      {
        id: 'auto-zh',
        title: '符拉迪沃斯托克港口汽车运输',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        subs: [
          '快速向 VMTP、VMKT 港口提供运输。',
          '与码头和航运线直接签约。',
          '能够运输重型 20 英尺集装箱。',
          '自己的货运代理和装载控制。'
        ]
      },
      {
        id: 'russia-zh',
        title: '俄罗斯境内运输',
        image: '/assets/service-auto.png',
        subs: [
          '区域和城际运输（FTL、LTL）。',
          '门到门配送至莫斯科、圣彼得堡及俄罗斯任何城市。',
          '用于超大货物的专业运输。',
          '保险和完整的文件支持。'
        ]
      },
      {
        id: 'rail-zh',
        title: '铁路运输',
        image: '/assets/service-import.png',
        subs: [
          '从中国到俄罗斯的定期集装箱班列。',
          '特种设备的整车和平台运送。',
          '运输途中的跟踪和货物保护服务。',
          '在目的地车站接收和清算。'
        ]
      },
      {
        id: 'containers-zh',
        title: '集装箱货物运输',
        image: '/assets/service-export.png',
        subs: [
          '全周期 FCL 运输（20/40 英尺）。',
          '通过远东港口和圣彼得堡的海运费。',
          '优化路线以缩短过境时间。',
          '处理所有类型的集装箱（开顶、平板）。'
        ]
      },
      {
        id: 'customs-zh',
        title: '海关清关',
        image: '/assets/service-customs.png',
        subs: [
          '计算并最小化关税。',
          '根据 HS 编码对商品进行分类。',
          '办理 GTD 并获得许可文件。',
          '外贸咨询和供应链审计。'
        ]
      }
    ]
  }

  const currentServices = servicesData[language]

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Наши услуги' : '我们的服务'}</span>
          </div>
          <h1 className="services-page-title">
            {language === 'ru' ? 'Логистические услуги XGL' : 'XGL 物流服务'}
          </h1>
        </div>
      </div>

      <div className="container">
        <div className="services-modern-grid">
          {currentServices.map((service, index) => (
            <article 
              key={service.id} 
              className="service-modern-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card-image">
                <img src={service.image} alt={service.title} />
                <div className="image-overlay-dark"></div>
                <div className="service-card-content">
                  <h2 className="service-card-title">{service.title}</h2>
                  <ul className="service-sub-list">
                    {service.subs.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                  <button className="service-card-btn" onClick={scrollToForm}>
                    {language === 'ru' ? 'Оставить заявку' : '提交申请'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="services-bottom-cta">
          <h2 className="bottom-cta-title">
            {language === 'ru' ? 'Логистика, которая помогает бизнесу работать быстрее' : '助您业务提速的物流'}
          </h2>
          <button className="btn-primary" onClick={scrollToForm}>
            {language === 'ru' ? 'Рассчитать стоимость' : '计算费用'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
