import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import './ParallaxJourney.css'

const SCROLL_HEIGHT_VH = 620

// Сцены: фон по диапазону progress [from, to]
const SCENES = [
  { from: 0, to: 0.14, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&q=80', label: 'office' },
  { from: 0.10, to: 0.28, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80', label: 'warehouses' },
  { from: 0.24, to: 0.42, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80', label: 'border' },
  { from: 0.38, to: 0.56, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', label: 'city' },
  { from: 0.52, to: 0.68, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80', label: 'port' },
  { from: 0.64, to: 0.80, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&q=80', label: 'highway' },
  { from: 0.76, to: 1.02, image: 'https://images.unsplash.com/photo-1605745341112-85968b19335f?w=1920&q=80', label: 'hub' },
]

// Карточки по сценам (CMR/накладная стилистика для первой, далее — единый стиль)
const getCards = (language) => (language === 'ru'
  ? [
      { progress: 0.06, year: 'Март 2016', title: 'Основание', desc: 'Открытие компании «Гуосен» в Китае. Начало пути.' },
      { progress: 0.16, year: '2016', title: 'Первый шаг в логистику', desc: 'Аренда первых складов в Иу, Гуанчжоу, Шэньчжэнь.' },
      { progress: 0.22, year: '2018', title: 'Собственная инфраструктура', desc: 'Строительство собственного СВХ в Хэйхэ.' },
      { progress: 0.32, year: '2019', title: 'Экспансия на границе', desc: 'Открытие склада в Маньчжурии для хранения и перегрузки.' },
      { progress: 0.40, year: '2021', title: 'Вертикальная интеграция', desc: 'Транспортная компания «Дунсингуо». Офисы в Москве и Екатеринбурге.' },
      { progress: 0.50, year: '2024', title: 'Новый статус', desc: 'Головной офис переехал в стратегический хаб — Санкт-Петербург.' },
      { progress: 0.56, year: 'Май 2025', title: 'Консолидация и контракт', desc: 'Объединение в ООО ГК «ХЖЛ». Контракт с CC7 — старт масштабного проекта.' },
      { progress: 0.62, year: 'Июнь 2025', title: 'Рекорд', desc: 'Рекордный вывоз 401 позиции из порта Бронка для CC7.' },
      { progress: 0.68, year: 'Октябрь 2025', title: 'Регулярные автопоставки', desc: 'Запущены регулярные автопоставки для проекта CC7.' },
      { progress: 0.74, year: 'Декабрь 2025', title: 'Партнёрство с К2', desc: 'Соглашение с ООО «К2» для усиления автопарка.' },
      { progress: 0.84, year: 'Январь 2026', title: 'Взгляд в будущее', desc: 'Команда ХЖЛ смотрит в будущее с уверенностью, опираясь на 10-летний опыт.' },
    ]
  : [
      { progress: 0.06, year: '2016年3月', title: '成立', desc: '在中国开设“国森”公司。开始征程。' },
      { progress: 0.16, year: '2016', title: '物流第一步', desc: '在义乌、广州、深圳租赁首批仓库。' },
      { progress: 0.22, year: '2018', title: '自有基础设施', desc: '在黑河建设自有临时仓储。' },
      { progress: 0.32, year: '2019', title: '边境扩张', desc: '在满洲里开设仓库用于存储和转运。' },
      { progress: 0.40, year: '2021', title: '垂直整合', desc: '创建运输公司“东新国”。莫斯科和叶卡捷琳堡办事处。' },
      { progress: 0.50, year: '2024', title: '新地位', desc: '总部迁至战略枢纽 — 圣彼得堡。' },
      { progress: 0.56, year: '2025年5月', title: '整合与合同', desc: '合并为ООО ГК «ХЖЛ»。与CC7签署合同。' },
      { progress: 0.62, year: '2025年6月', title: '创纪录', desc: '为CC7从布龙卡港创纪录运出401项货物。' },
      { progress: 0.68, year: '2025年10月', title: '定期汽车运输', desc: '为CC7项目启动定期汽车运输。' },
      { progress: 0.74, year: '2025年12月', title: '与К2合作', desc: '与ООО «К2»签署协议以加强汽车车队。' },
      { progress: 0.84, year: '2026年1月', title: '展望未来', desc: 'ХЖЛ团队满怀信心展望未来，依靠10年的经验。' },
    ]
)

// Шкала времени: год → progress (для навигации)
const TIMELINE_YEARS = [
  { year: '2016', progress: 0.06 },
  { year: '2018', progress: 0.22 },
  { year: '2019', progress: 0.32 },
  { year: '2021', progress: 0.40 },
  { year: '2024', progress: 0.50 },
  { year: '2025', progress: 0.64 },
  { year: '2026', progress: 0.88 },
]

function useScrollProgress(sectionRef, paused, onPauseProgress) {
  const [progress, setProgress] = useState(0)
  const frozenRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const el = sectionRef.current
      const sectionTop = el.offsetTop
      const sectionHeight = el.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = sectionHeight - viewportHeight
      if (scrollable <= 0) {
        const p = window.scrollY >= sectionTop ? 1 : 0
        if (!paused) setProgress(p)
        return
      }
      const scrolled = window.scrollY - sectionTop
      const p = Math.max(0, Math.min(1, scrolled / scrollable))
      if (paused) {
        frozenRef.current = p
        onPauseProgress?.(p)
      } else {
        setProgress(p)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionRef, paused, onPauseProgress])

  useEffect(() => {
    if (paused) setProgress((prev) => prev)
  }, [paused])

  return paused ? frozenRef.current : progress
}

function getSceneOpacity(scene, progress) {
  const { from, to } = scene
  const fade = 0.10
  if (progress <= from - fade) return 0
  if (progress >= to + fade) return 0
  if (progress >= from && progress <= to) return 1
  if (progress < from) return Math.max(0, (progress - (from - fade)) / fade)
  return Math.max(0, ((to + fade) - progress) / fade)
}

function getCardOpacity(cardProgress, progress) {
  const half = 0.055
  const dist = Math.abs(progress - cardProgress)
  if (dist > half) return 0
  return 1 - dist / half
}

const ParallaxJourney = ({ id = 'history-journey' }) => {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const progress = useScrollProgress(sectionRef, paused)
  const effectiveProgress = progress
  const cards = getCards(language)

  const truckPosition = effectiveProgress >= 0.82 ? 75 : 10 + effectiveProgress * 78
  const truckStopped = effectiveProgress >= 0.82
  const showMultipleTrucks = effectiveProgress >= 0.58 && effectiveProgress <= 0.78
  const showFinalCTA = effectiveProgress >= 0.86

  const scrollToProgress = (p) => {
    if (!sectionRef.current) return
    setPaused(false)
    const el = sectionRef.current
    const sectionTop = el.offsetTop
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const targetScroll = sectionTop + p * scrollable
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <section
      id={id}
      className="parallax-journey"
      ref={sectionRef}
      aria-label={language === 'ru' ? 'Путешествие по истории компании' : '公司历史之旅'}
    >
      <div className="parallax-journey-spacer" style={{ height: `${SCROLL_HEIGHT_VH}vh` }} aria-hidden="true" />

      <div className="parallax-journey-viewport">
        {/* Фоны сцен */}
        <div className="parallax-journey-bg">
          {SCENES.map((scene, i) => (
            <div
              key={i}
              className="parallax-journey-bg-layer"
              style={{
                backgroundImage: `url(${scene.image})`,
                opacity: getSceneOpacity(scene, effectiveProgress),
              }}
            />
          ))}
          <div className="parallax-journey-bg-overlay" />
        </div>

        {/* Грузовик(и) */}
        <div
          className={`parallax-journey-truck ${truckStopped ? 'stopped' : ''}`}
          style={{ left: `${truckPosition}%` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 60" className="parallax-journey-truck-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="18" width="55" height="28" rx="3" fill="var(--color-primary)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <rect x="60" y="22" width="45" height="24" rx="2" fill="var(--color-primary)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <circle cx="25" cy="50" r="6" fill="#333" stroke="#555" strokeWidth="1" />
            <circle cx="95" cy="50" r="6" fill="#333" stroke="#555" strokeWidth="1" />
            <rect x="12" y="24" width="12" height="8" fill="rgba(255,255,255,0.2)" rx="1" />
            <path d="M58 28 L62 28 L62 46 L58 46 Z" fill="var(--color-accent)" opacity="0.9" />
            {truckStopped && <circle cx="18" cy="22" r="2" fill="var(--color-accent)" opacity="0.9" />}
          </svg>
        </div>
        {showMultipleTrucks && (
          <>
            <div className="parallax-journey-truck truck-2" style={{ left: `${Math.min(92, truckPosition + 12)}%` }} aria-hidden="true">
              <svg viewBox="0 0 120 60" className="parallax-journey-truck-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="18" width="55" height="28" rx="3" fill="var(--color-primary)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <rect x="60" y="22" width="45" height="24" rx="2" fill="var(--color-primary)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <circle cx="25" cy="50" r="6" fill="#333" />
                <circle cx="95" cy="50" r="6" fill="#333" />
                <path d="M58 28 L62 28 L62 46 L58 46 Z" fill="var(--color-accent)" opacity="0.8" />
              </svg>
            </div>
          </>
        )}

        {/* Карточки */}
        {cards.map((card, i) => (
          <div
            key={i}
            className={`parallax-journey-card ${i === 0 ? 'card-cmr' : ''}`}
            style={{
              opacity: getCardOpacity(card.progress, effectiveProgress),
              pointerEvents: getCardOpacity(card.progress, effectiveProgress) > 0.5 ? 'auto' : 'none',
            }}
          >
            <span className="parallax-journey-card-year">{card.year}</span>
            <h3 className="parallax-journey-card-title">{card.title}</h3>
            <p className="parallax-journey-card-desc">{card.desc}</p>
          </div>
        ))}

        {/* Финальный текст + CTA */}
        {showFinalCTA && (
          <div className="parallax-journey-final">
            <p className="parallax-journey-final-text">
              {language === 'ru'
                ? 'Команда ХЖЛ смотрит в будущее с уверенностью, опираясь на 10-летний опыт. Мы продолжаем путь.'
                : 'ХЖЛ团队满怀信心展望未来，依靠10年的经验。我们继续前行。'}
            </p>
            <div className="parallax-journey-final-cta">
              <Link to="/contacts" className="parallax-journey-cta-btn primary">
                {language === 'ru' ? 'Стать нашим клиентом' : '成为我们的客户'}
              </Link>
              <Link to="/contacts#team" className="parallax-journey-cta-btn secondary">
                {language === 'ru' ? 'Присоединиться к команде' : '加入团队'}
              </Link>
            </div>
          </div>
        )}

        {/* Подсказка в начале */}
        <div
          className="parallax-journey-hint"
          style={{ opacity: effectiveProgress < 0.02 ? 1 : Math.max(0, 1 - (effectiveProgress - 0.02) * 30) }}
        >
          {language === 'ru' ? 'Листайте вниз — путешествие во времени' : '向下滚动 — 穿越时光'}
        </div>

        {/* Шкала времени */}
        <nav className="parallax-journey-timeline" aria-label={language === 'ru' ? 'Годы' : '年份'}>
          {TIMELINE_YEARS.map(({ year, progress: p }) => (
            <button
              key={year}
              type="button"
              className={`parallax-journey-timeline-btn ${effectiveProgress >= p - 0.03 && effectiveProgress <= p + 0.05 ? 'active' : ''}`}
              onClick={() => scrollToProgress(p)}
            >
              {year}
            </button>
          ))}
        </nav>

        {/* Пауза / Воспроизведение */}
        <div className="parallax-journey-controls">
          <button
            type="button"
            className="parallax-journey-control-btn"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? (language === 'ru' ? 'Воспроизвести' : '播放') : (language === 'ru' ? 'Пауза' : '暂停')}
          >
            {paused ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ParallaxJourney
