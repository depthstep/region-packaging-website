import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, sanityConfigured } from './env'

export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, token: process.env.SANITY_API_READ_TOKEN })
  : null

/** Server-only client with write access, for saving quote requests. */
export function writeClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!sanityConfigured || !token) return null
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token })
}
