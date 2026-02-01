import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  
  const advantages = language === 'ru' ? [
    {
      id: '01',
      title: 'Экспертность',
      text: 'Команда профессионалов с глубоким пониманием специфики АТР и китайского рынка. Качественно строим логистические процессы.'
    },
    {
      id: '02',
      title: 'Открытость',
      text: 'Менеджер ответит на любые вопросы и информирует по статусу перевозки без задержек.'
    },
    {
      id: '03',
      title: 'Комплексный подход',
      text: 'XGL оказывает полный цикл логистических услуг — от упаковки и консолидации до таможенного оформления.'
    },
    {
      id: '04',
      title: 'Приоритетность',
      text: 'Клиенты XGL получают преимущества при обработке грузов в ключевых терминалах и портах.'
    },
    {
      id: '05',
      title: 'Удобство',
      text: 'Персональный логист и актуальная информация о статусе груза в режиме реального времени.'
    },
    {
      id: '06',
      title: 'Надежность',
      text: 'Гарантируем, что ваш груз будет доставлен точно в срок, независимо от сложности маршрута.'
    }
  ] : [
    {
      id: '01',
      title: '专业知识',
      text: '拥有对亚太地区和中国市场深刻理解的专业团队。高质量构建物流流程。'
    },
    {
      id: '02',
      title: '开放性',
      text: '经理将回答任何问题并及时告知运输状态。'
    },
    {
      id: '03',
      title: '综合方法',
      text: 'XGL 提供全周期的物流服务 — 从包装和拼箱到清关。'
    },
    {
      id: '04',
      title: '优先权',
      text: 'XGL 客户在关键码头和港口的货物处理中享有优势。'
    },
    {
      id: '05',
      title: '便利性',
      text: '私人物流师和实时的货物状态最新信息。'
    },
    {
      id: '06',
      title: '可靠性',
      text: '我们保证您的货物将准时送达，无论航线多么复杂。'
    }
  ]

  return (
    <section className="why-sticky-section">
      <div className="container">
        <div className="why-sticky-layout">
          <div className="why-sticky-left">
            <div className="sticky-content">
              <h2 className="why-title-large">
                {language === 'ru' ? 'Почему нам доверяют' : '为什么选择我们'}
              </h2>
              <p className="why-subtitle-large">
                {language === 'ru' 
                  ? 'Мы создаем максимально прогнозируемый результат, исключая неопределенность на каждом этапе.'
                  : '我们创造了高度可预测的结果，消除了每个阶段的不确定性。'}
              </p>
              <div className="why-stat-box">
                <span className="accent-line"></span>
                <strong>9+</strong>
                <span>{language === 'ru' ? 'лет опыта' : '年经验'}</span>
              </div>
            </div>
          </div>
          
          <div className="why-scroll-right">
            {advantages.map((adv) => (
              <div key={adv.id} className="why-scroll-card">
                <div className="card-number">{adv.id}</div>
                <div className="card-body">
                  <h3>{adv.title}</h3>
                  <p>{adv.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyXGLOG
