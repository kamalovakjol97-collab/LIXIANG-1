'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, TrendingDown, ShieldCheck, Zap, Eye } from 'lucide-react'

const advantages = [
  {
    icon: CheckCircle2,
    title: 'Контроль качества',
    description: 'Многоуровневый контроль качества на всех этапах цепочки поставок',
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/10',
  },
  {
    icon: TrendingDown,
    title: 'Снижение издержек',
    description: 'Оптимизация процессов позволяет минимизировать затраты на логистику',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'Единая ответственность',
    description: 'Один партнёр отвечает за весь процесс от начала до конца',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Zap,
    title: 'Высокая скорость',
    description: 'Оптимизированные маршруты и процессы обеспечивают быструю доставку',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10',
  },
  {
    icon: Eye,
    title: 'Прозрачность процессов',
    description: 'Полная прозрачность на всех этапах: отслеживание и отчётность в реальном времени',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

export default function Advantages() {
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
            Наши преимущества
          </h2>
          <p className="text-lg text-gray-600">
            Почему компании выбирают нас для логистических решений
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 ${advantage.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <advantage.icon className={`w-7 h-7 ${advantage.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


