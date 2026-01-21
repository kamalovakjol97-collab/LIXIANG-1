'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Warehouse } from 'lucide-react'

const locations = {
  russia: [
    {
      city: 'Санкт-Петербург',
      address: 'ул. Савушкина 83к3',
      type: 'office' as const,
    },
  ],
  china: [
    { city: 'Иу', type: 'warehouse' as const },
    { city: 'Гуанчжоу', type: 'warehouse' as const },
    { city: 'Маньчжурия', type: 'warehouse' as const },
    { city: 'Хэбэй', type: 'warehouse' as const },
    { city: 'Шэньчжэнь', type: 'warehouse' as const },
  ],
}

export default function Geography() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            География работы
          </h2>
          <p className="text-lg text-gray-600">
            Наши офисы и склады в России и Китае
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Russia */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Россия</h3>
            </div>
            <div className="space-y-4">
              {locations.russia.map((location) => (
                <div
                  key={location.city}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {location.city}
                    </h4>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* China */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-green" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Китай (склады)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {locations.china.map((location) => (
                <div
                  key={location.city}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Warehouse className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="font-semibold text-gray-900">
                    {location.city}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map visualization placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary to-accent-green rounded-xl p-8 text-white text-center"
        >
          <p className="text-lg font-semibold mb-2">
            Сеть складов и офисов охватывает ключевые логистические узлы
          </p>
          <p className="text-gray-200">
            Оптимизированные маршруты для быстрой доставки
          </p>
        </motion.div>
      </div>
    </section>
  )
}


