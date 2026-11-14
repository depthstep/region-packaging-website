import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`paper_weight_page_hero_scale\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gsm\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_hero_scale_order_idx\` ON \`paper_weight_page_hero_scale\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_hero_scale_parent_id_idx\` ON \`paper_weight_page_hero_scale\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_measures_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_measures_cards_order_idx\` ON \`paper_weight_page_measures_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_measures_cards_parent_id_idx\` ON \`paper_weight_page_measures_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_chart_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`pt\` text,
  	\`text\` text,
  	\`uncoated\` text,
  	\`c1s\` text,
  	\`c2s\` text,
  	\`thickness\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_chart_rows_order_idx\` ON \`paper_weight_page_chart_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_chart_rows_parent_id_idx\` ON \`paper_weight_page_chart_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_chart_pounds_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`lb\` text,
  	\`text\` text,
  	\`cover\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_chart_pounds_rows_order_idx\` ON \`paper_weight_page_chart_pounds_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_chart_pounds_rows_parent_id_idx\` ON \`paper_weight_page_chart_pounds_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_glance_bars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gsm\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_glance_bars_order_idx\` ON \`paper_weight_page_glance_bars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_glance_bars_parent_id_idx\` ON \`paper_weight_page_glance_bars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_boxes_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`label\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_boxes_photos_order_idx\` ON \`paper_weight_page_boxes_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_boxes_photos_parent_id_idx\` ON \`paper_weight_page_boxes_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_boxes_photos_image_idx\` ON \`paper_weight_page_boxes_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_boxes_flutes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_boxes_flutes_order_idx\` ON \`paper_weight_page_boxes_flutes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_boxes_flutes_parent_id_idx\` ON \`paper_weight_page_boxes_flutes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`paper_weight_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_faq_items_order_idx\` ON \`paper_weight_page_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_faq_items_parent_id_idx\` ON \`paper_weight_page_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`paper_weight_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text,
  	\`hero_text\` text,
  	\`hero_converter_label\` text,
  	\`hero_chart_label\` text,
  	\`hero_image_id\` integer,
  	\`measures_eyebrow\` text,
  	\`measures_heading\` text,
  	\`measures_text\` text,
  	\`converter_eyebrow\` text,
  	\`converter_heading\` text,
  	\`converter_text\` text,
  	\`converter_image_id\` integer,
  	\`converter_note\` text,
  	\`chart_eyebrow\` text,
  	\`chart_heading\` text,
  	\`chart_text\` text,
  	\`chart_note\` text,
  	\`chart_pounds_heading\` text,
  	\`chart_pounds_text\` text,
  	\`glance_eyebrow\` text,
  	\`glance_heading\` text,
  	\`glance_text\` text,
  	\`glance_note\` text,
  	\`boxes_eyebrow\` text,
  	\`boxes_heading\` text,
  	\`boxes_text\` text,
  	\`boxes_flute_heading\` text,
  	\`faq_eyebrow\` text,
  	\`faq_heading\` text,
  	\`faq_text\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`converter_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`paper_weight_page_hero_hero_image_idx\` ON \`paper_weight_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page_converter_converter_image_idx\` ON \`paper_weight_page\` (\`converter_image_id\`);`)
  await db.run(sql`CREATE INDEX \`paper_weight_page__status_idx\` ON \`paper_weight_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_hero_scale\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`gsm\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_hero_scale_order_idx\` ON \`_paper_weight_page_v_version_hero_scale\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_hero_scale_parent_id_idx\` ON \`_paper_weight_page_v_version_hero_scale\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_measures_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_measures_cards_order_idx\` ON \`_paper_weight_page_v_version_measures_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_measures_cards_parent_id_idx\` ON \`_paper_weight_page_v_version_measures_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_chart_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`pt\` text,
  	\`text\` text,
  	\`uncoated\` text,
  	\`c1s\` text,
  	\`c2s\` text,
  	\`thickness\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_chart_rows_order_idx\` ON \`_paper_weight_page_v_version_chart_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_chart_rows_parent_id_idx\` ON \`_paper_weight_page_v_version_chart_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_chart_pounds_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lb\` text,
  	\`text\` text,
  	\`cover\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_chart_pounds_rows_order_idx\` ON \`_paper_weight_page_v_version_chart_pounds_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_chart_pounds_rows_parent_id_idx\` ON \`_paper_weight_page_v_version_chart_pounds_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_glance_bars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`gsm\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_glance_bars_order_idx\` ON \`_paper_weight_page_v_version_glance_bars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_glance_bars_parent_id_idx\` ON \`_paper_weight_page_v_version_glance_bars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_boxes_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_boxes_photos_order_idx\` ON \`_paper_weight_page_v_version_boxes_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_boxes_photos_parent_id_idx\` ON \`_paper_weight_page_v_version_boxes_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_boxes_photos_image_idx\` ON \`_paper_weight_page_v_version_boxes_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_boxes_flutes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_boxes_flutes_order_idx\` ON \`_paper_weight_page_v_version_boxes_flutes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_boxes_flutes_parent_id_idx\` ON \`_paper_weight_page_v_version_boxes_flutes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_paper_weight_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_faq_items_order_idx\` ON \`_paper_weight_page_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_faq_items_parent_id_idx\` ON \`_paper_weight_page_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_paper_weight_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_heading\` text,
  	\`version_hero_text\` text,
  	\`version_hero_converter_label\` text,
  	\`version_hero_chart_label\` text,
  	\`version_hero_image_id\` integer,
  	\`version_measures_eyebrow\` text,
  	\`version_measures_heading\` text,
  	\`version_measures_text\` text,
  	\`version_converter_eyebrow\` text,
  	\`version_converter_heading\` text,
  	\`version_converter_text\` text,
  	\`version_converter_image_id\` integer,
  	\`version_converter_note\` text,
  	\`version_chart_eyebrow\` text,
  	\`version_chart_heading\` text,
  	\`version_chart_text\` text,
  	\`version_chart_note\` text,
  	\`version_chart_pounds_heading\` text,
  	\`version_chart_pounds_text\` text,
  	\`version_glance_eyebrow\` text,
  	\`version_glance_heading\` text,
  	\`version_glance_text\` text,
  	\`version_glance_note\` text,
  	\`version_boxes_eyebrow\` text,
  	\`version_boxes_heading\` text,
  	\`version_boxes_text\` text,
  	\`version_boxes_flute_heading\` text,
  	\`version_faq_eyebrow\` text,
  	\`version_faq_heading\` text,
  	\`version_faq_text\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_converter_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_hero_version_hero_image_idx\` ON \`_paper_weight_page_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_converter_version_converter_idx\` ON \`_paper_weight_page_v\` (\`version_converter_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_version_version__status_idx\` ON \`_paper_weight_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_created_at_idx\` ON \`_paper_weight_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_updated_at_idx\` ON \`_paper_weight_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_latest_idx\` ON \`_paper_weight_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_paper_weight_page_v_autosave_idx\` ON \`_paper_weight_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_quote_page_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_quote_page_points_order_idx\` ON \`site_settings_quote_page_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_quote_page_points_parent_id_idx\` ON \`site_settings_quote_page_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_quote_page_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_quote_page_points_order_idx\` ON \`_site_settings_v_version_quote_page_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_quote_page_points_parent_id_idx\` ON \`_site_settings_v_version_quote_page_points\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`quote_page_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_quote_page_eyebrow\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`paper_weight_page_hero_scale\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_measures_cards\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_chart_rows\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_chart_pounds_rows\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_glance_bars\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_boxes_photos\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_boxes_flutes\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page_faq_items\`;`)
  await db.run(sql`DROP TABLE \`paper_weight_page\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_hero_scale\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_measures_cards\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_chart_rows\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_chart_pounds_rows\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_glance_bars\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_boxes_photos\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_boxes_flutes\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_paper_weight_page_v\`;`)
  await db.run(sql`DROP TABLE \`site_settings_quote_page_points\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_quote_page_points\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`quote_page_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_quote_page_eyebrow\`;`)
}
