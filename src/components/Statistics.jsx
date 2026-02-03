import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Statistics.css'

const Statistics = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  let yearsOnMarket = 9
  try {
    const startDate = new Date('2016-03-25')
    const now = new Date()
    yearsOnMarket = now.getFullYear() - startDate.getFullYear()
    if (now.getMonth() < 2 || (now.getMonth() === 2 && now.getDate() < 25)) yearsOnMarket--
  } catch (e) {}

  const stats = [
    { target: 200, label: language === 'ru' ? 'Активных клиентов' : '活跃客户' },
    { target: 2000, label: language === 'ru' ? 'Завершенных проектов' : '已完成项目' },
    { target: yearsOnMarket, label: language === 'ru' ? 'Лет на рынке' : '市场经验', suffix: '+' },
    { target: 10000, label: language === 'ru' ? 'Тонн груза' : '处理货物' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.5 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stats-ribbon" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid-sleek">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  )
}

const StatItem = ({ stat, isVisible }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const end = stat.target
    const duration = 2000
    let startTime = null

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const raw = Math.min((timestamp - startTime) / duration, 1)
      const progress = easeOut(raw)
      setCount(Math.floor(progress * (end - start) + start))
      if (raw < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, stat.target])

  return (
    <div className="stat-sleek-item">
      <div className="stat-sleek-number">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="stat-sleek-label">{stat.label}</div>
    </div>
  )
}

export default Statistics
