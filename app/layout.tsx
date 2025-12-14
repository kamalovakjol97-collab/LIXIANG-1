import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ООО ГК «ХЖЛ» — Полный цикл логистических решений Россия-Китай',
  description: 'Один партнёр — все решения: от поиска поставщика до доставки на ваш склад. Импорт, экспорт, последняя миля, страхование.',
  keywords: 'логистика Россия-Китай, доставка из Китая, импорт из Китая, экспорт в Китай, таможенное оформление, грузоперевозки',
  openGraph: {
    title: 'ООО ГК «ХЖЛ» — Полный цикл логистических решений Россия-Китай',
    description: 'Один партнёр — все решения: от поиска поставщика до доставки на ваш склад',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
