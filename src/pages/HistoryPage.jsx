import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './HistoryPage.css'

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
                    <div className="event-icon">{event.icon}</div>
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
