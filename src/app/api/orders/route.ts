import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  }).catch(() => {})
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, method, address, comment, items, total } = body

    if (!name || !phone || !method || !items || total === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: { name, phone, email, method, address, comment, items, total },
    })

    // Telegram уведомление
    let parsedItems: { name: string; quantity: number; price: number }[] = []
    try { parsedItems = JSON.parse(items) } catch {}
    const itemsText = parsedItems.map(i => `  • ${i.name} x${i.quantity} — ${(i.price * i.quantity).toLocaleString('ru-RU')} ₽`).join('\n')

    await sendTelegram(
      `🛒 <b>Новый заказ #${order.id.slice(-6).toUpperCase()}</b>\n\n` +
      `👤 Имя: ${name}\n` +
      `📞 Телефон: ${phone}\n` +
      (email ? `📧 Email: ${email}\n` : '') +
      `📦 Получение: ${method === 'pickup' ? 'Самовывоз' : 'Доставка'}\n` +
      (address ? `📍 Адрес: ${address}\n` : '') +
      (comment ? `💬 Комментарий: ${comment}\n` : '') +
      `\n<b>Товары:</b>\n${itemsText}\n\n` +
      `💰 <b>Итого: ${Number(total).toLocaleString('ru-RU')} ₽</b>`
    )

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
