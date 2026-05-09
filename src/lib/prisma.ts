let PrismaClientModule: any
try {
  PrismaClientModule = require('@prisma/client')
} catch {
  PrismaClientModule = { PrismaClient: class {} }
}

const globalForPrisma = global as unknown as { prisma: any }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClientModule.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
