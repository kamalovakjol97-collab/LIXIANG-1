import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../config/supabase'
import './ApplicationForm.css'

const ApplicationForm = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
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
  const [formData, setFormData] = useState({
    cargoType: '',
    from: '',
    to: '',
    weightVolume: '',
    email: '',
    phone: '',
    inn: '',
    companyName: '',
    fullName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase is not configured. Please check your environment variables.')
      }

      const { error } = await supabase
        .from('applications')
        .insert([{
          cargo_type: formData.cargoType,
          from_location: formData.from,
          to_location: formData.to,
          weight_volume: formData.weightVolume,
          email: formData.email,
          phone: formData.phone,
          inn: formData.inn,
          company_name: formData.companyName,
          full_name: formData.fullName,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({
        cargoType: '',
        from: '',
        to: '',
        weightVolume: '',
        email: '',
        phone: '',
        inn: '',
        companyName: '',
        fullName: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <section id="application-form" className="application-form" ref={sectionRef}>
        <div className="container">
          <h2 className="section-title">{t('applicationForm')}</h2>
          <p className="text-center" style={{ maxWidth: '65ch', margin: '0 auto 2rem', color: 'var(--color-gray)' }}>
            {language === 'ru' 
              ? 'Заполните форму, и мы подготовим для вас персональное коммерческое предложение'
              : '填写表格，我们将为您准备个性化的商业提案'}
          </p>
          <form className={`form ${isVisible ? 'fade-in' : ''}`} onSubmit={handleSubmit} style={{ animationDelay: '0.1s' }}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="cargoType">Тип груза</label>
              <input
                type="text"
                id="cargoType"
                name="cargoType"
                value={formData.cargoType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="from">Откуда</label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">Куда</label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weightVolume">Вес / объём</label>
              <input
                type="text"
                id="weightVolume"
                name="weightVolume"
                value={formData.weightVolume}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="inn">ИНН компании</label>
              <input
                type="text"
                id="inn"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Название компании</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="fullName">ФИО</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="form-message form-message-success">
              Заявка принята, мы свяжемся с вами
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-message form-message-error">
              Произошла ошибка. Пожалуйста, попробуйте ещё раз.
            </div>
          )}

          <button
            type="submit"
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ApplicationForm
