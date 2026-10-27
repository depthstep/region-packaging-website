export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2025-01-01'

/** False until a Sanity project ID is set; the site then serves the local seed in /content. */
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId)

/** Cache tag on every CMS fetch; the Sanity webhook revalidates it. */
export const CMS_TAG = 'sanity'
