'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  LogOut,
  ArrowRight,
  BarChart3,
} from 'lucide-react'

interface Statistics {
  totalOrders: number
  totalClients: number
  statusCounts: Record<string, number>
  recentOrders: Array<{
    id: string
    fromLocation: string
    toLocation: string
    status: string
    createdAt: string
    client: {
      name: string
      email: string
    }
  }>
  ordersThisMonth: number
  ordersLastMonth: number
  growthRate: number
}

const statusColors: Record<string, string> = {
  'Заявка создана': 'bg-blue-100 text-blue-800',
  'В работе': 'bg-yellow-100 text-yellow-800',
  'Документы получены': 'bg-purple-100 text-purple-800',
  'Груз отправлен': 'bg-indigo-100 text-indigo-800',
  'Груз прибыл': 'bg-green-100 text-green-800',
  'Завершено': 'bg-gray-100 text-gray-800',
}

export default function StatisticsPage() {
  const router = useRouter()
  const [statistics, setStatistics] = useState<Statistics | null>(null)
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

    if (parsedUser.role !== 'manager') {
      router.push('/lk/login')
      return
    }

    fetchStatistics()
  }, [router])

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics')
      const data = await response.json()
      setStatistics(data)
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error)
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

  if (!statistics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Ошибка загрузки статистики</p>
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
              <span className="text-gray-700">Панель менеджера</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/lk/manager/orders"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Заказы
              </Link>
              <Link
                href="/lk/manager/clients"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Клиенты
              </Link>
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
        <div className="flex items-center gap-2 mb-8">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Статистика</h1>
        </div>

        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {statistics.totalOrders}
            </h3>
            <p className="text-gray-600 text-sm">Всего заказов</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {statistics.totalClients}
            </h3>
            <p className="text-gray-600 text-sm">Клиентов</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {statistics.ordersThisMonth}
            </h3>
            <p className="text-gray-600 text-sm">Заказов в этом месяце</p>
            <div className="flex items-center gap-2 mt-2">
              {statistics.growthRate >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-semibold ${
                  statistics.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {statistics.growthRate >= 0 ? '+' : ''}
                {statistics.growthRate.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {statistics.ordersLastMonth}
            </h3>
            <p className="text-gray-600 text-sm">Заказов в прошлом месяце</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Orders by Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Заказы по статусам
            </h2>
            <div className="space-y-4">
              {Object.entries(statistics.statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[status] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Последние заказы
              </h2>
              <Link
                href="/lk/manager/orders"
                className="text-accent-orange hover:text-accent-orange/80 font-semibold text-sm flex items-center gap-1"
              >
                Все заказы
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {statistics.recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Нет заказов
                </p>
              ) : (
                statistics.recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/lk/manager/orders/${order.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-accent-orange hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-sm text-gray-500">
                          Заказ №{order.id.slice(0, 8)}
                        </span>
                        <h3 className="font-semibold text-gray-900 mt-1">
                          {order.fromLocation} → {order.toLocation}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.client.name}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
