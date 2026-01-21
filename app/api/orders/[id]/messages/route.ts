import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Получение сообщений по заказу
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const messages = await prisma.message.findMany({
      where: { orderId: params.id },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Ошибка получения сообщений:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении сообщений' },
      { status: 500 }
    )
  }
}

// Создание сообщения
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { senderRole, senderName, messageText } = body

    if (!senderRole || !messageText) {
      return NextResponse.json(
        { error: 'senderRole и messageText обязательны' },
        { status: 400 }
      )
    }

    // Проверка существования заказа
    const order = await prisma.order.findUnique({
      where: { id: params.id },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    const message = await prisma.message.create({
      data: {
        orderId: params.id,
        senderRole,
        senderName: senderName || 'Пользователь',
        messageText,
      },
    })

    return NextResponse.json(
      {
        message: 'Сообщение отправлено',
        data: message,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Ошибка создания сообщения:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке сообщения' },
      { status: 500 }
    )
  }
}

