import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { publicPaths } from '@/lib/sitePaths'

// Called after each deploy. The build has no database, so without this the pages it generated
// would show the starter content until they next refreshed on their own. Replies with every public
// page, which the deploy then visits once so each is built before visitors arrive.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) return NextResponse.json({ ok: false }, { status: 401 })
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
  const paths = (await publicPaths()).map((p) => p.path)
  return NextResponse.json({ ok: true, paths })
}
