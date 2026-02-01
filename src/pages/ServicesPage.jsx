import { Fragment, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './ServicesPage.css'
import '../components/StickyStyles.css'

const ServicesPage = () => {
  const { language } = useLanguage()
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const servicesData = {
    ru: [
      {
        id: '01',
        title: 'Автомобильные перевозки',
        description: 'Надёжные и гибкие автоперевозки по любым маршрутам Китай — Россия',
        accentText: 'Надёжные и гибкие автоперевозки по любым маршрутам Китай — Россия',
        cards: [
          'Региональные и межгородские перевозки по России: Доставка до двери в Москве, СПб и любом городе РФ.',
          'Международные автоперевозки из Китая: Прямые и транзитные (через Казахстан) маршруты.',
          'Растаможка и финальная доставка «последней мили»: Забираем груз из порта/терминала до вашего склада.',
          'Специализированные перевозки негабарита и сырья: Перевозка леса и сырья в 40-футовых контейнерах.'
        ]
      },
      {
        id: '02',
        title: 'Экспедирование грузов',
        description: 'Ваш персональный логист в порту, на станции и на СВХ',
        accentText: 'Ваш персональный логист в порту, на станции и на СВХ',
        cards: [
          'Экспедирование в морских портах: Встреча судна, контроль выгрузки, минимизация простоев.',
          'Экспедирование на ж/д терминалах: Приёмка груза, проверка комплектности, оформление накладных.',
          'Управление складскими операциями на СВХ: Контроль сроков хранения и инвентаризация.',
          'Единый центр управления: Ваш персональный менеджер координирует все звенья цепочки.'
        ]
      },
      {
        id: '03',
        title: 'Импорт из Китая',
        description: 'Комплексный импорт под ключ: от поиска поставщика до доставки на склад',
        accentText: 'Комплексный импорт под ключ: от поиска поставщика до доставки на склад',
        cards: [
          'Доставка сборных грузов (LCL): Консолидация на нашем складе в Китае и доставка до вашего города.',
          'Контейнерные перевозки (FCL): Полноконтейнерные перевозки 20/40 футов (море, ж/д, авто).',
          'Перевозка опасных грузов (ADR): Соблюдение международных норм и оформление разрешений.',
          'Оптимизация цепочек: Подбор лучшего маршрута и транспорта для снижения ваших затрат.'
        ]
      },
      {
        id: '04',
        title: 'Экспорт',
        description: 'Надёжный экспорт из России: выстраиваем понятные логистические коридоры',
        accentText: 'Надёжный экспорт из России: выстраиваем понятные логистические коридоры',
        cards: [
          'Экспорт в Китай: Авто и ж/д транспорт, оформление деклараций и сертификатов.',
          'Экспорт в Египет: Морские контейнерные перевозки до Александрии или Порт-Саида.',
          'Экспорт во Вьетнам: Мультимодальные маршруты (ж/д + море) для баланса цены и сроков.',
          'Таможенное оформление: Подготовка документов, ГТД и получение разрешений.'
        ]
      },
      {
        id: '05',
        title: 'Таможенное оформление',
        description: 'Юридически безупречное таможенное оформление «под ключ»',
        accentText: 'Юридически безупречное таможенное оформление «под ключ»',
        cards: [
          'Таможенное оформление импорта: Расчёт платежей, НДС, акцизов. Классификация по ТН ВЭД.',
          'Таможенное оформление экспорта: Декларации, подтверждение нулевой ставки НДС.',
          'Транзитные декларации: Беспрепятственный транзит через Казахстан и другие страны.',
          'Сертификация (СМР): Помощь в получении сертификатов соответствия для ввоза товаров.'
        ]
      },
      {
        id: '06',
        title: 'Аналитика и консалтинг',
        description: 'Стратегический подход к вашей логистике: от анализа до легализации',
        accentText: 'Стратегический подход к вашей логистике: от анализа до легализации',
        cards: [
          'Легализация «серого» импорта: Анализ схем, аудит цепочек и разработка правовых решений.',
          'ВЭД-консалтинг: Полное сопровождение внешнеэкономической деятельности вашей компании.'
        ]
      }
    ],
    zh: [
      {
        id: '01',
        title: '汽车运输',
        description: '中国-俄罗斯各条路线上可靠且灵活的汽车运输',
        accentText: '中国-俄罗斯各条路线上可靠且灵活的汽车运输',
        cards: [
          '俄罗斯境内区域和城际运输：送货上门。',
          '来自中国的国际汽车运输：直接和过境路线。',
          '清关和"最后一公里"交付：从港口/码头到您的仓库。',
          '特种运输：40英尺集装箱原木和原材料运输。'
        ]
      },
      {
        id: '02',
        title: '货物代理',
        description: '您在港口、车站和临时仓库的私人物流师',
        accentText: '您在港口、车站和临时仓库的私人物流师',
        cards: [
          '海港代理：接船、卸货控制、尽量减少停工时间。',
          '铁路枢纽代理：接货、检查完整性、办理运单。',
          '仓储管理：存储期限控制和库存盘点。',
          '统一管理中心：私人经理协调供应链所有环节。'
        ]
      },
      {
        id: '03',
        title: '中国进口',
        description: '全方位一站式进口：从寻找供应商到送货入库',
        accentText: '全方位一站式进口：从寻找供应商到送货入库',
        cards: [
          '拼箱货运 (LCL)：在中国仓库拼箱并送达您的城市。',
          '整箱运输 (FCL)：20/40英尺集装箱运输（海、铁、汽）。',
          '危险品运输 (ADR)：遵守国际规范并办理许可。',
          '供应链优化：选择最佳路线和运输方式以降低成本。'
        ]
      },
      {
        id: '04',
        title: '出口服务',
        description: '来自俄罗斯的可靠出口：建立清晰的物流走廊',
        accentText: '来自俄罗斯的可靠出口：建立清晰的物流走廊',
        cards: [
          '向中国出口：汽运和铁运，办理申报和证书。',
          '向埃及出口：海运集装箱运输至亚历山大或塞得港。',
          '向越南出口：多式联运（铁+海）平衡价格和时效。',
          '出口清关：准备单证、办理出口报关和许可。'
        ]
      },
      {
        id: '05',
        title: '海关清关',
        description: '法律上完美的一站式海关清关',
        accentText: '法律上完美的一站式海关清关',
        cards: [
          '进口清关：税费计算、增值税。HS编码分类。',
          '出口清关：出口申报，确认零增值税率。',
          '过境申报：确保货物顺利通过哈萨克斯坦等国。',
          '认证服务 (CMR)：协助办理进入俄罗斯的符合性证书。'
        ]
      },
      {
        id: '06',
        title: '分析与咨询',
        description: '物流战略方法：从分析到合法化',
        accentText: '物流战略方法：从分析到合法化',
        cards: [
          '贸易合法化咨询：方案分析、供应链审计和法律方案开发。',
          '外贸咨询：为您的公司提供全方位的外贸支持。'
        ]
      }
    ]
  }

  const currentServices = servicesData[language] || servicesData.ru

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

      <hr className="section-divider" />

      {currentServices.map((service, index) => (
        <Fragment key={service.id}>
          {index > 0 && <hr className="section-divider" />}
          {service.id === '06' && <hr className="section-divider" />}
          <section className="sticky-section-dark">
            <div className="container">
              <div className="sticky-layout">
                <div className="sticky-left">
                  <h2 className="sticky-title-large">{service.title}</h2>
                  <p className="sticky-subtitle-large">
                    {service.description}
                  </p>
                  <div className="sticky-accent-box">
                    <div className="sticky-divider-line"></div>
                    <strong>{service.id}</strong>
                    <span>{service.accentText}</span>
                  </div>
                </div>
                <div className="scroll-list-right">
                  {service.cards.map((card, cardIndex) => {
                    const globalIndex = currentServices
                      .slice(0, index)
                      .reduce((acc, s) => acc + s.cards.length, 0) + cardIndex
                    return (
                      <div
                        key={cardIndex}
                        ref={(el) => (cardRefs.current[globalIndex] = el)}
                        className="scroll-card-modern"
                        onClick={scrollToForm}
                        style={{ cursor: 'pointer', transitionDelay: `${cardIndex * 80}ms` }}
                      >
                        <div className="scroll-card-id">{String(cardIndex + 1).padStart(2, '0')}</div>
                        <div className="scroll-card-body">
                          <p>{card}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      ))}

      <hr className="section-divider" />

      <div className="container">
        <div className="services-bottom-cta">
          <h2 className="bottom-cta-title">
            {language === 'ru' ? 'Мы доставляем не просто грузы, а возможности для бизнеса' : '我们不仅运送货物，还为您的业务带来机遇'}
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
