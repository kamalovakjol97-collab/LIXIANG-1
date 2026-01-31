import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import Geography from '../components/Geography'
import './ProjectsPage.css'

const ProjectsPage = () => {
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

  const projects = {
    ru: [
      {
        id: 'cc7',
        status: 'В работе',
        statusClass: 'status-active',
        title: 'Комплексное логистическое сопровождение для гиганта химстроя',
        partner: 'АО ПЕСКО / China National Chemical Engineering No.7',
        timeline: [
          { date: 'Июнь 2025', event: 'Старт контракта' },
          { date: 'Май 2025', event: 'Рекорд (401 позиция)' },
          { date: 'Октябрь 2025', event: 'Старт автопоставок' }
        ],
        description: 'Масштабный проект по логистическому сопровождению строительства химического комплекса. Организация мультимодальных перевозок, таможенного оформления и экспедирования крупногабаритного оборудования и материалов из Китая в Россию.',
        keyNumber: '401',
        keyNumberLabel: 'позиций вывезено из порта Бронка',
        cta: 'Подробнее о сотрудничестве',
        logo: 'CC7',
        route: 'Китай → Бронка → объект',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      },
      {
        id: 'eastern-ring',
        status: 'Реализовано',
        statusClass: 'status-completed',
        title: 'Инфраструктура на ключевых узлах Китай–Россия',
        partner: 'Проект «Восточное кольцо»',
        timeline: [
          { date: '2016', event: 'Иу, Гуанчжоу, Шэньчжэнь' },
          { date: '2018', event: 'СВХ Хэйхэ' },
          { date: '2019', event: 'Маньчжурия' }
        ],
        description: 'Создание собственной логистической инфраструктуры на ключевых узлах маршрута Китай–Россия. Развитие сети складов и терминалов для обеспечения бесшовной логистики «от двери до двери».',
        keyNumber: null,
        result: 'Бесшовная логистика «от двери до двери»',
        cta: 'Узнать больше',
        route: 'Китай → транзит → Россия',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
      }
    ],
    zh: [
      {
        id: 'cc7',
        status: '进行中',
        statusClass: 'status-active',
        title: '为化工建设巨头的综合物流支持',
        partner: 'АО ПЕСКО / 中国化学工程第七建设有限公司',
        timeline: [
          { date: '2025年6月', event: '合同启动' },
          { date: '2025年5月', event: '创纪录（401项）' },
          { date: '2025年10月', event: '汽车运输启动' }
        ],
        description: '化工综合体建设的物流支持大型项目。组织从中国到俄罗斯的超大设备和材料的多式联运、清关和运输代理。',
        keyNumber: '401',
        keyNumberLabel: '从布龙卡港运出的项目',
        cta: '了解更多合作信息',
        logo: 'CC7',
        route: '中国 → 布龙卡 → 项目现场',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
      },
      {
        id: 'eastern-ring',
        status: '已完成',
        statusClass: 'status-completed',
        title: '中俄关键节点的基础设施',
        partner: '“东方环”项目',
        timeline: [
          { date: '2016', event: '义乌、广州、深圳' },
          { date: '2018', event: '黑河临时仓储' },
          { date: '2019', event: '满洲里' }
        ],
        description: '在中俄路线关键节点创建自有物流基础设施。发展仓库和终端网络，确保“门到门”无缝物流。',
        keyNumber: null,
        result: '“门到门”无缝物流',
        cta: '了解更多',
        route: '中国 → 中转 → 俄罗斯',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
      }
    ]
  }

  const currentProjects = projects[language]

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <div className="projects-hero-pattern" aria-hidden="true" />
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">{language === 'ru' ? 'Главная' : '首页'}</Link>
            <span>/</span>
            <span>{language === 'ru' ? 'Ключевые проекты' : '关键项目'}</span>
          </div>
          <h1 className="projects-page-title">
            {language === 'ru' ? 'Ключевые проекты' : '关键项目'}
          </h1>
          <p className="projects-hero-subtitle">
            {language === 'ru'
              ? 'Крупные инфраструктурные и проектные решения в логистике Китай–Россия'
              : '中俄物流领域的大型基础设施与项目解决方案'}
          </p>
        </div>
      </div>

      <section className="projects-intro">
        <div className="container">
          <p>
            {language === 'ru'
              ? 'Мы реализуем проекты, требующие точной координации, работы с тяжёлыми и негабаритными грузами, а также полного логистического цикла в Китае и России.'
              : '我们实施需要精准协调、重型和超限货物运输以及中俄全物流周期的项目。'}
          </p>
        </div>
      </section>

      <div className="container" ref={sectionRef}>
        <div className="projects-list">
          {currentProjects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-media">
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                <span className={`status-badge ${project.statusClass}`}>
                  {project.status}
                </span>
              </div>

              <div className="project-body">
                <div className="project-header">
                  {project.logo && (
                    <span className="project-logo">{project.logo}</span>
                  )}
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-partner">{project.partner}</p>
                </div>

                <div className="project-meta">
                  <div className="project-route">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    <span>{project.route}</span>
                  </div>
                  {project.keyNumber && (
                    <div className="project-key-number">
                      <span className="key-number-value">{project.keyNumber}</span>
                      <span className="key-number-label">{project.keyNumberLabel}</span>
                    </div>
                  )}
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-timeline">
                  <h3 className="timeline-title">
                    {language === 'ru' ? 'Хронология' : '时间线'}
                  </h3>
                  <div className="timeline-list">
                    {project.timeline.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <span className="timeline-date">{item.date}</span>
                        <span className="timeline-event">{item.event}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.result && (
                  <div className="project-result">
                    <strong>{project.result}</strong>
                  </div>
                )}

                <div className="project-cta">
                  <button type="button" className="cta-button">
                    {project.cta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Geography />

      <section className="projects-final-cta">
        <div className="container">
          <h3 className="projects-final-cta-title">
            {language === 'ru' ? 'Готовы обсудить ваш проект?' : '准备好讨论您的项目了吗？'}
          </h3>
          <p className="projects-final-cta-text">
            {language === 'ru'
              ? 'Мы подключаемся на любом этапе логистической цепочки'
              : '我们可在物流链的任何阶段加入'}
          </p>
          <Link to="/#application-form" className="cta-button">
            {language === 'ru' ? 'Обсудить проект' : '讨论项目'}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
