import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL!
  if (url.startsWith('postgresql') || url.startsWith('postgres')) {
    return new PrismaClient()
  }
  const authToken = process.env.TURSO_AUTH_TOKEN
  const libsql = createClient({ url, authToken })
  const adapter = new PrismaLibSql(libsql)
  return new PrismaClient({ adapter })
}

export const prisma = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
