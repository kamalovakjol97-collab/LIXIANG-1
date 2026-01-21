'use client'

import { useEffect, useState, useRef } from 'react'
import { Send } from 'lucide-react'

interface Message {
  id: string
  senderRole: string
  senderName?: string
  messageText: string
  createdAt: string
}

interface OrderChatProps {
  orderId: string
  user: any
}

export default function OrderChat({ orderId, user }: OrderChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
    // Обновление сообщений каждые 5 секунд
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [orderId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/messages`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const response = await fetch(`/api/orders/${orderId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderRole: user.role,
          senderName: user.name,
          messageText: newMessage,
        }),
      })

      if (response.ok) {
        setNewMessage('')
        fetchMessages()
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error)
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка сообщений...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow flex flex-col" style={{ height: '600px' }}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Чат по заказу</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Пока нет сообщений</p>
            <p className="text-sm mt-2">Начните переписку</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderRole === user.role
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                      ? 'bg-accent-orange text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {!isOwnMessage && (
                    <p className="text-xs font-semibold mb-1 opacity-75">
                      {message.senderName || 'Менеджер'}
                    </p>
                  )}
                  <p className="text-sm">{message.messageText}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Отправить
          </button>
        </div>
      </form>
    </div>
  )
}

