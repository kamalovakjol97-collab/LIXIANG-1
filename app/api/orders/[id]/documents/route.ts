import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Получение документов по заказу
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documents = await prisma.document.findMany({
      where: { orderId: params.id },
      orderBy: {
        uploadedAt: 'desc',
      },
    })

    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Ошибка получения документов:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении документов' },
      { status: 500 }
    )
  }
}

// Загрузка документа
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не предоставлен' },
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

    // Создание директории для документов
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'documents', params.id)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Сохранение файла
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadDir, fileName)
    
    await writeFile(filePath, buffer)

    // Сохранение информации о документе в БД
    const relativePath = `/uploads/documents/${params.id}/${fileName}`
    const document = await prisma.document.create({
      data: {
        orderId: params.id,
        fileName: file.name,
        filePath: relativePath,
        fileSize: file.size,
      },
    })

    return NextResponse.json(
      {
        message: 'Документ загружен',
        document,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Ошибка загрузки документа:', error)
    return NextResponse.json(
      { error: 'Ошибка при загрузке документа' },
      { status: 500 }
    )
  }
}

