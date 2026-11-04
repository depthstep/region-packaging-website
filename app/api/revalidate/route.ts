import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Called once after each deploy. The build has no database, so without this the pages it
// generated would show the starter content until they next refreshed on their own.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) return NextResponse.json({ ok: false }, { status: 401 })
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
  return NextResponse.json({ ok: true })
}
