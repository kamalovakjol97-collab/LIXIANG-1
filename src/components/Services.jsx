import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Services.css'

const Services = () => {
  const { language, t } = useLanguage()
  const [activeService, setActiveService] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleServiceClick = (index) => {
    setFadeKey(prev => prev + 1)
    setActiveService(index)
  }

  // Данные услуг должны быть объявлены до использования в useEffect
  const servicesData = {
    ru: [
      {
        id: 'auto-ru',
        title: 'Автомобильные перевозки',
        description: 'Надёжные и гибкие автоперевозки по любым маршрутам Китай — Россия',
        image: '/assets/service-auto.png',
        subs: [
          'Региональные и межгородские перевозки по России: Доставка до двери в Москве, СПб и любом городе РФ.',
          'Международные автоперевозки из Китая: Прямые и транзитные (через Казахстан) маршруты.',
          'Растаможка и финальная доставка «последней мили»: Забираем груз из порта/терминала до вашего склада.',
          'Специализированные перевозки негабарита и сырья: Перевозка леса и сырья в 40-футовых контейнерах.'
        ]
      },
      {
        id: 'expediting-ru',
        title: 'Экспедирование грузов',
        description: 'Ваш персональный логист в порту, на станции и на СВХ',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        subs: [
          'Экспедирование в морских портах: Встреча судна, контроль выгрузки, минимизация простоев.',
          'Экспедирование на ж/д терминалах: Приёмка груза, проверка комплектности, оформление накладных.',
          'Управление складскими операциями на СВХ: Контроль сроков хранения и инвентаризация.',
          'Единый центр управления: Ваш персональный менеджер координирует все звенья цепочки.'
        ]
      },
      {
        id: 'import-ru',
        title: 'Импорт из Китая',
        description: 'Комплексный импорт под ключ: от поиска поставщика до доставки на склад',
        image: '/assets/service-import.png',
        subs: [
          'Доставка сборных грузов (LCL): Консолидация на нашем складе в Китае и доставка до вашего города.',
          'Контейнерные перевозки (FCL): Полноконтейнерные перевозки 20/40 футов (море, ж/д, авто).',
          'Перевозка опасных грузов (ADR): Соблюдение международных норм и оформление разрешений.',
          'Оптимизация цепочек: Подбор лучшего маршрута и транспорта для снижения ваших затрат.'
        ]
      },
      {
        id: 'export-ru',
        title: 'Экспорт',
        description: 'Надёжный экспорт из России: выстраиваем понятные логистические коридоры',
        image: '/assets/service-export.png',
        subs: [
          'Экспорт в Китай: Авто и ж/д транспорт, оформление деклараций и сертификатов.',
          'Экспорт в Египет: Морские контейнерные перевозки до Александрии или Порт-Саида.',
          'Экспорт во Вьетнам: Мультимодальные маршруты (ж/д + море) для баланса цены и сроков.',
          'Таможенное оформление: Подготовка документов, ГТД и получение разрешений.'
        ]
      },
      {
        id: 'customs-ru',
        title: 'Таможенное оформление',
        description: 'Юридически безупречное таможенное оформление «под ключ»',
        image: '/assets/service-customs.png',
        subs: [
          'Таможенное оформление импорта: Расчёт платежей, НДС, акцизов. Классификация по ТН ВЭД.',
          'Таможенное оформление экспорта: Декларации, подтверждение нулевой ставки НДС.',
          'Транзитные декларации: Беспрепятственный транзит через Казахстан и другие страны.',
          'Сертификация (СМР): Помощь в получении сертификатов соответствия для ввоза товаров.'
        ]
      },
      {
        id: 'consulting-ru',
        title: 'Аналитика и консалтинг',
        description: 'Стратегический подход к вашей логистике: от анализа до легализации',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        subs: [
          'Легализация «серого» импорта: Анализ схем, аудит цепочек и разработка правовых решений.',
          'ВЭД-консалтинг: Полное сопровождение внешнеэкономической деятельности вашей компании.'
        ]
      }
    ],
    zh: [
      {
        id: 'auto-zh',
        title: '汽车运输',
        description: '中国-俄罗斯各条路线上可靠且灵活的汽车运输',
        image: '/assets/service-auto.png',
        subs: [
          '俄罗斯境内区域和城际运输：送货上门。',
          '来自中国的国际汽车运输：直接和过境路线。',
          '清关和“最后一公里”交付：从港口/码头到您的仓库。',
          '特种运输：40英尺集装箱原木和原材料运输。'
        ]
      },
      {
        id: 'expediting-zh',
        title: '货物代理',
        description: '您在港口、车站和临时仓库的私人物流师',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        subs: [
          '海港代理：接船、卸货控制、尽量减少停工时间。',
          '铁路枢纽代理：接货、检查完整性、办理运单。',
          '仓储管理：存储期限控制和库存盘点。',
          '统一管理中心：私人经理协调供应链所有环节。'
        ]
      },
      {
        id: 'import-zh',
        title: '中国进口',
        description: '全方位一站式进口：从寻找供应商到送货入库',
        image: '/assets/service-import.png',
        subs: [
          '拼箱货运 (LCL)：在中国仓库拼箱并送达您的城市。',
          '整箱运输 (FCL)：20/40英尺集装箱运输（海、铁、汽）。',
          '危险品运输 (ADR)：遵守国际规范并办理许可。',
          '供应链优化：选择最佳路线和运输方式以降低成本。'
        ]
      },
      {
        id: 'export-zh',
        title: '出口服务',
        description: '来自俄罗斯的可靠出口：建立清晰的物流走廊',
        image: '/assets/service-export.png',
        subs: [
          '向中国出口：汽运和铁运，办理申报和证书。',
          '向埃及出口：海运集装箱运输至亚历山大或塞得港。',
          '向越南出口：多式联运（铁+海）平衡价格和时效。',
          '出口清关：准备单证、办理出口报关和许可。'
        ]
      },
      {
        id: 'customs-zh',
        title: '海关清关',
        description: '法律上完美的一站式海关清关',
        image: '/assets/service-customs.png',
        subs: [
          '进口清关：税费计算、增值税。HS编码分类。',
          '出口清关：出口申报，确认零增值税率。',
          '过境申报：确保货物顺利通过哈萨克斯坦等国。',
          '认证服务 (CMR)：协助办理进入俄罗斯的符合性证书。'
        ]
      },
      {
        id: 'consulting-zh',
        title: '分析与咨询',
        description: '物流战略方法：从分析到合法化',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        subs: [
          '贸易合法化咨询：方案分析、供应链审计和法律方案开发。',
          '外贸咨询：为您的公司提供全方位的外贸支持。'
        ]
      }
    ]
  }

  const currentServices = servicesData[language] || servicesData.ru

  // Устанавливаем первую услугу активной при загрузке и при смене языка
  useEffect(() => {
    setActiveService(0)
    setFadeKey(0)
  }, [language])

  // Защита: если activeService выходит за границы массива, сбрасываем на 0
  useEffect(() => {
    if (activeService >= currentServices.length || activeService < 0) {
      setActiveService(0)
    }
  }, [activeService, currentServices.length])

  // Обработка клавиатурной навигации
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const direction = e.key === 'ArrowDown' ? 1 : -1
        const newIndex = Math.max(0, Math.min(currentServices.length - 1, activeService + direction))
        if (newIndex !== activeService) {
          setFadeKey(prev => prev + 1)
          setActiveService(newIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeService, currentServices.length])

  // Безопасное получение данных активной услуги
  const activeServiceData = currentServices[activeService] || currentServices[0]

  // Проверяем, что activeService в допустимых пределах
  const safeActiveService = activeService >= 0 && activeService < currentServices.length 
    ? activeService 
    : 0

  return (
    <section className="services-section" aria-label={t('services')}>
      <div className="container">
        <div className="services-two-column-layout">
          {/* Левая колонка: Информация и брендинг */}
          <aside className="services-info-column" role="complementary">
            <div className="services-info-content">
              <h2 className="services-info-title">{t('services')}</h2>
              <p className="services-info-description">
                {language === 'ru' 
                  ? 'Реализуем логистические стратегии любой сложности, обеспечивая бесперебойность ваших поставок.'
                  : '我们实施任何复杂程度的物流战略，确保您的供应不间断。'}
              </p>
              <div className="services-branding">
                <div className="services-branding-line"></div>
                <div className="services-branding-text">
                  <strong className="services-branding-xgl">XGL</strong>
                  <span className="services-branding-group">LOGISTICS GROUP</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Правая колонка: Список услуг */}
          <main className="services-list-column" role="main">
            <div className="services-cards-list">
              {currentServices.map((service, index) => {
                const isActive = index === safeActiveService
                const serviceNumber = String(index + 1).padStart(2, '0')
                
                return (
                  <button
                    key={service.id}
                    className={`service-card-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleServiceClick(index)}
                    role="button"
                    aria-label={`${language === 'ru' ? 'Выбрать услугу' : '选择服务'}: ${service.title}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="service-card-number">{serviceNumber}</span>
                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Детальное описание активной услуги */}
            {activeServiceData && (
              <article 
                key={fadeKey}
                className="service-detail-content fade-in"
                aria-live="polite"
                aria-atomic="true"
              >
                <header className="service-detail-header">
                  <h2 className="service-detail-title">{activeServiceData.title}</h2>
                  <p className="service-detail-description">{activeServiceData.description}</p>
                </header>

                <div className="service-detail-body">
                  <ul className="service-detail-list" role="list">
                    {activeServiceData.subs && activeServiceData.subs.map((sub, i) => (
                      <li key={i} role="listitem">
                        <span className="service-detail-checkmark" aria-hidden="true">✓</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="service-detail-footer">
                  <button 
                    className="service-detail-cta-btn"
                    onClick={scrollToForm}
                    aria-label={language === 'ru' ? 'Оставить заявку на услугу' : '提交服务申请'}
                  >
                    {language === 'ru' ? 'ОСТАВИТЬ ЗАЯВКУ' : '提交申请'}
                  </button>
                </footer>
              </article>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}

export default Services
