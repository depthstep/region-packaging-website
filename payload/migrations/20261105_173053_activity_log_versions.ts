import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_categories_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_order_idx\` ON \`_categories_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_parent_id_idx\` ON \`_categories_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_order_idx\` ON \`_categories_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_parent_id_idx\` ON \`_categories_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_items_order_idx\` ON \`_categories_v_version_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_items_parent_id_idx\` ON \`_categories_v_version_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_items_icon_idx\` ON \`_categories_v_version_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_specs_rows_order_idx\` ON \`_categories_v_version_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_specs_rows_parent_id_idx\` ON \`_categories_v_version_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_specs_stock_sizes_order_idx\` ON \`_categories_v_version_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_specs_stock_sizes_parent_id_idx\` ON \`_categories_v_version_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_materials_items_order_idx\` ON \`_categories_v_version_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_materials_items_parent_id_idx\` ON \`_categories_v_version_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_materials_items_image_idx\` ON \`_categories_v_version_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_order_idx\` ON \`_categories_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_parent_id_idx\` ON \`_categories_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_methods_order_idx\` ON \`_categories_v_version_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_methods_parent_id_idx\` ON \`_categories_v_version_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_finishes_order_idx\` ON \`_categories_v_version_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_finishes_parent_id_idx\` ON \`_categories_v_version_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_how_to_order_steps_order_idx\` ON \`_categories_v_version_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_how_to_order_steps_parent_id_idx\` ON \`_categories_v_version_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_order_idx\` ON \`_categories_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_parent_id_idx\` ON \`_categories_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_cards_order_idx\` ON \`_categories_v_version_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_cards_parent_id_idx\` ON \`_categories_v_version_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_why_us_cards_order_idx\` ON \`_categories_v_version_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_why_us_cards_parent_id_idx\` ON \`_categories_v_version_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_faqs_items_order_idx\` ON \`_categories_v_version_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_faqs_items_parent_id_idx\` ON \`_categories_v_version_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_kind\` text DEFAULT 'product-type' NOT NULL,
  	\`version_menu_label\` text,
  	\`version_card_text\` text,
  	\`version_card_image_id\` integer,
  	\`version_menu_icon_id\` integer,
  	\`version_rating_text\` text,
  	\`version_short_description\` text,
  	\`version_explore_eyebrow\` text,
  	\`version_explore_heading\` text,
  	\`version_explore_text\` text,
  	\`version_overview_eyebrow\` text,
  	\`version_overview_heading\` text,
  	\`version_overview_text\` text,
  	\`version_benefits_eyebrow\` text,
  	\`version_benefits_heading\` text,
  	\`version_benefits_text\` text,
  	\`version_specs_eyebrow\` text,
  	\`version_specs_heading\` text,
  	\`version_specs_text\` text,
  	\`version_specs_stock_sizes_heading\` text,
  	\`version_specs_note\` text,
  	\`version_materials_eyebrow\` text,
  	\`version_materials_heading\` text,
  	\`version_materials_text\` text,
  	\`version_materials_note\` text,
  	\`version_printing_eyebrow\` text,
  	\`version_printing_heading\` text,
  	\`version_printing_text\` text,
  	\`version_printing_image_id\` integer,
  	\`version_printing_methods_heading\` text,
  	\`version_printing_finishes_heading\` text,
  	\`version_use_cases_eyebrow\` text,
  	\`version_use_cases_heading\` text,
  	\`version_use_cases_text\` text,
  	\`version_use_cases_note\` text,
  	\`version_how_to_order_eyebrow\` text,
  	\`version_how_to_order_heading\` text,
  	\`version_how_to_order_text\` text,
  	\`version_how_to_order_note\` text,
  	\`version_pricing_eyebrow\` text,
  	\`version_pricing_heading\` text,
  	\`version_pricing_text\` text,
  	\`version_pricing_image_id\` integer,
  	\`version_why_us_eyebrow\` text,
  	\`version_why_us_heading\` text,
  	\`version_why_us_text\` text,
  	\`version_why_us_note\` text,
  	\`version_faqs_eyebrow\` text,
  	\`version_faqs_heading\` text,
  	\`version_faqs_text\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_visible\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_card_image_idx\` ON \`_categories_v\` (\`version_card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_menu_icon_idx\` ON \`_categories_v\` (\`version_menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_version_printing_image_idx\` ON \`_categories_v\` (\`version_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_version_pricing_image_idx\` ON \`_categories_v\` (\`version_pricing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_slug_idx\` ON \`_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_texts_order_parent\` ON \`_categories_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_order_idx\` ON \`_categories_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_parent_idx\` ON \`_categories_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_path_idx\` ON \`_categories_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_media_id_idx\` ON \`_categories_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_products_id_idx\` ON \`_categories_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_categories_id_idx\` ON \`_categories_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_order_idx\` ON \`_products_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_parent_id_idx\` ON \`_products_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_order_idx\` ON \`_products_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_parent_id_idx\` ON \`_products_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_items_order_idx\` ON \`_products_v_version_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_items_parent_id_idx\` ON \`_products_v_version_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_items_icon_idx\` ON \`_products_v_version_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_specs_rows_order_idx\` ON \`_products_v_version_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_specs_rows_parent_id_idx\` ON \`_products_v_version_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_specs_stock_sizes_order_idx\` ON \`_products_v_version_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_specs_stock_sizes_parent_id_idx\` ON \`_products_v_version_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_materials_items_order_idx\` ON \`_products_v_version_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_materials_items_parent_id_idx\` ON \`_products_v_version_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_materials_items_image_idx\` ON \`_products_v_version_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_order_idx\` ON \`_products_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_parent_id_idx\` ON \`_products_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_methods_order_idx\` ON \`_products_v_version_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_methods_parent_id_idx\` ON \`_products_v_version_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_finishes_order_idx\` ON \`_products_v_version_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_finishes_parent_id_idx\` ON \`_products_v_version_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_how_to_order_steps_order_idx\` ON \`_products_v_version_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_how_to_order_steps_parent_id_idx\` ON \`_products_v_version_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_order_idx\` ON \`_products_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_parent_id_idx\` ON \`_products_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_cards_order_idx\` ON \`_products_v_version_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_cards_parent_id_idx\` ON \`_products_v_version_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_why_us_cards_order_idx\` ON \`_products_v_version_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_why_us_cards_parent_id_idx\` ON \`_products_v_version_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_faqs_items_order_idx\` ON \`_products_v_version_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_faqs_items_parent_id_idx\` ON \`_products_v_version_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_card_text\` text,
  	\`version_card_image_id\` integer,
  	\`version_menu_icon_id\` integer,
  	\`version_rating_text\` text,
  	\`version_short_description\` text,
  	\`version_explore_eyebrow\` text,
  	\`version_explore_heading\` text,
  	\`version_explore_text\` text,
  	\`version_overview_eyebrow\` text,
  	\`version_overview_heading\` text,
  	\`version_overview_text\` text,
  	\`version_benefits_eyebrow\` text,
  	\`version_benefits_heading\` text,
  	\`version_benefits_text\` text,
  	\`version_specs_eyebrow\` text,
  	\`version_specs_heading\` text,
  	\`version_specs_text\` text,
  	\`version_specs_stock_sizes_heading\` text,
  	\`version_specs_note\` text,
  	\`version_materials_eyebrow\` text,
  	\`version_materials_heading\` text,
  	\`version_materials_text\` text,
  	\`version_materials_note\` text,
  	\`version_printing_eyebrow\` text,
  	\`version_printing_heading\` text,
  	\`version_printing_text\` text,
  	\`version_printing_image_id\` integer,
  	\`version_printing_methods_heading\` text,
  	\`version_printing_finishes_heading\` text,
  	\`version_use_cases_eyebrow\` text,
  	\`version_use_cases_heading\` text,
  	\`version_use_cases_text\` text,
  	\`version_use_cases_note\` text,
  	\`version_how_to_order_eyebrow\` text,
  	\`version_how_to_order_heading\` text,
  	\`version_how_to_order_text\` text,
  	\`version_how_to_order_note\` text,
  	\`version_pricing_eyebrow\` text,
  	\`version_pricing_heading\` text,
  	\`version_pricing_text\` text,
  	\`version_pricing_image_id\` integer,
  	\`version_why_us_eyebrow\` text,
  	\`version_why_us_heading\` text,
  	\`version_why_us_text\` text,
  	\`version_why_us_note\` text,
  	\`version_faqs_eyebrow\` text,
  	\`version_faqs_heading\` text,
  	\`version_faqs_text\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'live',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_card_image_idx\` ON \`_products_v\` (\`version_card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_menu_icon_idx\` ON \`_products_v\` (\`version_menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_version_printing_image_idx\` ON \`_products_v\` (\`version_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_version_pricing_image_idx\` ON \`_products_v\` (\`version_pricing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_texts_order_parent\` ON \`_products_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`media_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_rels_order_idx\` ON \`_products_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_parent_idx\` ON \`_products_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_path_idx\` ON \`_products_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_categories_id_idx\` ON \`_products_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_media_id_idx\` ON \`_products_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_products_id_idx\` ON \`_products_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_intro\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_reviews_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_role\` text,
  	\`version_rating\` numeric DEFAULT 5 NOT NULL,
  	\`version_date_text\` text,
  	\`version_quote\` text NOT NULL,
  	\`version_avatar_id\` integer,
  	\`version_source\` text DEFAULT 'Posted on Google',
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_reviews_v_parent_idx\` ON \`_reviews_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_version_version_avatar_idx\` ON \`_reviews_v\` (\`version_avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_version_version_updated_at_idx\` ON \`_reviews_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_version_version_created_at_idx\` ON \`_reviews_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_created_at_idx\` ON \`_reviews_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_updated_at_idx\` ON \`_reviews_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_category_id\` integer,
  	\`version_excerpt\` text,
  	\`version_image_id\` integer,
  	\`version_body\` text,
  	\`version_published_at\` text,
  	\`version_author\` text DEFAULT 'Region Packaging',
  	\`version_read_minutes\` numeric,
  	\`version_featured\` integer,
  	\`version_slug\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_image_idx\` ON \`_posts_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blog_topics_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_topics_id\`) REFERENCES \`blog_topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_blog_topics_id_idx\` ON \`_posts_v_rels\` (\`blog_topics_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_description\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_parent_idx\` ON \`_blog_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_version_version_slug_idx\` ON \`_blog_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_version_version_updated_at_idx\` ON \`_blog_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_version_version_created_at_idx\` ON \`_blog_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_created_at_idx\` ON \`_blog_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_categories_v_updated_at_idx\` ON \`_blog_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_blog_topics_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog_topics\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_parent_idx\` ON \`_blog_topics_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_version_version_slug_idx\` ON \`_blog_topics_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_version_version_updated_at_idx\` ON \`_blog_topics_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_version_version_created_at_idx\` ON \`_blog_topics_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_created_at_idx\` ON \`_blog_topics_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_topics_v_updated_at_idx\` ON \`_blog_topics_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`activity_log\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user\` text,
  	\`action\` text,
  	\`section\` text,
  	\`item\` text,
  	\`record_id\` text,
  	\`summary\` text,
  	\`changes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`activity_log_user_idx\` ON \`activity_log\` (\`user\`);`)
  await db.run(sql`CREATE INDEX \`activity_log_action_idx\` ON \`activity_log\` (\`action\`);`)
  await db.run(sql`CREATE INDEX \`activity_log_section_idx\` ON \`activity_log\` (\`section\`);`)
  await db.run(sql`CREATE INDEX \`activity_log_updated_at_idx\` ON \`activity_log\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`activity_log_created_at_idx\` ON \`activity_log\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_choose_box_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_choose_box_cards_order_idx\` ON \`_home_page_v_version_choose_box_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_choose_box_cards_parent_id_idx\` ON \`_home_page_v_version_choose_box_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_choose_box_cards_image_idx\` ON \`_home_page_v_version_choose_box_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_steps_steps_order_idx\` ON \`_home_page_v_version_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_steps_steps_parent_id_idx\` ON \`_home_page_v_version_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_steps_steps_icon_idx\` ON \`_home_page_v_version_steps_steps\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_industries_tabs_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_industries_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_cards_order_idx\` ON \`_home_page_v_version_industries_tabs_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_cards_parent_id_idx\` ON \`_home_page_v_version_industries_tabs_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_cards_image_idx\` ON \`_home_page_v_version_industries_tabs_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_industries_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`category_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_order_idx\` ON \`_home_page_v_version_industries_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_parent_id_idx\` ON \`_home_page_v_version_industries_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_tabs_category_idx\` ON \`_home_page_v_version_industries_tabs\` (\`category_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_industries_default_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kicker\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_default_cards_order_idx\` ON \`_home_page_v_version_industries_default_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_default_cards_parent_id_idx\` ON \`_home_page_v_version_industries_default_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_industries_default_cards_image_idx\` ON \`_home_page_v_version_industries_default_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_order_idx\` ON \`_home_page_v_version_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_parent_id_idx\` ON \`_home_page_v_version_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_quantity_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_features_order_idx\` ON \`_home_page_v_version_quantity_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_features_parent_id_idx\` ON \`_home_page_v_version_quantity_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_features_icon_idx\` ON \`_home_page_v_version_quantity_features\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_order_idx\` ON \`_home_page_v_version_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_parent_id_idx\` ON \`_home_page_v_version_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_design_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_bullets_order_idx\` ON \`_home_page_v_version_design_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_bullets_parent_id_idx\` ON \`_home_page_v_version_design_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_order_idx\` ON \`_home_page_v_version_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_parent_id_idx\` ON \`_home_page_v_version_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_logo_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_bullets_order_idx\` ON \`_home_page_v_version_logo_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_bullets_parent_id_idx\` ON \`_home_page_v_version_logo_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_faq_items_order_idx\` ON \`_home_page_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_faq_items_parent_id_idx\` ON \`_home_page_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_rating_text\` text,
  	\`version_hero_heading\` text,
  	\`version_hero_intro\` text,
  	\`version_hero_cta_label\` text,
  	\`version_hero_cta_href\` text,
  	\`version_choose_box_eyebrow\` text,
  	\`version_choose_box_heading\` text,
  	\`version_choose_box_text\` text,
  	\`version_choose_box_button_label\` text,
  	\`version_choose_box_button_href\` text,
  	\`version_steps_eyebrow\` text,
  	\`version_steps_heading\` text,
  	\`version_steps_text\` text,
  	\`version_industries_eyebrow\` text,
  	\`version_industries_heading\` text,
  	\`version_industries_text\` text,
  	\`version_industries_note\` text,
  	\`version_quantity_eyebrow\` text,
  	\`version_quantity_heading\` text,
  	\`version_quantity_text\` text,
  	\`version_design_eyebrow\` text,
  	\`version_design_heading\` text,
  	\`version_design_text\` text,
  	\`version_design_lead\` text,
  	\`version_design_button_label\` text,
  	\`version_design_button_href\` text,
  	\`version_design_image_id\` integer,
  	\`version_eco_eyebrow\` text,
  	\`version_eco_heading\` text,
  	\`version_eco_text\` text,
  	\`version_eco_body\` text,
  	\`version_eco_link_text\` text,
  	\`version_eco_link_href\` text,
  	\`version_eco_badge_id\` integer,
  	\`version_logo_eyebrow\` text,
  	\`version_logo_heading\` text,
  	\`version_logo_text\` text,
  	\`version_logo_lead\` text,
  	\`version_logo_image_id\` integer,
  	\`version_sample_eyebrow\` text,
  	\`version_sample_heading\` text,
  	\`version_sample_text\` text,
  	\`version_sample_button_label\` text,
  	\`version_sample_button_href\` text,
  	\`version_sample_note\` text,
  	\`version_sample_image_id\` integer,
  	\`version_faq_eyebrow\` text,
  	\`version_faq_heading\` text,
  	\`version_faq_text\` text,
  	\`version_blog_eyebrow\` text,
  	\`version_blog_heading\` text,
  	\`version_blog_text\` text,
  	\`version_blog_link_label\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_design_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_eco_badge_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_sample_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_version_design_image_idx\` ON \`_home_page_v\` (\`version_design_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_eco_version_eco_badge_idx\` ON \`_home_page_v\` (\`version_eco_badge_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_version_logo_image_idx\` ON \`_home_page_v\` (\`version_logo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_sample_version_sample_image_idx\` ON \`_home_page_v\` (\`version_sample_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_order_idx\` ON \`_home_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_parent_idx\` ON \`_home_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_path_idx\` ON \`_home_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_media_id_idx\` ON \`_home_page_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_posts_id_idx\` ON \`_home_page_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v_version_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_order_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_parent_id_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v_version_who_we_are_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_stats_order_idx\` ON \`_about_page_v_version_who_we_are_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_stats_parent_id_idx\` ON \`_about_page_v_version_who_we_are_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v_version_values_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_values_items_order_idx\` ON \`_about_page_v_version_values_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_values_items_parent_id_idx\` ON \`_about_page_v_version_values_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_values_items_icon_idx\` ON \`_about_page_v_version_values_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_heading\` text,
  	\`version_hero_text\` text,
  	\`version_hero_button_label\` text,
  	\`version_hero_button_href\` text,
  	\`version_mission_mission_heading\` text,
  	\`version_mission_mission_text\` text,
  	\`version_mission_mission_icon_id\` integer,
  	\`version_mission_photo_id\` integer,
  	\`version_mission_vision_heading\` text,
  	\`version_mission_vision_text\` text,
  	\`version_mission_vision_icon_id\` integer,
  	\`version_who_we_are_eyebrow\` text,
  	\`version_who_we_are_heading\` text,
  	\`version_who_we_are_text\` text,
  	\`version_who_we_are_image_id\` integer,
  	\`version_products_eyebrow\` text,
  	\`version_products_heading\` text,
  	\`version_products_text\` text,
  	\`version_values_eyebrow\` text,
  	\`version_values_heading\` text,
  	\`version_values_text\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_mission_mission_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_mission_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_mission_vision_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_who_we_are_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_mission_version_mission_mission_ic_idx\` ON \`_about_page_v\` (\`version_mission_mission_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_mission_version_mission_photo_idx\` ON \`_about_page_v\` (\`version_mission_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_mission_version_mission_vision_ico_idx\` ON \`_about_page_v\` (\`version_mission_vision_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_version_who_we_are_imag_idx\` ON \`_about_page_v\` (\`version_who_we_are_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_created_at_idx\` ON \`_about_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_updated_at_idx\` ON \`_about_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_rels_order_idx\` ON \`_about_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_rels_parent_idx\` ON \`_about_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_rels_path_idx\` ON \`_about_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_rels_media_id_idx\` ON \`_about_page_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_artwork_page_v_version_formats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_artwork_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_formats_items_order_idx\` ON \`_artwork_page_v_version_formats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_formats_items_parent_id_idx\` ON \`_artwork_page_v_version_formats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_formats_items_icon_idx\` ON \`_artwork_page_v_version_formats_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_artwork_page_v_version_essentials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`icon_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_artwork_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_essentials_items_order_idx\` ON \`_artwork_page_v_version_essentials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_essentials_items_parent_id_idx\` ON \`_artwork_page_v_version_essentials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_essentials_items_icon_idx\` ON \`_artwork_page_v_version_essentials_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_artwork_page_v_version_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_artwork_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_steps_steps_order_idx\` ON \`_artwork_page_v_version_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_steps_steps_parent_id_idx\` ON \`_artwork_page_v_version_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_artwork_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_heading\` text,
  	\`version_hero_text\` text,
  	\`version_hero_button_label\` text,
  	\`version_hero_guide_id\` integer,
  	\`version_hero_dieline_text\` text,
  	\`version_formats_eyebrow\` text,
  	\`version_formats_heading\` text,
  	\`version_formats_text\` text,
  	\`version_essentials_eyebrow\` text,
  	\`version_essentials_heading\` text,
  	\`version_essentials_text\` text,
  	\`version_steps_eyebrow\` text,
  	\`version_steps_heading\` text,
  	\`version_steps_text\` text,
  	\`version_steps_note\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_guide_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_hero_version_hero_guide_idx\` ON \`_artwork_page_v\` (\`version_hero_guide_id\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_created_at_idx\` ON \`_artwork_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_updated_at_idx\` ON \`_artwork_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_blog_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_heading\` text,
  	\`version_hero_text\` text,
  	\`version_featured_heading\` text,
  	\`version_search_placeholder\` text,
  	\`version_view_all_label\` text,
  	\`version_post_toc_heading\` text,
  	\`version_post_help_heading\` text,
  	\`version_post_help_text\` text,
  	\`version_post_help_phone_label\` text,
  	\`version_post_help_button_label\` text,
  	\`version_post_help_button_href\` text,
  	\`version_post_follow_label\` text,
  	\`version_post_related_eyebrow\` text,
  	\`version_post_related_heading\` text,
  	\`version_post_related_button_label\` text,
  	\`version_post_related_button_href\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_page_v_created_at_idx\` ON \`_blog_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_page_v_updated_at_idx\` ON \`_blog_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_resources_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_resources_menu_order_idx\` ON \`_site_settings_v_version_resources_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_resources_menu_parent_id_idx\` ON \`_site_settings_v_version_resources_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_stats_order_idx\` ON \`_site_settings_v_version_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_stats_parent_id_idx\` ON \`_site_settings_v_version_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_trusted_brands\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trusted_brands_order_idx\` ON \`_site_settings_v_version_trusted_brands\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trusted_brands_parent_id_idx\` ON \`_site_settings_v_version_trusted_brands\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trusted_brands_logo_idx\` ON \`_site_settings_v_version_trusted_brands\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_trust_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trust_strip_order_idx\` ON \`_site_settings_v_version_trust_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trust_strip_parent_id_idx\` ON \`_site_settings_v_version_trust_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_trust_strip_icon_idx\` ON \`_site_settings_v_version_trust_strip\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_product_defaults_how_to_order_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_how_to_order_steps_order_idx\` ON \`_site_settings_v_version_product_defaults_how_to_order_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_how_to_order_steps_parent_id_idx\` ON \`_site_settings_v_version_product_defaults_how_to_order_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_product_defaults_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_pricing_cards_order_idx\` ON \`_site_settings_v_version_product_defaults_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_pricing_cards_parent_id_idx\` ON \`_site_settings_v_version_product_defaults_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_product_defaults_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_why_us_cards_order_idx\` ON \`_site_settings_v_version_product_defaults_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_why_us_cards_parent_id_idx\` ON \`_site_settings_v_version_product_defaults_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_product_defaults_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_faqs_items_order_idx\` ON \`_site_settings_v_version_product_defaults_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_faqs_items_parent_id_idx\` ON \`_site_settings_v_version_product_defaults_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_items_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_items_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_i_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_specs_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_specs_rows_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_specs_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_specs_rows_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_specs_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text,
  	\`dimensions\` text,
  	\`best_for\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_materials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`badge\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_materials_items_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_materials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_materials_items_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_materials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_materials__idx\` ON \`_site_settings_v_version_sub_product_defaults_materials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_methods_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_methods_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_finishes_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_finishes_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_why_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_why_us_cards_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_why_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_why_us_cards_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_why_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_columns_links_order_idx\` ON \`_site_settings_v_version_footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_columns_links_parent_id_idx\` ON \`_site_settings_v_version_footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_columns_order_idx\` ON \`_site_settings_v_version_footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_columns_parent_id_idx\` ON \`_site_settings_v_version_footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_legal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_legal_order_idx\` ON \`_site_settings_v_version_footer_legal\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_legal_parent_id_idx\` ON \`_site_settings_v_version_footer_legal\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_socials_order_idx\` ON \`_site_settings_v_version_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_socials_parent_id_idx\` ON \`_site_settings_v_version_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_announcement\` text,
  	\`version_phone\` text,
  	\`version_email\` text,
  	\`version_menu_promo_title\` text,
  	\`version_menu_promo_text\` text,
  	\`version_menu_promo_button_label\` text,
  	\`version_menu_promo_href\` text,
  	\`version_trusted_heading\` text,
  	\`version_google_score\` text,
  	\`version_google_label\` text,
  	\`version_google_count_text\` text,
  	\`version_google_review_url\` text,
  	\`version_reviews_section_eyebrow\` text,
  	\`version_reviews_section_heading\` text,
  	\`version_reviews_section_text\` text,
  	\`version_reviews_section_button_label\` text,
  	\`version_product_defaults_explore_eyebrow\` text,
  	\`version_product_defaults_how_to_order_eyebrow\` text,
  	\`version_product_defaults_how_to_order_heading\` text,
  	\`version_product_defaults_how_to_order_text\` text,
  	\`version_product_defaults_pricing_eyebrow\` text,
  	\`version_product_defaults_pricing_heading\` text,
  	\`version_product_defaults_pricing_text\` text,
  	\`version_product_defaults_why_us_eyebrow\` text,
  	\`version_product_defaults_why_us_heading\` text,
  	\`version_product_defaults_why_us_text\` text,
  	\`version_product_defaults_faqs_eyebrow\` text,
  	\`version_product_defaults_faqs_heading\` text,
  	\`version_product_defaults_faqs_text\` text,
  	\`version_product_defaults_related_heading_eyebrow\` text,
  	\`version_product_defaults_related_heading_heading\` text,
  	\`version_product_defaults_related_heading_text\` text,
  	\`version_product_defaults_sample_link_label\` text,
  	\`version_product_defaults_form_note\` text,
  	\`version_page_intros_products_heading\` text,
  	\`version_page_intros_products_text\` text,
  	\`version_page_intros_products_seo_title\` text,
  	\`version_page_intros_products_seo_description\` text,
  	\`version_page_intros_faqs_heading\` text,
  	\`version_page_intros_faqs_text\` text,
  	\`version_page_intros_faqs_seo_title\` text,
  	\`version_page_intros_faqs_seo_description\` text,
  	\`version_page_intros_how_to_order_heading\` text,
  	\`version_page_intros_how_to_order_text\` text,
  	\`version_page_intros_how_to_order_seo_title\` text,
  	\`version_page_intros_how_to_order_seo_description\` text,
  	\`version_page_intros_quote_heading\` text,
  	\`version_page_intros_quote_text\` text,
  	\`version_page_intros_quote_seo_title\` text,
  	\`version_page_intros_quote_seo_description\` text,
  	\`version_page_intros_sample_heading\` text,
  	\`version_page_intros_sample_text\` text,
  	\`version_page_intros_sample_seo_title\` text,
  	\`version_page_intros_sample_seo_description\` text,
  	\`version_sub_product_defaults_tabs_overview\` text,
  	\`version_sub_product_defaults_tabs_specs\` text,
  	\`version_sub_product_defaults_tabs_materials\` text,
  	\`version_sub_product_defaults_tabs_why\` text,
  	\`version_sub_product_defaults_tabs_faq\` text,
  	\`version_sub_product_defaults_short_description\` text,
  	\`version_sub_product_defaults_overview_eyebrow\` text,
  	\`version_sub_product_defaults_overview_heading\` text,
  	\`version_sub_product_defaults_overview_text\` text,
  	\`version_sub_product_defaults_benefits_eyebrow\` text,
  	\`version_sub_product_defaults_benefits_heading\` text,
  	\`version_sub_product_defaults_benefits_text\` text,
  	\`version_sub_product_defaults_specs_eyebrow\` text,
  	\`version_sub_product_defaults_specs_heading\` text,
  	\`version_sub_product_defaults_specs_text\` text,
  	\`version_sub_product_defaults_specs_stock_sizes_heading\` text,
  	\`version_sub_product_defaults_specs_note\` text,
  	\`version_sub_product_defaults_materials_eyebrow\` text,
  	\`version_sub_product_defaults_materials_heading\` text,
  	\`version_sub_product_defaults_materials_text\` text,
  	\`version_sub_product_defaults_materials_note\` text,
  	\`version_sub_product_defaults_printing_eyebrow\` text,
  	\`version_sub_product_defaults_printing_heading\` text,
  	\`version_sub_product_defaults_printing_text\` text,
  	\`version_sub_product_defaults_printing_image_id\` integer,
  	\`version_sub_product_defaults_printing_methods_heading\` text,
  	\`version_sub_product_defaults_printing_finishes_heading\` text,
  	\`version_sub_product_defaults_use_cases_eyebrow\` text,
  	\`version_sub_product_defaults_use_cases_heading\` text,
  	\`version_sub_product_defaults_use_cases_text\` text,
  	\`version_sub_product_defaults_use_cases_note\` text,
  	\`version_sub_product_defaults_why_us_eyebrow\` text,
  	\`version_sub_product_defaults_why_us_heading\` text,
  	\`version_sub_product_defaults_why_us_text\` text,
  	\`version_sub_product_defaults_why_us_note\` text,
  	\`version_contact_heading\` text,
  	\`version_contact_text\` text,
  	\`version_contact_image_id\` integer,
  	\`version_contact_call_label\` text,
  	\`version_contact_email_label\` text,
  	\`version_contact_card_heading\` text,
  	\`version_contact_card_text\` text,
  	\`version_contact_card_button_label\` text,
  	\`version_contact_card_button_href\` text,
  	\`version_contact_form_heading\` text,
  	\`version_contact_form_text\` text,
  	\`version_contact_button_label\` text,
  	\`version_cta_heading\` text,
  	\`version_cta_text\` text,
  	\`version_cta_primary_label\` text,
  	\`version_cta_primary_href\` text,
  	\`version_cta_secondary_label\` text,
  	\`version_cta_secondary_href\` text,
  	\`version_cta_coupon_amount\` text,
  	\`version_cta_coupon_label\` text,
  	\`version_cta_coupon_code\` text,
  	\`version_cta_coupon_button_label\` text,
  	\`version_cta_coupon_note\` text,
  	\`version_footer_blurb\` text,
  	\`version_footer_newsletter_title\` text,
  	\`version_footer_newsletter_text\` text,
  	\`version_footer_newsletter_placeholder\` text,
  	\`version_footer_newsletter_button\` text,
  	\`version_footer_follow_label\` text,
  	\`version_footer_payments_label\` text,
  	\`version_footer_payment_logos_id\` integer,
  	\`version_footer_copyright\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_sub_product_defaults_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contact_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_footer_payment_logos_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_v_idx\` ON \`_site_settings_v\` (\`version_sub_product_defaults_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_contact_version_contact_image_idx\` ON \`_site_settings_v\` (\`version_contact_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_version_footer_payment_l_idx\` ON \`_site_settings_v\` (\`version_footer_payment_logos_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_texts_order_parent\` ON \`_site_settings_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_order_idx\` ON \`_site_settings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_parent_idx\` ON \`_site_settings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_path_idx\` ON \`_site_settings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_media_id_idx\` ON \`_site_settings_v_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`activity_log_id\` integer REFERENCES activity_log(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_activity_log_id_idx\` ON \`payload_locked_documents_rels\` (\`activity_log_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_categories_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_materials_items\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_materials_items\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_reviews_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_blog_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_blog_topics_v\`;`)
  await db.run(sql`DROP TABLE \`activity_log\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_choose_box_cards\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_industries_tabs_cards\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_industries_tabs\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_industries_default_cards\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_quantity_features\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_design_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_design_bullets\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_logo_bullets\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_who_we_are_stats\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_values_items\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_artwork_page_v_version_formats_items\`;`)
  await db.run(sql`DROP TABLE \`_artwork_page_v_version_essentials_items\`;`)
  await db.run(sql`DROP TABLE \`_artwork_page_v_version_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_artwork_page_v\`;`)
  await db.run(sql`DROP TABLE \`_blog_page_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_resources_menu\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_trusted_brands\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_trust_strip\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_product_defaults_how_to_order_steps\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_product_defaults_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_product_defaults_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_product_defaults_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_specs_rows\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_specs_stock_sizes\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_materials_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_why_us_cards\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_columns\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_legal\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_socials\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`products_id\` integer,
  	\`pages_id\` integer,
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
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
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
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "categories_id", "products_id", "pages_id", "reviews_id", "posts_id", "blog_categories_id", "blog_topics_id", "quote_requests_id", "artwork_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "categories_id", "products_id", "pages_id", "reviews_id", "posts_id", "blog_categories_id", "blog_topics_id", "quote_requests_id", "artwork_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_topics_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_topics_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quote_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`quote_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_artwork_id_idx\` ON \`payload_locked_documents_rels\` (\`artwork_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
