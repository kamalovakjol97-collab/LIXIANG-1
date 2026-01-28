import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './NewsPage.css'

const NewsPage = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
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

  const news = {
    ru: [
      {
        id: 1,
        date: 'Январь 2026',
        tag: '#СобытияКомпании',
        title: 'С Новым 2026 годом! ООО ГК ХЖЛ благодарит партнеров.',
        excerpt: 'Команда компании поздравляет всех клиентов и коллег. Подводим итоги года роста и строим планы на будущее.',
        icon: '🎉',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
      },
      {
        id: 2,
        date: 'Декабрь 2025',
        tag: '#Партнерство #Автоперевозки',
        title: 'Стратегический альянс: подписано соглашение с перевозчиком ООО «К2».',
        excerpt: 'Усиливаем наземный логистический потенциал для гибкого обслуживания клиентов.',
        icon: '🤝',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
      },
      {
        id: 3,
        date: 'Май 2025',
        tag: '#Рекорд #ПроектнаяЛогистика',
        title: 'Установлен рекорд вывоза из порта Бронка — 401 позиция для CC7.',
        excerpt: 'Крупнейшая единовременная операция компании подтвердила лидерство в работе со сложными грузами.',
        icon: '🏆',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      },
      {
        id: 4,
        date: 'Май 2025',
        tag: '#Развитие',
        title: 'Завершено слияние в единую структуру — ООО «Группа компаний ХЖЛ».',
        excerpt: 'Новый этап для оптимизации процессов и повышения качества услуг.',
        icon: '🏢',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
      },
      {
        id: 5,
        date: 'Октябрь 2025',
        tag: '#Экспансия #Автоперевозки',
        title: 'Запущены регулярные автопоставки для проекта CC7.',
        excerpt: 'Расширение логистических возможностей: теперь обеспечиваем стабильные автоперевозки крупногабаритного оборудования.',
        icon: '🚛',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'
      },
      {
        id: 6,
        date: 'Сентябрь 2025',
        tag: '#Инфраструктура',
        title: 'Открытие нового логистического хаба в Санкт-Петербурге.',
        excerpt: 'Стратегическое расположение нового центра позволяет оптимизировать маршруты и сократить сроки доставки.',
        icon: '📍',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
      },
      {
        id: 7,
        date: 'Август 2025',
        tag: '#Технологии #Инновации',
        title: 'Внедрение системы отслеживания грузов в реальном времени.',
        excerpt: 'Клиенты теперь могут отслеживать статус своих грузов 24/7 через мобильное приложение и веб-портал.',
        icon: '💻',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
      },
      {
        id: 8,
        date: 'Июль 2025',
        tag: '#Сертификация',
        title: 'Получена международная сертификация по стандартам ISO 9001:2015.',
        excerpt: 'Подтверждение высокого качества услуг и соответствия международным стандартам управления.',
        icon: '✅',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
      }
    ],
    zh: [
      {
        id: 1,
        date: '2026年1月',
        tag: '#公司活动',
        title: '2026新年快乐！ООО ГК ХЖЛ感谢合作伙伴。',
        excerpt: '公司团队向所有客户和同事表示祝贺。我们总结增长的一年，并为未来制定计划。',
        icon: '🎉'
      },
      {
        id: 2,
        date: '2025年12月',
        tag: '#合作伙伴关系 #汽车运输',
        title: '战略联盟：与承运商ООО «К2»签署协议。',
        excerpt: '我们正在加强地面物流能力，为客户提供灵活的服务。',
        icon: '🤝'
      },
      {
        id: 3,
        date: '2025年5月',
        tag: '#记录 #项目物流',
        title: '创下从布龙卡港运出记录 — CC7项目401项。',
        excerpt: '公司最大规模的一次性操作证实了在处理复杂货物方面的领导地位。',
        icon: '🏆'
      },
      {
        id: 4,
        date: '2025年5月',
        tag: '#发展',
        title: '完成合并为统一结构 — ООО «Группа компаний ХЖЛ»。',
        excerpt: '优化流程和提高服务质量的新阶段。',
        icon: '🏢'
      }
    ]
  }

  const currentNews = news[language]

  return (
    <div className="news-page">
      <div className="news-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Новости' : '新闻'}</span>
          </div>
          <h1 className="news-page-title">
            {language === 'ru' ? 'Последние новости' : '最新新闻'}
          </h1>
        </div>
      </div>
      <div className="container" ref={sectionRef}>
        <div className="news-list">
          {currentNews.map((item, index) => (
            <article 
              key={item.id} 
              className={`news-card card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.image && (
                <div className="news-image">
                  <img src={item.image} alt={item.title} />
                </div>
              )}
              <div className="news-header">
                <div className="news-meta">
                  <span className="news-date">{item.date}</span>
                  <span className="news-tag">{item.tag}</span>
                </div>
                <div className="news-icon">{item.icon}</div>
              </div>
              <h2 className="news-title">{item.title}</h2>
              <p className="news-excerpt">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
