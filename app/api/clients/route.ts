import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Получение списка клиентов (только для менеджеров)
export async function GET(request: NextRequest) {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: 'client',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ clients })
  } catch (error) {
    console.error('Ошибка получения клиентов:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении клиентов' },
      { status: 500 }
    )
  }
}

