'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Подключить API чата
      console.log('Сообщение:', message)
      setMessage('')
      alert('Сообщение отправлено! Мы ответим в ближайшее время.')
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      label: 'Телефон',
      value: '+7 (931) 508-42-99',
      href: 'tel:+79315084299',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'k4malovj@yandex.ru',
      href: 'mailto:k4malovj@yandex.ru',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ]

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-colors group"
        aria-label="Открыть чат"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            />

            {/* Chat window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[600px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">ООО ГК «ХЖЛ»</h3>
                  <p className="text-sm text-gray-200">Обычно отвечаем за несколько минут</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Welcome message */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    Здравствуйте! 👋 Чем можем помочь?
                  </p>
                </div>

                {/* Contact methods */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Связаться с нами
                  </p>
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className={`${method.bgColor} ${method.color} p-2 rounded-lg`}>
                        <method.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {method.label}
                        </p>
                        <p className="text-xs text-gray-600">{method.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Message input area */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-2">
                    Или напишите сообщение:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Введите сообщение..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors"
                      aria-label="Отправить сообщение"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
