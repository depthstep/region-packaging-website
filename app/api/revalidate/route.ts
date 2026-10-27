import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { CMS_TAG } from '@/lib/sanity/env'

// Sanity webhook target: Sanity > API > Webhooks > URL https://<site>/api/revalidate,
// trigger on create/update/delete, secret = SANITY_REVALIDATE_SECRET.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ error: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret)
    if (!isValidSignature) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // The whole site reads one cached query, so any content change refreshes everything.
    revalidateTag(CMS_TAG, 'max')
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Bad request' }, { status: 400 })
  }
}
