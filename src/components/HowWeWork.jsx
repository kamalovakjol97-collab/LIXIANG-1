import './HowWeWork.css'

const HowWeWork = () => {
  const steps = [
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
  ]

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="section-title">Как мы работаем</h2>
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
