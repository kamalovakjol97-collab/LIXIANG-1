'use client'

import { motion } from 'framer-motion'
import { Search, Building2, Truck, Package, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Поиск поставщика',
    description: 'Помощь в поиске и выборе надёжных поставщиков в Китае',
  },
  {
    icon: Building2,
    title: 'Организация в Китае',
    description: 'Организация работы с поставщиками, контроль качества, складирование',
  },
  {
    icon: Truck,
    title: 'Международная доставка',
    description: 'Транспортировка через границу с оформлением всех необходимых документов',
  },
  {
    icon: Package,
    title: 'Финальная доставка',
    description: 'Доставка груза до вашего склада или указанного адреса',
  },
]

export default function Workflow() {
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
            Пример работы
          </h2>
          <p className="text-lg text-gray-600">
            Полный цикл от поиска поставщика до доставки на ваш склад
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop view - horizontal flow */}
          <div className="hidden lg:flex items-start justify-between relative">
            {steps.map((step, index) => (
              <div key={step.title} className="flex-1 flex flex-col items-center relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-10 left-[50%] right-0 h-0.5 bg-primary/30 z-0">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 text-primary bg-gray-50 rounded-full" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10"
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                  className="text-center max-w-xs"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet view - vertical flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-6"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-primary">Шаг {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
