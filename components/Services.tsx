'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Наши услуги
          </h2>
          <p className="text-lg text-gray-600">
            Комплексные логистические решения для бизнеса любой сложности
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Импорт из Китая',
              description: 'Полный цикл импортных операций: поиск поставщика, контроль качества, таможенное оформление, доставка',
            },
            {
              title: 'Экспорт в Китай',
              description: 'Организация экспортных поставок с соблюдением всех требований китайского законодательства',
            },
            {
              title: 'Таможенное оформление',
              description: 'Профессиональное таможенное оформление в России и Китае',
            },
            {
              title: 'Складские услуги',
              description: 'Хранение и обработка грузов на складах в России и Китае',
            },
            {
              title: 'Контроль качества',
              description: 'Проверка качества товаров на всех этапах цепочки поставок',
            },
            {
              title: 'Страхование грузов',
              description: 'Комплексное страхование грузов на всех этапах транспортировки',
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                Подробнее
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


