import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// STATIC_EXPORT=1 builds the plain-file preview for GitHub Pages (see .github/workflows/deploy.yml):
// no server, so no image optimisation, quote API or admin, and content comes from content/*.ts.
// The normal build (the real site on the server) is unaffected.
const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  // STANDALONE=1 builds the self-contained copy that GitHub Actions uploads to the server.
  ...(process.env.STANDALONE === '1' && { output: 'standalone' }),
  ...(staticExport && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: true,
  }),
  images: {
    unoptimized: staticExport,
    // Uploads served by Payload, plus the starter photos/icons in public/.
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/api/media/wm/**' }, { pathname: '/images/**' }, { pathname: '/brands/**' }, { pathname: '/icons/**' }],
    // "Open image in new tab" shows the photo instead of downloading it (Next.js defaults to download).
    // SVGs are never optimised here, and the security headers on images stay in place.
    contentDispositionType: 'inline',
    // 90 is the sharper copy used by the product photo zoom.
    qualities: [75, 90],
  },
  turbopack: { root: dirname },
}

// withPayload also applies to the static export: it keeps the database driver out of the bundle.
export default withPayload(nextConfig, { devBundleServerPackages: false })
