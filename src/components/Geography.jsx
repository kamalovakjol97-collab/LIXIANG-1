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
      'Прямой переход Забайкальск-Маньчжурия',
      'Прямой переход Краскино-Суйфэньхэ'
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
      '直接通过后贝加尔斯克-满洲里',
      '直接通过克拉斯基诺-绥芬河'
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
            <svg className="map-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              {/* Фон карты */}
              <defs>
                <pattern id="railPattern" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="2" x2="20" y2="2" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="0" y1="0" x2="0" y2="4" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2"/>
                </pattern>
                <pattern id="seaPattern" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="2" x2="20" y2="2" stroke="#2c5282" strokeWidth="2" strokeDasharray="4,4"/>
                </pattern>
              </defs>

              {/* Морские маршруты (синяя прерывистая) */}
              <path d="M 150 150 Q 300 200 500 180 T 850 160" fill="none" stroke="#2c5282" strokeWidth="3" strokeDasharray="8,4" opacity="0.6" className="route-line sea-route"/>
              <path d="M 180 180 Q 350 220 550 200 T 900 180" fill="none" stroke="#2c5282" strokeWidth="3" strokeDasharray="8,4" opacity="0.6" className="route-line sea-route"/>
              <path d="M 200 140 Q 400 180 600 160 T 1000 140" fill="none" stroke="#2c5282" strokeWidth="3" strokeDasharray="8,4" opacity="0.6" className="route-line sea-route"/>

              {/* Ж/Д маршруты (красная сплошная с рельсами) */}
              <path d="M 120 280 Q 250 300 400 320 T 700 340 T 950 360" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.7" className="route-line rail-route"/>
              <path d="M 120 280 Q 250 300 400 320 T 700 340 T 950 360" fill="url(#railPattern)" stroke="none" opacity="0.3"/>
              
              <path d="M 150 300 Q 300 320 450 340 T 750 360 T 1000 380" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.7" className="route-line rail-route"/>
              <path d="M 150 300 Q 300 320 450 340 T 750 360 T 1000 380" fill="url(#railPattern)" stroke="none" opacity="0.3"/>
              
              <path d="M 180 320 Q 350 340 500 360 T 800 380 T 1050 400" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.7" className="route-line rail-route"/>
              <path d="M 180 320 Q 350 340 500 360 T 800 380 T 1050 400" fill="url(#railPattern)" stroke="none" opacity="0.3"/>

              {/* Автомобильные маршруты (зеленая сплошная) */}
              <path d="M 200 420 Q 400 400 600 420 T 1000 440" fill="none" stroke="#059669" strokeWidth="3" opacity="0.7" className="route-line road-route"/>
              <path d="M 250 440 Q 450 420 650 440 T 1050 460" fill="none" stroke="#059669" strokeWidth="3" opacity="0.7" className="route-line road-route"/>
            </svg>

            {/* Порты (Китай) */}
            <div className="map-node port shanghai" title={language === 'ru' ? 'Шанхай' : '上海'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'Шанхай' : '上海'}</span>
            </div>
            <div className="map-node port ningbo" title={language === 'ru' ? 'Нинбо' : '宁波'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'Нинбо' : '宁波'}</span>
            </div>
            <div className="map-node port qingdao" title={language === 'ru' ? 'Циндао' : '青岛'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'Циндао' : '青岛'}</span>
            </div>

            {/* Порты (Россия) */}
            <div className="map-node port vladivostok" title={language === 'ru' ? 'Владивосток' : '符拉迪沃斯托克'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'Владивосток' : '符拉迪沃斯托克'}</span>
            </div>
            <div className="map-node port spb" title={language === 'ru' ? 'СПб' : '圣彼得堡'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'СПб' : '圣彼得堡'}</span>
            </div>
            <div className="map-node port novorossiysk" title={language === 'ru' ? 'Новороссийск' : '新罗西斯克'}>
              <span className="node-icon">🚢</span>
              <span className="node-label">{language === 'ru' ? 'Новороссийск' : '新罗西斯克'}</span>
            </div>

            {/* Ж/Д станции (Китай) */}
            <div className="map-node station chengdu" title={language === 'ru' ? 'Чэнду' : '成都'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Чэнду' : '成都'}</span>
            </div>
            <div className="map-node station chongqing" title={language === 'ru' ? 'Чунцин' : '重庆'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Чунцин' : '重庆'}</span>
            </div>
            <div className="map-node station zhengzhou" title={language === 'ru' ? 'Чжэнчжоу' : '郑州'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Чжэнчжоу' : '郑州'}</span>
            </div>
            <div className="map-node station suifenhe" title={language === 'ru' ? 'Суйфэньхэ' : '绥芬河'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Суйфэньхэ' : '绥芬河'}</span>
            </div>

            {/* Ж/Д станции (Россия) */}
            <div className="map-node station moscow" title={language === 'ru' ? 'Москва' : '莫斯科'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Москва' : '莫斯科'}</span>
            </div>
            <div className="map-node station ekb" title={language === 'ru' ? 'Екатеринбург' : '叶卡捷琳堡'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Екатеринбург' : '叶卡捷琳堡'}</span>
            </div>
            <div className="map-node station novosibirsk" title={language === 'ru' ? 'Новосибирск' : '新西伯利亚'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Новосибирск' : '新西伯利亚'}</span>
            </div>
            <div className="map-node station kazan" title={language === 'ru' ? 'Казань' : '喀山'}>
              <span className="node-icon">🚂</span>
              <span className="node-label">{language === 'ru' ? 'Казань' : '喀山'}</span>
            </div>

            {/* Погранпереходы - обе стороны */}
            <div className="map-node border-crossing zabaykalsk" title={language === 'ru' ? 'Забайкальск (РФ)' : '后贝加尔斯克（俄罗斯）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Забайкальск' : '后贝加尔斯克'}</span>
            </div>
            <div className="map-node border-crossing manzhouli" title={language === 'ru' ? 'Маньчжурия (КНР)' : '满洲里（中国）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Маньчжурия' : '满洲里'}</span>
            </div>
            
            <div className="map-node border-crossing kraskino" title={language === 'ru' ? 'Краскино (РФ)' : '克拉斯基诺（俄罗斯）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Краскино' : '克拉斯基诺'}</span>
            </div>
            <div className="map-node border-crossing suifenhe-border" title={language === 'ru' ? 'Суйфэньхэ (КНР)' : '绥芬河（中国）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Суйфэньхэ' : '绥芬河'}</span>
            </div>

            <div className="map-node border-crossing khorgos-cn" title={language === 'ru' ? 'Хоргос (КНР)' : '霍尔果斯（中国）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Хоргос' : '霍尔果斯'}</span>
            </div>
            <div className="map-node border-crossing khorgos-kz" title={language === 'ru' ? 'Хоргос (КЗХ)' : '霍尔果斯（哈萨克斯坦）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Хоргос' : '霍尔果斯'}</span>
            </div>
            
            <div className="map-node border-crossing altynkol" title={language === 'ru' ? 'Алтынколь (КЗХ-РФ)' : '阿尔滕科尔（哈萨克斯坦-俄罗斯）'}>
              <span className="node-icon">🚛</span>
              <span className="node-label">{language === 'ru' ? 'Алтынколь' : '阿尔滕科尔'}</span>
            </div>
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
              <span className="legend-label">{language === 'ru' ? 'Погранпереходы' : '边境口岸'}</span>
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
