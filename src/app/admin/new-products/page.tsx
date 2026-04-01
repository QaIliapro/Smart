import { prisma } from '@/lib/prisma'
import AdminNewProductsClient from './AdminNewProductsClient'

export const revalidate = 0

export default async function AdminNewProductsPage() {
  const products = await prisma.newProduct.findMany({ orderBy: { createdAt: 'desc' } })
  return <AdminNewProductsClient initialProducts={products} />
}
