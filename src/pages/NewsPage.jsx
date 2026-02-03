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
        icon: '🎉',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
      },
      {
        id: 2,
        date: '2025年12月',
        tag: '#合作伙伴关系 #汽车运输',
        title: '战略联盟：与承运商ООО «К2»签署协议。',
        excerpt: '我们正在加强地面物流能力，为客户提供灵活的服务。',
        icon: '🤝',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
      },
      {
        id: 3,
        date: '2025年5月',
        tag: '#记录 #项目物流',
        title: '创下从布龙卡港运出记录 — CC7项目401项。',
        excerpt: '公司最大规模的一次性操作证实了在处理复杂货物方面的领导地位。',
        icon: '🏆',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      },
      {
        id: 4,
        date: '2025年5月',
        tag: '#发展',
        title: '完成合并为统一结构 — ООО «Группа компаний ХЖЛ»。',
        excerpt: '优化流程和提高服务质量的新阶段。',
        icon: '🏢',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
      },
      {
        id: 5,
        date: '2025年10月',
        tag: '#扩展 #汽车运输',
        title: 'CC7项目启动定期汽车运输。',
        excerpt: '扩大物流能力：现可稳定运输大型设备。',
        icon: '🚛',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'
      },
      {
        id: 6,
        date: '2025年9月',
        tag: '#基础设施',
        title: '圣彼得堡新物流枢纽启用。',
        excerpt: '新中心战略位置优化路线、缩短交付时间。',
        icon: '📍',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
      },
      {
        id: 7,
        date: '2025年8月',
        tag: '#技术 #创新',
        title: '推出货物实时追踪系统。',
        excerpt: '客户现可通过移动端与网页全天候查询货物状态。',
        icon: '💻',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
      },
      {
        id: 8,
        date: '2025年7月',
        tag: '#认证',
        title: '获ISO 9001:2015国际认证。',
        excerpt: '确认服务质量及国际管理标准合规。',
        icon: '✅',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
      }
    ]
  }

  const currentNews = news[language]
  const featured = currentNews[0]
  const restNews = currentNews.slice(1)
  const readMoreText = language === 'ru' ? 'Читать далее' : '阅读更多'

  return (
    <div className="news-page">
      <header className="news-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Новости' : '新闻'}</span>
          </nav>
          <h1 className="news-page-title">
            {language === 'ru' ? 'Новости компании' : '公司新闻'}
          </h1>
          <p className="news-hero-subtitle">
            {language === 'ru'
              ? 'События, партнёрства и достижения XGL — всегда актуальная информация для клиентов и партнёров.'
              : 'XGL 的动态、合作与成就 — 为客户与合作伙伴提供最新资讯。'}
          </p>
        </div>
      </header>

      <div className="news-intro">
        <div className="container">
          <p className="news-intro-text">
            {language === 'ru'
              ? 'Мы развиваем логистическую инфраструктуру и укрепляем отношения с партнёрами. В этом разделе — ключевые события и анонсы.'
              : '我们持续发展物流基础设施并深化与合作伙伴的关系。此处为重要动态与公告。'}
          </p>
        </div>
      </div>

      <div className="container news-content" ref={sectionRef}>
        {featured && (
          <article
            className={`news-card news-card-featured ${isVisible ? 'fade-in' : ''}`}
            style={{ animationDelay: '0s' }}
          >
            {featured.image && (
              <div className="news-card-image-wrap">
                <img src={featured.image} alt={featured.title} />
                <div className="news-card-overlay">
                  <span className="news-date">{featured.date}</span>
                  <span className="news-tag">{featured.tag}</span>
                </div>
              </div>
            )}
            <div className="news-card-body">
              <h2 className="news-title news-title-featured">{featured.title}</h2>
              <p className="news-excerpt">{featured.excerpt}</p>
              <span className="news-link">{readMoreText} →</span>
            </div>
          </article>
        )}

        <div className="news-list">
          {restNews.map((item, index) => (
            <article
              key={item.id}
              className={`news-card news-card-standard ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${(index + 1) * 0.08}s` }}
            >
              {item.image && (
                <div className="news-card-image-wrap">
                  <img src={item.image} alt={item.title} />
                  <div className="news-card-overlay">
                    <span className="news-date">{item.date}</span>
                  </div>
                </div>
              )}
              <div className="news-card-body">
                <span className="news-tag news-tag-inline">{item.tag}</span>
                <h2 className="news-title">{item.title}</h2>
                <p className="news-excerpt">{item.excerpt}</p>
                <span className="news-link">{readMoreText} →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
