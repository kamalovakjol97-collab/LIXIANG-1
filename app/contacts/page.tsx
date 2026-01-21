import Link from 'next/link'
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function ContactsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600 mb-12">
            Свяжитесь с нами любым удобным способом
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Контактная информация
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                    <a
                      href="tel:+79315084299"
                      className="text-gray-700 hover:text-accent-orange transition-colors"
                    >
                      +7 (931) 508-42-99
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:k4malovj@yandex.ru"
                      className="text-gray-700 hover:text-accent-orange transition-colors break-all"
                    >
                      k4malovj@yandex.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                    <p className="text-gray-700">
                      Санкт-Петербург,<br />
                      ул. Савушкина 83к3
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Реквизиты
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold mb-1">Наименование:</p>
                  <p>ООО «ХЖЛ»</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Юридический адрес:</p>
                  <p>Санкт-Петербург, ул. Савушкина 83к3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Форма обратной связи */}
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  )
}

