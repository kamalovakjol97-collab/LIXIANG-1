'use client'

import { motion } from 'framer-motion'
import { Package, Upload, Truck, Shield } from 'lucide-react'

const services = [
  {
    icon: Package,
    title: 'Импорт',
    description: 'Полный цикл импортных операций из Китая',
  },
  {
    icon: Upload,
    title: 'Экспорт',
    description: 'Организация экспорта товаров в Китай',
  },
  {
    icon: Truck,
    title: 'Последняя миля',
    description: 'Доставка до вашего склада или клиента',
  },
  {
    icon: Shield,
    title: 'Страхование',
    description: 'Защита груза на всех этапах перевозки',
  },
]

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            О компании
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Мы объединили ключевые звенья цепочки поставок в единую группу компаний для сервиса полного цикла. 
            От поиска поставщика до доставки на ваш склад — все процессы под контролем одного партнёра.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
