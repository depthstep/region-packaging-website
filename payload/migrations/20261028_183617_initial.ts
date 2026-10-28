import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`categories_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_overview_body_order_idx\` ON \`categories_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_overview_body_parent_id_idx\` ON \`categories_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_order_idx\` ON \`categories_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_parent_id_idx\` ON \`categories_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_benefits_items_order_idx\` ON \`categories_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_benefits_items_parent_id_idx\` ON \`categories_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_benefits_items_icon_idx\` ON \`categories_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_specs_rows_order_idx\` ON \`categories_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_specs_rows_parent_id_idx\` ON \`categories_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_specs_stock_sizes_order_idx\` ON \`categories_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_specs_stock_sizes_parent_id_idx\` ON \`categories_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_materials_items_order_idx\` ON \`categories_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_materials_items_parent_id_idx\` ON \`categories_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_materials_items_image_idx\` ON \`categories_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_printing_body_order_idx\` ON \`categories_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_body_parent_id_idx\` ON \`categories_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_printing_methods_order_idx\` ON \`categories_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_methods_parent_id_idx\` ON \`categories_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_printing_finishes_order_idx\` ON \`categories_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_finishes_parent_id_idx\` ON \`categories_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_how_to_order_steps_order_idx\` ON \`categories_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_how_to_order_steps_parent_id_idx\` ON \`categories_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_order_idx\` ON \`categories_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_parent_id_idx\` ON \`categories_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_pricing_cards_order_idx\` ON \`categories_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_cards_parent_id_idx\` ON \`categories_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_why_us_cards_order_idx\` ON \`categories_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_why_us_cards_parent_id_idx\` ON \`categories_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_faqs_items_order_idx\` ON \`categories_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_faqs_items_parent_id_idx\` ON \`categories_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`kind\` text DEFAULT 'product-type' NOT NULL,
  	\`menu_label\` text,
  	\`card_text\` text,
  	\`card_image_id\` integer,
  	\`menu_icon_id\` integer,
  	\`rating_text\` text,
  	\`short_description\` text,
  	\`explore_eyebrow\` text,
  	\`explore_heading\` text,
  	\`explore_text\` text,
  	\`overview_eyebrow\` text,
  	\`overview_heading\` text,
  	\`overview_text\` text,
  	\`benefits_eyebrow\` text,
  	\`benefits_heading\` text,
  	\`benefits_text\` text,
  	\`specs_eyebrow\` text,
  	\`specs_heading\` text,
  	\`specs_text\` text,
  	\`specs_stock_sizes_heading\` text,
  	\`specs_note\` text,
  	\`materials_eyebrow\` text,
  	\`materials_heading\` text,
  	\`materials_text\` text,
  	\`materials_note\` text,
  	\`printing_eyebrow\` text,
  	\`printing_heading\` text,
  	\`printing_text\` text,
  	\`printing_image_id\` integer,
  	\`printing_methods_heading\` text,
  	\`printing_finishes_heading\` text,
  	\`use_cases_eyebrow\` text,
  	\`use_cases_heading\` text,
  	\`use_cases_text\` text,
  	\`use_cases_note\` text,
  	\`how_to_order_eyebrow\` text,
  	\`how_to_order_heading\` text,
  	\`how_to_order_text\` text,
  	\`how_to_order_note\` text,
  	\`pricing_eyebrow\` text,
  	\`pricing_heading\` text,
  	\`pricing_text\` text,
  	\`pricing_image_id\` integer,
  	\`why_us_eyebrow\` text,
  	\`why_us_heading\` text,
  	\`why_us_text\` text,
  	\`why_us_note\` text,
  	\`faqs_eyebrow\` text,
  	\`faqs_heading\` text,
  	\`faqs_text\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`visible\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_card_image_idx\` ON \`categories\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_menu_icon_idx\` ON \`categories\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_printing_image_idx\` ON \`categories\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_pricing_image_idx\` ON \`categories\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`categories_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_texts_order_parent\` ON \`categories_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_rels_order_idx\` ON \`categories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_parent_idx\` ON \`categories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_path_idx\` ON \`categories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_media_id_idx\` ON \`categories_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_products_id_idx\` ON \`categories_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_categories_id_idx\` ON \`categories_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`products_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_overview_body_order_idx\` ON \`products_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_overview_body_parent_id_idx\` ON \`products_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_benefits_body_order_idx\` ON \`products_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_benefits_body_parent_id_idx\` ON \`products_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_benefits_items_order_idx\` ON \`products_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_benefits_items_parent_id_idx\` ON \`products_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_benefits_items_icon_idx\` ON \`products_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`products_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_specs_rows_order_idx\` ON \`products_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_specs_rows_parent_id_idx\` ON \`products_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_specs_stock_sizes_order_idx\` ON \`products_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_specs_stock_sizes_parent_id_idx\` ON \`products_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_materials_items_order_idx\` ON \`products_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_materials_items_parent_id_idx\` ON \`products_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_materials_items_image_idx\` ON \`products_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_printing_body_order_idx\` ON \`products_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_body_parent_id_idx\` ON \`products_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_printing_methods_order_idx\` ON \`products_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_methods_parent_id_idx\` ON \`products_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_printing_finishes_order_idx\` ON \`products_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_finishes_parent_id_idx\` ON \`products_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_how_to_order_steps_order_idx\` ON \`products_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_how_to_order_steps_parent_id_idx\` ON \`products_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_pricing_body_order_idx\` ON \`products_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_body_parent_id_idx\` ON \`products_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_pricing_cards_order_idx\` ON \`products_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_cards_parent_id_idx\` ON \`products_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_why_us_cards_order_idx\` ON \`products_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_why_us_cards_parent_id_idx\` ON \`products_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_faqs_items_order_idx\` ON \`products_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_faqs_items_parent_id_idx\` ON \`products_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`card_text\` text,
  	\`card_image_id\` integer,
  	\`menu_icon_id\` integer,
  	\`rating_text\` text,
  	\`short_description\` text,
  	\`explore_eyebrow\` text,
  	\`explore_heading\` text,
  	\`explore_text\` text,
  	\`overview_eyebrow\` text,
  	\`overview_heading\` text,
  	\`overview_text\` text,
  	\`benefits_eyebrow\` text,
  	\`benefits_heading\` text,
  	\`benefits_text\` text,
  	\`specs_eyebrow\` text,
  	\`specs_heading\` text,
  	\`specs_text\` text,
  	\`specs_stock_sizes_heading\` text,
  	\`specs_note\` text,
  	\`materials_eyebrow\` text,
  	\`materials_heading\` text,
  	\`materials_text\` text,
  	\`materials_note\` text,
  	\`printing_eyebrow\` text,
  	\`printing_heading\` text,
  	\`printing_text\` text,
  	\`printing_image_id\` integer,
  	\`printing_methods_heading\` text,
  	\`printing_finishes_heading\` text,
  	\`use_cases_eyebrow\` text,
  	\`use_cases_heading\` text,
  	\`use_cases_text\` text,
  	\`use_cases_note\` text,
  	\`how_to_order_eyebrow\` text,
  	\`how_to_order_heading\` text,
  	\`how_to_order_text\` text,
  	\`how_to_order_note\` text,
  	\`pricing_eyebrow\` text,
  	\`pricing_heading\` text,
  	\`pricing_text\` text,
  	\`pricing_image_id\` integer,
  	\`why_us_eyebrow\` text,
  	\`why_us_heading\` text,
  	\`why_us_text\` text,
  	\`why_us_note\` text,
  	\`faqs_eyebrow\` text,
  	\`faqs_heading\` text,
  	\`faqs_text\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'live',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`products_card_image_idx\` ON \`products\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_menu_icon_idx\` ON \`products\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_printing_image_idx\` ON \`products\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_pricing_image_idx\` ON \`products\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_texts_order_parent\` ON \`products_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`media_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_categories_id_idx\` ON \`products_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_media_id_idx\` ON \`products_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_products_id_idx\` ON \`products_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`date_text\` text,
  	\`quote\` text NOT NULL,
  	\`avatar_id\` integer,
  	\`source\` text DEFAULT 'Posted on Google',
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`reviews_avatar_idx\` ON \`reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`reviews_updated_at_idx\` ON \`reviews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reviews_created_at_idx\` ON \`reviews\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`posts\` (
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
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`quote_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`handled\` integer DEFAULT false,
  	\`name\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`company\` text,
  	\`product\` text,
  	\`material\` text,
  	\`size\` text,
  	\`printing\` text,
  	\`production_speed\` text,
  	\`quantity\` text,
  	\`design\` text,
  	\`message\` text,
  	\`page_url\` text,
  	\`artwork_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`artwork_id\`) REFERENCES \`artwork\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`quote_requests_artwork_idx\` ON \`quote_requests\` (\`artwork_id\`);`)
  await db.run(sql`CREATE INDEX \`quote_requests_updated_at_idx\` ON \`quote_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quote_requests_created_at_idx\` ON \`quote_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`artwork\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`artwork_updated_at_idx\` ON \`artwork\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`artwork_created_at_idx\` ON \`artwork\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`artwork_filename_idx\` ON \`artwork\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_choose_box_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_choose_box_cards_order_idx\` ON \`home_page_choose_box_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_choose_box_cards_parent_id_idx\` ON \`home_page_choose_box_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_choose_box_cards_image_idx\` ON \`home_page_choose_box_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_steps_steps_order_idx\` ON \`home_page_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_steps_steps_parent_id_idx\` ON \`home_page_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_steps_steps_icon_idx\` ON \`home_page_steps_steps\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_industries_tabs_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_industries_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_cards_order_idx\` ON \`home_page_industries_tabs_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_cards_parent_id_idx\` ON \`home_page_industries_tabs_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_cards_image_idx\` ON \`home_page_industries_tabs_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_industries_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`category_id\` integer,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_order_idx\` ON \`home_page_industries_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_parent_id_idx\` ON \`home_page_industries_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_tabs_category_idx\` ON \`home_page_industries_tabs\` (\`category_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_industries_default_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_industries_default_cards_order_idx\` ON \`home_page_industries_default_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_default_cards_parent_id_idx\` ON \`home_page_industries_default_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_industries_default_cards_image_idx\` ON \`home_page_industries_default_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_order_idx\` ON \`home_page_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_parent_id_idx\` ON \`home_page_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_quantity_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_quantity_features_order_idx\` ON \`home_page_quantity_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_features_parent_id_idx\` ON \`home_page_quantity_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_features_icon_idx\` ON \`home_page_quantity_features\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_design_body_order_idx\` ON \`home_page_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_design_body_parent_id_idx\` ON \`home_page_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_design_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_design_bullets_order_idx\` ON \`home_page_design_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_design_bullets_parent_id_idx\` ON \`home_page_design_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_order_idx\` ON \`home_page_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_parent_id_idx\` ON \`home_page_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_logo_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_logo_bullets_order_idx\` ON \`home_page_logo_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_logo_bullets_parent_id_idx\` ON \`home_page_logo_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_faq_items_order_idx\` ON \`home_page_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_faq_items_parent_id_idx\` ON \`home_page_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_rating_text\` text,
  	\`hero_heading\` text,
  	\`hero_intro\` text,
  	\`hero_cta_label\` text,
  	\`hero_cta_href\` text,
  	\`choose_box_eyebrow\` text,
  	\`choose_box_heading\` text,
  	\`choose_box_text\` text,
  	\`choose_box_button_label\` text,
  	\`choose_box_button_href\` text,
  	\`steps_eyebrow\` text,
  	\`steps_heading\` text,
  	\`steps_text\` text,
  	\`industries_eyebrow\` text,
  	\`industries_heading\` text,
  	\`industries_text\` text,
  	\`industries_note\` text,
  	\`quantity_eyebrow\` text,
  	\`quantity_heading\` text,
  	\`quantity_text\` text,
  	\`design_eyebrow\` text,
  	\`design_heading\` text,
  	\`design_text\` text,
  	\`design_lead\` text,
  	\`design_button_label\` text,
  	\`design_button_href\` text,
  	\`design_image_id\` integer,
  	\`eco_eyebrow\` text,
  	\`eco_heading\` text,
  	\`eco_text\` text,
  	\`eco_body\` text,
  	\`eco_link_text\` text,
  	\`eco_link_href\` text,
  	\`eco_badge_id\` integer,
  	\`logo_eyebrow\` text,
  	\`logo_heading\` text,
  	\`logo_text\` text,
  	\`logo_lead\` text,
  	\`logo_image_id\` integer,
  	\`sample_eyebrow\` text,
  	\`sample_heading\` text,
  	\`sample_text\` text,
  	\`sample_button_label\` text,
  	\`sample_button_href\` text,
  	\`sample_note\` text,
  	\`sample_image_id\` integer,
  	\`faq_eyebrow\` text,
  	\`faq_heading\` text,
  	\`faq_text\` text,
  	\`blog_eyebrow\` text,
  	\`blog_heading\` text,
  	\`blog_text\` text,
  	\`blog_link_label\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`design_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`eco_badge_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sample_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_design_design_image_idx\` ON \`home_page\` (\`design_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_eco_eco_badge_idx\` ON \`home_page\` (\`eco_badge_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_logo_logo_image_idx\` ON \`home_page\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_sample_sample_image_idx\` ON \`home_page\` (\`sample_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_media_id_idx\` ON \`home_page_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_posts_id_idx\` ON \`home_page_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_resources_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_resources_menu_order_idx\` ON \`site_settings_resources_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_resources_menu_parent_id_idx\` ON \`site_settings_resources_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_stats_order_idx\` ON \`site_settings_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_stats_parent_id_idx\` ON \`site_settings_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_trusted_brands\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_trusted_brands_order_idx\` ON \`site_settings_trusted_brands\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_trusted_brands_parent_id_idx\` ON \`site_settings_trusted_brands\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_trusted_brands_logo_idx\` ON \`site_settings_trusted_brands\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_trust_strip\` (
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
  await db.run(sql`CREATE INDEX \`site_settings_trust_strip_order_idx\` ON \`site_settings_trust_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_trust_strip_parent_id_idx\` ON \`site_settings_trust_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_trust_strip_icon_idx\` ON \`site_settings_trust_strip\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_product_defaults_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_how_to_order_steps_order_idx\` ON \`site_settings_product_defaults_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_how_to_order_steps_parent_id_idx\` ON \`site_settings_product_defaults_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_product_defaults_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_pricing_cards_order_idx\` ON \`site_settings_product_defaults_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_pricing_cards_parent_id_idx\` ON \`site_settings_product_defaults_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_product_defaults_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_why_us_cards_order_idx\` ON \`site_settings_product_defaults_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_why_us_cards_parent_id_idx\` ON \`site_settings_product_defaults_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_product_defaults_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_faqs_items_order_idx\` ON \`site_settings_product_defaults_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_faqs_items_parent_id_idx\` ON \`site_settings_product_defaults_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_columns_links_order_idx\` ON \`site_settings_footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_columns_links_parent_id_idx\` ON \`site_settings_footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_columns_order_idx\` ON \`site_settings_footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_columns_parent_id_idx\` ON \`site_settings_footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_legal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_legal_order_idx\` ON \`site_settings_footer_legal\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_legal_parent_id_idx\` ON \`site_settings_footer_legal\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_socials_order_idx\` ON \`site_settings_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_socials_parent_id_idx\` ON \`site_settings_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
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
  	FOREIGN KEY (\`footer_payment_logos_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_footer_payment_logos_idx\` ON \`site_settings\` (\`footer_payment_logos_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_texts_order_parent\` ON \`site_settings_texts\` (\`order\`,\`parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`categories_overview_body\`;`)
  await db.run(sql`DROP TABLE \`categories_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`categories_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`categories_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`categories_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`categories_materials_items\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`categories_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`categories_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`categories_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`categories_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories_texts\`;`)
  await db.run(sql`DROP TABLE \`categories_rels\`;`)
  await db.run(sql`DROP TABLE \`products_overview_body\`;`)
  await db.run(sql`DROP TABLE \`products_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`products_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`products_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`products_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`products_materials_items\`;`)
  await db.run(sql`DROP TABLE \`products_printing_body\`;`)
  await db.run(sql`DROP TABLE \`products_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`products_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`products_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`products_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`products_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_texts\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`reviews\`;`)
  await db.run(sql`DROP TABLE \`posts_body\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`quote_requests\`;`)
  await db.run(sql`DROP TABLE \`artwork\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_choose_box_cards\`;`)
  await db.run(sql`DROP TABLE \`home_page_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`home_page_industries_tabs_cards\`;`)
  await db.run(sql`DROP TABLE \`home_page_industries_tabs\`;`)
  await db.run(sql`DROP TABLE \`home_page_industries_default_cards\`;`)
  await db.run(sql`DROP TABLE \`home_page_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_quantity_features\`;`)
  await db.run(sql`DROP TABLE \`home_page_design_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_design_bullets\`;`)
  await db.run(sql`DROP TABLE \`home_page_logo_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_logo_bullets\`;`)
  await db.run(sql`DROP TABLE \`home_page_faq_items\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_resources_menu\`;`)
  await db.run(sql`DROP TABLE \`site_settings_stats\`;`)
  await db.run(sql`DROP TABLE \`site_settings_trusted_brands\`;`)
  await db.run(sql`DROP TABLE \`site_settings_trust_strip\`;`)
  await db.run(sql`DROP TABLE \`site_settings_product_defaults_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`site_settings_product_defaults_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`site_settings_product_defaults_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`site_settings_product_defaults_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_columns\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_legal\`;`)
  await db.run(sql`DROP TABLE \`site_settings_socials\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_texts\`;`)
}
