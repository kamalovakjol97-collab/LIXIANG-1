import { useLanguage } from '../context/LanguageContext'
import './NewsPage.css'

const NewsPage = () => {
  const { language } = useLanguage()

  const news = language === 'ru' 
    ? [
        {
          id: 1,
          title: 'Новые маршруты доставки из Китая',
          date: '2024-01-15',
          excerpt: 'Расширяем географию доставки и открываем новые логистические маршруты.'
        },
        {
          id: 2,
          title: 'Улучшение таможенного оформления',
          date: '2024-01-10',
          excerpt: 'Внедрены новые технологии для ускорения процесса таможенного оформления.'
        },
        {
          id: 3,
          title: 'Партнёрство с ведущими перевозчиками',
          date: '2024-01-05',
          excerpt: 'Заключены соглашения с крупнейшими транспортными компаниями.'
        }
      ]
    : [
        {
          id: 1,
          title: '从中国的新配送路线',
          date: '2024-01-15',
          excerpt: '我们正在扩大配送地理范围并开通新的物流路线。'
        },
        {
          id: 2,
          title: '改进清关流程',
          date: '2024-01-10',
          excerpt: '采用新技术以加快清关流程。'
        },
        {
          id: 3,
          title: '与领先承运商合作',
          date: '2024-01-05',
          excerpt: '与大型运输公司签署了协议。'
        }
      ]

  return (
    <div className="news-page">
      <div className="news-hero">
        <div className="container">
          <h1 className="news-page-title">
            {language === 'ru' ? 'Новости и проекты' : '新闻和项目'}
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="news-list">
          {news.map((item) => (
            <article key={item.id} className="news-item">
              <div className="news-bg">
                <div className="news-brand">XGL</div>
              </div>
              <div className="news-content">
                <div className="news-date">{item.date}</div>
                <h2 className="news-title">{item.title}</h2>
                <p className="news-excerpt">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
