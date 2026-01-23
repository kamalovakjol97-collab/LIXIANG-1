import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './InteractiveMap.css'

const InteractiveMap = () => {
  const { language } = useLanguage()
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 })

  const showTooltip = (text, event) => {
    setTooltip({
      show: true,
      text,
      x: event.clientX,
      y: event.clientY
    })
  }

  const hideTooltip = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 })
  }

  return (
    <section className="interactive-map-section">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'География нашей экспертизы' : '我们的专业地理范围'}
        </h2>
        <p className="map-subtitle">
          {language === 'ru' 
            ? 'Отработанные логистические коридоры из Китая в Россию и обратно под ключ'
            : '从中国到俄罗斯及反向的成熟物流通道，一站式服务'}
        </p>
        <div className="interactive-map-container">
          <svg 
            className="map-svg" 
            viewBox="0 0 1000 600" 
            preserveAspectRatio="xMidYMid meet"
            onMouseLeave={hideTooltip}
          >
            <defs>
              <pattern id="railPattern" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="2" x2="20" y2="2" stroke="#dc2626" strokeWidth="2"/>
              </pattern>
            </defs>

            {/* Контуры стран */}
            <g id="countries">
              {/* Китай */}
              <path 
                d="M 50 300 L 50 450 L 350 500 L 400 480 L 450 450 L 450 300 Z" 
                fill="#dc2626" 
                opacity="0.15" 
                stroke="#dc2626" 
                strokeWidth="2"
              />
              {/* Казахстан */}
              <path 
                d="M 450 250 L 450 450 L 650 480 L 700 460 L 750 420 L 750 250 Z" 
                fill="#f97316" 
                opacity="0.15" 
                stroke="#f97316" 
                strokeWidth="2"
              />
              {/* Россия */}
              <path 
                d="M 750 100 L 750 420 L 950 500 L 950 150 L 900 120 L 750 100 Z" 
                fill="#2563eb" 
                opacity="0.15" 
                stroke="#2563eb" 
                strokeWidth="2"
              />
            </g>

            {/* Подписи стран */}
            <text x="200" y="400" fontSize="32" fontWeight="bold" fill="#dc2626">
              {language === 'ru' ? 'КИТАЙ' : '中国'}
            </text>
            <text x="550" y="350" fontSize="32" fontWeight="bold" fill="#f97316">
              {language === 'ru' ? 'КАЗАХСТАН' : '哈萨克斯坦'}
            </text>
            <text x="800" y="250" fontSize="32" fontWeight="bold" fill="#2563eb">
              {language === 'ru' ? 'РОССИЯ' : '俄罗斯'}
            </text>

            {/* Морские маршруты (синие пунктирные) */}
            <path
              d="M 200 350 Q 400 320 600 340 T 900 360"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="10, 5"
              opacity="0.8"
              className="route-line sea-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="200" y="345" fontSize="12" fill="#2563eb" fontWeight="600">
              {language === 'ru' ? 'Шанхай → Владивосток' : '上海 → 符拉迪沃斯托克'}
            </text>

            <path
              d="M 250 380 Q 450 360 650 380 T 850 400"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="10, 5"
              opacity="0.8"
              className="route-line sea-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="250" y="375" fontSize="12" fill="#2563eb" fontWeight="600">
              {language === 'ru' ? 'Нинбо → Новороссийск' : '宁波 → 新罗西斯克'}
            </text>

            <path
              d="M 300 400 Q 500 380 700 400 T 900 420"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="10, 5"
              opacity="0.8"
              className="route-line sea-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Морская доставка: ~35-45 дней' : '海运：约35-45天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="300" y="395" fontSize="12" fill="#2563eb" fontWeight="600">
              {language === 'ru' ? 'Циндао → Санкт-Петербург' : '青岛 → 圣彼得堡'}
            </text>

            {/* Железнодорожные маршруты (красные сплошные) */}
            <path
              d="M 180 400 Q 400 380 600 400 T 950 280"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
              className="route-line rail-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="180" y="395" fontSize="12" fill="#dc2626" fontWeight="600">
              {language === 'ru' ? 'Чунцин → Москва' : '重庆 → 莫斯科'}
            </text>

            <path
              d="M 200 380 Q 450 360 650 380 T 1000 320"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
              className="route-line rail-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="200" y="375" fontSize="12" fill="#dc2626" fontWeight="600">
              {language === 'ru' ? 'Чэнду → Новосибирск' : '成都 → 新西伯利亚'}
            </text>

            <path
              d="M 220 360 Q 500 340 700 360 T 1050 350"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
              className="route-line rail-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="220" y="355" fontSize="12" fill="#dc2626" fontWeight="600">
              {language === 'ru' ? 'Чжэнчжоу → Казань' : '郑州 → 喀山'}
            </text>

            <path
              d="M 240 340 Q 550 320 750 340 T 1000 300"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
              className="route-line rail-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="240" y="335" fontSize="12" fill="#dc2626" fontWeight="600">
              {language === 'ru' ? 'Ухань → Санкт-Петербург' : '武汉 → 圣彼得堡'}
            </text>

            <path
              d="M 260 320 Q 600 300 800 320 T 1020 310"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              opacity="0.9"
              className="route-line rail-route"
              onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseMove={(e) => showTooltip(language === 'ru' ? 'Железнодорожная доставка: ~12-18 дней' : '铁路运输：约12-18天', e)}
              onMouseLeave={hideTooltip}
            />
            <text x="260" y="315" fontSize="12" fill="#dc2626" fontWeight="600">
              {language === 'ru' ? 'Сиань → Екатеринбург' : '西安 → 叶卡捷琳堡'}
            </text>

            {/* Автомобильные переходы (зелёные маркеры) */}
            <g className="auto-crossings">
              <g 
                transform="translate(420, 480)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Хоргос' : '霍尔果斯'}
                </text>
              </g>

              <g 
                transform="translate(700, 480)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Алтынколь' : '阿尔滕科尔'}
                </text>
              </g>

              <g 
                transform="translate(300, 400)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Маньчжурия-Забайкальск' : '满洲里-后贝加尔斯克'}
                </text>
              </g>

              <g 
                transform="translate(300, 360)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Суйфэньхэ-Гродеково' : '绥芬河-格罗杰科沃'}
                </text>
              </g>

              <g 
                transform="translate(320, 380)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Хэйхэ-Благовещенск' : '黑河-布拉戈维申斯克'}
                </text>
              </g>

              <g 
                transform="translate(280, 340)"
                onMouseEnter={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseMove={(e) => showTooltip(language === 'ru' ? 'Автоперевозка: ~8-15 дней (в зависимости от пункта назначения)' : '汽车运输：约8-15天（取决于目的地）', e)}
                onMouseLeave={hideTooltip}
                className="auto-marker"
              >
                <circle cx="0" cy="0" r="12" fill="#059669" opacity="0.3"/>
                <text x="0" y="5" fontSize="20" textAnchor="middle">🚛</text>
                <text x="0" y="25" fontSize="10" textAnchor="middle" fill="#059669" fontWeight="600">
                  {language === 'ru' ? 'Хуньчунь-Краскино' : '珲春-克拉斯基诺'}
                </text>
              </g>
            </g>
          </svg>

          {tooltip.show && (
            <div 
              className="map-tooltip"
              style={{ left: `${tooltip.x}px`, top: `${tooltip.y + 10}px` }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-line sea-line"></div>
            <span>{language === 'ru' ? 'Морские маршруты' : '海运路线'}</span>
          </div>
          <div className="legend-item">
            <div className="legend-line rail-line"></div>
            <span>{language === 'ru' ? 'Железнодорожные маршруты' : '铁路路线'}</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon">🚛</div>
            <span>{language === 'ru' ? 'Автомобильные переходы' : '汽车过境点'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap
