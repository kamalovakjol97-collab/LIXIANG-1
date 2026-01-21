'use client'

import { useEffect, useState } from 'react'
import { Download, FileText } from 'lucide-react'

interface Document {
  id: string
  fileName: string
  filePath: string
  fileSize?: number
  uploadedAt: string
}

interface OrderDocumentsProps {
  orderId: string
}

export default function OrderDocuments({ orderId }: OrderDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
    // Обновление документов каждые 10 секунд
    const interval = setInterval(fetchDocuments, 10000)
    return () => clearInterval(interval)
  }, [orderId])

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/documents`)
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Ошибка загрузки документов:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка документов...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Документы
      </h3>

      {documents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p>Пока нет документов</p>
          <p className="text-sm mt-2">
            Документы по заказу будут доступны здесь после загрузки менеджером
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-orange" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{doc.fileName}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{formatDate(doc.uploadedAt)}</span>
                    {doc.fileSize && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(doc.fileSize)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <a
                href={doc.filePath}
                download
                className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                Скачать
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

