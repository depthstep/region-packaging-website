import { cookies, draftMode, headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { PREVIEW_COOKIE } from '@/lib/preview'

/** Opens the preview beside the editor. Only logged-in staff can see drafts. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') ?? ''
  const id = searchParams.get('id') ?? ''
  if (!/^[a-z-]+$/.test(type) || !/^\d*$/.test(id)) return NextResponse.json({ error: 'Bad preview link' }, { status: 400 })

  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return NextResponse.json({ error: 'Please log in to the admin first' }, { status: 401 })
  ;(await draftMode()).enable()
  ;(await cookies()).set(PREVIEW_COOKIE, `${type}:${id}`, { httpOnly: true, sameSite: 'lax', secure: req.url.startsWith('https:'), path: '/' })
  return new NextResponse(null, { status: 307, headers: { Location: `/preview?type=${type}&id=${id}` } })
}
