import Link from 'next/link'
import { ArrowLeft, Truck, Train, Ship, FileText } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: 'Автоперевозки',
      description:
        'Доставка грузов автомобильным транспортом по России и за её пределами. Работаем с различными типами грузов и маршрутов.',
    },
    {
      icon: Train,
      title: 'Железнодорожные перевозки',
      description:
        'Организация перевозок железнодорожным транспортом. Эффективное решение для крупногабаритных и массовых грузов.',
    },
    {
      icon: Ship,
      title: 'Морские перевозки',
      description:
        'Международные морские перевозки. Работаем с контейнерными и навалочными грузами.',
    },
    {
      icon: FileText,
      title: 'Таможенное оформление',
      description:
        'Таможенное оформление грузов через наших партнёров-брокеров. Полное сопровождение таможенных процедур.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-accent-orange mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Услуги</h1>
          <p className="text-xl text-gray-600 mb-12">
            Комплексные логистические решения для вашего бизнеса
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Международные перевозки
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Мы организуем международные перевозки различными видами транспорта.
              Наша партнёрская сеть позволяет нам эффективно работать на
              различных направлениях, обеспечивая надёжную доставку ваших грузов.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

