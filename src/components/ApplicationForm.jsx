import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../config/supabase'
import './ApplicationForm.css'

const ApplicationForm = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const [formData, setFormData] = useState({
    cargoType: '',
    from: '',
    to: '',
    phone: '',
    companyName: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('applications')
        .insert([formData])
      if (error) throw error
      setSubmitStatus('success')
      setFormData({ cargoType: '', from: '', to: '', phone: '', companyName: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="application-form" className="cta-section" ref={sectionRef}>
      <div className="cta-bg"></div>
      <div className="container">
        <div className={`cta-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="cta-text">
            <h2 className="cta-title">
              {language === 'ru' ? 'Готовы начать сотрудничество?' : '准备好开始合作了吗？'}
            </h2>
            <p className="cta-subtitle">
              {language === 'ru' 
                ? 'Оставьте заявку, и наш ведущий логист свяжется с вами в течение 15 минут для детального расчета.'
                : '提交申请，我们的首席物流师将在15分钟内与您联系，进行详细计算。'}
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <strong>15 {language === 'ru' ? 'мин' : '分钟'}</strong>
                <span>{language === 'ru' ? 'Среднее время ответа' : '平均响应时间'}</span>
              </div>
              <div className="cta-feature">
                <strong>100%</strong>
                <span>{language === 'ru' ? 'Точность расчета' : '计算准确性'}</span>
              </div>
            </div>
          </div>
          
          <div className="cta-form-container">
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  name="cargoType" 
                  placeholder={language === 'ru' ? 'Тип груза' : '货物类型'} 
                  value={formData.cargoType}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-grid-inner">
                <input 
                  type="text" 
                  name="from" 
                  placeholder={language === 'ru' ? 'Откуда' : '始发地'} 
                  value={formData.from}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="text" 
                  name="to" 
                  placeholder={language === 'ru' ? 'Куда' : '目的地'} 
                  value={formData.to}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-row">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder={language === 'ru' ? 'Ваш телефон' : '您的电话'} 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              {submitStatus === 'success' && (
                <div className="form-msg success">{language === 'ru' ? 'Заявка отправлена!' : '申请已提交！'}</div>
              )}
              
              <button className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? '...' : (language === 'ru' ? 'Отправить запрос' : '发送申请')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicationForm
