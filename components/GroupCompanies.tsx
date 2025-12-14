'use client'

import { motion } from 'framer-motion'
import { Building2, Package, Globe, Warehouse, FileCheck } from 'lucide-react'

const companies = [
  {
    name: 'ООО «ХЖЛ»',
    icon: Building2,
    description: 'Импорт, экспорт, последняя миля, страхование',
    color: 'bg-primary',
  },
  {
    name: 'Карговичкоф',
    icon: Package,
    description: 'Быстрая и прозрачная доставка из Китая',
    color: 'bg-accent-orange',
  },
  {
    name: 'Guosen',
    icon: Globe,
    description: 'Эксперт в Китае: таможня и перевозки',
    color: 'bg-accent-green',
  },
  {
    name: 'Manzhouli Dongxinguo',
    icon: Warehouse,
    description: 'Торговый дом и складские услуги',
    color: 'bg-blue-600',
  },
  {
    name: 'ООО «Комтехавто»',
    icon: FileCheck,
    description: 'Таможенное оформление в РФ',
    color: 'bg-purple-600',
  },
]

export default function GroupCompanies() {
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
            Структура группы компаний
          </h2>
          <p className="text-lg text-gray-600">
            Каждая компания группы специализируется на ключевых звеньях цепочки поставок
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${company.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <company.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {company.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {company.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
