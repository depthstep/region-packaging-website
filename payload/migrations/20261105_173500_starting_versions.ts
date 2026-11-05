import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-sqlite'

const collections = ['categories', 'products', 'pages', 'reviews', 'posts', 'blog-categories', 'blog-topics'] as const
const globals = ['home-page', 'about-page', 'artwork-page', 'blog-page', 'site-settings'] as const

/** A version is normally made on save, so this keeps the content as it stood when history was switched on. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const collectionSlug of collections) {
    const { docs } = await payload.find({ collection: collectionSlug, depth: 0, pagination: false, overrideAccess: true, req })
    for (const doc of docs) {
      const { id, ...versionData } = doc
      await payload.db.createVersion({ collectionSlug, parent: id, versionData: versionData as never, autosave: false, createdAt: doc.createdAt, updatedAt: doc.updatedAt, req })
    }
  }
  for (const globalSlug of globals) {
    const doc = await payload.findGlobal({ slug: globalSlug, depth: 0, overrideAccess: true, req })
    if (!doc.updatedAt) continue // Never saved: the site is still using its starter content.
    const { id: _, ...versionData } = doc as typeof doc & { createdAt: string; updatedAt: string }
    await payload.db.createGlobalVersion({ globalSlug, versionData: versionData as never, autosave: false, createdAt: versionData.createdAt, updatedAt: versionData.updatedAt, req })
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // The version tables are removed by the migration before this one.
}
