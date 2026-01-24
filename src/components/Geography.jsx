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

  // Координаты точек (x, y) для viewBox="0 0 1200 800"
  const nodes = {
    // Россия
    spb: { x: 180, y: 180, label: 'Санкт-Петербург', type: 'port-ru' },
    mow: { x: 250, y: 220, label: 'Москва', type: 'city-ru' },
    kazan: { x: 320, y: 240, label: 'Казань', type: 'city-ru' },
    nvr: { x: 150, y: 380, label: 'Новороссийск', type: 'port-ru' },
    ekb: { x: 450, y: 280, label: 'Екатеринбург', type: 'city-ru' },
    omsk: { x: 550, y: 310, label: 'Омск', type: 'city-ru' },
    nsk: { x: 650, y: 330, label: 'Новосибирск', type: 'city-ru' },
    vvo: { x: 1100, y: 420, label: 'Владивосток', type: 'port-ru' },

    // Погранпереходы (Граница)
    zabaikal: { x: 920, y: 380, label: 'Забайкальск-Маньчжурия', type: 'border' },
    heihe: { x: 1000, y: 340, label: 'Благовещенск-Хэйхэ', type: 'border' },
    suifenhe: { x: 1080, y: 390, label: 'Пограничный-Суйфэньхэ', type: 'border' },
    hunchun: { x: 1090, y: 410, label: 'Краскино-Хуньчунь', type: 'border' },

    // Китай - Города
    beijing: { x: 950, y: 460, label: 'Beijing', type: 'city-cn' },
    shenyang: { x: 1020, y: 440, label: 'Shenyang', type: 'city-cn' },
    wuhan: { x: 900, y: 580, label: 'Wuhan', type: 'city-cn' },
    zhengzhou: { x: 920, y: 520, label: 'Zhengzhou', type: 'city-cn' },
    chengdu: { x: 820, y: 560, label: 'Chengdu', type: 'city-cn' },

    // Китай - Порты
    sha: { x: 1050, y: 550, label: 'Port of Shanghai', type: 'port-cn' },
    szx: { x: 950, y: 680, label: 'Port of Shenzhen', type: 'port-cn' },
    nbo: { x: 1060, y: 580, label: 'Ningbo-Zhoushan', type: 'port-cn' },
    can: { x: 930, y: 660, label: 'Guangzhou Port', type: 'port-cn' },
    tao: { x: 1010, y: 510, label: 'Qingdao Port', type: 'port-cn' },
    tsn: { x: 970, y: 480, label: 'Port of Tianjin', type: 'port-cn' },
  }

  return (
    <section className="geo-global-section" ref={sectionRef}>
      <div className="container">
        <div className="geo-header">
          <h2 className="section-title">
            {language === 'ru' ? 'Инфраструктура и география XGL' : 'XGL 基础设施与地理'}
          </h2>
          <p className="geo-subtitle">
            {language === 'ru' 
              ? 'Собственные логистические узлы и отработанные маршруты через ключевые порты и погранпереходы.'
              : '在关键港口和边境口岸拥有自己的物流节点和成熟路线。'}
          </p>
        </div>

        <div className={`map-wrapper ${isVisible ? 'animate' : ''}`}>
          <svg viewBox="0 0 1200 800" className="world-map-svg">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* --- КОНТУРЫ СТРАН (СТИЛИЗОВАННЫЕ) --- */}
            {/* Россия */}
            <path d="M100,100 L800,100 L1150,350 L1150,450 L800,500 L100,500 Z" className="country-shape russia-area" />
            {/* Казахстан */}
            <path d="M400,350 L750,350 L850,450 L450,450 Z" className="country-shape kazakhstan-area" />
            {/* Китай */}
            <path d="M750,450 L1100,450 L1100,750 L750,750 Z" className="country-shape china-area" />

            {/* Метки стран */}
            <text x="300" y="150" className="country-label">RUSSIA</text>
            <text x="550" y="420" className="country-label">KAZAKHSTAN</text>
            <text x="900" y="720" className="country-label">CHINA</text>
            
            {/* --- МАРШРУТЫ --- */}
            {/* Основная ЖД магистраль через Забайкальск */}
            <path id="main-rail" d="M1050,550 L920,380 L650,330 L450,280 L250,220" className="path-rail" />
            <path id="sea-route" d="M1050,550 Q600,750 150,380" className="path-sea" />

            {/* --- АНИМАЦИЯ --- */}
            <g className="moving-unit">
              <text fontSize="24">🚂
                <animateMotion dur="15s" repeatCount="indefinite"><mpath href="#main-rail"/></animateMotion>
              </text>
            </g>
            <g className="moving-unit">
              <text fontSize="24">🚢
                <animateMotion dur="25s" repeatCount="indefinite"><mpath href="#sea-route"/></animateMotion>
              </text>
            </g>

            {/* --- ОТРИСОВКА ТОЧЕК --- */}
            {Object.entries(nodes).map(([key, node]) => (
              <g key={key} className={`node-group ${node.type}`}>
                <circle cx={node.x} cy={node.y} r={node.type.includes('port') ? 5 : 3.5} className="node-dot" />
                <text x={node.x + 8} y={node.y + 4} className="node-text">{node.label}</text>
                {node.type === 'border' && <text x={node.x - 10} y={node.y - 10} fontSize="14">🛂</text>}
                {node.type.includes('port') && <text x={node.x - 10} y={node.y - 10} fontSize="14">⚓</text>}
              </g>
            ))}
          </svg>
          
          <div className="map-legend-v3">
            <div className="legend-group">
              <h4>{language === 'ru' ? 'Условные обозначения' : '图例'}</h4>
              <div className="legend-item"><span className="dot port-ru"></span> {language === 'ru' ? 'Порты РФ' : '俄罗斯港口'}</div>
              <div className="legend-item"><span className="dot port-cn"></span> {language === 'ru' ? 'Порты КНР' : '中国港口'}</div>
              <div className="legend-item"><span className="dot border"></span> {language === 'ru' ? 'Погранпереходы' : '边境口岸'}</div>
              <div className="legend-item"><span className="dot city"></span> {language === 'ru' ? 'Ключевые города' : '主要城市'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Geography
