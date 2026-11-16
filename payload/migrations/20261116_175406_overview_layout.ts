import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`categories\` ADD \`overview_layout\` text;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_overview_layout\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`overview_layout\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` DROP COLUMN \`version_overview_layout\`;`)
}
