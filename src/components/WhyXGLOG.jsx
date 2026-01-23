import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const { t, language } = useLanguage()
  const [visibleItems, setVisibleItems] = useState([])
  const itemRefs = useRef([])
  
  const advantages = language === 'ru' ? [
    {
      icon: 'partnership',
      text: 'Не перевозчик, а ваш логистический партнер. Берем на себя всю организацию, документы и решение проблем.'
    },
    {
      icon: 'cargo',
      text: 'Заботимся о грузе как о своем. Ваши товары в надежных руках на всем пути от Китая до дверей в России.'
    },
    {
      icon: 'transparency',
      text: 'Прозрачность на каждом этапе. Вы в курсе статуса груза и всех этапов без лишних звонков.'
    },
    {
      icon: 'language',
      text: 'Говорим с вами на одном языке. Билингвальная поддержка (русский/китайский) упрощает работу для китайских и российских клиентов.'
    },
    {
      icon: 'specialization',
      text: 'Специализация: Китай → Россия. Глубокое знание специфики этих направлений — ваше преимущество.'
    },
    {
      icon: 'solution',
      text: 'Не просто сообщаем о проблеме — предлагаем решение. Решаем сложности вместе с вами, а не перекладываем ответственность.'
    }
  ] : [
    {
      icon: 'partnership',
      text: '不是承运商，而是您的物流合作伙伴。我们承担所有组织、文件和问题解决工作。'
    },
    {
      icon: 'cargo',
      text: '像对待自己的货物一样关心。您的货物从中国到俄罗斯门口全程都在可靠的手中。'
    },
    {
      icon: 'transparency',
      text: '每个阶段都透明。您了解货物状态和所有阶段，无需额外电话。'
    },
    {
      icon: 'language',
      text: '用您的语言交流。双语支持（俄语/中文）简化了中国和俄罗斯客户的工作。'
    },
    {
      icon: 'specialization',
      text: '专业领域：中国 → 俄罗斯。对这些方向的深入了解是您的优势。'
    },
    {
      icon: 'solution',
      text: '不仅仅是报告问题 — 我们提供解决方案。我们与您一起解决困难，而不是推卸责任。'
    }
  ]

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index])
            observer.unobserve(ref)
          }
        },
        { threshold: 0.1 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs, index) => {
        if (obs && itemRefs.current[index]) {
          obs.unobserve(itemRefs.current[index])
        }
      })
    }
  }, [])

  return (
    <section className="why-xglog">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'Почему XGL' : '为什么选择 XGL'}
        </h2>
        <p className="why-xglog-subtitle">
          {language === 'ru' 
            ? 'Ваш надежный партнер в логистике из Китая'
            : '您在中国物流方面的可靠合作伙伴'}
        </p>
        <div className="advantages-list">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              ref={el => itemRefs.current[index] = el}
              className={`advantage-item ${visibleItems.includes(index) ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`advantage-icon advantage-icon-${advantage.icon}`}>
                {advantage.icon === 'partnership' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C18.21 4 20 5.79 20 8C20 10.21 18.21 12 16 12C15.53 12 15.08 11.89 14.67 11.7L11.3 15.07C11.49 15.48 11.6 15.93 11.6 16.4C11.6 18.61 9.81 20.4 7.6 20.4C5.39 20.4 3.6 18.61 3.6 16.4C3.6 14.19 5.39 12.4 7.6 12.4C8.07 12.4 8.52 12.51 8.93 12.7L12.3 9.33C12.11 8.92 12 8.47 12 8C12 5.79 13.79 4 16 4ZM16 6C14.9 6 14 6.9 14 8C14 9.1 14.9 10 16 10C17.1 10 18 9.1 18 8C18 6.9 17.1 6 16 6ZM7.6 14.4C6.5 14.4 5.6 15.3 5.6 16.4C5.6 17.5 6.5 18.4 7.6 18.4C8.7 18.4 9.6 17.5 9.6 16.4C9.6 15.3 8.7 14.4 7.6 14.4Z" fill="currentColor"/>
                  </svg>
                )}
                {advantage.icon === 'cargo' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8H17V4H3C1.89 4 1 4.89 1 6V18H3C3 19.66 4.34 21 6 21S9 19.66 9 18H15C15 19.66 16.34 21 18 21S21 19.66 21 18H23V12L20 8M15 10V6H17L19 8H15M6 18.5C6.83 18.5 7.5 17.83 7.5 17S6.83 15.5 6 15.5 4.5 16.17 4.5 17 5.17 18.5 6 18.5M18 18.5C18.83 18.5 19.5 17.83 19.5 17S18.83 15.5 18 15.5 16.5 16.17 16.5 17 17.17 18.5 18 18.5Z" fill="currentColor"/>
                  </svg>
                )}
                {advantage.icon === 'transparency' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                  </svg>
                )}
                {advantage.icon === 'language' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L11.11 16.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" fill="currentColor"/>
                  </svg>
                )}
                {advantage.icon === 'specialization' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                    <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="currentColor"/>
                  </svg>
                )}
                {advantage.icon === 'solution' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <p className="advantage-text">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyXGLOG
