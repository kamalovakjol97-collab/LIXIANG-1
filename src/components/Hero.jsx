import './Hero.css'

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Международная логистика из Китая в Россию под ключ
          </h1>
          <p className="hero-subtitle">
            Экспедирование, таможенное оформление и доставка — без лишних посредников
          </p>
          <button className="hero-cta" onClick={scrollToForm}>
            Рассчитать доставку
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
