import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { sanityConfigured } from '@/lib/sanity/env'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main style={{ maxWidth: 640, margin: '80px auto', padding: '0 24px', lineHeight: 1.5 }}>
        <h1 style={{ fontSize: 28, textTransform: 'none' }}>Sanity is not connected yet</h1>
        <p style={{ marginTop: 16 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> (and in Vercel), then restart the dev server. Until then the
          site shows the local seed content from <code>/content</code>.
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
