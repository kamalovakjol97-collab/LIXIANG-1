import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './StickyStyles.css'
import './HowWeWork.css'

const HowWeWork = () => {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLineVisible(true) },
      { threshold: 0.2 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const steps = language === 'ru' ? [
    { id: '01', title: 'Онлайн-заявка', text: 'Заполните форму на сайте с параметрами груза. Ваш запрос мгновенно попадает к нашему логисту.' },
    { id: '02', title: 'Подбор решения', text: 'В течение 15 минут подготовим персональное предложение с точной стоимостью.' },
    { id: '03', title: 'Организация перевозки', text: 'Координируем все этапы логистики, документальное сопровождение и таможню.' },
    { id: '04', title: 'Доставка до клиента', text: 'Груз прибывает в указанный пункт назначения. Бесшовная логистика «от двери до двери».' }
  ] : [
    { id: '01', title: '在线申请', text: '填写表格。' },
    { id: '02', title: '方案选择', text: '15分钟内提供报价。' },
    { id: '03', title: '组织工作', text: '协调物流。' },
    { id: '04', title: '交付', text: '货物到达。' }
  ]

  return (
    <section className="sticky-section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="sticky-layout">
          <div className="sticky-left">
            <h2 className="sticky-title-large">
              {language === 'ru' ? 'Как мы работаем' : '我们如何运作'}
            </h2>
            <p className="sticky-subtitle-large">
              {language === 'ru' 
                ? 'Максимум простоты для вас — мы берем все сложности на себя.' 
                : '为您提供最大的简便性 — 我们承担所有复杂性。'}
            </p>
            <div className="sticky-accent-box">
              <div className="sticky-divider-line"></div>
              <strong>15</strong>
              <span>{language === 'ru' ? 'минут на ответ' : '分钟响应'}</span>
            </div>
          </div>
          <div className="scroll-list-right how-we-work-steps">
            <div className="how-we-work-line-wrap" aria-hidden="true">
              <svg ref={lineRef} className="how-we-work-line-svg" viewBox="0 0 4 400" preserveAspectRatio="none">
                <path className={`how-we-work-line-path ${lineVisible ? 'how-we-work-line-drawn' : ''}`} d="M2 0 L2 400" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <div className={`how-we-work-line-dot ${lineVisible ? 'how-we-work-line-dot-run' : ''}`} />
            </div>
            {steps.map((step) => (
              <div key={step.id} className="scroll-card-modern">
                <div className="scroll-card-id">{step.id}</div>
                <div className="scroll-card-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
