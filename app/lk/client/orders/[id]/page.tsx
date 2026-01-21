'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, FileText, Clock } from 'lucide-react'
import OrderChat from '@/components/OrderChat'
import OrderDocuments from '@/components/OrderDocuments'

interface Order {
  id: string
  fromLocation: string
  toLocation: string
  cargoDescription: string
  weight?: string
  volume?: string
  status: string
  createdAt: string
  statusHistory: Array<{
    id: string
    status: string
    changedAt: string
  }>
}

const statusColors: Record<string, string> = {
  'Заявка принята': 'bg-blue-100 text-blue-800',
  'Расчёт отправлен': 'bg-yellow-100 text-yellow-800',
  'Заказ подтверждён': 'bg-purple-100 text-purple-800',
  'Груз отправлен': 'bg-indigo-100 text-indigo-800',
  'Груз прибыл': 'bg-green-100 text-green-800',
  'Документы готовы': 'bg-teal-100 text-teal-800',
  'Заказ закрыт': 'bg-gray-100 text-gray-800',
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'documents'>('info')
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

    fetchOrder()
  }, [params.id, router])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      console.error('Ошибка загрузки заказа:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Заказ не найден</p>
          <Link
            href="/lk/client/orders"
            className="text-accent-orange hover:text-accent-orange/80 font-semibold"
          >
            Вернуться к заказам
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/lk/client/orders"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к заказам
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-700">Заказ №{order.id.slice(0, 8)}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-accent-orange text-accent-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Информация
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'chat'
                    ? 'border-accent-orange text-accent-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Чат
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'documents'
                    ? 'border-accent-orange text-accent-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                Документы
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Основная информация */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Основная информация
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Откуда
                  </label>
                  <p className="text-gray-900">{order.fromLocation}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Куда
                  </label>
                  <p className="text-gray-900">{order.toLocation}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Описание груза
                  </label>
                  <p className="text-gray-900">{order.cargoDescription}</p>
                </div>
                {order.weight && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Вес
                    </label>
                    <p className="text-gray-900">{order.weight}</p>
                  </div>
                )}
                {order.volume && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Объём
                    </label>
                    <p className="text-gray-900">{order.volume}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Статус
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[order.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Дата создания
                  </label>
                  <p className="text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* История статусов */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                История изменения статусов
              </h2>
              <div className="space-y-4">
                {order.statusHistory.map((history, index) => (
                  <div
                    key={history.id}
                    className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange font-semibold text-sm">
                      {order.statusHistory.length - index}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {history.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(history.changedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && <OrderChat orderId={order.id} user={user} />}

        {activeTab === 'documents' && <OrderDocuments orderId={order.id} />}
      </div>
    </div>
  )
}

