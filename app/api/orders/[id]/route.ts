import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Получение заказа по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Ошибка получения заказа:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заказа' },
      { status: 500 }
    )
  }
}

// Обновление заказа
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      fromLocation,
      toLocation,
      cargoDescription,
      weight,
      volume,
      status,
    } = body

    const updateData: any = {}
    
    if (fromLocation !== undefined) updateData.fromLocation = fromLocation
    if (toLocation !== undefined) updateData.toLocation = toLocation
    if (cargoDescription !== undefined) updateData.cargoDescription = cargoDescription
    if (weight !== undefined) updateData.weight = weight
    if (volume !== undefined) updateData.volume = volume
    if (status !== undefined) {
      updateData.status = status
      
      // Добавляем запись в историю статусов
      await prisma.orderStatusHistory.create({
        data: {
          orderId: params.id,
          status,
        },
      })
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Заказ обновлён',
      order,
    })
  } catch (error) {
    console.error('Ошибка обновления заказа:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении заказа' },
      { status: 500 }
    )
  }
}

