import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.usedProduct.createMany({
    data: [
      {
        name: 'iPhone 15 Pro',
        price: 650,
        condition: 'Отличное',
        description: 'Полный комплект, гарантия 3 мес. Батарея 94%. Корпус без царапин, экран без дефектов.',
        specs: JSON.stringify(['A17 Pro chip', '48MP triple camera', '6.1" Super Retina XDR', 'Titanium frame', 'Battery 94%']),
        active: true,
      },
      {
        name: 'MacBook Pro 14" M3',
        price: 1450,
        condition: 'Хорошее',
        description: 'Минимальные следы использования. Полный комплект с зарядным устройством.',
        specs: JSON.stringify(['Apple M3 chip', '16GB RAM', '512GB SSD', '14.2" Liquid Retina XDR', 'Battery 87%']),
        active: true,
      },
      {
        name: 'iPhone 14',
        price: 420,
        condition: 'Хорошее',
        description: 'Рабочий, без трещин. Батарея 88%. Небольшие потертости на корпусе.',
        specs: JSON.stringify(['A15 Bionic chip', '12MP dual camera', '6.1" Super Retina XDR', 'Battery 88%']),
        active: true,
      },
    ],
  })

  const newProductsData = [
    {
      slug: 'iphone-17',
      name: 'iPhone 17',
      price: 79900,
      category: 'iPhone',
      tag: 'Новинка',
      specs: JSON.stringify(['A19 chip', '48MP camera', '6.1" OLED', 'USB-C', '4K video']),
      description: 'iPhone 17 — это следующий уровень. Чип A19 обеспечивает невероятную производительность, а камера 48 МП делает профессиональные снимки.',
      colors: JSON.stringify([
        { name: 'Черный', hex: '#1d1d1f' },
        { name: 'Белый', hex: '#f5f5f7' },
        { name: 'Синий', hex: '#3d6b8e' },
      ]),
      gradient: 'from-blue-400 to-purple-600',
      stock: 8,
      active: true,
    },
    {
      slug: 'iphone-17-air',
      name: 'iPhone 17 Air',
      price: 89900,
      category: 'iPhone',
      tag: 'Тонкий',
      specs: JSON.stringify(['A19 chip', '5.5mm thin', '6.6" OLED', 'Titanium', '48MP camera']),
      description: 'iPhone 17 Air — самый тонкий iPhone в истории. Всего 5.5 мм толщины и эксклюзивный титановый корпус.',
      colors: JSON.stringify([
        { name: 'Титан', hex: '#8e8e93' },
        { name: 'Золото', hex: '#c8a97e' },
        { name: 'Черный', hex: '#1d1d1f' },
      ]),
      gradient: 'from-gray-400 to-slate-600',
      stock: 5,
      active: true,
    },
    {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      price: 109900,
      category: 'iPhone',
      tag: 'Pro',
      specs: JSON.stringify(['A19 Pro chip', '48MP triple cam', '6.3" ProMotion', 'ProRes video', 'Titanium']),
      description: 'iPhone 17 Pro с чипом A19 Pro и тройной камерой 48 МП для профессиональной съемки.',
      colors: JSON.stringify([
        { name: 'Черный Титан', hex: '#2d2c2e' },
        { name: 'Натуральный Титан', hex: '#c8b8a2' },
        { name: 'Белый Титан', hex: '#e8e3dc' },
      ]),
      gradient: 'from-slate-600 to-gray-900',
      stock: 3,
      active: true,
    },
    {
      slug: 'iphone-17-pro-max',
      name: 'iPhone 17 Pro Max',
      price: 119900,
      category: 'iPhone',
      tag: 'Pro Max',
      specs: JSON.stringify(['A19 Pro chip', '48MP triple cam', '6.9" ProMotion', 'ProRes video', '5x zoom']),
      description: 'iPhone 17 Pro Max — максимум возможностей. Самый большой экран ProMotion и профессиональная система камер.',
      colors: JSON.stringify([
        { name: 'Черный Титан', hex: '#2d2c2e' },
        { name: 'Натуральный Титан', hex: '#c8b8a2' },
        { name: 'Пустынный Титан', hex: '#b8a898' },
      ]),
      gradient: 'from-purple-600 to-indigo-900',
      stock: 2,
      active: true,
    },
    {
      slug: 'macbook-air-m4',
      name: 'MacBook Air M4',
      price: 129900,
      category: 'Mac',
      tag: 'Новинка',
      specs: JSON.stringify(['M4 chip', '18h battery', '13.6" Liquid Retina', '16GB RAM', '256GB SSD']),
      description: 'MacBook Air с чипом M4 — невероятная производительность в ультратонком корпусе. До 18 часов работы без подзарядки.',
      colors: JSON.stringify([
        { name: 'Полночь', hex: '#2c3242' },
        { name: 'Звездный свет', hex: '#e3ddd4' },
        { name: 'Серебро', hex: '#dfe0e2' },
      ]),
      gradient: 'from-sky-400 to-cyan-600',
      stock: 4,
      active: true,
    },
  ]

  for (const product of newProductsData) {
    await prisma.newProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log('Seed completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
