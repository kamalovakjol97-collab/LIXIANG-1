import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './HowWeWork.css'

const HowWeWork = () => {
  const { t, language } = useLanguage()
  const [visibleSteps, setVisibleSteps] = useState([])
  const stepRefs = useRef([])
  const steps = language === 'ru' ? [
    {
      number: '01',
      title: 'Онлайн-заявка',
      description: 'Заполните форму на сайте с параметрами груза'
    },
    {
      number: '02',
      title: language === 'ru' ? 'Подбор оптимального решения' : '选择最佳解决方案',
      description: language === 'ru' 
        ? 'Ваш запрос мгновенно попадает к нашему логисту. В течение 15 минут (или 1 часа) мы подготовим для вас персональное коммерческое предложение с точной стоимостью.'
        : '您的请求立即传达给我们的物流专家。在15分钟（或1小时）内，我们将为您准备个性化的商业提案和准确的价格。'
    },
    {
      number: '03',
      title: 'Организация перевозки',
      description: 'Мы координируем все этапы логистики'
    },
    {
      number: '04',
      title: 'Доставка до клиента',
      description: 'Груз прибывает в указанный пункт назначения'
    }
  ] : [
    {
      number: '01',
      title: '在线申请',
      description: '在网站上填写货物参数表格'
    },
    {
      number: '02',
      title: '自动计算',
      description: '获得初步的配送费用'
    },
    {
      number: '03',
      title: '组织运输',
      description: '我们协调所有物流阶段'
    },
    {
      number: '04',
      title: '交付给客户',
      description: '货物到达指定目的地'
    }
  ]

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => [...prev, index])
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
        if (obs && stepRefs.current[index]) {
          obs.unobserve(stepRefs.current[index])
        }
      })
    }
  }, [])

  return (
    <section className="how-we-work">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' 
            ? 'Как мы работаем: максимум простоты для вас'
            : '我们的工作方式：为您提供最大的便利'}
        </h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div 
              key={index} 
              ref={el => stepRefs.current[index] = el}
              className={`step-card ${visibleSteps.includes(index) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="how-we-work-footer">
          <p className="faq-link-text">
            {language === 'ru' 
              ? 'Не нашли нужную информацию?'
              : '找不到需要的信息？'}
          </p>
          <a 
            href="/faq"
            className="faq-link-btn"
          >
            {language === 'ru' ? 'Часто задаваемые вопросы' : '常见问题'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
