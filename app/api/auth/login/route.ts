import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и password обязательны' },
        { status: 400 }
      )
    }

    // Поиск пользователя
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Неверный email или password' },
        { status: 401 }
      )
    }

    // Проверка пароля
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Неверный email или password' },
        { status: 401 }
      )
    }

    // Возвращаем данные пользователя (в продакшене здесь должна быть сессия/JWT)
    return NextResponse.json({
      message: 'Успешный вход',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
      },
    })
  } catch (error) {
    console.error('Ошибка входа:', error)
    return NextResponse.json(
      { error: 'Ошибка при входе' },
      { status: 500 }
    )
  }
}

