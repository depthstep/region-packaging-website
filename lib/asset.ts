/**
 * Prefix a site-relative path with the base path (set when the static preview is served from
 * a sub-folder, e.g. GitHub Pages at /region-packaging-website). next/link adds it on its own;
 * plain <img>, next/image string sources and <form action> need this.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const withBase = (src: string) => (src.startsWith('/') && !src.startsWith('//') ? basePath + src : src)

/** True on the static GitHub Pages preview, where there is no server for the quote API. */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === '1'
