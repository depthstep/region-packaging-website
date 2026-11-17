import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`length\` text;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`width\` text;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`depth\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`length\`;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`width\`;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`depth\`;`)
}
