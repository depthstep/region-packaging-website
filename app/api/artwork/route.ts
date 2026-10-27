import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

// Issues short-lived tokens so the browser can upload artwork (up to 15MB) straight to
// Vercel Blob, bypassing the 4.5MB request limit on Vercel functions.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Blob storage not configured' }, { status: 501 })
  }
  const body = (await request.json()) as HandleUploadBody
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('artwork/')) throw new Error('Invalid path')
        return {
          allowedContentTypes: ['application/pdf', 'application/postscript', 'application/eps', 'image/eps', 'image/x-eps', 'image/png', 'image/jpeg'],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Upload failed' }, { status: 400 })
  }
}
