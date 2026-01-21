'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleCalculate = () => {
    // TODO: Подключить API расчёта стоимости
    console.log('Расчёт стоимости')
  }

  const handleTrack = () => {
    // TODO: Подключить API отслеживания
    if (trackingNumber) {
      console.log('Отслеживание:', trackingNumber)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение с overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-90"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1601581875307-fafbf28a5f7c?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white space-y-8 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Полный цикл логистических и торговых решений
            <span className="block mt-2 text-accent-orange">Россия–Китай</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Один партнёр — все решения: от поиска поставщика до доставки на ваш склад
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 shadow-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Рассчитать стоимость доставки
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 border border-white/30 transition-colors"
            >
              Узнать больше
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Отслеживание груза */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pt-12 max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Отследить груз</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Введите номер отправления"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
                <button
                  onClick={handleTrack}
                  className="px-6 py-2 bg-accent-green hover:bg-accent-green/90 rounded-lg font-semibold transition-colors"
                >
                  Найти
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}


