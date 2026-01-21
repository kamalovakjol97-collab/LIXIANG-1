'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogIn, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const isLkPage = pathname?.startsWith('/lk')

  if (isLkPage) {
    return null // Не показываем хедер на страницах ЛК
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">ООО «ХЖЛ»</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-accent-orange transition-colors font-medium"
            >
              О компании
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-accent-orange transition-colors font-medium"
            >
              Услуги
            </Link>
            <Link
              href="/contacts"
              className="text-gray-700 hover:text-accent-orange transition-colors font-medium"
            >
              Контакты
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href={
                    user.role === 'manager'
                      ? '/lk/manager/orders'
                      : '/lk/client/orders'
                  }
                  className="flex items-center gap-2 text-gray-700 hover:text-accent-orange transition-colors font-medium"
                >
                  <User className="w-4 h-4" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                href="/lk/login"
                className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Войти в ЛК
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-accent-orange transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4 space-y-4"
            >
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-accent-orange transition-colors font-medium"
              >
                О компании
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-accent-orange transition-colors font-medium"
              >
                Услуги
              </Link>
              <Link
                href="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-accent-orange transition-colors font-medium"
              >
                Контакты
              </Link>
              {user ? (
                <>
                  <Link
                    href={
                      user.role === 'manager'
                        ? '/lk/manager/orders'
                        : '/lk/client/orders'
                    }
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-accent-orange transition-colors font-medium"
                  >
                    <User className="w-4 h-4" />
                    {user.name}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link
                  href="/lk/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Войти в ЛК
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

