import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Artwork, BlogCategories, BlogTopics, Categories, Media, Pages, Posts, Products, QuoteRequests, Reviews, Users } from './payload/collections'
import { AboutPage, ArtworkPage, BlogPage, HomePage, SiteSettings } from './payload/globals'
import { migrations } from './payload/migrations'

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
  collections: [Categories, Products, Pages, Reviews, Posts, BlogCategories, BlogTopics, QuoteRequests, Artwork, Media, Users],
  globals: [HomePage, AboutPage, ArtworkPage, BlogPage, SiteSettings],
  // Rich text (blog articles): headings, lists, links, quotes and images from Media.
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET || '',
  // One file on the server (e.g. file:./data/payload.db). Back it up with the uploads folder.
  // The tables only change through migrations (payload/migrations, made with `npx payload migrate:create`),
  // locally and on the server: run `npm run migrate` after pulling. Payload's automatic dev sync is off
  // because it fails on columns that migrations added.
  db: sqliteAdapter({
    client: { url: env.DATABASE_URI || 'file:./data/payload.db' },
    migrationDir: path.resolve(dirname, 'payload', 'migrations'),
    push: false,
    // The server has no build tools, so pending migrations run when the app starts.
    prodMigrations: migrations,
  }),
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
