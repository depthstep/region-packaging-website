import { cookies, draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { PREVIEW_COOKIE } from '@/lib/preview'

/** Ends a preview, so the normal site shows published content again in this browser. */
export async function POST() {
  ;(await draftMode()).disable()
  ;(await cookies()).delete(PREVIEW_COOKIE)
  return NextResponse.json({ ok: true })
}
