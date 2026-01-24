import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Geography.css'

const Geography = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="geography-map-section" ref={sectionRef}>
      <div className="container">
        <div className="geo-header">
          <h2 className="section-title">
            {language === 'ru' ? 'География поставок' : '供应地理'}
          </h2>
          <p className="geo-subtitle">
            {language === 'ru' 
              ? 'Разветвленная сеть маршрутов, объединяющая крупнейшие промышленные центры Китая и России.'
              : '连接中国和俄罗斯最大工业中心的多样化航线网络。'}
          </p>
        </div>

        <div className={`map-visual-container ${isVisible ? 'animate' : ''}`}>
          <svg viewBox="0 0 1000 500" className="interactive-svg-map">
            {/* Упрощенная подложка карты Евразии */}
            <path d="M100,250 Q200,100 400,150 T700,100 T950,200 L950,450 L100,450 Z" className="map-land-shape" />
            
            {/* Морские маршруты (Пунктир) */}
            <path d="M850,350 Q700,450 500,400 T200,350" className="route-sea" />
            <path d="M880,320 Q950,400 900,480" className="route-sea" />
            
            {/* Ж/Д маршруты */}
            <path d="M750,250 L500,200 L300,180" className="route-rail" />
            <path d="M780,280 L600,250 L400,240" className="route-rail" />
            
            {/* Порты (Иконки якорей/круги) */}
            <g className="point port">
              <circle cx="850" cy="350" r="6" />
              <text x="865" y="355">Шанхай / 上海</text>
            </g>
            <g className="point port">
              <circle cx="200" cy="350" r="6" />
              <text x="140" y="375">Новороссийск</text>
            </g>
            <g className="point port">
              <circle cx="880" cy="220" r="6" />
              <text x="895" y="225">Владивосток</text>
            </g>

            {/* Ж/Д Станции (Иконки поездов) */}
            <g className="point rail-station">
              <rect x="740" y="240" width="20" height="20" rx="4" />
              <text x="740" y="230">Гуанчжоу / 广州</text>
            </g>
            <g className="point rail-station">
              <rect x="300" y="170" width="20" height="20" rx="4" />
              <text x="260" y="160">Москва</text>
            </g>
            <g className="point rail-station">
              <rect x="500" y="190" width="20" height="20" rx="4" />
              <text x="480" y="180">Забайкальск</text>
            </g>

            {/* Декоративный поезд на линии */}
            <circle r="4" fill="var(--color-accent)" className="moving-train">
              <animateMotion dur="10s" repeatCount="indefinite" path="M750,250 L500,200 L300,180" />
            </circle>
          </svg>
          
          <div className="map-legend">
            <div className="legend-item">
              <span className="line sea"></span> {language === 'ru' ? 'Морские пути' : '海运航线'}
            </div>
            <div className="legend-item">
              <span className="line rail"></span> {language === 'ru' ? 'Ж/Д магистрали' : '铁路干线'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Geography
