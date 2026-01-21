'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, LogOut, Search, Filter } from 'lucide-react'

interface Order {
  id: string
  fromLocation: string
  toLocation: string
  cargoDescription: string
  status: string
  createdAt: string
  client: {
    id: string
    name: string
    email: string
    phone?: string
  }
}

const statuses = [
  'Все',
  'Заявка принята',
  'Расчёт отправлен',
  'Заказ подтверждён',
  'Груз отправлен',
  'Груз прибыл',
  'Документы готовы',
  'Заказ закрыт',
]

const statusColors: Record<string, string> = {
  'Заявка принята': 'bg-blue-100 text-blue-800',
  'Расчёт отправлен': 'bg-yellow-100 text-yellow-800',
  'Заказ подтверждён': 'bg-purple-100 text-purple-800',
  'Груз отправлен': 'bg-indigo-100 text-indigo-800',
  'Груз прибыл': 'bg-green-100 text-green-800',
  'Документы готовы': 'bg-teal-100 text-teal-800',
  'Заказ закрыт': 'bg-gray-100 text-gray-800',
}

export default function ManagerOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

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

    fetchOrders()
  }, [router])

  useEffect(() => {
    filterOrders()
  }, [orders, selectedStatus, searchQuery])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = [...orders]

    if (selectedStatus !== 'Все') {
      filtered = filtered.filter((order) => order.status === selectedStatus)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.client.name.toLowerCase().includes(query) ||
          order.client.email.toLowerCase().includes(query) ||
          order.fromLocation.toLowerCase().includes(query) ||
          order.toLocation.toLowerCase().includes(query)
      )
    }

    setFilteredOrders(filtered)
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
              <span className="text-gray-700">Панель менеджера</span>
            </div>
            <div className="flex items-center gap-4">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Все заказы</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по номеру, клиенту, маршруту..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent appearance-none bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Заказы не найдены
            </h3>
            <p className="text-gray-500">
              {searchQuery || selectedStatus !== 'Все'
                ? 'Попробуйте изменить фильтры'
                : 'Пока нет заказов'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/lk/manager/orders/${order.id}`}
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
                          statusColors[order.status] ||
                          'bg-gray-100 text-gray-800'
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
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Клиент: {order.client.name}</span>
                      <span>•</span>
                      <span>{order.client.email}</span>
                      {order.client.phone && (
                        <>
                          <span>•</span>
                          <span>{order.client.phone}</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Создан: {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

