'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, LogOut, Mail, Phone, Package } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
  orders: Array<{
    id: string
    status: string
    createdAt: string
  }>
}

export default function ManagerClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
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

    fetchClients()
  }, [router])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients')
      const data = await response.json()
      setClients(data.clients || [])
    } catch (error) {
      console.error('Ошибка загрузки клиентов:', error)
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
              <span className="text-gray-700">Панель менеджера</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/lk/manager/orders"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Заказы
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Users className="w-8 h-8" />
          Клиенты
        </h1>

        {clients.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Пока нет клиентов
            </h3>
            <p className="text-gray-500">
              Клиенты появятся здесь после регистрации
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {client.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{client.email}</span>
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        Регистрация: {formatDate(client.createdAt)}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <Package className="w-4 h-4" />
                        <span className="font-semibold">
                          Заказов: {client.orders.length}
                        </span>
                      </div>
                      {client.orders.length > 0 && (
                        <div className="space-y-2">
                          {client.orders.slice(0, 3).map((order) => (
                            <Link
                              key={order.id}
                              href={`/lk/manager/orders/${order.id}`}
                              className="block text-sm text-accent-orange hover:text-accent-orange/80"
                            >
                              Заказ №{order.id.slice(0, 8)} — {order.status}
                            </Link>
                          ))}
                          {client.orders.length > 3 && (
                            <p className="text-sm text-gray-500">
                              и ещё {client.orders.length - 3} заказов
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

