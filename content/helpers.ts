import type { Img } from '../lib/types.ts'

/** A real image shipped in /public. */
export const img = (src: string, alt: string): Img => ({ src, alt, label: alt })

/** A labelled placeholder for a photo or icon that has not been supplied yet. */
export const ph = (label: string): Img => ({ alt: '', label })
