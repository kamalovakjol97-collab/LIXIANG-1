import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './ParallaxJourney.css'

const SCROLL_HEIGHT_VH = 600 // высота «пути» в vh для скролла

// Этапы фона: [progress от, progress до], картинка
const STAGES = [
  { from: 0, to: 0.22, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80', alt: 'warehouse' },
  { from: 0.18, to: 0.42, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&q=80', alt: 'warehouses' },
  { from: 0.38, to: 0.62, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80', alt: 'port' },
  { from: 0.58, to: 0.82, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', alt: 'airport' },
  { from: 0.78, to: 1.02, image: 'https://images.unsplash.com/photo-1605745341112-85968b19335f?w=1920&q=80', alt: 'terminal' },
]

// Ключевые остановки — карточки событий (progress, год, заголовок, описание)
const getStops = (language) => (language === 'ru'
  ? [
      { progress: 0.08, year: '2016', title: 'Основание', desc: 'Открытие компании. Начало пути — первый грузовик и маленький склад.' },
      { progress: 0.25, year: '2016–2018', title: 'Рост складов', desc: 'Аренда складов в Иу, Гуанчжоу, Шэньчжэнь. Первая собственная инфраструктура в Хэйхэ.' },
      { progress: 0.42, year: '2019', title: 'Выход к морю', desc: 'Работа с портами. Маршруты Китай — Россия через морские и сухопутные узлы.' },
      { progress: 0.58, year: '2021', title: 'Экспансия в РФ', desc: 'Офисы в Москве и Екатеринбурге. Мультимодальные перевозки.' },
      { progress: 0.75, year: '2024', title: 'Стратегический хаб', desc: 'Головной офис в Санкт-Петербурге. Фокус на коридорах Китай — Россия.' },
      { progress: 0.92, year: 'Сегодня', title: 'XGL сегодня', desc: 'Полный цикл логистики: порты, терминалы, Ж/Д, авто, таможня. Партнёры в Китае и России.' },
    ]
  : [
      { progress: 0.08, year: '2016', title: '成立', desc: '公司成立。征程开始 — 第一辆卡车和小仓库。' },
      { progress: 0.25, year: '2016–2018', title: '仓储扩张', desc: '在义乌、广州、深圳租赁仓库。黑河首个自有基础设施。' },
      { progress: 0.42, year: '2019', title: '走向海洋', desc: '与港口合作。通过海运和陆路枢纽的中国—俄罗斯路线。' },
      { progress: 0.58, year: '2021', title: '俄罗斯扩张', desc: '莫斯科和叶卡捷琳堡办事处。多式联运。' },
      { progress: 0.75, year: '2024', title: '战略枢纽', desc: '总部迁至圣彼得堡。聚焦中国—俄罗斯走廊。' },
      { progress: 0.92, year: '今天', title: 'XGL 今日', desc: '全周期物流：港口、码头、铁路、汽车、清关。中国与俄罗斯的合作伙伴。' },
    ]
)

function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const el = sectionRef.current
      const sectionTop = el.offsetTop
      const sectionHeight = el.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = sectionHeight - viewportHeight
      if (scrollable <= 0) {
        setProgress(window.scrollY >= sectionTop ? 1 : 0)
        return
      }
      const scrolled = window.scrollY - sectionTop
      const p = Math.max(0, Math.min(1, scrolled / scrollable))
      setProgress(p)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionRef])

  return progress
}

function getStageOpacity(stage, progress) {
  const { from, to } = stage
  const fade = 0.12
  if (progress <= from - fade) return 0
  if (progress >= to + fade) return 0
  if (progress >= from && progress <= to) return 1
  if (progress < from) return Math.max(0, (progress - (from - fade)) / fade)
  return Math.max(0, ((to + fade) - progress) / fade)
}

function getCardOpacity(cardProgress, progress) {
  const half = 0.06
  const dist = Math.abs(progress - cardProgress)
  if (dist > half) return 0
  return 1 - dist / half
}

const ParallaxJourney = () => {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const progress = useScrollProgress(sectionRef)
  const stops = getStops(language)

  const truckPosition = 10 + progress * 78 // 10% .. 88%

  return (
    <section className="parallax-journey" ref={sectionRef} aria-label={language === 'ru' ? 'Путешествие по истории компании' : '公司历史之旅'}>
      <div
        className="parallax-journey-spacer"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
        aria-hidden="true"
      />

      <div className="parallax-journey-viewport">
        {/* Фоновые слои */}
        <div className="parallax-journey-bg">
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className="parallax-journey-bg-layer"
              style={{
                backgroundImage: `url(${stage.image})`,
                opacity: getStageOpacity(stage, progress),
              }}
            />
          ))}
          <div className="parallax-journey-bg-overlay" />
        </div>

        {/* Грузовик в движении */}
        <div
          className="parallax-journey-truck"
          style={{ left: `${truckPosition}%` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 60" className="parallax-journey-truck-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="18" width="55" height="28" rx="3" fill="var(--color-primary)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <rect x="60" y="22" width="45" height="24" rx="2" fill="var(--color-primary)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <circle cx="25" cy="50" r="6" fill="#333" stroke="#555" strokeWidth="1"/>
            <circle cx="95" cy="50" r="6" fill="#333" stroke="#555" strokeWidth="1"/>
            <rect x="12" y="24" width="12" height="8" fill="rgba(255,255,255,0.2)" rx="1"/>
            <path d="M58 28 L62 28 L62 46 L58 46 Z" fill="var(--color-accent)" opacity="0.9"/>
          </svg>
        </div>

        {/* Текстовые карточки на остановках */}
        {stops.map((stop, i) => (
          <div
            key={i}
            className="parallax-journey-card"
            style={{
              opacity: getCardOpacity(stop.progress, progress),
              pointerEvents: getCardOpacity(stop.progress, progress) > 0.5 ? 'auto' : 'none',
            }}
          >
            <span className="parallax-journey-card-year">{stop.year}</span>
            <h3 className="parallax-journey-card-title">{stop.title}</h3>
            <p className="parallax-journey-card-desc">{stop.desc}</p>
          </div>
        ))}

        {/* Подсказка в начале */}
        <div
          className="parallax-journey-hint"
          style={{ opacity: progress < 0.03 ? 1 : Math.max(0, 1 - (progress - 0.03) * 25) }}
        >
          {language === 'ru' ? 'Листайте вниз — путешествие во времени' : '向下滚动 — 穿越时光'}
        </div>
      </div>
    </section>
  )
}

export default ParallaxJourney
