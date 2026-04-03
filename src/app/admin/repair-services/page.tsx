import { prisma } from '@/lib/prisma'
import AdminRepairServicesClient from './AdminRepairServicesClient'

export const revalidate = 0

export default async function AdminRepairServicesPage() {
  const services = await prisma.repairService.findMany({
    orderBy: { order: 'asc' },
    include: { prices: true },
  })
  return <AdminRepairServicesClient initialServices={services} />
}
