import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-sqlite'

/**
 * Drafts arrived with the side-by-side preview. Everything already on the website is published
 * content, so it's marked that way, along with the version history saved before drafts existed.
 */
const tables = ['categories', 'products', 'pages', 'posts', 'home_page', 'about_page', 'artwork_page', 'blog_page', 'site_settings']

const globals = ['home_page', 'about_page', 'artwork_page', 'blog_page', 'site_settings']

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of tables) {
    await db.run(sql.raw(`UPDATE \`${table}\` SET \`_status\` = 'published';`))
    await db.run(sql.raw(`UPDATE \`_${table}_v\` SET \`version__status\` = 'published';`))
    // Drafts read the newest version, which is flagged as the latest.
    const group = globals.includes(table) ? '' : 'GROUP BY `parent_id`'
    await db.run(sql.raw(`UPDATE \`_${table}_v\` SET \`latest\` = 1 WHERE \`id\` IN (SELECT MAX(\`id\`) FROM \`_${table}_v\` ${group});`))
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // The status columns are removed by the migration before this one.
}
