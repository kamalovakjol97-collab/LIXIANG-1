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
    <section className="geo-global-section" ref={sectionRef}>
      <div className="container">
        <div className="geo-header">
          <h2 className="section-title">
            {language === 'ru' ? 'Глобальная география XGL' : 'XGL 全球地理'}
          </h2>
          <p className="geo-subtitle">
            {language === 'ru' 
              ? 'Прямые маршруты между крупнейшими промышленными хабами Евразии.'
              : '亚洲最大的工业中心之间的直航路线。'}
          </p>
        </div>

        <div className={`map-wrapper ${isVisible ? 'animate' : ''}`}>
          <svg viewBox="0 0 1200 600" className="world-map-svg">
            {/* Упрощенная карта мира (Евразия) */}
            <path d="M100,300 Q200,50 500,100 T800,50 T1100,200 L1100,550 L100,550 Z" className="land-shape" />
            
            {/* МАРШРУТЫ Ж/Д (Поезда) */}
            <path id="rail1" d="M900,450 L700,350 L300,200" className="path-rail" /> {/* Гуаньчжоу - Москва */}
            <path id="rail2" d="M850,480 L600,400 L400,350" className="path-rail" /> {/* Чунцин - ЕКБ */}
            <path id="rail3" d="M920,420 L750,300 L350,150" className="path-rail" /> {/* Сиань - СПБ */}
            
            {/* МАРШРУТЫ МОРЕ (Корабли) */}
            <path id="sea1" d="M950,500 Q1050,550 1100,450" className="path-sea" /> {/* Шанхай - Владивосток */}
            <path id="sea2" d="M930,520 Q500,650 200,500" className="path-sea" /> {/* Нинбо - СПБ (упрощенно) */}
            
            {/* ИКОНКИ Ж/Д (Поезд) */}
            <g className="moving-icon">
              <text fontSize="24">🚂
                <animateMotion dur="15s" repeatCount="indefinite">
                  <mpath href="#rail1"/>
                </animateMotion>
              </text>
            </g>
            <g className="moving-icon">
              <text fontSize="24">🚂
                <animateMotion dur="18s" repeatCount="indefinite">
                  <mpath href="#rail2"/>
                </animateMotion>
              </text>
            </g>

            {/* ИКОНКИ МОРЕ (Корабль) */}
            <g className="moving-icon">
              <text fontSize="24">🚢
                <animateMotion dur="20s" repeatCount="indefinite">
                  <mpath href="#sea1"/>
                </animateMotion>
              </text>
            </g>
            <g className="moving-icon">
              <text fontSize="24">🚢
                <animateMotion dur="25s" repeatCount="indefinite">
                  <mpath href="#sea2"/>
                </animateMotion>
              </text>
            </g>

            {/* ТОЧКИ (ГОРОДА) */}
            <g className="city-point">
              <circle cx="900" cy="450" r="5" fill="var(--color-accent)" />
              <text x="910" y="455">Guangzhou</text>
            </g>
            <g className="city-point">
              <circle cx="300" cy="200" r="5" fill="var(--color-accent)" />
              <text x="240" y="190">Moscow</text>
            </g>
            <g className="city-point">
              <circle cx="1100" cy="450" r="5" fill="var(--color-accent)" />
              <text x="1020" y="440">Vladivostok</text>
            </g>
          </svg>
          
          <div className="map-legend-modern">
            <div className="legend-item"><span className="icon">🚂</span> Ж/Д маршруты</div>
            <div className="legend-item"><span className="icon">🚢</span> Морские линии</div>
            <div className="legend-item"><span className="icon">🚛</span> Автоперевозки</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Geography
