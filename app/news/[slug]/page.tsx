'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, ArrowLeft, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { use } from 'react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  imageUrl: string | null
  content: string
  views: number
  publishedAt: string | null
  createdAt: string
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/news/${slug}`)
      const data = await response.json()

      if (data.article) {
        setArticle(data.article)
      }
    } catch (error) {
      console.error('Ошибка загрузки статьи:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
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
          <p className="text-gray-600">Загрузка статьи...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Статья не найдена
          </h1>
          <Link
            href="/news"
            className="text-accent-orange hover:text-accent-orange/80 font-semibold"
          >
            Вернуться к новостям
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к новостям
          </Link>
        </div>
      </div>

      <article className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {article.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-accent-orange" />
                <span className="text-accent-orange font-semibold">
                  {article.category}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{article.views} просмотров</span>
              </div>
            </div>
          </motion.header>

          {/* Article Image */}
          {article.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96 w-full mb-8 rounded-lg overflow-hidden"
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12"
          >
            {article.excerpt && (
              <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </div>
      </article>
    </div>
  )
}
