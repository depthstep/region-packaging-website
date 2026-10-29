import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Artwork, Categories, Media, Posts, Products, QuoteRequests, Reviews, Users } from './payload/collections'
import { AboutPage, HomePage, SiteSettings } from './payload/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const env = process.env

// Quote emails go out through any SMTP mailbox (e.g. Hostinger email). Without SMTP settings
// Payload logs emails to the terminal instead of sending them.
const smtpReady = !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.QUOTE_FROM_EMAIL)

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: ' | Region Packaging admin' },
  },
  collections: [Categories, Products, Reviews, Posts, QuoteRequests, Artwork, Media, Users],
  globals: [HomePage, AboutPage, SiteSettings],
  secret: env.PAYLOAD_SECRET || '',
  // One file on the server (e.g. file:./data/payload.db). Back it up with the uploads folder.
  // In development the tables follow the config automatically; on the server run `npm run migrate`
  // after deploying (see payload/migrations, created with `npx payload migrate:create`).
  db: sqliteAdapter({ client: { url: env.DATABASE_URI || 'file:./data/payload.db' }, migrationDir: path.resolve(dirname, 'payload', 'migrations') }),
  email: smtpReady
    ? nodemailerAdapter({
        defaultFromAddress: env.QUOTE_FROM_EMAIL!,
        defaultFromName: 'Region Packaging',
        transport: nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: Number(env.SMTP_PORT || 465),
          secure: Number(env.SMTP_PORT || 465) === 465,
          auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        }),
      })
    : undefined,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload', 'payload-types.ts') },
  graphQL: { disable: true },
})
