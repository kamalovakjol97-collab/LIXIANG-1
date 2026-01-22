import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        published: true,
      },
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      )
    }

    // Увеличиваем счетчик просмотров
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Ошибка загрузки статьи:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки статьи' },
      { status: 500 }
    )
  }
}
