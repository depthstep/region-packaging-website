import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blog_topics_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_topics_id\`) REFERENCES \`blog_topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_blog_topics_id_idx\` ON \`posts_rels\` (\`blog_topics_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_categories_slug_idx\` ON \`blog_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_categories_updated_at_idx\` ON \`blog_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_categories_created_at_idx\` ON \`blog_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_topics\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_topics_slug_idx\` ON \`blog_topics\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_topics_updated_at_idx\` ON \`blog_topics\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_topics_created_at_idx\` ON \`blog_topics\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`artwork_page_formats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`artwork_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`artwork_page_formats_items_order_idx\` ON \`artwork_page_formats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`artwork_page_formats_items_parent_id_idx\` ON \`artwork_page_formats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`artwork_page_formats_items_icon_idx\` ON \`artwork_page_formats_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`artwork_page_essentials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`icon_text\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`artwork_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`artwork_page_essentials_items_order_idx\` ON \`artwork_page_essentials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`artwork_page_essentials_items_parent_id_idx\` ON \`artwork_page_essentials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`artwork_page_essentials_items_icon_idx\` ON \`artwork_page_essentials_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`artwork_page_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`artwork_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`artwork_page_steps_steps_order_idx\` ON \`artwork_page_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`artwork_page_steps_steps_parent_id_idx\` ON \`artwork_page_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`artwork_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text,
  	\`hero_text\` text,
  	\`hero_button_label\` text,
  	\`hero_guide_id\` integer,
  	\`hero_dieline_text\` text,
  	\`formats_eyebrow\` text,
  	\`formats_heading\` text,
  	\`formats_text\` text,
  	\`essentials_eyebrow\` text,
  	\`essentials_heading\` text,
  	\`essentials_text\` text,
  	\`steps_eyebrow\` text,
  	\`steps_heading\` text,
  	\`steps_text\` text,
  	\`steps_note\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_guide_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`artwork_page_hero_hero_guide_idx\` ON \`artwork_page\` (\`hero_guide_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text,
  	\`hero_text\` text,
  	\`featured_heading\` text,
  	\`search_placeholder\` text,
  	\`view_all_label\` text,
  	\`post_toc_heading\` text,
  	\`post_help_heading\` text,
  	\`post_help_text\` text,
  	\`post_help_phone_label\` text,
  	\`post_help_button_label\` text,
  	\`post_help_button_href\` text,
  	\`post_follow_label\` text,
  	\`post_related_eyebrow\` text,
  	\`post_related_heading\` text,
  	\`post_related_button_label\` text,
  	\`post_related_button_href\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_order_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_order_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_items_order_idx\` ON \`site_settings_sub_product_defaults_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_items_parent_id_idx\` ON \`site_settings_sub_product_defaults_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_items_icon_idx\` ON \`site_settings_sub_product_defaults_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_specs_rows_order_idx\` ON \`site_settings_sub_product_defaults_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_specs_rows_parent_id_idx\` ON \`site_settings_sub_product_defaults_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_specs_stock_sizes_order_idx\` ON \`site_settings_sub_product_defaults_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_specs_stock_sizes_parent_id_idx\` ON \`site_settings_sub_product_defaults_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_materials_items_order_idx\` ON \`site_settings_sub_product_defaults_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_materials_items_parent_id_idx\` ON \`site_settings_sub_product_defaults_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_materials_items_image_idx\` ON \`site_settings_sub_product_defaults_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_order_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_methods_order_idx\` ON \`site_settings_sub_product_defaults_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_methods_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_finishes_order_idx\` ON \`site_settings_sub_product_defaults_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_finishes_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_why_us_cards_order_idx\` ON \`site_settings_sub_product_defaults_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_why_us_cards_parent_id_idx\` ON \`site_settings_sub_product_defaults_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_media_id_idx\` ON \`site_settings_rels\` (\`media_id\`);`)
  await db.run(sql`DROP TABLE \`posts_body\`;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`category_id\` integer REFERENCES blog_categories(id);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`body\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author\` text DEFAULT 'Region Packaging';`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`read_minutes\` numeric;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`featured\` integer;`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`kicker\`;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`style\` text;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`finish\` text;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`blog_categories_id\` integer REFERENCES blog_categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`blog_topics_id\` integer REFERENCES blog_topics(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_topics_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_topics_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_overview\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_specs\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_materials\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_why\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_faq\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_short_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_overview_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_overview_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_overview_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_benefits_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_benefits_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_benefits_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_specs_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_specs_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_specs_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_specs_stock_sizes_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_specs_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_materials_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_materials_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_materials_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_materials_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_methods_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_finishes_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_use_cases_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_use_cases_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_use_cases_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_use_cases_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_why_us_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_why_us_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_why_us_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_why_us_note\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_sub_product__idx\` ON \`site_settings\` (\`sub_product_defaults_printing_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_body_order_idx\` ON \`posts_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_body_parent_id_idx\` ON \`posts_body\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`blog_categories\`;`)
  await db.run(sql`DROP TABLE \`blog_topics\`;`)
  await db.run(sql`DROP TABLE \`artwork_page_formats_items\`;`)
  await db.run(sql`DROP TABLE \`artwork_page_essentials_items\`;`)
  await db.run(sql`DROP TABLE \`artwork_page_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`artwork_page\`;`)
  await db.run(sql`DROP TABLE \`blog_page\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_materials_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`kicker\` text,
  	\`published_at\` text,
  	\`excerpt\` text,
  	\`image_id\` integer,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "kicker", "published_at", "excerpt", "image_id", "slug", "updated_at", "created_at") SELECT "id", "title", "kicker", "published_at", "excerpt", "image_id", "slug", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`products_id\` integer,
  	\`reviews_id\` integer,
  	\`posts_id\` integer,
  	\`quote_requests_id\` integer,
  	\`artwork_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reviews_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quote_requests_id\`) REFERENCES \`quote_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`artwork_id\`) REFERENCES \`artwork\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "categories_id", "products_id", "reviews_id", "posts_id", "quote_requests_id", "artwork_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "categories_id", "products_id", "reviews_id", "posts_id", "quote_requests_id", "artwork_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quote_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`quote_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_artwork_id_idx\` ON \`payload_locked_documents_rels\` (\`artwork_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`announcement\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`menu_promo_title\` text,
  	\`menu_promo_text\` text,
  	\`menu_promo_button_label\` text,
  	\`menu_promo_href\` text,
  	\`trusted_heading\` text,
  	\`google_score\` text,
  	\`google_label\` text,
  	\`google_count_text\` text,
  	\`google_review_url\` text,
  	\`reviews_section_eyebrow\` text,
  	\`reviews_section_heading\` text,
  	\`reviews_section_text\` text,
  	\`reviews_section_button_label\` text,
  	\`product_defaults_explore_eyebrow\` text,
  	\`product_defaults_how_to_order_eyebrow\` text,
  	\`product_defaults_how_to_order_heading\` text,
  	\`product_defaults_how_to_order_text\` text,
  	\`product_defaults_pricing_eyebrow\` text,
  	\`product_defaults_pricing_heading\` text,
  	\`product_defaults_pricing_text\` text,
  	\`product_defaults_why_us_eyebrow\` text,
  	\`product_defaults_why_us_heading\` text,
  	\`product_defaults_why_us_text\` text,
  	\`product_defaults_faqs_eyebrow\` text,
  	\`product_defaults_faqs_heading\` text,
  	\`product_defaults_faqs_text\` text,
  	\`product_defaults_related_heading_eyebrow\` text,
  	\`product_defaults_related_heading_heading\` text,
  	\`product_defaults_related_heading_text\` text,
  	\`product_defaults_sample_link_label\` text,
  	\`product_defaults_form_note\` text,
  	\`contact_heading\` text,
  	\`contact_text\` text,
  	\`contact_image_id\` integer,
  	\`contact_call_label\` text,
  	\`contact_email_label\` text,
  	\`contact_card_heading\` text,
  	\`contact_card_text\` text,
  	\`contact_card_button_label\` text,
  	\`contact_card_button_href\` text,
  	\`contact_form_heading\` text,
  	\`contact_form_text\` text,
  	\`contact_button_label\` text,
  	\`cta_heading\` text,
  	\`cta_text\` text,
  	\`cta_primary_label\` text,
  	\`cta_primary_href\` text,
  	\`cta_secondary_label\` text,
  	\`cta_secondary_href\` text,
  	\`cta_coupon_amount\` text,
  	\`cta_coupon_label\` text,
  	\`cta_coupon_code\` text,
  	\`cta_coupon_button_label\` text,
  	\`cta_coupon_note\` text,
  	\`footer_blurb\` text,
  	\`footer_newsletter_title\` text,
  	\`footer_newsletter_text\` text,
  	\`footer_newsletter_placeholder\` text,
  	\`footer_newsletter_button\` text,
  	\`footer_follow_label\` text,
  	\`footer_payments_label\` text,
  	\`footer_payment_logos_id\` integer,
  	\`footer_copyright\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`contact_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`footer_payment_logos_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "contact_heading", "contact_text", "contact_image_id", "contact_call_label", "contact_email_label", "contact_card_heading", "contact_card_text", "contact_card_button_label", "contact_card_button_href", "contact_form_heading", "contact_form_text", "contact_button_label", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "updated_at", "created_at") SELECT "id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "contact_heading", "contact_text", "contact_image_id", "contact_call_label", "contact_email_label", "contact_card_heading", "contact_card_text", "contact_card_button_label", "contact_card_button_href", "contact_form_heading", "contact_form_text", "contact_button_label", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_contact_image_idx\` ON \`site_settings\` (\`contact_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_footer_payment_logos_idx\` ON \`site_settings\` (\`footer_payment_logos_id\`);`)
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`style\`;`)
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`finish\`;`)
}
