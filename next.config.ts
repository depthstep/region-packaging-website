import type { NextConfig } from 'next'

// STATIC_EXPORT=1 builds the plain-file preview for GitHub Pages (see .github/workflows/deploy.yml):
// no server, so no image optimisation, quote API or Studio. The normal build is unaffected.
const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  ...(staticExport && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: true,
  }),
  images: {
    unoptimized: staticExport,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
