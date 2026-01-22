'use client'

import { motion } from 'framer-motion'
import { Send, Mail, Phone, User, Package, Upload, X } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    fromLocation: '',
    toLocation: '',
    cargoDescription: '',
    weight: '',
    volume: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [isNewUser, setIsNewUser] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Сначала проверяем/создаём пользователя
      let userId: string
      
      if (isNewUser) {
        // Создаём нового пользователя
        if (!formData.password) {
          throw new Error('Пароль обязателен для регистрации')
        }
        
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phone: formData.phone,
            role: 'client',
          }),
        })

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json()
          throw new Error(errorData.error || 'Ошибка при создании пользователя')
        }

        const registerData = await registerResponse.json()
        userId = registerData.user.id
      } else {
        // Пытаемся войти
        if (!formData.password) {
          throw new Error('Введите пароль для входа')
        }
        
        const userResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        if (!userResponse.ok) {
          // Если пользователь не найден, предлагаем зарегистрироваться
          setIsNewUser(true)
          setError('Пользователь не найден. Пожалуйста, заполните форму для регистрации.')
          setIsSubmitting(false)
          return
        }

        const userData = await userResponse.json()
        userId = userData.user.id
      }

      // Создаём заказ
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: userId,
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          cargoDescription: formData.cargoDescription,
          weight: formData.weight || undefined,
          volume: formData.volume || undefined,
        }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Ошибка при создании заказа')
      }

      const orderData = await orderResponse.json()
      const orderId = orderData.order.id

      // Загружаем файлы, если они есть
      if (files.length > 0) {
        for (const file of files) {
          const formDataFiles = new FormData()
          formDataFiles.append('file', file)

          await fetch(`/api/orders/${orderId}/documents`, {
            method: 'POST',
            body: formDataFiles,
          })
        }
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        fromLocation: '',
        toLocation: '',
        cargoDescription: '',
        weight: '',
        volume: '',
      })
      setFiles([])

      // Перенаправление в ЛК через 2 секунды
      setTimeout(() => {
        window.location.href = '/lk/login'
      }, 2000)
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при отправке заявки')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
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
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  Пароль {isNewUser ? '(для регистрации)' : '(для входа)'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                {!isNewUser && (
                  <button
                    type="button"
                    onClick={() => setIsNewUser(true)}
                    className="mt-2 text-sm text-white/80 hover:text-white underline"
                  >
                    Нет аккаунта? Зарегистрироваться
                  </button>
                )}
              </div>

              <div>
                <label
                  htmlFor="fromLocation"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Package className="w-4 h-4" />
                  Откуда
                </label>
                <input
                  type="text"
                  id="fromLocation"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="Город отправления"
                />
              </div>

              <div>
                <label
                  htmlFor="toLocation"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Package className="w-4 h-4" />
                  Куда
                </label>
                <input
                  type="text"
                  id="toLocation"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                  placeholder="Город назначения"
                />
              </div>

              <div>
                <label
                  htmlFor="cargoDescription"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Package className="w-4 h-4" />
                  Описание груза
                </label>
                <textarea
                  id="cargoDescription"
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all resize-none"
                  placeholder="Опишите ваш груз и другие детали"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="weight"
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                  >
                    Вес (опционально)
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                    placeholder="кг"
                  />
                </div>
                <div>
                  <label
                    htmlFor="volume"
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                  >
                    Объём (опционально)
                  </label>
                  <input
                    type="text"
                    id="volume"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                    placeholder="м³"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="files"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Upload className="w-4 h-4" />
                  Файлы (инвойс, упаковочный лист и т.д.)
                </label>
                <input
                  type="file"
                  id="files"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent-orange file:text-white hover:file:bg-accent-orange/90 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all"
                />
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 text-sm"
                      >
                        <span className="text-white truncate flex-1">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-white/80 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded-lg text-sm">
                  Заявка успешно отправлена! Перенаправление в личный кабинет...
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || success}
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


