import './Geography.css'

const Geography = () => {
  return (
    <section className="geography">
      <div className="container">
        <h2 className="section-title">География</h2>
        <div className="geography-content">
          <div className="geography-visual">
            <div className="location location-china">
              <span className="location-label">Китай</span>
            </div>
            <div className="route-line">
              <div className="route-arrow">→</div>
            </div>
            <div className="location location-transit">
              <span className="location-label">транзит</span>
            </div>
            <div className="route-line">
              <div className="route-arrow">→</div>
            </div>
            <div className="location location-russia">
              <span className="location-label">Россия</span>
            </div>
          </div>
          <p className="geography-text">
            Основное направление — логистика из Китая в Россию и обратно
          </p>
        </div>
      </div>
    </section>
  )
}

export default Geography
