import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="why-xg" ref={sectionRef}>
      <div className="why-bg"></div>
      <div className="container">
        <div className="why-content">
          <div className="why-left">
            <h2 className="why-title">
              {language === 'ru' ? 'Почему нам доверяют' : '为什么选择我们'}
            </h2>
            <div className="why-intro">
              <p>
                {language === 'ru' 
                  ? 'Мы не просто перевозчик, а ваш стратегический логистический партнер. Берем на себя всю организацию, документы и решение проблем любой сложности.'
                  : '我们不仅是承运商，更是您的战略物流合作伙伴。我们承担所有组织、文件和任何复杂问题的解决。'}
              </p>
              <ul className="why-list-minimal">
                <li><span>✓</span> {language === 'ru' ? 'Максимально прогнозируемый результат' : '结果高度可预测'}</li>
                <li><span>✓</span> {language === 'ru' ? 'Отсутствие неопределенности' : '消除不确定性'}</li>
                <li><span>✓</span> {language === 'ru' ? 'Прозрачность процессов' : '流程透明'}</li>
              </ul>
            </div>
          </div>
          
          <div className="why-right">
            <div className="why-grid-modern">
              {advantages.map((adv, index) => (
                <div 
                  key={adv.id} 
                  className={`why-card-modern ${isVisible ? 'fade-in' : ''}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="adv-id">{adv.id}</div>
                  <h3 className="adv-title">{adv.title}</h3>
                  <p className="adv-text">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyXGLOG
