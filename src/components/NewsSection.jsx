import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './NewsSection.css'

const NewsSection = () => {
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
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
      },
      {
        id: 2,
        date: 'Декабрь 2025',
        tag: '#Партнерство',
        title: 'Стратегический альянс с перевозчиком ООО «К2».',
        excerpt: 'Усиливаем наземный логистический потенциал для гибкого обслуживания клиентов.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
      },
      {
        id: 3,
        date: 'Май 2025',
        tag: '#Рекорд',
        title: 'Рекорд вывоза из порта Бронка — 401 позиция для CC7.',
        excerpt: 'Крупнейшая единовременная операция подтвердила лидерство в работе со сложными грузами.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      }
    ],
    zh: [
      {
        id: 1,
        date: '2026年1月',
        tag: '#公司活动',
        title: '2026新年快乐！ООО ГК ХЖЛ感谢合作伙伴。',
        excerpt: '公司团队向所有客户和同事表示祝贺。我们总结增长的一年，并为未来制定计划。',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
      },
      {
        id: 2,
        date: '2025年12月',
        tag: '#合作伙伴',
        title: '战略联盟：与承运商ООО «К2»签署协议。',
        excerpt: '我们正在加强地面物流能力，为客户提供灵活的服务。',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
      },
      {
        id: 3,
        date: '2025年5月',
        tag: '#记录',
        title: '创下从布龙卡港运出记录 — CC7项目401项。',
        excerpt: '公司最大规模的一次性操作证实了在处理复杂货物方面的领导地位。',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      }
    ]
  }

  const currentNews = news[language]
  const readMoreText = language === 'ru' ? 'Читать далее' : '阅读更多'

  return (
    <section className="news-section" ref={sectionRef} aria-labelledby="news-section-title">
      <div className="container">
        <div className="news-section-header">
          <h2 id="news-section-title" className="section-title">
            {language === 'ru' ? 'Новости компании' : '公司新闻'}
          </h2>
          <p className="news-section-subtitle">
            {language === 'ru'
              ? 'События, партнёрства и достижения XGL'
              : 'XGL 的动态、合作与成就'}
          </p>
        </div>
        <div className="news-grid">
          {currentNews.map((item, index) => (
            <Link
              key={item.id}
              to="/news"
              className={`news-section-card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.image && (
                <div className="news-section-card-image">
                  <img src={item.image} alt={item.title} />
                  <span className="news-section-card-date">{item.date}</span>
                </div>
              )}
              <div className="news-section-card-body">
                <span className="news-section-card-tag">{item.tag}</span>
                <h3 className="news-section-card-title">{item.title}</h3>
                <p className="news-section-card-excerpt">{item.excerpt}</p>
                <span className="news-section-card-link">{readMoreText} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="news-cta">
          <Link to="/news" className="news-cta-button">
            {language === 'ru' ? 'Все новости' : '所有新闻'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
