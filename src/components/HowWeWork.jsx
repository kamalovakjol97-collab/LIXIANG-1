import { useLanguage } from '../context/LanguageContext'
import './HowWeWork.css'

const HowWeWork = () => {
  const { language } = useLanguage()
  
  const steps = language === 'ru' ? [
    { id: '01', title: 'Онлайн-заявка', text: 'Заполните форму на сайте с параметрами груза' },
    { id: '02', title: 'Подбор решения', text: 'В течение 15 минут подготовим КП с точной стоимостью' },
    { id: '03', title: 'Организация', text: 'Координируем все этапы логистики и таможни' },
    { id: '04', title: 'Доставка', text: 'Груз прибывает в указанный пункт назначения' }
  ] : [
    { id: '01', title: '在线申请', text: '填写表格' },
    { id: '02', title: '方案选择', text: '15分钟内提供报价' },
    { id: '03', title: '组织工作', text: '协调物流' },
    { id: '04', title: '交付', text: '货物到达' }
  ]

  return (
    <section className="work-sticky-section">
      <div className="container">
        <div className="sticky-layout">
          <div className="sticky-left">
            <h2 className="section-title-sticky">
              {language === 'ru' ? 'Как мы работаем' : '我们如何运作'}
            </h2>
            <div className="work-stat">
              <strong>15</strong>
              <span>{language === 'ru' ? 'минут на расчет' : '分钟响应'}</span>
            </div>
          </div>
          <div className="scroll-right">
            {steps.map((step) => (
              <div key={step.id} className="work-scroll-card">
                <div className="step-id">{step.id}</div>
                <div className="step-content">
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
