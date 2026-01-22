'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Plus, LogOut, ArrowRight } from 'lucide-react'

interface Order {
  id: string
  fromLocation: string
  toLocation: string
  cargoDescription: string
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  'Заявка создана': 'bg-blue-100 text-blue-800',
  'В работе': 'bg-yellow-100 text-yellow-800',
  'Документы получены': 'bg-purple-100 text-purple-800',
  'Груз отправлен': 'bg-indigo-100 text-indigo-800',
  'Груз прибыл': 'bg-green-100 text-green-800',
  'Завершено': 'bg-gray-100 text-gray-800',
}

export default function ClientOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/lk/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    if (parsedUser.role !== 'client') {
      router.push('/lk/login')
      return
    }

    fetchOrders(parsedUser.id)
  }, [router])

  const fetchOrders = async (clientId: string) => {
    try {
      const response = await fetch(`/api/orders?clientId=${clientId}&role=client`)
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/lk/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-primary font-bold text-xl">
                ООО «ХЖЛ»
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700">Личный кабинет</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Мои заказы</h1>
          <Link
            href="/"
            className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Оставить заявку
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              У вас пока нет заказов
            </h3>
            <p className="text-gray-500 mb-6">
              Оставьте заявку на главной странице, чтобы создать первый заказ
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent-orange hover:text-accent-orange/80 font-semibold"
            >
              Перейти на главную
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/lk/client/orders/${order.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-500">
                        Заказ №{order.id.slice(0, 8)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {order.fromLocation} → {order.toLocation}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {order.cargoDescription}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Создан: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

