'use client'

import { motion } from 'framer-motion'
import { Send, Mail, Phone, User, Package } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cargo: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Подключить API для отправки формы
    console.log('Отправка формы:', formData)

    // Симуляция отправки
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
      setFormData({ name: '', email: '', phone: '', cargo: '' })
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Как начать сотрудничество
          </h2>
          <p className="text-xl text-gray-200">
            Оставьте заявку, и мы свяжемся с вами в течение рабочего дня
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <User className="w-4 h-4" />
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Phone className="w-4 h-4" />
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label
                  htmlFor="cargo"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Package className="w-4 h-4" />
                  Описание груза
                </label>
                <textarea
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all resize-none"
                  placeholder="Опишите ваш груз, маршрут доставки и другие детали"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
