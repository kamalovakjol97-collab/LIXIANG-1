import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">О компании</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ООО «ХЖЛ» — экспедиторская компания
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ООО «ХЖЛ» — экспедиторская компания без собственных активов.
                Мы специализируемся на координации перевозок «под ключ»,
                работая через сеть проверенных партнёров.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Наша модель работы позволяет нам предлагать клиентам
                оптимальные решения без необходимости содержания собственного
                транспорта и складов, что делает наши услуги более гибкими и
                экономически выгодными.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Модель работы
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы работаем через партнёрскую сеть:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Перевозчики</li>
                <li>Таможенные брокеры</li>
                <li>Иные подрядчики</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Это позволяет нам предлагать комплексные логистические решения
                и обеспечивать высокое качество обслуживания при оптимальной
                стоимости.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                География работы
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Мы работаем на различных направлениях, обеспечивая доставку
                грузов по России и за её пределами. Наша партнёрская сеть
                позволяет нам эффективно работать в разных регионах.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Опыт и экспертиза
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Наша команда имеет многолетний опыт в логистике и экспедировании.
                Мы понимаем специфику работы с различными типами грузов и
                маршрутов, что позволяет нам находить оптимальные решения для
                каждого клиента.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Преимущества работы с нами
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Гибкость и оперативность</li>
                <li>Оптимальные цены благодаря партнёрской сети</li>
                <li>Прозрачный процесс работы через личный кабинет</li>
                <li>Персональный менеджер для каждого клиента</li>
                <li>Полный контроль над процессом доставки</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

