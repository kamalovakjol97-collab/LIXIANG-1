import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password и name обязательны' },
        { status: 400 }
      )
    }

    // Проверка существующего пользователя
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    // Создание пользователя
    const user = await createUser(email, password, name, phone, role || 'client')

    return NextResponse.json(
      {
        message: 'Пользователь создан',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании пользователя' },
      { status: 500 }
    )
  }
}

