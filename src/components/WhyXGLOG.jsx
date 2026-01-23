import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const advantages = [
    'Работаем как логистический экспедитор',
    'Фокус на Китай → Россия',
    'Прозрачные этапы',
    'Минимум ручного взаимодействия',
    'Подходит для малого и среднего бизнеса'
  ]

  return (
    <section className="why-xglog">
      <div className="container">
        <h2 className="section-title">Почему XGLOG</h2>
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
