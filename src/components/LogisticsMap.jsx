import { useEffect, useRef, useState, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LogisticsMap.css'

const VIEWBOX = { width: 1200, height: 800 }

// Узлы: координаты и данные для tooltip
const getNodes = (language) => ({
  spb: { x: 200, y: 150, type: 'port-ru', label: language === 'ru' ? 'Санкт-Петербург' : '圣彼得堡', tooltip: { title: language === 'ru' ? 'Санкт-Петербург' : '圣彼得堡', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  mow: { x: 350, y: 200, type: 'city-ru', label: language === 'ru' ? 'Москва' : '莫斯科', tooltip: { title: language === 'ru' ? 'Москва' : '莫斯科', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  kazan: { x: 450, y: 220, type: 'city-ru', label: language === 'ru' ? 'Казань' : '喀山', tooltip: { title: language === 'ru' ? 'Казань' : '喀山', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  nvr: { x: 280, y: 420, type: 'port-ru', label: language === 'ru' ? 'Новороссийск' : '新罗西斯克', tooltip: { title: language === 'ru' ? 'Новороссийск' : '新罗西斯克', subtitle: language === 'ru' ? 'Порт' : '港口', functions: [language === 'ru' ? 'Морские перевозки' : '海运', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  ekb: { x: 550, y: 250, type: 'city-ru', label: language === 'ru' ? 'Екатеринбург' : '叶卡捷琳堡', tooltip: { title: language === 'ru' ? 'Екатеринбург' : '叶卡捷琳堡', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  nsk: { x: 750, y: 300, type: 'city-ru', label: language === 'ru' ? 'Новосибирск' : '新西伯利亚', tooltip: { title: language === 'ru' ? 'Новосибирск' : '新西伯利亚', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  vvo: { x: 1080, y: 380, type: 'port-ru', label: language === 'ru' ? 'Владивосток' : '符拉迪沃斯托克', tooltip: { title: language === 'ru' ? 'Владивосток' : '符拉迪沃斯托克', subtitle: language === 'ru' ? 'Порт' : '港口', functions: [language === 'ru' ? 'Морские перевозки' : '海运', language === 'ru' ? 'Таможенное оформление' : '清关'] } },
  zabaikal: { x: 920, y: 350, type: 'border', label: language === 'ru' ? 'Забайкальск-Маньчжурия' : '后贝加尔斯克-满洲里', tooltip: { title: language === 'ru' ? 'Забайкальск-Маньчжурия' : '后贝加尔斯克-满洲里', subtitle: language === 'ru' ? 'Пограничный переход' : '边境口岸', functions: [language === 'ru' ? 'Ж/Д, авто' : '铁路、汽车'] } },
  heihe: { x: 1000, y: 320, type: 'border', label: language === 'ru' ? 'Благовещенск-Хэйхэ' : '布拉戈维申斯克-黑河', tooltip: { title: language === 'ru' ? 'Благовещенск-Хэйхэ' : '布拉戈维申斯克-黑河', subtitle: language === 'ru' ? 'Пограничный переход' : '边境口岸', functions: [language === 'ru' ? 'Автоперевозки' : '汽车运输'] } },
  suifenhe: { x: 1060, y: 360, type: 'border', label: language === 'ru' ? 'Пограничный-Суйфэньхэ' : '波格拉尼奇内-绥芬河', tooltip: { title: language === 'ru' ? 'Пограничный-Суйфэньхэ' : '波格拉尼奇内-绥芬河', subtitle: language === 'ru' ? 'Пограничный переход' : '边境口岸', functions: [language === 'ru' ? 'Ж/Д, авто' : '铁路、汽车'] } },
  beijing: { x: 960, y: 420, type: 'city-cn', label: 'Beijing', tooltip: { title: 'Beijing', subtitle: language === 'ru' ? 'Логистический хаб' : '物流枢纽', functions: [language === 'ru' ? 'Консолидация' : '整合', language === 'ru' ? 'Отправка в РФ' : '发往俄罗斯'] } },
  sha: { x: 1050, y: 510, type: 'port-cn', label: language === 'ru' ? 'Шанхай' : '上海', tooltip: { title: language === 'ru' ? 'Порт Шанхай' : '上海港', subtitle: language === 'ru' ? 'Порт КНР' : '中国港口', functions: [language === 'ru' ? 'Морские перевозки' : '海运', language === 'ru' ? 'Консолидация' : '整合'] } },
  tsn: { x: 980, y: 440, type: 'port-cn', label: language === 'ru' ? 'Тяньцзинь' : '天津', tooltip: { title: language === 'ru' ? 'Порт Тяньцзинь' : '天津港', subtitle: language === 'ru' ? 'Порт КНР' : '中国港口', functions: [language === 'ru' ? 'Морские перевозки' : '海运'] } },
})

// Маршруты с данными для tooltip
const getRoutes = (language) => ({
  rail: [
    { id: 'rail1', d: 'M960,420 L750,300 L550,250 L350,200 L200,150', tooltip: { type: language === 'ru' ? 'Ж/Д' : '铁路', route: language === 'ru' ? 'Китай → Москва → Санкт-Петербург' : '中国 → 莫斯科 → 圣彼得堡', days: '18–22 ' + (language === 'ru' ? 'дня' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
    { id: 'rail2', d: 'M960,420 L850,360 L750,300 L550,250', tooltip: { type: language === 'ru' ? 'Ж/Д' : '铁路', route: language === 'ru' ? 'Китай → Новосибирск → Екатеринбург' : '中国 → 新西伯利亚 → 叶卡捷琳堡', days: '18–22 ' + (language === 'ru' ? 'дня' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
    { id: 'rail3', d: 'M960,420 L920,350 L650,280 L450,220', tooltip: { type: language === 'ru' ? 'Ж/Д' : '铁路', route: language === 'ru' ? 'Китай → Казань' : '中国 → 喀山', days: '16–20 ' + (language === 'ru' ? 'дня' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
  ],
  sea: [
    { id: 'sea1', d: 'M1050,510 Q900,400 1080,380', tooltip: { type: language === 'ru' ? 'Море' : '海运', route: language === 'ru' ? 'Китайские порты → Владивосток' : '中国港口 → 符拉迪沃斯托克', days: '12–18 ' + (language === 'ru' ? 'дней' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
    { id: 'sea2', d: 'M1050,510 Q650,250 280,420', tooltip: { type: language === 'ru' ? 'Море' : '海运', route: language === 'ru' ? 'Китайские порты → Новороссийск' : '中国港口 → 新罗西斯克', days: '35–45 ' + (language === 'ru' ? 'дней' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
    { id: 'sea3', d: 'M1050,510 Q600,200 200,150', tooltip: { type: language === 'ru' ? 'Море' : '海运', route: language === 'ru' ? 'Китайские порты → Санкт-Петербург' : '中国港口 → 圣彼得堡', days: '35–45 ' + (language === 'ru' ? 'дней' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
  ],
  auto: [
    { id: 'auto1', d: 'M920,350 L650,280 L350,200', tooltip: { type: language === 'ru' ? 'Авто' : '汽车', route: language === 'ru' ? 'Китай → Москва (погранпереходы)' : '中国 → 莫斯科（边境口岸）', days: '18–20 ' + (language === 'ru' ? 'дня' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
    { id: 'auto2', d: 'M1060,360 L920,350 L750,300', tooltip: { type: language === 'ru' ? 'Авто' : '汽车', route: language === 'ru' ? 'КНР → РФ через погранпереходы' : '中国 → 俄罗斯（经边境口岸）', days: '18–20 ' + (language === 'ru' ? 'дня' : '天'), cargo: language === 'ru' ? 'оборудование, контейнеры' : '设备、集装箱' } },
  ],
})

const LogisticsMap = () => {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const mapRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [filterRail, setFilterRail] = useState(true)
  const [filterSea, setFilterSea] = useState(true)
  const [filterAuto, setFilterAuto] = useState(true)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToForm = useCallback(() => {
    const el = document.getElementById('application-form')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const showRouteTooltip = useCallback((data, e) => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({
      type: 'route',
      ...data,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const showNodeTooltip = useCallback((data, e) => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({
      type: 'node',
      ...data,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const hideTooltip = useCallback(() => setTooltip(null), [])

  const nodes = getNodes(language)
  const routes = getRoutes(language)

  return (
    <section className="logistics-map" ref={sectionRef}>
      <div className="container">
        <div className={`logistics-map-container ${isVisible ? 'logistics-map-visible' : ''}`}>
          {/* Фильтры */}
          <div className="logistics-map-filters">
            <label className="logistics-map-filter">
              <input type="checkbox" checked={filterRail} onChange={(e) => setFilterRail(e.target.checked)} />
              <span className="logistics-map-filter-line rail" />
              <span>{language === 'ru' ? 'Железнодорожные' : '铁路'}</span>
            </label>
            <label className="logistics-map-filter">
              <input type="checkbox" checked={filterSea} onChange={(e) => setFilterSea(e.target.checked)} />
              <span className="logistics-map-filter-line sea" />
              <span>{language === 'ru' ? 'Морские' : '海运'}</span>
            </label>
            <label className="logistics-map-filter">
              <input type="checkbox" checked={filterAuto} onChange={(e) => setFilterAuto(e.target.checked)} />
              <span className="logistics-map-filter-line auto" />
              <span>{language === 'ru' ? 'Автомобильные' : '汽车'}</span>
            </label>
          </div>

          {/* Контейнер карты */}
          <div className="logistics-map-wrapper" ref={mapRef}>
            <div className="logistics-map-bg" aria-hidden="true" />
            <svg
              viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
              className="logistics-map-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="logistics-map-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Слой маршрутов */}
              <g className={`logistics-map-layer logistics-map-rail ${filterRail ? 'on' : 'off'}`}>
                {routes.rail.map((r) => (
                  <g key={r.id}>
                    <path
                      className="logistics-map-route-path rail"
                      d={r.d}
                      onMouseEnter={(e) => showRouteTooltip(r.tooltip, e)}
                      onMouseLeave={hideTooltip}
                    />
                    <path className="logistics-map-route-dash rail" d={r.d} />
                  </g>
                ))}
              </g>
              <g className={`logistics-map-layer logistics-map-sea ${filterSea ? 'on' : 'off'}`}>
                {routes.sea.map((r) => (
                  <g key={r.id}>
                    <path
                      className="logistics-map-route-path sea"
                      d={r.d}
                      onMouseEnter={(e) => showRouteTooltip(r.tooltip, e)}
                      onMouseLeave={hideTooltip}
                    />
                    <path className="logistics-map-route-dash sea" d={r.d} />
                  </g>
                ))}
              </g>
              <g className={`logistics-map-layer logistics-map-auto ${filterAuto ? 'on' : 'off'}`}>
                {routes.auto.map((r) => (
                  <g key={r.id}>
                    <path
                      className="logistics-map-route-path auto"
                      d={r.d}
                      onMouseEnter={(e) => showRouteTooltip(r.tooltip, e)}
                      onMouseLeave={hideTooltip}
                    />
                    <path className="logistics-map-route-dash auto" d={r.d} />
                  </g>
                ))}
              </g>

              {/* Узлы */}
              <g className="logistics-map-nodes">
                {Object.entries(nodes).map(([key, node]) => (
                  <g
                    key={key}
                    className={`logistics-map-node ${node.type}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseEnter={(e) => showNodeTooltip(node.tooltip, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <circle r={node.type.includes('port') ? 8 : 6} className="logistics-map-node-dot" />
                    <text x={12} y={4} className="logistics-map-node-label">{node.label}</text>
                  </g>
                ))}
              </g>
            </svg>

            {/* Tooltip (позиция в контейнере карты) */}
            {tooltip && (
              <div
                className="logistics-map-tooltip"
                style={{
                  left: Math.min(Math.max(tooltip.x + 16, 16), mapRef.current ? mapRef.current.offsetWidth - 280 : tooltip.x + 16),
                  top: Math.min(Math.max(tooltip.y + 8, 8), mapRef.current ? mapRef.current.offsetHeight - 180 : tooltip.y + 8),
                }}
              >
                {tooltip.type === 'route' ? (
                  <>
                    <div className="logistics-map-tooltip-row">
                      <strong>{language === 'ru' ? 'Тип перевозки' : '运输方式'}:</strong> {tooltip.type}
                    </div>
                    <div className="logistics-map-tooltip-row">
                      <strong>{language === 'ru' ? 'Маршрут' : '路线'}:</strong> {tooltip.route}
                    </div>
                    <div className="logistics-map-tooltip-row">
                      <strong>{language === 'ru' ? 'Средний срок' : '平均时效'}:</strong> {tooltip.days}
                    </div>
                    <div className="logistics-map-tooltip-row">
                      <strong>{language === 'ru' ? 'Типы грузов' : '货物类型'}:</strong> {tooltip.cargo}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="logistics-map-tooltip-title">{tooltip.title}</div>
                    <div className="logistics-map-tooltip-subtitle">{tooltip.subtitle}</div>
                    {tooltip.functions && tooltip.functions.length > 0 && (
                      <ul className="logistics-map-tooltip-list">
                        {tooltip.functions.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Легенда */}
            <div className="logistics-map-legend">
              <h4 className="logistics-map-legend-title">{language === 'ru' ? 'Условные обозначения' : '图例'}</h4>
              <div className="logistics-map-legend-nodes">
                <div className="logistics-map-legend-item"><span className="dot port-ru" /> {language === 'ru' ? 'Порты РФ' : '俄罗斯港口'}</div>
                <div className="logistics-map-legend-item"><span className="dot port-cn" /> {language === 'ru' ? 'Порты КНР' : '中国港口'}</div>
                <div className="logistics-map-legend-item"><span className="dot border" /> {language === 'ru' ? 'Погранпереходы' : '边境口岸'}</div>
              </div>
              <h4 className="logistics-map-legend-routes-title">{language === 'ru' ? 'Маршруты' : '路线'}</h4>
              <div className="logistics-map-legend-routes">
                <div className="logistics-map-legend-item"><span className="line rail" /> {language === 'ru' ? 'Ж/Д перевозки' : '铁路运输'}</div>
                <div className="logistics-map-legend-item"><span className="line sea" /> {language === 'ru' ? 'Морские перевозки' : '海运'}</div>
                <div className="logistics-map-legend-item"><span className="line auto" /> {language === 'ru' ? 'Автоперевозки' : '汽车运输'}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="logistics-map-cta">
              <p className="logistics-map-cta-text">
                {language === 'ru' ? 'Рассчитать маршрут под ваш груз' : '为您的货物计算路线'}
              </p>
              <button type="button" className="logistics-map-cta-btn" onClick={scrollToForm}>
                {language === 'ru' ? 'Рассчитать' : '计算'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogisticsMap
