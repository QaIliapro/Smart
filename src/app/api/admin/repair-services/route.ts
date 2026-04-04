import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@libsql/client/web'

function getClient() {
  return createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

export async function GET() {
  try {
    const client = getClient()
    const servicesRes = await client.execute('SELECT * FROM "RepairService" ORDER BY "order" ASC')
    const pricesRes = await client.execute('SELECT * FROM "RepairPrice"')

    const services = servicesRes.rows.map(s => ({
      id: s.id,
      title: s.title,
      icon: s.icon,
      order: s.order,
      free: s.free === 1 || s.free === '1',
      active: s.active === 1 || s.active === '1',
      prices: pricesRes.rows
        .filter(p => p.serviceId === s.id)
        .map(p => ({
          id: p.id,
          serviceId: p.serviceId,
          category: p.category,
          model: p.model,
          price: p.price,
          free: p.free === 1 || p.free === '1',
        })),
    }))

    return NextResponse.json(services)
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const client = getClient()
    const body = await req.json()
    const id = crypto.randomUUID()
    await client.execute({
      sql: 'INSERT INTO "RepairService" (id, title, icon, "order", free, active) VALUES (?, ?, ?, ?, ?, ?)',
      args: [id, body.title, body.icon, body.order ?? 0, body.free ? 1 : 0, body.active !== false ? 1 : 0],
    })
    const res = await client.execute({ sql: 'SELECT * FROM "RepairService" WHERE id = ?', args: [id] })
    return NextResponse.json(res.rows[0])
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
