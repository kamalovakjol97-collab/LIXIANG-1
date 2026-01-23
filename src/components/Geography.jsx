import InteractiveMap from './InteractiveMap'

const Geography = () => {
  return <InteractiveMap />
        
        <div className="geography-map-container">
          <div className="geography-map">
            {/* Фон карты с контурами стран */}
            <svg className="map-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="railPattern" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="2" x2="20" y2="2" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="0" y1="0" x2="0" y2="4" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2"/>
                </pattern>
                <pattern id="seaPattern" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="2" x2="20" y2="2" stroke="#2c5282" strokeWidth="2" strokeDasharray="4,4"/>
                </pattern>
              </defs>

              {/* Контуры стран (упрощенные) */}
              <g id="countries">
                {/* Китай (красный) */}
                <path d="M 50 250 L 50 450 L 350 500 L 400 480 L 450 450 L 450 250 Z" fill="#dc2626" opacity="0.15" stroke="#dc2626" strokeWidth="2"/>
                {/* Казахстан (оранжевый) */}
                <path d="M 450 200 L 450 450 L 650 480 L 700 460 L 750 420 L 750 200 Z" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="2"/>
                {/* Россия (голубой) */}
                <path d="M 750 100 L 750 420 L 1150 500 L 1150 150 L 950 120 L 750 100 Z" fill="#2563eb" opacity="0.15" stroke="#2563eb" strokeWidth="2"/>
              </g>

              {/* Морские маршруты (синяя прерывистая) */}
              {/* Шанхай/Нинбо → Владивосток */}
              <path d="M 200 350 Q 400 320 600 340 T 900 360" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" className="route-line sea-route"/>
              {/* Циндао → Новороссийск */}
              <path d="M 250 380 Q 450 360 650 380 T 850 400" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" className="route-line sea-route"/>

              {/* Ж/Д маршруты (красная сплошная с рельсами) */}
              {/* Чэнду/Чунцин → Москва */}
              <path d="M 180 400 Q 400 380 600 400 T 950 280" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.9" className="route-line rail-route"/>
              <path d="M 180 400 Q 400 380 600 400 T 950 280" fill="url(#railPattern)" stroke="none" opacity="0.5"/>
              
              {/* Чжэнчжоу → Екатеринбург */}
              <path d="M 220 380 Q 450 360 650 380 T 1000 320" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.9" className="route-line rail-route"/>
              <path d="M 220 380 Q 450 360 650 380 T 1000 320" fill="url(#railPattern)" stroke="none" opacity="0.5"/>
              
              {/* Суйфэньхэ → Новосибирск/Казань */}
              <path d="M 300 360 Q 500 350 700 370 T 1050 350" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.9" className="route-line rail-route"/>
              <path d="M 300 360 Q 500 350 700 370 T 1050 350" fill="url(#railPattern)" stroke="none" opacity="0.5"/>

              {/* Автомобильные маршруты (зеленая сплошная) */}
              {/* Хоргос → Алтынколь */}
              <path d="M 420 480 Q 550 470 700 480 T 900 490" fill="none" stroke="#059669" strokeWidth="4" opacity="0.9" className="route-line road-route"/>
              {/* Забайкальск-Маньчжурия */}
              <path d="M 300 400 Q 500 390 650 410" fill="none" stroke="#059669" strokeWidth="4" opacity="0.9" className="route-line road-route"/>
              {/* Краскино-Суйфэньхэ */}
              <path d="M 300 360 Q 500 350 700 370" fill="none" stroke="#059669" strokeWidth="4" opacity="0.9" className="route-line road-route"/>
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
