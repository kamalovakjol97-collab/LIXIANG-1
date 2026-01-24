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

  // Координаты точек для Европы и Азии (viewBox="0 0 1200 800")
  // Обновлены для более точного географического соответствия
  const nodes = {
    // Россия - Порты и города
    spb: { x: 200, y: 150, label: language === 'ru' ? 'Санкт-Петербург' : '圣彼得堡', type: 'port-ru' },
    mow: { x: 350, y: 200, label: language === 'ru' ? 'Москва' : '莫斯科', type: 'city-ru' },
    kazan: { x: 450, y: 220, label: language === 'ru' ? 'Казань' : '喀山', type: 'city-ru' },
    nvr: { x: 280, y: 420, label: language === 'ru' ? 'Новороссийск' : '新罗西斯克', type: 'port-ru' },
    ekb: { x: 550, y: 250, label: language === 'ru' ? 'Екатеринбург' : '叶卡捷琳堡', type: 'city-ru' },
    omsk: { x: 650, y: 280, label: language === 'ru' ? 'Омск' : '鄂木斯克', type: 'city-ru' },
    nsk: { x: 750, y: 300, label: language === 'ru' ? 'Новосибирск' : '新西伯利亚', type: 'city-ru' },
    vvo: { x: 1080, y: 380, label: language === 'ru' ? 'Владивосток' : '符拉迪沃斯托克', type: 'port-ru' },

    // Погранпереходы
    zabaikal: { x: 920, y: 350, label: language === 'ru' ? 'Забайкальск-Маньчжурия' : '后贝加尔斯克-满洲里', type: 'border' },
    heihe: { x: 1000, y: 320, label: language === 'ru' ? 'Благовещенск-Хэйхэ' : '布拉戈维申斯克-黑河', type: 'border' },
    suifenhe: { x: 1060, y: 360, label: language === 'ru' ? 'Пограничный-Суйфэньхэ' : '波格拉尼奇内-绥芬河', type: 'border' },
    hunchun: { x: 1070, y: 380, label: language === 'ru' ? 'Краскино-Хуньчунь' : '克拉斯基诺-珲春', type: 'border' },

    // Китай - Города
    beijing: { x: 960, y: 420, label: 'Beijing', type: 'city-cn' },
    shenyang: { x: 1020, y: 400, label: 'Shenyang', type: 'city-cn' },
    wuhan: { x: 920, y: 540, label: 'Wuhan', type: 'city-cn' },
    zhengzhou: { x: 940, y: 480, label: 'Zhengzhou', type: 'city-cn' },
    chengdu: { x: 850, y: 520, label: 'Chengdu', type: 'city-cn' },

    // Китай - Порты
    sha: { x: 1050, y: 510, label: 'Port of Shanghai', type: 'port-cn' },
    szx: { x: 960, y: 640, label: 'Port of Shenzhen', type: 'port-cn' },
    nbo: { x: 1060, y: 540, label: 'Ningbo-Zhoushan', type: 'port-cn' },
    can: { x: 940, y: 620, label: 'Guangzhou Port', type: 'port-cn' },
    tao: { x: 1010, y: 470, label: 'Qingdao Port', type: 'port-cn' },
    tsn: { x: 980, y: 440, label: 'Port of Tianjin', type: 'port-cn' },
  }

  // SVG иконки для транспорта
  const TrainIcon = () => (
    <g transform="scale(0.8)">
      <rect x="0" y="8" width="20" height="12" fill="#FF7A00" rx="2"/>
      <rect x="2" y="10" width="16" height="8" fill="#fff"/>
      <circle cx="5" cy="20" r="2" fill="#333"/>
      <circle cx="15" cy="20" r="2" fill="#333"/>
      <rect x="22" y="8" width="18" height="12" fill="#FF7A00" rx="2"/>
      <rect x="24" y="10" width="14" height="8" fill="#fff"/>
      <circle cx="28" cy="20" r="2" fill="#333"/>
      <circle cx="38" cy="20" r="2" fill="#333"/>
    </g>
  )

  const ShipIcon = () => (
    <g transform="scale(0.7)">
      <path d="M5 25 L35 25 L40 20 L40 15 L35 10 L5 10 Z" fill="#FF7A00"/>
      <rect x="8" y="12" width="24" height="8" fill="#fff"/>
      <rect x="12" y="8" width="4" height="4" fill="#FF7A00"/>
      <rect x="20" y="8" width="4" height="4" fill="#FF7A00"/>
      <rect x="28" y="8" width="4" height="4" fill="#FF7A00"/>
      <path d="M0 25 L5 25 M35 25 L40 25" stroke="#FF7A00" strokeWidth="2"/>
    </g>
  )

  const TruckIcon = () => (
    <g transform="scale(0.7)">
      <rect x="2" y="12" width="20" height="12" fill="#FF7A00" rx="1"/>
      <rect x="4" y="14" width="16" height="8" fill="#fff"/>
      <rect x="22" y="16" width="12" height="8" fill="#FF7A00" rx="1"/>
      <circle cx="8" cy="26" r="3" fill="#333"/>
      <circle cx="28" cy="26" r="3" fill="#333"/>
      <rect x="6" y="10" width="2" height="2" fill="#FF7A00"/>
    </g>
  )

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

        <div className={`map-wrapper-large ${isVisible ? 'animate' : ''}`}>
          <div className="map-physical-bg"></div>
          <svg viewBox="0 0 1200 800" className="world-map-svg-large">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* --- КОНТУРЫ СТРАН (ЕВРОПА И АЗИЯ) --- */}
            <path d="M50,50 L700,50 L1150,300 L1150,500 L700,600 L50,600 Z" className="country-shape russia-area-v2" />
            <path d="M450,300 L750,300 L850,400 L500,400 Z" className="country-shape kazakhstan-area-v2" />
            <path d="M750,400 L1100,400 L1100,750 L750,750 Z" className="country-shape china-area-v2" />
            
            {/* --- МАРШРУТЫ (обновлены для правильного прохождения через точки) --- */}
            {/* ЖД маршрут: СПб → Москва → Екатеринбург → Новосибирск → Забайкальск → Китай */}
            <path id="main-rail" d="M200,150 L350,200 L550,250 L750,300 L920,350 L960,420" className="path-rail-v2" />
            
            {/* Морской маршрут: Новороссийск → море → Шанхай */}
            <path id="sea-route" d="M280,420 Q600,200 1050,510" className="path-sea-v2" />
            
            {/* Автомаршрут: Москва → Казань → Екатеринбург → Омск → Забайкальск */}
            <path id="auto-route" d="M350,200 L450,220 L550,250 L650,280 L920,350" className="path-auto-v2" />

            {/* --- АНИМАЦИЯ С ПРОФЕССИОНАЛЬНЫМИ ИКОНКАМИ --- */}
            <g className="moving-unit">
              <g transform="translate(-20, -20)">
                <TrainIcon />
                <animateMotion dur="18s" repeatCount="indefinite">
                  <mpath href="#main-rail"/>
                </animateMotion>
              </g>
            </g>
            
            <g className="moving-unit">
              <g transform="translate(-20, -20)">
                <ShipIcon />
                <animateMotion dur="30s" repeatCount="indefinite">
                  <mpath href="#sea-route"/>
                </animateMotion>
              </g>
            </g>
            
            <g className="moving-unit">
              <g transform="translate(-20, -20)">
                <TruckIcon />
                <animateMotion dur="22s" repeatCount="indefinite">
                  <mpath href="#auto-route"/>
                </animateMotion>
              </g>
            </g>

            {/* --- ОТРИСОВКА ТОЧЕК --- */}
            {Object.entries(nodes).map(([key, node]) => (
              <g key={key} className={`node-group-v2 ${node.type}`}>
                <circle cx={node.x} cy={node.y} r={node.type.includes('port') ? 6 : 4} className="node-dot-v2" />
                <text x={node.x + 12} y={node.y + 4} className="node-text-v2">{node.label}</text>
                {node.type === 'border' && <text x={node.x - 12} y={node.y - 12} fontSize="16">🛂</text>}
                {node.type.includes('port') && <text x={node.x - 12} y={node.y - 12} fontSize="16">⚓</text>}
              </g>
            ))}
          </svg>
          
          <div className="map-legend-v4">
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
