import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter })

const standardPrices = [
  { category: 'iphone', model: 'iPhone 17 Pro Max', price: 1000 },
  { category: 'iphone', model: 'iPhone 17 Pro', price: 1000 },
  { category: 'iphone', model: 'iPhone 17 Air', price: 1000 },
  { category: 'iphone', model: 'iPhone 17', price: 1000 },
  { category: 'iphone', model: 'iPhone 16 Pro Max', price: 1000 },
  { category: 'iphone', model: 'iPhone 16 Pro', price: 1000 },
  { category: 'iphone', model: 'iPhone 16 Plus', price: 1000 },
  { category: 'iphone', model: 'iPhone 16', price: 1000 },
  { category: 'iphone', model: 'iPhone 15 Pro Max', price: 1000 },
  { category: 'iphone', model: 'iPhone 15 Pro', price: 1000 },
  { category: 'iphone', model: 'iPhone 15 Plus', price: 1000 },
  { category: 'iphone', model: 'iPhone 15', price: 1000 },
  { category: 'iphone', model: 'iPhone 14 Pro Max', price: 1000 },
  { category: 'iphone', model: 'iPhone 14 Pro', price: 1000 },
  { category: 'iphone', model: 'iPhone 14 Plus', price: 1000 },
  { category: 'iphone', model: 'iPhone 14', price: 1000 },
  { category: 'iphone', model: 'iPhone 13 Pro Max', price: 1000 },
  { category: 'iphone', model: 'iPhone 13 Pro', price: 1000 },
  { category: 'iphone', model: 'iPhone 13', price: 1000 },
  { category: 'iphone', model: 'iPhone 13 mini', price: 1000 },
  { category: 'iphone', model: 'iPhone 12 и старше', price: 1000 },
  { category: 'ipad', model: 'iPad Pro 13"', price: 1000 },
  { category: 'ipad', model: 'iPad Pro 11"', price: 1000 },
  { category: 'ipad', model: 'iPad Air', price: 1000 },
  { category: 'ipad', model: 'iPad mini', price: 1000 },
  { category: 'ipad', model: 'iPad (стандартный)', price: 1000 },
  { category: 'macbook', model: 'MacBook Pro 16"', price: 1000 },
  { category: 'macbook', model: 'MacBook Pro 14"', price: 1000 },
  { category: 'macbook', model: 'MacBook Pro 13"', price: 1000 },
  { category: 'macbook', model: 'MacBook Air 15"', price: 1000 },
  { category: 'macbook', model: 'MacBook Air 13"', price: 1000 },
  { category: 'android', model: 'Samsung Galaxy S серия', price: 1000 },
  { category: 'android', model: 'Samsung Galaxy A серия', price: 1000 },
  { category: 'android', model: 'Xiaomi / Redmi', price: 1000 },
  { category: 'android', model: 'Huawei / Honor', price: 1000 },
  { category: 'android', model: 'Google Pixel', price: 1000 },
  { category: 'android', model: 'OnePlus', price: 1000 },
  { category: 'android', model: 'Прочие модели', price: 1000 },
]

const services = [
  {
    title: 'Замена экрана / дисплея',
    icon: 'MonitorSmartphone',
    order: 0,
    free: false,
    prices: [
      { category: 'iphone', model: 'iPhone 17 Pro Max', price: 1000 },
      { category: 'iphone', model: 'iPhone 17 Pro', price: 1000 },
      { category: 'iphone', model: 'iPhone 17 Air', price: 1000 },
      { category: 'iphone', model: 'iPhone 17', price: 1000 },
      { category: 'iphone', model: 'iPhone 16 Pro Max', price: 1000 },
      { category: 'iphone', model: 'iPhone 16 Pro', price: 1000 },
      { category: 'iphone', model: 'iPhone 16 Plus', price: 1000 },
      { category: 'iphone', model: 'iPhone 16', price: 1000 },
      { category: 'iphone', model: 'iPhone 15 Pro Max', price: 1000 },
      { category: 'iphone', model: 'iPhone 15 Pro', price: 1000 },
      { category: 'iphone', model: 'iPhone 15 Plus', price: 1000 },
      { category: 'iphone', model: 'iPhone 15', price: 1000 },
      { category: 'iphone', model: 'iPhone 14 Pro Max', price: 1000 },
      { category: 'iphone', model: 'iPhone 14 Pro', price: 1000 },
      { category: 'iphone', model: 'iPhone 14 Plus', price: 1000 },
      { category: 'iphone', model: 'iPhone 14', price: 1000 },
      { category: 'iphone', model: 'iPhone 13 Pro Max', price: 1000 },
      { category: 'iphone', model: 'iPhone 13 Pro', price: 1000 },
      { category: 'iphone', model: 'iPhone 13', price: 1000 },
      { category: 'iphone', model: 'iPhone 13 mini', price: 1000 },
      { category: 'iphone', model: 'iPhone 12 и старше', price: 1000 },
      { category: 'ipad', model: 'iPad Pro 13"', price: 1000 },
      { category: 'ipad', model: 'iPad Pro 11"', price: 1000 },
      { category: 'ipad', model: 'iPad Air', price: 1000 },
      { category: 'ipad', model: 'iPad mini', price: 1000 },
      { category: 'ipad', model: 'iPad (стандартный)', price: 1000 },
      { category: 'macbook', model: 'MacBook Pro 16"', price: 1000 },
      { category: 'macbook', model: 'MacBook Pro 14"', price: 1000 },
      { category: 'macbook', model: 'MacBook Pro 13"', price: 1000 },
      { category: 'macbook', model: 'MacBook Air 15"', price: 1000 },
      { category: 'macbook', model: 'MacBook Air 13"', price: 1000 },
      { category: 'android', model: 'Samsung Galaxy S серия', price: 1000 },
      { category: 'android', model: 'Samsung Galaxy A серия', price: 1000 },
      { category: 'android', model: 'Xiaomi / Redmi', price: 1000 },
      { category: 'android', model: 'Huawei / Honor', price: 1000 },
      { category: 'android', model: 'Google Pixel', price: 1000 },
      { category: 'android', model: 'OnePlus', price: 1000 },
      { category: 'android', model: 'Прочие модели', price: 1000 },
    ],
  },
  { title: 'Замена батареи', icon: 'Battery', order: 1, free: false, prices: standardPrices },
  { title: 'Замена корпуса', icon: 'Smartphone', order: 2, free: false, prices: standardPrices },
  { title: 'Ремонт разъёма зарядки', icon: 'Zap', order: 3, free: false, prices: standardPrices },
  { title: 'Замена камеры', icon: 'Camera', order: 4, free: false, prices: standardPrices },
  { title: 'Восстановление после воды', icon: 'Droplets', order: 5, free: false, prices: standardPrices },
  { title: 'Ремонт материнской платы', icon: 'CircuitBoard', order: 6, free: false, prices: standardPrices },
  { title: 'Замена кнопок', icon: 'ToggleLeft', order: 7, free: false, prices: standardPrices },
  { title: 'Разблокировка устройств', icon: 'Unlock', order: 8, free: false, prices: standardPrices },
  { title: 'Диагностика', icon: 'ScanSearch', order: 9, free: true },
]

async function main() {
  // Очистить старые данные
  await prisma.repairPrice.deleteMany()
  await prisma.repairService.deleteMany()

  for (const s of services) {
    await prisma.repairService.create({
      data: {
        title: s.title,
        icon: s.icon,
        order: s.order,
        free: s.free,
        active: true,
        prices: s.prices
          ? { create: s.prices.map(p => ({ category: p.category, model: p.model, price: p.price, free: false })) }
          : undefined,
      },
    })
  }
  console.log('Виды ремонта заполнены!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
