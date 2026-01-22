import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalOrders,
      totalClients,
      ordersByStatus,
      recentOrders,
      ordersThisMonth,
      ordersLastMonth,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: 'client' } }),
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          status: true,
        },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ])

    const statusCounts: Record<string, number> = {}
    ordersByStatus.forEach((item) => {
      statusCounts[item.status] = item._count.status
    })

    return NextResponse.json({
      totalOrders,
      totalClients,
      statusCounts,
      recentOrders,
      ordersThisMonth,
      ordersLastMonth,
      growthRate:
        ordersLastMonth > 0
          ? ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100
          : 0,
    })
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки статистики' },
      { status: 500 }
    )
  }
}
