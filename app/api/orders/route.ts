import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Создание заказа
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clientId,
      fromLocation,
      toLocation,
      cargoDescription,
      weight,
      volume,
    } = body

    if (!clientId || !fromLocation || !toLocation || !cargoDescription) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      )
    }

    // Создание заказа
    const order = await prisma.order.create({
      data: {
        clientId,
        fromLocation,
        toLocation,
        cargoDescription,
        weight,
        volume,
        status: 'Заявка создана',
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    // Создание записи в истории статусов
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'Заявка создана',
      },
    })

    return NextResponse.json(
      {
        message: 'Заказ создан',
        order,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Ошибка создания заказа:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании заказа' },
      { status: 500 }
    )
  }
}

// Получение списка заказов
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const clientId = searchParams.get('clientId')
    const status = searchParams.get('status')
    const role = searchParams.get('role')

    const where: any = {}
    
    if (clientId && role === 'client') {
      where.clientId = clientId
    }
    
    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Ошибка получения заказов:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заказов' },
      { status: 500 }
    )
  }
}

