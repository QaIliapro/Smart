import { prisma } from '@/lib/prisma'
import AdminProductsClient from './AdminProductsClient'

export const revalidate = 0

export default async function AdminProductsPage() {
  const products = await prisma.usedProduct.findMany({ orderBy: { createdAt: 'desc' } })
  return <AdminProductsClient initialProducts={products} />
}
