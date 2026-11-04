import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'admin' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_products_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_products_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_products_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_products_seo_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_faqs_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_faqs_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_faqs_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_faqs_seo_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_how_to_order_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_how_to_order_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_how_to_order_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_how_to_order_seo_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_quote_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_quote_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_quote_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_quote_seo_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_sample_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_sample_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_sample_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`page_intros_sample_seo_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`products_id\` integer,
  	\`reviews_id\` integer,
  	\`posts_id\` integer,
  	\`blog_categories_id\` integer,
  	\`blog_topics_id\` integer,
  	\`quote_requests_id\` integer,
  	\`artwork_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reviews_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_categories_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_topics_id\`) REFERENCES \`blog_topics\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quote_requests_id\`) REFERENCES \`quote_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`artwork_id\`) REFERENCES \`artwork\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "categories_id", "products_id", "reviews_id", "posts_id", "blog_categories_id", "blog_topics_id", "quote_requests_id", "artwork_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "categories_id", "products_id", "reviews_id", "posts_id", "blog_categories_id", "blog_topics_id", "quote_requests_id", "artwork_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_topics_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_topics_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quote_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`quote_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_artwork_id_idx\` ON \`payload_locked_documents_rels\` (\`artwork_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_products_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_products_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_products_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_products_seo_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_faqs_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_faqs_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_faqs_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_faqs_seo_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_how_to_order_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_how_to_order_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_how_to_order_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_how_to_order_seo_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_quote_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_quote_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_quote_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_quote_seo_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_sample_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_sample_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_sample_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`page_intros_sample_seo_description\`;`)
}
