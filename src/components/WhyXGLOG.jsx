import { useLanguage } from '../context/LanguageContext'
import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const { t, language } = useLanguage()
  
  const advantages = language === 'ru' ? [
    'Работаем как логистический экспедитор',
    'Фокус на Китай → Россия',
    'Прозрачные этапы',
    'Минимум ручного взаимодействия',
    'Подходит для малого и среднего бизнеса'
  ] : [
    '作为物流运输代理工作',
    '专注于 中国 → 俄罗斯',
    '透明的流程',
    '最少的人工交互',
    '适合中小型企业'
  ]

  return (
    <section className="why-xglog">
      <div className="container">
        <h2 className="section-title">{t('whyXGLOG')}</h2>
        <div className="advantages-list">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage-item">
              <div className="advantage-icon">✓</div>
              <p className="advantage-text">{advantage}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyXGLOG
