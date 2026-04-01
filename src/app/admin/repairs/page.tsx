import { prisma } from '@/lib/prisma'
import AdminRepairsClient from './AdminRepairsClient'

export const revalidate = 0

export default async function AdminRepairsPage() {
  const requests = await prisma.repairRequest.findMany({ orderBy: { createdAt: 'desc' } })
  return <AdminRepairsClient initialRequests={requests} />
}
