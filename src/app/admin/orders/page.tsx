import { prisma } from '@/lib/prisma'
import AdminOrdersClient from './AdminOrdersClient'

export const revalidate = 0

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
  return <AdminOrdersClient initialOrders={orders} />
}
