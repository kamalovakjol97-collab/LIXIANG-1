import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  phone?: string,
  role: 'client' | 'manager' = 'client'
) {
  const passwordHash = await hashPassword(password)
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      phone,
      role,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

