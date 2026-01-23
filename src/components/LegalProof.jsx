import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LegalProof.css'

const LegalProof = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [expandedLicense, setExpandedLicense] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const companies = {
    ru: [
      {
        id: 'dongxin',
        name: 'ООО «Дунсинь»',
        englishName: 'Manzhouli Dongxin Network Trade Co., Ltd.',
        type: 'Головная компания — основатель группы',
        location: '📍 Маньчжурия, КНР — ключевой приграничный логистический хаб',
        founded: '25 марта 2016 г.',
        capital: '1 800 000 CNY',
        registration: 'Зарегистрировано в г. Маньчжурия',
        status: 'Действующая компания (подтверждено 24.04.2024)',
        activities: [
          'Международная торговля (импорт/экспорт)',
          'Таможенное оформление и агентские услуги',
          'Внутренняя торговля и логистика',
          'Интеграция информационных систем'
        ],
        importance: 'Именно с импорта и экспорта товаров в 2016 году началась наша экспертиза в логистике. Мы понимаем цепочку поставок изнутри — с позиции заказчика, что позволяет нам предлагать оптимальные решения.',
        licenseButton: 'Показать лицензию основателя'
      },
      {
        id: 'guosen',
        name: 'ООО «Гуосен»',
        englishName: 'Manzhouli Guosen Freight Forwarding Co., Ltd.',
        type: 'Профильное логистическое подразделение',
        location: '📍 Маньчжурия, КНР — стратегическая точка для транзитных операций',
        founded: '20 октября 2021 г.',
        capital: '2 000 000 CNY',
        registration: 'Единый код КНР: 91150781MA0RRY87XR',
        status: 'Действующая компания (подтверждено 08.03.2024)',
        activities: [
          'Международные грузоперевозки',
          'Таможенное оформление (декларирование)',
          'Экспедирование грузов',
          'Складская логистика и хранение',
          'Автоперевозки (за исключением опасных грузов)'
        ],
        importance: 'Деятельность полностью соответствует заявленным услугам компании на территории Китая и России. Мы имеем законное право оказывать весь спектр логистических услуг.',
        licenseButton: 'Показать логистическую лицензию'
      }
    ],
    zh: [
      {
        id: 'dongxin',
        name: 'ООО «Дунсинь»',
        englishName: '满洲里东新网络贸易有限公司',
        type: '集团公司创始公司',
        location: '📍 中国满洲里 — 关键边境物流枢纽',
        founded: '2016年3月25日',
        capital: '180万人民币',
        registration: '注册于满洲里市',
        status: '运营中（2024年4月24日确认）',
        activities: [
          '国际贸易（进出口）',
          '清关和代理服务',
          '国内贸易和物流',
          '信息系统集成'
        ],
        importance: '正是从2016年的商品进出口开始，我们在物流方面的专业知识得以发展。我们从内部了解供应链 — 从客户的角度，这使我们能够提供最佳解决方案。',
        licenseButton: '显示创始许可证'
      },
      {
        id: 'guosen',
        name: 'ООО «Гуосен»',
        englishName: '满洲里国森货运代理有限公司',
        type: '专业物流部门',
        location: '📍 中国满洲里 — 过境业务战略要地',
        founded: '2021年10月20日',
        capital: '200万人民币',
        registration: '统一社会信用代码：91150781MA0RRY87XR',
        status: '运营中（2024年3月8日确认）',
        activities: [
          '国际货物运输',
          '清关（申报）',
          '货物运输代理',
          '仓储物流和存储',
          '汽车运输（危险品除外）'
        ],
        importance: '活动完全符合公司在中华人民共和国和俄罗斯联邦境内声明的服务。我们拥有合法权利提供全方位的物流服务。',
        licenseButton: '显示物流许可证'
      }
    ]
  }

  const advantages = {
    ru: [
      {
        icon: '🔄',
        title: 'Полный цикл услуг',
        description: 'От закупки товара («Дунсинь») до его доставки («Гуосен») — единый контроль качества на всех этапах.'
      },
      {
        icon: '📊',
        title: 'Прозрачность и легальность',
        description: 'Все операции проводятся через официальные юридические лица с соответствующими лицензиями.'
      },
      {
        icon: '🏭',
        title: 'Глубокое понимание логистики',
        description: 'Начинавшие как импортеры, мы знаем все «болевые точки» цепочки поставок и устраняем их в своих услугах.'
      },
      {
        icon: '📍',
        title: 'Стратегическое расположение',
        description: 'Оба юридических лица зарегистрированы в Маньчжурии — крупнейшем сухопутном порту на границе Китая и России, что обеспечивает оперативность.'
      }
    ],
    zh: [
      {
        icon: '🔄',
        title: '全周期服务',
        description: '从商品采购（"东新"）到交付（"国森"）— 所有阶段的统一质量控制。'
      },
      {
        icon: '📊',
        title: '透明度和合法性',
        description: '所有操作均通过具有相应许可证的官方法人实体进行。'
      },
      {
        icon: '🏭',
        title: '深入理解物流',
        description: '作为进口商起步，我们了解供应链的所有"痛点"，并在我们的服务中消除它们。'
      },
      {
        icon: '📍',
        title: '战略位置',
        description: '两个法人实体均注册于满洲里 — 中俄边界最大的陆路口岸，确保运营效率。'
      }
    ]
  }

  const verification = {
    ru: {
      title: 'Проверка подлинности',
      items: [
        'Все документы подтверждены Государственным реестром КНР',
        'Каждая лицензия содержит QR-код для проверки в национальной системе',
        'Данные регулярно обновляются (последнее подтверждение — 2024 год)',
        'Возможность самостоятельной проверки через официальный сайт: http://www.gsxt.gov.cn'
      ],
      contact: 'Для получения официальных заверенных копий документов обратитесь к нашему юристу.'
    },
    zh: {
      title: '真实性验证',
      items: [
        '所有文件均由中国国家注册机构确认',
        '每份许可证均包含用于国家系统验证的二维码',
        '数据定期更新（最后确认 — 2024年）',
        '可通过官方网站自行验证：http://www.gsxt.gov.cn'
      ],
      contact: '如需获取官方认证文件副本，请联系我们的律师。'
    }
  }

  const evolution = {
    ru: [
      { year: '2016', event: 'Основание торговой компании «Дунсинь»' },
      { year: '2021', event: 'Создание транспортного подразделения «Дунсингуо»' },
      { year: '2021', event: 'Регистрация логистической компании «Гуосен»' },
      { year: '2024', event: 'Обновление всех лицензий, расширение деятельности' }
    ],
    zh: [
      { year: '2016', event: '成立贸易公司"东新"' },
      { year: '2021', event: '创建运输部门"东新国"' },
      { year: '2021', event: '注册物流公司"国森"' },
      { year: '2024', event: '更新所有许可证，扩大活动范围' }
    ]
  }

  const currentCompanies = companies[language]
  const currentAdvantages = advantages[language]
  const currentVerification = verification[language]
  const currentEvolution = evolution[language]

  const toggleLicense = (companyId) => {
    setExpandedLicense(expandedLicense === companyId ? null : companyId)
  }

  return (
    <section className="legal-proof" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'Документальное подтверждение деятельности' : '活动文件证明'}
        </h2>
        <p className="legal-proof-subtitle">
          {language === 'ru' 
            ? 'Легальное присутствие в ключевом приграничном городе Китая — это наша гарантия прозрачности, ответственности и глубокого понимания всех этапов поставки от завода в Китае до склада в России.'
            : '在中国关键边境城市的合法存在 — 这是我们透明度、责任感和深入理解从中国工厂到俄罗斯仓库所有交付阶段的保证。'}
        </p>

        <div className="companies-grid">
          {currentCompanies.map((company, index) => (
            <div 
              key={company.id}
              className={`company-card card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="company-header">
                <div className="company-badge">
                  {company.id === 'dongxin' ? '🏛️' : '🚚'}
                </div>
                <div>
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-english-name">{company.englishName}</p>
                  <p className="company-type">{company.type}</p>
                </div>
              </div>

              <div className="company-location">{company.location}</div>

              <div className="company-details">
                <div className="detail-item">
                  <span className="detail-label">
                    {language === 'ru' ? 'Дата основания:' : '成立日期：'}
                  </span>
                  <span className="detail-value">{company.founded}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {language === 'ru' ? 'Уставный капитал:' : '注册资本：'}
                  </span>
                  <span className="detail-value">{company.capital}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {language === 'ru' ? 'Регистрация:' : '注册：'}
                  </span>
                  <span className="detail-value">{company.registration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {language === 'ru' ? 'Статус:' : '状态：'}
                  </span>
                  <span className="detail-value status-active">{company.status}</span>
                </div>
              </div>

              <div className="company-activities">
                <h4 className="activities-title">
                  {language === 'ru' ? '✅ Лицензированные виды деятельности:' : '✅ 许可活动类型：'}
                </h4>
                <ul className="activities-list">
                  {company.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div className="company-importance">
                <strong>💡 {language === 'ru' ? 'Почему это важно:' : '为什么这很重要：'}</strong>
                <p>{company.importance}</p>
              </div>

              <button 
                className="license-button"
                onClick={() => toggleLicense(company.id)}
              >
                {company.licenseButton}
              </button>

              {expandedLicense === company.id && (
                <div className="license-preview">
                  <p className="license-note">
                    {language === 'ru' 
                      ? 'Лицензия будет отображена здесь. Для получения официальных заверенных копий обратитесь к нашему юристу.'
                      : '许可证将在此处显示。如需获取官方认证副本，请联系我们的律师。'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`advantages-section ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <h3 className="advantages-title">
            {language === 'ru' ? '🎯 Преимущества нашей структуры' : '🎯 我们结构的优势'}
          </h3>
          <div className="advantages-grid">
            {currentAdvantages.map((advantage, index) => (
              <div key={index} className="advantage-item">
                <div className="advantage-icon">{advantage.icon}</div>
                <h4 className="advantage-item-title">{advantage.title}</h4>
                <p className="advantage-item-description">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`verification-section card ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.45s' }}>
          <h3 className="verification-title">🔐 {currentVerification.title}</h3>
          <ul className="verification-list">
            {currentVerification.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="verification-contact">{currentVerification.contact}</p>
        </div>

        <div className={`evolution-section ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
          <h3 className="evolution-title">
            {language === 'ru' ? '📈 Наша эволюция в цифрах' : '📈 我们的数字演进'}
          </h3>
          <div className="evolution-timeline">
            {currentEvolution.map((item, index) => (
              <div key={index} className="evolution-item">
                <div className="evolution-year">{item.year}</div>
                <div className="evolution-arrow">↓</div>
                <div className="evolution-event">{item.event}</div>
              </div>
            ))}
          </div>
          <p className="evolution-conclusion">
            {language === 'ru'
              ? 'Мы не просто перевозчики — мы партнеры, прошедшие весь путь от импортера до комплексного логистического оператора.'
              : '我们不仅仅是承运商 — 我们是合作伙伴，走过了从进口商到综合物流运营商的整个道路。'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default LegalProof
