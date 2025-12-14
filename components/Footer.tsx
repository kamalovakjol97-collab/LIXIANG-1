'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Building2 } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  company: [
    { name: 'О компании', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Группа компаний', href: '#companies' },
    { name: 'География', href: '#geography' },
  ],
  services: [
    { name: 'Импорт из Китая', href: '#services' },
    { name: 'Экспорт в Китай', href: '#services' },
    { name: 'Таможенное оформление', href: '#services' },
    { name: 'Складские услуги', href: '#services' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-accent-orange" />
              <h3 className="text-xl font-bold text-white">ООО ГК «ХЖЛ»</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Полный цикл логистических и торговых решений на направлении Россия–Китай. 
              Один партнёр — все решения.
            </p>
            <button className="flex items-center gap-2 text-accent-orange hover:text-accent-orange/80 font-semibold text-sm transition-colors">
              <MessageCircle className="w-4 h-4" />
              Написать в чат
            </button>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-accent-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-accent-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent-orange mt-1 flex-shrink-0" />
                <a
                  href="tel:+79315084299"
                  className="text-sm hover:text-accent-orange transition-colors"
                >
                  +7 (931) 508-42-99
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent-orange mt-1 flex-shrink-0" />
                <a
                  href="mailto:k4malovj@yandex.ru"
                  className="text-sm hover:text-accent-orange transition-colors break-all"
                >
                  k4malovj@yandex.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-orange mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Санкт-Петербург,<br />
                  ул. Савушкина 83к3
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-sm"
        >
          <p>
            © {new Date().getFullYear()} ООО ГК «ХЖЛ». Все права защищены.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
