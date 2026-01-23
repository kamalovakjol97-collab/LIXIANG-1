import { useLanguage } from '../context/LanguageContext'
import './Geography.css'

const Geography = () => {
  const { language } = useLanguage()

  const routes = language === 'ru' ? {
    sea: [
      'Китай (Шанхай, Нинбо) → Владивосток',
      'Китай (Циндао) → Новороссийск',
      'Китай → СПб (через европейские порты)'
    ],
    rail: [
      'Китай (Чэнду, Чунцин) → Москва',
      'Китай (Чжэнчжоу) → Екатеринбург',
      'Китай (Суйфэньхэ) → Новосибирск / Казань'
    ],
    road: [
      'Через КПП Хоргос (Китай-Казахстан)',
      'Через КПП Алтынколь (Казахстан-Россия)',
      'Прямой переход Забайкальск'
    ]
  } : {
    sea: [
      '中国（上海、宁波）→ 符拉迪沃斯托克',
      '中国（青岛）→ 新罗西斯克',
      '中国 → 圣彼得堡（通过欧洲港口）'
    ],
    rail: [
      '中国（成都、重庆）→ 莫斯科',
      '中国（郑州）→ 叶卡捷琳堡',
      '中国（绥芬河）→ 新西伯利亚 / 喀山'
    ],
    road: [
      '通过霍尔果斯口岸（中国-哈萨克斯坦）',
      '通过阿尔滕科尔口岸（哈萨克斯坦-俄罗斯）',
      '直接通过后贝加尔斯克'
    ]
  }

  return (
    <section className="geography">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'География нашей экспертизы' : '我们的专业地理范围'}
        </h2>
        <p className="geography-subtitle">
          {language === 'ru' 
            ? 'Отработанные логистические коридоры из Китая в Россию и обратно под ключ'
            : '从中国到俄罗斯及反向的成熟物流通道，一站式服务'}
        </p>
        
        <div className="geography-map-container">
          <div className="geography-map">
            {/* Порты */}
            <div className="map-node port shanghai" title="Шанхай">
              <span className="node-icon">🚢</span>
              <span className="node-label">Шанхай</span>
            </div>
            <div className="map-node port ningbo" title="Нинбо">
              <span className="node-icon">🚢</span>
              <span className="node-label">Нинбо</span>
            </div>
            <div className="map-node port qingdao" title="Циндао">
              <span className="node-icon">🚢</span>
              <span className="node-label">Циндао</span>
            </div>
            <div className="map-node port vladivostok" title="Владивосток">
              <span className="node-icon">🚢</span>
              <span className="node-label">Владивосток</span>
            </div>
            <div className="map-node port spb" title="СПб">
              <span className="node-icon">🚢</span>
              <span className="node-label">СПб</span>
            </div>
            <div className="map-node port novorossiysk" title="Новороссийск">
              <span className="node-icon">🚢</span>
              <span className="node-label">Новороссийск</span>
            </div>

            {/* Ж/Д станции */}
            <div className="map-node station chengdu" title="Чэнду">
              <span className="node-icon">🚂</span>
              <span className="node-label">Чэнду</span>
            </div>
            <div className="map-node station chongqing" title="Чунцин">
              <span className="node-icon">🚂</span>
              <span className="node-label">Чунцин</span>
            </div>
            <div className="map-node station zhengzhou" title="Чжэнчжоу">
              <span className="node-icon">🚂</span>
              <span className="node-label">Чжэнчжоу</span>
            </div>
            <div className="map-node station suifenhe" title="Суйфэньхэ">
              <span className="node-icon">🚂</span>
              <span className="node-label">Суйфэньхэ</span>
            </div>
            <div className="map-node station moscow" title="Москва">
              <span className="node-icon">🚂</span>
              <span className="node-label">Москва</span>
            </div>
            <div className="map-node station ekb" title="Екатеринбург">
              <span className="node-icon">🚂</span>
              <span className="node-label">Екатеринбург</span>
            </div>
            <div className="map-node station novosibirsk" title="Новосибирск">
              <span className="node-icon">🚂</span>
              <span className="node-label">Новосибирск</span>
            </div>
            <div className="map-node station kazan" title="Казань">
              <span className="node-icon">🚂</span>
              <span className="node-label">Казань</span>
            </div>

            {/* Автопереходы */}
            <div className="map-node road khorgos" title="Хоргос">
              <span className="node-icon">🚛</span>
              <span className="node-label">Хоргос</span>
            </div>
            <div className="map-node road altynkol" title="Алтынколь">
              <span className="node-icon">🚛</span>
              <span className="node-label">Алтынколь</span>
            </div>
            <div className="map-node road zabaykalsk" title="Забайкальск">
              <span className="node-icon">🚛</span>
              <span className="node-label">Забайкальск</span>
            </div>

            {/* Линии маршрутов */}
            <svg className="map-routes" viewBox="0 0 1000 600">
              {/* Морские маршруты (синяя прерывистая) */}
              <line x1="200" y1="200" x2="800" y2="150" stroke="#2c5282" strokeWidth="3" strokeDasharray="10,5" opacity="0.6" />
              <line x1="250" y1="180" x2="750" y2="200" stroke="#2c5282" strokeWidth="3" strokeDasharray="10,5" opacity="0.6" />
              <line x1="300" y1="190" x2="700" y2="100" stroke="#2c5282" strokeWidth="3" strokeDasharray="10,5" opacity="0.6" />
              
              {/* Ж/Д маршруты (красная сплошная) */}
              <line x1="150" y1="300" x2="500" y2="250" stroke="#dc2626" strokeWidth="4" opacity="0.7" />
              <line x1="180" y1="320" x2="550" y2="280" stroke="#dc2626" strokeWidth="4" opacity="0.7" />
              <line x1="220" y1="340" x2="600" y2="300" stroke="#dc2626" strokeWidth="4" opacity="0.7" />
              
              {/* Автомобильные маршруты (зеленая сплошная) */}
              <line x1="200" y1="400" x2="450" y2="380" stroke="#059669" strokeWidth="3" opacity="0.7" />
              <line x1="450" y1="380" x2="700" y2="360" stroke="#059669" strokeWidth="3" opacity="0.7" />
              <line x1="250" y1="420" x2="650" y2="400" stroke="#059669" strokeWidth="3" opacity="0.7" />
            </svg>
          </div>

          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-icon">🚢</span>
              <span className="legend-label">{language === 'ru' ? 'Порты' : '港口'}</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🚂</span>
              <span className="legend-label">{language === 'ru' ? 'Ж/Д станции' : '火车站'}</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🚛</span>
              <span className="legend-label">{language === 'ru' ? 'Автопереходы' : '汽车口岸'}</span>
            </div>
            <div className="legend-item">
              <span className="legend-line sea"></span>
              <span className="legend-label">{language === 'ru' ? 'Морской коридор' : '海运通道'}</span>
            </div>
            <div className="legend-item">
              <span className="legend-line rail"></span>
              <span className="legend-label">{language === 'ru' ? 'Ж/Д коридор' : '铁路通道'}</span>
            </div>
            <div className="legend-item">
              <span className="legend-line road"></span>
              <span className="legend-label">{language === 'ru' ? 'Автомобильный коридор' : '汽车通道'}</span>
            </div>
          </div>
        </div>

        <div className="geography-routes">
          <div className="route-column">
            <h3 className="route-title">
              {language === 'ru' ? 'Морские маршруты' : '海运路线'}
            </h3>
            <ul className="route-list">
              {routes.sea.map((route, index) => (
                <li key={index} className="route-item">{route}</li>
              ))}
            </ul>
          </div>
          <div className="route-column">
            <h3 className="route-title">
              {language === 'ru' ? 'Железнодорожные маршруты' : '铁路路线'}
            </h3>
            <ul className="route-list">
              {routes.rail.map((route, index) => (
                <li key={index} className="route-item">{route}</li>
              ))}
            </ul>
          </div>
          <div className="route-column">
            <h3 className="route-title">
              {language === 'ru' ? 'Автомобильные маршруты (с транзитом)' : '汽车路线（过境）'}
            </h3>
            <ul className="route-list">
              {routes.road.map((route, index) => (
                <li key={index} className="route-item">{route}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="geography-note">
          <p>
            {language === 'ru' 
              ? 'Мы не просто показываем точки на карте — мы строим по ним работающие логистические цепочки. Наша экспертиза включает оформление на ключевых пограничных переходах через Казахстан и напрямую. Мы знаем специфику погрузки в основных китайских портах и ж/д станциях. Вы получаете не абстрактный «маршрут из Китая», а конкретный, просчитанный и надежный коридор до вашего склада в Москве, Екатеринбурге или любом другом городе России.'
              : '我们不仅仅是展示地图上的点 — 我们根据它们构建有效的物流链。我们的专业知识包括在通过哈萨克斯坦和直接的关键边境检查站办理手续。我们了解主要中国港口和火车站装载的特殊性。您获得的不是抽象的"从中国出发的路线"，而是到您在莫斯科、叶卡捷琳堡或俄罗斯任何其他城市的仓库的具体、经过计算和可靠的通道。'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Geography
