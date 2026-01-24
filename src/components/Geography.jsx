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
            {language === 'ru' ? 'Глобальная география поставок XGL' : 'XGL 全球供应地理'}
          </h2>
          <p className="geo-subtitle">
            {language === 'ru' 
              ? 'Прямые логистические коридоры, соединяющие ключевые промышленные центры Китая с регионами России.'
              : '连接中国关键工业中心与俄罗斯地区的直接物流通道。'}
          </p>
        </div>

        <div className={`map-wrapper ${isVisible ? 'animate' : ''}`}>
          <svg viewBox="0 0 1200 650" className="world-map-svg">
            {/* Стилизованная карта мира на заднем фоне */}
            <path d="M50,300 Q150,50 400,80 T700,50 T1150,150 L1150,600 L50,600 Z" className="land-shape" />
            
            {/* --- ЖЕЛЕЗНОДОРОЖНЫЕ МАРШРУТЫ (ПОЕЗДА) --- */}
            {/* Чунцин - ЕКБ */}
            <path id="chongqing-ekb" d="M880,480 L650,380 L550,280" className="path-rail" />
            {/* Сиань - СПБ */}
            <path id="xian-spb" d="M920,430 L700,320 L280,180" className="path-rail" />
            {/* Чжэнчжоу - Новосибирск */}
            <path id="zhengzhou-nsk" d="M940,400 L750,280 L650,220" className="path-rail" />
            {/* Иву - Москва */}
            <path id="yiwu-mow" d="M980,460 L750,350 L350,250" className="path-rail" />

            {/* --- МОРСКИЕ МАРШРУТЫ (КОРАБЛИ) --- */}
            {/* Шанхай - Владивосток */}
            <path id="sha-vvo" d="M1020,500 Q1100,520 1120,450" className="path-sea" />
            {/* Нинбо - СПБ */}
            <path id="nbo-spb" d="M1040,530 Q600,680 250,200" className="path-sea" />
            {/* Циндао - Новороссийск */}
            <path id="tao-ovb" d="M1000,480 Q500,620 200,520" className="path-sea" />

            {/* --- АВТО МАРШРУТЫ (ГРУЗОВИКИ) --- */}
            {/* Гуаньчжоу - Забайкальск - Москва */}
            <path id="guangzhou-zabaikal-mow" d="M920,520 L800,300 L350,250" className="path-truck" />

            {/* --- АНИМАЦИЯ ПОЕЗДОВ --- */}
            <g className="moving-unit"><text fontSize="22">🚂<animateMotion dur="12s" repeatCount="indefinite"><mpath href="#chongqing-ekb"/></animateMotion></text></g>
            <g className="moving-unit"><text fontSize="22">🚂<animateMotion dur="15s" repeatCount="indefinite"><mpath href="#xian-spb"/></animateMotion></text></g>
            <g className="moving-unit"><text fontSize="22">🚂<animateMotion dur="14s" repeatCount="indefinite"><mpath href="#zhengzhou-nsk"/></animateMotion></text></g>
            <g className="moving-unit"><text fontSize="22">🚂<animateMotion dur="16s" repeatCount="indefinite"><mpath href="#yiwu-mow"/></animateMotion></text></g>

            {/* --- АНИМАЦИЯ КОРАБЛЕЙ --- */}
            <g className="moving-unit"><text fontSize="22">🚢<animateMotion dur="18s" repeatCount="indefinite"><mpath href="#sha-vvo"/></animateMotion></text></g>
            <g className="moving-unit"><text fontSize="22">🚢<animateMotion dur="25s" repeatCount="indefinite"><mpath href="#nbo-spb"/></animateMotion></text></g>
            <g className="moving-unit"><text fontSize="22">🚢<animateMotion dur="22s" repeatCount="indefinite"><mpath href="#tao-ovb"/></animateMotion></text></g>

            {/* --- АНИМАЦИЯ ГРУЗОВИКОВ --- */}
            <g className="moving-unit"><text fontSize="22">🚛<animateMotion dur="14s" repeatCount="indefinite"><mpath href="#guangzhou-zabaikal-mow"/></animateMotion></text></g>

            {/* ТОЧКИ (КИТАЙ) */}
            <g className="city-point china"><circle cx="920" cy="520" r="5" /><text x="930" y="535">Guangzhou</text></g>
            <g className="city-point china"><circle cx="1020" cy="500" r="5" /><text x="1030" y="515">Shanghai</text></g>
            <g className="city-point china"><circle cx="880" cy="480" r="5" /><text x="820" y="505">Chongqing</text></g>
            
            {/* ТОЧКИ (РОССИЯ) */}
            <g className="city-point russia"><circle cx="350" cy="250" r="5" /><text x="300" y="240">Moscow</text></g>
            <g className="city-point russia"><circle cx="250" cy="200" r="5" /><text x="200" y="190">St. Petersburg</text></g>
            <g className="city-point russia"><circle cx="1120" cy="450" r="5" /><text x="1050" y="440">Vladivostok</text></g>
            <g className="city-point russia"><circle cx="200" cy="520" r="5" /><text x="120" y="540">Novorossiysk</text></g>
          </svg>
          
          <div className="map-legend-v2">
            <div className="legend-item"><span className="unit-icon">🚂</span> {language === 'ru' ? 'Ж/Д экспрессы' : '铁路快运'}</div>
            <div className="legend-item"><span className="unit-icon">🚢</span> {language === 'ru' ? 'Морские линии' : '海运动线'}</div>
            <div className="legend-item"><span className="unit-icon">🚛</span> {language === 'ru' ? 'Автомобильные перевозки' : '公路运输'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Geography
