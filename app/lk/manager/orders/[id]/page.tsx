'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload, MessageSquare, FileText, Clock } from 'lucide-react'
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
    comment?: string
    changedAt: string
  }>
  client: {
    id: string
    name: string
    email: string
    phone?: string
  }
}

const statuses = [
  'Заявка создана',
  'В работе',
  'Документы получены',
  'Груз отправлен',
  'Груз прибыл',
  'Завершено',
]

const statusColors: Record<string, string> = {
  'Заявка создана': 'bg-blue-100 text-blue-800',
  'В работе': 'bg-yellow-100 text-yellow-800',
  'Документы получены': 'bg-purple-100 text-purple-800',
  'Груз отправлен': 'bg-indigo-100 text-indigo-800',
  'Груз прибыл': 'bg-green-100 text-green-800',
  'Завершено': 'bg-gray-100 text-gray-800',
}

export default function ManagerOrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'chat' | 'documents'>('info')
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    cargoDescription: '',
    weight: '',
    volume: '',
    status: '',
    statusComment: '',
  })

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

    fetchOrder()
  }, [params.id, router])

  useEffect(() => {
    if (order) {
      setFormData({
        fromLocation: order.fromLocation,
        toLocation: order.toLocation,
        cargoDescription: order.cargoDescription,
        weight: order.weight || '',
        volume: order.volume || '',
        status: order.status,
        statusComment: '',
      })
    }
  }, [order])

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

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/orders/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          cargoDescription: formData.cargoDescription,
          weight: formData.weight,
          volume: formData.volume,
          status: formData.status,
          statusComment: formData.statusComment,
        }),
      })

      if (response.ok) {
        await fetchOrder()
        setFormData({ ...formData, statusComment: '' })
        alert('Заказ обновлён')
      } else {
        const data = await response.json()
        alert(data.error || 'Ошибка при обновлении заказа')
      }
    } catch (error) {
      console.error('Ошибка обновления заказа:', error)
      alert('Ошибка при обновлении заказа')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`/api/orders/${params.id}/documents`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Документ загружен')
        // Обновление списка документов произойдёт автоматически через компонент
      } else {
        const data = await response.json()
        alert(data.error || 'Ошибка при загрузке документа')
      }
    } catch (error) {
      console.error('Ошибка загрузки документа:', error)
      alert('Ошибка при загрузке документа')
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
            href="/lk/manager/orders"
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
              href="/lk/manager/orders"
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Основная информация
                </h2>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Откуда
                  </label>
                  <input
                    type="text"
                    value={formData.fromLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, fromLocation: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Куда
                  </label>
                  <input
                    type="text"
                    value={formData.toLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, toLocation: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Описание груза
                  </label>
                  <textarea
                    value={formData.cargoDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cargoDescription: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Вес
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Объём
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Комментарий к изменению статуса (опционально)
                  </label>
                  <textarea
                    value={formData.statusComment}
                    onChange={(e) =>
                      setFormData({ ...formData, statusComment: e.target.value })
                    }
                    rows={3}
                    placeholder="Добавьте комментарий к изменению статуса..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Дата создания
                  </label>
                  <p className="text-gray-900 py-2">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Клиент
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {order.client.name}
                    </p>
                    <p className="text-sm text-gray-600">{order.client.email}</p>
                    {order.client.phone && (
                      <p className="text-sm text-gray-600">
                        {order.client.phone}
                      </p>
                    )}
                  </div>
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
                      {history.comment && (
                        <p className="text-sm text-gray-600 mt-1 italic">
                          {history.comment}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
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

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Загрузка документа
                </h3>
                <label className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Загрузить
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <OrderDocuments orderId={order.id} />
          </div>
        )}
      </div>
    </div>
  )
}

