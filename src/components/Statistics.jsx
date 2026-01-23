import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Statistics.css'

const Statistics = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Дата начала работы: 25 марта 2016
  let yearsOnMarket = 8
  try {
    const startDate = new Date('2016-03-25')
    const now = new Date()
    
    // Вычисляем количество лет, месяцев, дней
    const yearsDiff = now.getFullYear() - startDate.getFullYear()
    const monthsDiff = now.getMonth() - startDate.getMonth()
    const daysDiff = now.getDate() - startDate.getDate()
    
    yearsOnMarket = yearsDiff
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsOnMarket--
    }
    // Минимум 8 лет
    if (yearsOnMarket < 8) yearsOnMarket = 8
  } catch (error) {
    console.warn('Error calculating years on market:', error)
  }

  const stats = [
    {
      target: 200,
      prefix: '',
      suffix: '',
      label: language === 'ru' ? 'ДЕЙСТВУЮЩИХ КЛИЕНТОВ' : '活跃客户',
      duration: 2000
    },
    {
      target: 2000,
      prefix: '',
      suffix: '',
      label: language === 'ru' ? 'ЗАВЕРШЕННЫХ ПРОЕКТОВ' : '已完成项目',
      duration: 2500
    },
    {
      target: yearsOnMarket,
      prefix: '',
      suffix: '+',
      label: language === 'ru' ? 'ЛЕТ НА РЫНКЕ' : '市场经验',
      duration: 1500,
      isYear: true
    },
    {
      target: 10000,
      prefix: '',
      suffix: '',
      label: language === 'ru' ? 'ОБРАБОТАНО ГРУЗОВ' : '处理货物',
      duration: 3000
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="statistics" ref={sectionRef}>
      <div className="container">
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
        <div className="statistics-note">
          {language === 'ru' 
            ? 'На рынке с 25 марта 2016 года'
            : '自2016年3月25日起进入市场'}
        </div>
      </div>
    </section>
  )
}

const StatItem = ({ stat, isVisible, delay }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / stat.duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(easeOutQuart * stat.target)
        
        setCount(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(stat.target)
        }
      }
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, stat.target, stat.duration, delay])

  return (
    <div className="stat-item">
      <div className="stat-number">
        {stat.prefix}{stat.isYear ? count : count.toLocaleString()}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export default Statistics
