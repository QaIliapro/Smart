export interface NewProduct {
  id: string
  slug: string
  name: string
  price: number
  category: 'iPhone' | 'Mac'
  tag: string
  specs: string[]
  description: string
  colors: { name: string; hex: string }[]
  gradient: string
}

export const newProducts: NewProduct[] = [
  {
    id: '1',
    slug: 'iphone-17',
    name: 'iPhone 17',
    price: 799,
    category: 'iPhone',
    tag: 'Новинка',
    specs: ['A19 chip', '48MP camera', '6.1" OLED', 'USB-C', '4K video'],
    description: 'iPhone 17 — это следующий уровень. Чип A19 обеспечивает невероятную производительность, а камера 48 МП делает профессиональные снимки.',
    colors: [
      { name: 'Черный', hex: '#1d1d1f' },
      { name: 'Белый', hex: '#f5f5f7' },
      { name: 'Синий', hex: '#3d6b8e' },
    ],
    gradient: 'from-blue-400 to-purple-600',
  },
  {
    id: '2',
    slug: 'iphone-17-air',
    name: 'iPhone 17 Air',
    price: 899,
    category: 'iPhone',
    tag: 'Тонкий',
    specs: ['A19 chip', '5.5mm thin', '6.6" OLED', 'Titanium', '48MP camera'],
    description: 'iPhone 17 Air — самый тонкий iPhone в истории. Всего 5.5 мм толщины и эксклюзивный титановый корпус.',
    colors: [
      { name: 'Титан', hex: '#8e8e93' },
      { name: 'Золото', hex: '#c8a97e' },
      { name: 'Черный', hex: '#1d1d1f' },
    ],
    gradient: 'from-gray-400 to-slate-600',
  },
  {
    id: '3',
    slug: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    price: 1099,
    category: 'iPhone',
    tag: 'Pro',
    specs: ['A19 Pro chip', '48MP triple cam', '6.3" ProMotion', 'ProRes video', 'Titanium'],
    description: 'iPhone 17 Pro с чипом A19 Pro и тройной камерой 48 МП для профессиональной съемки.',
    colors: [
      { name: 'Черный Титан', hex: '#2d2c2e' },
      { name: 'Натуральный Титан', hex: '#c8b8a2' },
      { name: 'Белый Титан', hex: '#e8e3dc' },
    ],
    gradient: 'from-slate-600 to-gray-900',
  },
  {
    id: '4',
    slug: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    price: 1199,
    category: 'iPhone',
    tag: 'Pro Max',
    specs: ['A19 Pro chip', '48MP triple cam', '6.9" ProMotion', 'ProRes video', '5x zoom'],
    description: 'iPhone 17 Pro Max — максимум возможностей. Самый большой экран ProMotion и профессиональная система камер.',
    colors: [
      { name: 'Черный Титан', hex: '#2d2c2e' },
      { name: 'Натуральный Титан', hex: '#c8b8a2' },
      { name: 'Пустынный Титан', hex: '#b8a898' },
    ],
    gradient: 'from-purple-600 to-indigo-900',
  },
  {
    id: '5',
    slug: 'macbook-air-m4',
    name: 'MacBook Air M4',
    price: 1299,
    category: 'Mac',
    tag: 'Новинка',
    specs: ['M4 chip', '18h battery', '13.6" Liquid Retina', '16GB RAM', '256GB SSD'],
    description: 'MacBook Air с чипом M4 — невероятная производительность в ультратонком корпусе. До 18 часов работы без подзарядки.',
    colors: [
      { name: 'Полночь', hex: '#2c3242' },
      { name: 'Звездный свет', hex: '#e3ddd4' },
      { name: 'Серебро', hex: '#dfe0e2' },
    ],
    gradient: 'from-sky-400 to-cyan-600',
  },
]
