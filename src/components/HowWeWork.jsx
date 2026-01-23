import { useLanguage } from '../context/LanguageContext'
import './HowWeWork.css'

const HowWeWork = () => {
  const { t, language } = useLanguage()
  const steps = language === 'ru' ? [
    {
      number: '01',
      title: 'Онлайн-заявка',
      description: 'Заполните форму на сайте с параметрами груза'
    },
    {
      number: '02',
      title: 'Автоматический расчёт',
      description: 'Получите предварительную стоимость доставки'
    },
    {
      number: '03',
      title: 'Организация перевозки',
      description: 'Мы координируем все этапы логистики'
    },
    {
      number: '04',
      title: 'Доставка до клиента',
      description: 'Груз прибывает в указанный пункт назначения'
    }
  ] : [
    {
      number: '01',
      title: '在线申请',
      description: '在网站上填写货物参数表格'
    },
    {
      number: '02',
      title: '自动计算',
      description: '获得初步的配送费用'
    },
    {
      number: '03',
      title: '组织运输',
      description: '我们协调所有物流阶段'
    },
    {
      number: '04',
      title: '交付给客户',
      description: '货物到达指定目的地'
    }
  ]

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="section-title">{t('howWeWork')}</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
