import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './HistoryPage.css'

const getEventIcon = (iconType) => {
  const icons = {
    '🌟': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '📦': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🏗️': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21H21M4 21V7L12 3L20 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9V21M15 9V21M9 9H15M9 9H4M15 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13H15M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🚛': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3H5L7 13H19L21 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 13H17M17 13C17.5304 13 18.0391 13.2107 18.4142 13.5858C18.7893 13.9609 19 14.4696 19 15C19 15.5304 18.7893 16.0391 18.4142 16.4142C18.0391 16.7893 17.5304 17 17 17C16.4696 17 15.9609 16.7893 15.5858 16.4142C15.2107 16.0391 15 15.5304 15 15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13ZM7 13C7.53043 13 8.03914 13.2107 8.41421 13.5858C8.78929 13.9609 9 14.4696 9 15C9 15.5304 8.78929 16.0391 8.41421 16.4142C8.03914 16.7893 7.53043 17 7 17C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.4696 5.21071 13.9609 5.58579 13.5858C5.96086 13.2107 6.46957 13 7 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 7V4C21 3.46957 20.7893 2.96086 20.4142 2.58579C20.0391 2.21071 19.5304 2 19 2H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🚚': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3H1V16H16V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8H21L23 10V16H16V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 19C6.88071 19 8 17.8807 8 16.5C8 15.1193 6.88071 14 5.5 14C4.11929 14 3 15.1193 3 16.5C3 17.8807 4.11929 19 5.5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 19C19.8807 19 21 17.8807 21 16.5C21 15.1193 19.8807 14 18.5 14C17.1193 14 16 15.1193 16 16.5C16 17.8807 17.1193 19 18.5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🏢': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9V21M15 9V21M9 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13H15M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🤝': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 12C11 12 9 11 9 9C9 8 9.5 7 10.5 7C11.5 7 12 8 12 9C12 11 10 12 10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 12C13 12 15 11 15 9C15 8 14.5 7 13.5 7C12.5 7 12 8 12 9C12 11 14 12 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 13C8 13 6 14 6 16C6 17 6.5 18 7.5 18C8.5 18 9 17 9 16C9 14 7 13 7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13C16 13 18 14 18 16C18 17 17.5 18 16.5 18C15.5 18 15 17 15 16C15 14 17 13 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12L8 13M15 12L16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🏆': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9H4C3.44772 9 3 9.44772 3 10V12C3 15.866 6.13401 19 10 19C13.866 19 17 15.866 17 12V10C17 9.44772 16.5523 9 16 9H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 9V7C6 5.89543 6.89543 5 8 5H12C13.1046 5 14 5.89543 14 7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 19V22M10 22L8 24M10 22L12 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12L9 14L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    '🔮': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V6.5M12 11.5V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return icons[iconType] || <span>{iconType}</span>
}

const HistoryPage = () => {
  const { language } = useLanguage()
  const [activeYear, setActiveYear] = useState(null)
  const [visibleItems, setVisibleItems] = useState([])
  const itemRefs = useRef([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index])
            observer.unobserve(ref)
          }
        },
        { threshold: 0.3 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs, index) => {
        if (obs && itemRefs.current[index]) {
          obs.unobserve(itemRefs.current[index])
        }
      })
    }
  }, [])

  const events = {
    ru: [
      {
        year: '2016',
        month: 'Март',
        icon: '🌟',
        title: 'Основание',
        description: 'Открытие компании «Гуосен» в Китае. Начало пути.'
      },
      {
        year: '2016',
        month: 'Декабрь',
        icon: '📦',
        title: 'Первый шаг в логистику',
        description: 'Аренда первых складов в Иу, Гуанчжоу, Шэньчжэнь.'
      },
      {
        year: '2018',
        month: null,
        icon: '🏗️',
        title: 'Первая собственная инфраструктура',
        description: 'Строительство собственного СВХ в Хэйхэ.'
      },
      {
        year: '2019',
        month: null,
        icon: '🚛',
        title: 'Экспансия на границе',
        description: 'Открытие склада в Маньчжурии для хранения и перегрузки.'
      },
      {
        year: '2021',
        month: null,
        icon: '🚚',
        title: 'Вертикальная интеграция и экспансия в РФ',
        description: 'Создание транспортной компании «Дунсингуо». Открытие офисов в Москве и Екатеринбурге.'
      },
      {
        year: '2024',
        month: null,
        icon: '🏢',
        title: 'Новый статус',
        description: 'Головной офис переехал в стратегический хаб — Санкт-Петербург.'
      },
      {
        year: '2025',
        month: 'Май',
        icon: '🤝',
        title: 'Консолидация и крупный контракт',
        description: 'Объединение в ООО ГК «ХЖЛ». Подписание контракта с CC7 — начало масштабного проекта.'
      },
      {
        year: '2025',
        month: 'Июнь',
        icon: '🏆',
        title: 'Рекорд',
        description: 'Рекордный вывоз 401 позиции груза из порта Бронка для CC7.'
      },
      {
        year: '2025',
        month: 'Октябрь',
        icon: '🚛',
        title: 'Новый вид услуг',
        description: 'Запущены регулярные автопоставки для проекта CC7.'
      },
      {
        year: '2025',
        month: 'Декабрь',
        icon: '🤝',
        title: 'Стратегическое партнерство',
        description: 'Соглашение с ООО «К2» для усиления автопарка.'
      },
      {
        year: '2026',
        month: 'Январь',
        icon: '🔮',
        title: 'Взгляд в будущее',
        description: 'Команда ХЖЛ смотрит в будущее с уверенностью, опираясь на 10-летний опыт.'
      }
    ],
    zh: [
      {
        year: '2016',
        month: '3月',
        icon: '🌟',
        title: '成立',
        description: '在中国开设“国森”公司。开始征程。'
      },
      {
        year: '2016',
        month: '12月',
        icon: '📦',
        title: '物流第一步',
        description: '在义乌、广州、深圳租赁首批仓库。'
      },
      {
        year: '2018',
        month: null,
        icon: '🏗️',
        title: '首个自有基础设施',
        description: '在黑河建设自有临时仓储。'
      },
      {
        year: '2019',
        month: null,
        icon: '🚛',
        title: '边境扩张',
        description: '在满洲里开设仓库用于存储和转运。'
      },
      {
        year: '2021',
        month: null,
        icon: '🚚',
        title: '垂直整合和俄罗斯扩张',
        description: '创建运输公司“东新国”。在莫斯科和叶卡捷琳堡开设办事处。'
      },
      {
        year: '2024',
        month: null,
        icon: '🏢',
        title: '新地位',
        description: '总部迁至战略枢纽 — 圣彼得堡。'
      },
      {
        year: '2025',
        month: '5月',
        icon: '🤝',
        title: '整合和大合同',
        description: '合并为ООО ГК «ХЖЛ»。与CC7签署合同 — 大型项目开始。'
      },
      {
        year: '2025',
        month: '6月',
        icon: '🏆',
        title: '创纪录',
        description: '为CC7从布龙卡港创纪录运出401项货物。'
      },
      {
        year: '2025',
        month: '10月',
        icon: '🚛',
        title: '新服务类型',
        description: '为CC7项目启动定期汽车运输。'
      },
      {
        year: '2025',
        month: '12月',
        icon: '🤝',
        title: '战略合作伙伴关系',
        description: '与ООО «К2»签署协议以加强汽车车队。'
      },
      {
        year: '2026',
        month: '1月',
        icon: '🔮',
        title: '展望未来',
        description: 'ХЖЛ团队满怀信心展望未来，依靠10年的经验。'
      }
    ]
  }

  const currentEvents = events[language]

  return (
    <div className="history-page">
      <div className="history-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Наша история' : '我们的历史'}</span>
          </div>
          <h1 className="history-page-title">
            {language === 'ru' ? 'Наша история' : '我们的历史'}
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="timeline-container">
          {currentEvents.map((event, index) => {
            const isEven = index % 2 === 0
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`timeline-event ${isEven ? 'timeline-left' : 'timeline-right'} ${isVisible ? 'visible' : ''}`}
                onMouseEnter={() => setActiveYear(event.year)}
                onMouseLeave={() => setActiveYear(null)}
              >
                <div className="timeline-content card">
                  <div className="event-header">
                    <div className="event-icon">{getEventIcon(event.icon)}</div>
                    <div className="event-date">
                      {event.month && <span className="event-month">{event.month} </span>}
                      <span className={`event-year ${activeYear === event.year ? 'active' : ''}`}>
                        {event.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
                <div className="timeline-line">
                  <div className="timeline-dot"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
