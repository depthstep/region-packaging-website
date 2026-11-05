import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

async function changeTables(db: MigrateUpArgs['db']): Promise<void> {
  await db.run(sql`CREATE TABLE \`__new_categories_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_overview_body\`;`)
  await db.run(sql`DROP TABLE \`categories_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_overview_body\` RENAME TO \`categories_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_overview_body_order_idx\` ON \`categories_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_overview_body_parent_id_idx\` ON \`categories_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`categories_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_benefits_body\` RENAME TO \`categories_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_order_idx\` ON \`categories_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_parent_id_idx\` ON \`categories_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_printing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_printing_body\` RENAME TO \`categories_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_printing_body_order_idx\` ON \`categories_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_body_parent_id_idx\` ON \`categories_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_pricing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_pricing_body\` RENAME TO \`categories_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_order_idx\` ON \`categories_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_parent_id_idx\` ON \`categories_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`kind\` text DEFAULT 'product-type',
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
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`visible\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories\`("id", "title", "kind", "menu_label", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "visible", "updated_at", "created_at", "_status") SELECT "id", "title", "kind", "menu_label", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "visible", "updated_at", "created_at", 'published' FROM \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories\` RENAME TO \`categories\`;`)
  await db.run(sql`CREATE INDEX \`categories_card_image_idx\` ON \`categories\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_menu_icon_idx\` ON \`categories\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_printing_image_idx\` ON \`categories\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_pricing_image_idx\` ON \`categories\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`categories__status_idx\` ON \`categories\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_overview_body\` RENAME TO \`_categories_v_version_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_order_idx\` ON \`_categories_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_parent_id_idx\` ON \`_categories_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_benefits_body\` RENAME TO \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_order_idx\` ON \`_categories_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_parent_id_idx\` ON \`_categories_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_printing_body\` RENAME TO \`_categories_v_version_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_order_idx\` ON \`_categories_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_parent_id_idx\` ON \`_categories_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_pricing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_pricing_body\` RENAME TO \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_order_idx\` ON \`_categories_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_parent_id_idx\` ON \`_categories_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_kind\` text DEFAULT 'product-type',
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
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_visible\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v\`("id", "parent_id", "version_title", "version_kind", "version_menu_label", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_visible", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_kind", "version_menu_label", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_visible", "version_updated_at", "version_created_at", 'published', "created_at", "updated_at", NULL, NULL FROM \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v\` RENAME TO \`_categories_v\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_card_image_idx\` ON \`_categories_v\` (\`version_card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_menu_icon_idx\` ON \`_categories_v\` (\`version_menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_version_printing_image_idx\` ON \`_categories_v\` (\`version_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_version_pricing_image_idx\` ON \`_categories_v\` (\`version_pricing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_slug_idx\` ON \`_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version__status_idx\` ON \`_categories_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_latest_idx\` ON \`_categories_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_autosave_idx\` ON \`_categories_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_overview_body\`;`)
  await db.run(sql`DROP TABLE \`products_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_overview_body\` RENAME TO \`products_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`products_overview_body_order_idx\` ON \`products_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_overview_body_parent_id_idx\` ON \`products_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`products_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_benefits_body\` RENAME TO \`products_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`products_benefits_body_order_idx\` ON \`products_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_benefits_body_parent_id_idx\` ON \`products_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_printing_body\`;`)
  await db.run(sql`DROP TABLE \`products_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_printing_body\` RENAME TO \`products_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`products_printing_body_order_idx\` ON \`products_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_body_parent_id_idx\` ON \`products_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_pricing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_pricing_body\` RENAME TO \`products_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`products_pricing_body_order_idx\` ON \`products_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_body_parent_id_idx\` ON \`products_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
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
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'live',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products\`("id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at", "_status") SELECT "id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at", 'published' FROM \`products\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`ALTER TABLE \`__new_products\` RENAME TO \`products\`;`)
  await db.run(sql`CREATE INDEX \`products_card_image_idx\` ON \`products\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_menu_icon_idx\` ON \`products\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_printing_image_idx\` ON \`products\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_pricing_image_idx\` ON \`products\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_overview_body\` RENAME TO \`_products_v_version_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_order_idx\` ON \`_products_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_parent_id_idx\` ON \`_products_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_benefits_body\` RENAME TO \`_products_v_version_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_order_idx\` ON \`_products_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_parent_id_idx\` ON \`_products_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_printing_body\` RENAME TO \`_products_v_version_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_order_idx\` ON \`_products_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_parent_id_idx\` ON \`_products_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_pricing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_pricing_body\` RENAME TO \`_products_v_version_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_order_idx\` ON \`_products_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_parent_id_idx\` ON \`_products_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
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
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'live',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_menu_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pricing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v\`("id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", 'published', "created_at", "updated_at", NULL, NULL FROM \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v\` RENAME TO \`_products_v\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_card_image_idx\` ON \`_products_v\` (\`version_card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_menu_icon_idx\` ON \`_products_v\` (\`version_menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_version_printing_image_idx\` ON \`_products_v\` (\`version_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_version_pricing_image_idx\` ON \`_products_v\` (\`version_pricing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_autosave_idx\` ON \`_products_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`intro\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "intro", "body", "seo_title", "seo_description", "slug", "updated_at", "created_at", "_status") SELECT "id", "title", "intro", "body", "seo_title", "seo_description", "slug", "updated_at", "created_at", 'published' FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_intro\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_title", "version_intro", "version_body", "version_seo_title", "version_seo_description", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_intro", "version_body", "version_seo_title", "version_seo_description", "version_slug", "version_updated_at", "version_created_at", 'published', "created_at", "updated_at", NULL, NULL FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`category_id\` integer,
  	\`excerpt\` text,
  	\`image_id\` integer,
  	\`body\` text,
  	\`published_at\` text,
  	\`author\` text DEFAULT 'Region Packaging',
  	\`read_minutes\` numeric,
  	\`featured\` integer,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "category_id", "excerpt", "image_id", "body", "published_at", "author", "read_minutes", "featured", "slug", "updated_at", "created_at", "_status") SELECT "id", "title", "category_id", "excerpt", "image_id", "body", "published_at", "author", "read_minutes", "featured", "slug", "updated_at", "created_at", 'published' FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_category_id\` integer,
  	\`version_excerpt\` text,
  	\`version_image_id\` integer,
  	\`version_body\` text,
  	\`version_published_at\` text,
  	\`version_author\` text DEFAULT 'Region Packaging',
  	\`version_read_minutes\` numeric,
  	\`version_featured\` integer,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__posts_v\`("id", "parent_id", "version_title", "version_category_id", "version_excerpt", "version_image_id", "version_body", "version_published_at", "version_author", "version_read_minutes", "version_featured", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_category_id", "version_excerpt", "version_image_id", "version_body", "version_published_at", "version_author", "version_read_minutes", "version_featured", "version_slug", "version_updated_at", "version_created_at", 'published', "created_at", "updated_at", NULL, NULL FROM \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__posts_v\` RENAME TO \`_posts_v\`;`)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_image_idx\` ON \`_posts_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_quantity_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_quantity_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_quantity_body\` RENAME TO \`home_page_quantity_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_order_idx\` ON \`home_page_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_parent_id_idx\` ON \`home_page_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_design_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_design_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_design_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_design_body\` RENAME TO \`home_page_design_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_design_body_order_idx\` ON \`home_page_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_design_body_parent_id_idx\` ON \`home_page_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_logo_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_logo_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_logo_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_logo_body\` RENAME TO \`home_page_logo_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_order_idx\` ON \`home_page_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_parent_id_idx\` ON \`home_page_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_quantity_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_quantity_body\` RENAME TO \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_order_idx\` ON \`_home_page_v_version_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_parent_id_idx\` ON \`_home_page_v_version_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_design_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_design_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_design_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_design_body\` RENAME TO \`_home_page_v_version_design_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_order_idx\` ON \`_home_page_v_version_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_parent_id_idx\` ON \`_home_page_v_version_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_logo_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_logo_body\` RENAME TO \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_order_idx\` ON \`_home_page_v_version_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_parent_id_idx\` ON \`_home_page_v_version_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_about_page_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_about_page_who_we_are_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`about_page_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`about_page_who_we_are_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_about_page_who_we_are_body\` RENAME TO \`about_page_who_we_are_body\`;`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_order_idx\` ON \`about_page_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_parent_id_idx\` ON \`about_page_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__about_page_v_version_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__about_page_v_version_who_we_are_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__about_page_v_version_who_we_are_body\` RENAME TO \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_order_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_parent_id_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_overview_body\` RENAME TO \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_order_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_benefits_body\` RENAME TO \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_order_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_printing_body\` RENAME TO \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_order_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_overview_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_benefits_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`home_page__status_idx\` ON \`home_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` ADD \`latest\` integer;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_version__status_idx\` ON \`_home_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_latest_idx\` ON \`_home_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_autosave_idx\` ON \`_home_page_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`about_page__status_idx\` ON \`about_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` ADD \`latest\` integer;`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_version__status_idx\` ON \`_about_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_latest_idx\` ON \`_about_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_autosave_idx\` ON \`_about_page_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`artwork_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`artwork_page__status_idx\` ON \`artwork_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` ADD \`latest\` integer;`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_version_version__status_idx\` ON \`_artwork_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_latest_idx\` ON \`_artwork_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_artwork_page_v_autosave_idx\` ON \`_artwork_page_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`blog_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`blog_page__status_idx\` ON \`blog_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` ADD \`latest\` integer;`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_blog_page_v_version_version__status_idx\` ON \`_blog_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_blog_page_v_latest_idx\` ON \`_blog_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_blog_page_v_autosave_idx\` ON \`_blog_page_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`site_settings__status_idx\` ON \`site_settings\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`latest\` integer;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version__status_idx\` ON \`_site_settings_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_latest_idx\` ON \`_site_settings_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_autosave_idx\` ON \`_site_settings_v\` (\`autosave\`);`)
}

/**
 * SQLite can only relax a column by rebuilding its table, and dropping a table with foreign keys on
 * deletes every row that points at it: all the sections, specs and FAQs of each page. The generated
 * statements only switched them off for the first table, so they're off for the whole migration here.
 * Migrations also run without a transaction on this database, so this adds one: a failure part way
 * undoes everything. The pragma has to come first, as it does nothing inside a transaction.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql.raw('PRAGMA foreign_keys = OFF'))
  await db.run(sql.raw('BEGIN'))
  try {
    await changeTables(db)
    await db.run(sql.raw('COMMIT'))
  } catch (err) {
    await db.run(sql.raw('ROLLBACK'))
    throw err
  } finally {
    await db.run(sql.raw('PRAGMA foreign_keys = ON'))
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_categories\` (
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
  await db.run(sql`INSERT INTO \`__new_categories\`("id", "title", "kind", "menu_label", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "visible", "updated_at", "created_at") SELECT "id", "title", "kind", "menu_label", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "visible", "updated_at", "created_at" FROM \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories\` RENAME TO \`categories\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`categories_card_image_idx\` ON \`categories\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_menu_icon_idx\` ON \`categories\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_printing_image_idx\` ON \`categories\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_pricing_image_idx\` ON \`categories\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v\` (
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
  await db.run(sql`INSERT INTO \`__new__categories_v\`("id", "parent_id", "version_title", "version_kind", "version_menu_label", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_visible", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_title", "version_kind", "version_menu_label", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_visible", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v\` RENAME TO \`_categories_v\`;`)
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
  await db.run(sql`CREATE TABLE \`__new_products\` (
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
  await db.run(sql`INSERT INTO \`__new_products\`("id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at") SELECT "id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at" FROM \`products\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`ALTER TABLE \`__new_products\` RENAME TO \`products\`;`)
  await db.run(sql`CREATE INDEX \`products_card_image_idx\` ON \`products\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_menu_icon_idx\` ON \`products\` (\`menu_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_printing_image_idx\` ON \`products\` (\`printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_pricing_image_idx\` ON \`products\` (\`pricing_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v\` (
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
  await db.run(sql`INSERT INTO \`__new__products_v\`("id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v\` RENAME TO \`_products_v\`;`)
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
  await db.run(sql`CREATE TABLE \`__new_pages\` (
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
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "intro", "body", "seo_title", "seo_description", "slug", "updated_at", "created_at") SELECT "id", "title", "intro", "body", "seo_title", "seo_description", "slug", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_title", "version_intro", "version_body", "version_seo_title", "version_seo_description", "version_slug", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_title", "version_intro", "version_body", "version_seo_title", "version_seo_description", "version_slug", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category_id\` integer,
  	\`excerpt\` text,
  	\`image_id\` integer,
  	\`body\` text,
  	\`published_at\` text,
  	\`author\` text DEFAULT 'Region Packaging',
  	\`read_minutes\` numeric,
  	\`featured\` integer,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "category_id", "excerpt", "image_id", "body", "published_at", "author", "read_minutes", "featured", "slug", "updated_at", "created_at") SELECT "id", "title", "category_id", "excerpt", "image_id", "body", "published_at", "author", "read_minutes", "featured", "slug", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__posts_v\` (
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
  await db.run(sql`INSERT INTO \`__new__posts_v\`("id", "parent_id", "version_title", "version_category_id", "version_excerpt", "version_image_id", "version_body", "version_published_at", "version_author", "version_read_minutes", "version_featured", "version_slug", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_title", "version_category_id", "version_excerpt", "version_image_id", "version_body", "version_published_at", "version_author", "version_read_minutes", "version_featured", "version_slug", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__posts_v\` RENAME TO \`_posts_v\`;`)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_image_idx\` ON \`_posts_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`DROP INDEX \`home_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_home_page_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_home_page_v_latest_idx\`;`)
  await db.run(sql`DROP INDEX \`_home_page_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` DROP COLUMN \`latest\`;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`DROP INDEX \`about_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_about_page_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_about_page_v_latest_idx\`;`)
  await db.run(sql`DROP INDEX \`_about_page_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` DROP COLUMN \`latest\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`DROP INDEX \`artwork_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`artwork_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_artwork_page_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_artwork_page_v_latest_idx\`;`)
  await db.run(sql`DROP INDEX \`_artwork_page_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` DROP COLUMN \`latest\`;`)
  await db.run(sql`ALTER TABLE \`_artwork_page_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`DROP INDEX \`blog_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`blog_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_blog_page_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_blog_page_v_latest_idx\`;`)
  await db.run(sql`DROP INDEX \`_blog_page_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` DROP COLUMN \`latest\`;`)
  await db.run(sql`ALTER TABLE \`_blog_page_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`DROP INDEX \`site_settings__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_site_settings_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_site_settings_v_latest_idx\`;`)
  await db.run(sql`DROP INDEX \`_site_settings_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`latest\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`CREATE TABLE \`__new_categories_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_overview_body\`;`)
  await db.run(sql`DROP TABLE \`categories_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_overview_body\` RENAME TO \`categories_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_overview_body_order_idx\` ON \`categories_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_overview_body_parent_id_idx\` ON \`categories_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`categories_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_benefits_body\` RENAME TO \`categories_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_order_idx\` ON \`categories_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_benefits_body_parent_id_idx\` ON \`categories_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_printing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_printing_body\` RENAME TO \`categories_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_printing_body_order_idx\` ON \`categories_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_body_parent_id_idx\` ON \`categories_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_pricing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`categories_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`categories_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_pricing_body\` RENAME TO \`categories_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_order_idx\` ON \`categories_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_body_parent_id_idx\` ON \`categories_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_overview_body\` RENAME TO \`_categories_v_version_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_order_idx\` ON \`_categories_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_overview_body_parent_id_idx\` ON \`_categories_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_benefits_body\` RENAME TO \`_categories_v_version_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_order_idx\` ON \`_categories_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_benefits_body_parent_id_idx\` ON \`_categories_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_printing_body\` RENAME TO \`_categories_v_version_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_order_idx\` ON \`_categories_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_body_parent_id_idx\` ON \`_categories_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_pricing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_pricing_body\` RENAME TO \`_categories_v_version_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_order_idx\` ON \`_categories_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_body_parent_id_idx\` ON \`_categories_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_overview_body\`;`)
  await db.run(sql`DROP TABLE \`products_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_overview_body\` RENAME TO \`products_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`products_overview_body_order_idx\` ON \`products_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_overview_body_parent_id_idx\` ON \`products_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`products_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_benefits_body\` RENAME TO \`products_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`products_benefits_body_order_idx\` ON \`products_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_benefits_body_parent_id_idx\` ON \`products_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_printing_body\`;`)
  await db.run(sql`DROP TABLE \`products_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_printing_body\` RENAME TO \`products_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`products_printing_body_order_idx\` ON \`products_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_body_parent_id_idx\` ON \`products_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_pricing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`products_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_pricing_body\` RENAME TO \`products_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`products_pricing_body_order_idx\` ON \`products_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_body_parent_id_idx\` ON \`products_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_overview_body\` RENAME TO \`_products_v_version_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_order_idx\` ON \`_products_v_version_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_body_parent_id_idx\` ON \`_products_v_version_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_benefits_body\` RENAME TO \`_products_v_version_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_order_idx\` ON \`_products_v_version_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_benefits_body_parent_id_idx\` ON \`_products_v_version_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_printing_body\` RENAME TO \`_products_v_version_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_order_idx\` ON \`_products_v_version_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_body_parent_id_idx\` ON \`_products_v_version_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_pricing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_pricing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_products_v_version_pricing_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_pricing_body\` RENAME TO \`_products_v_version_pricing_body\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_order_idx\` ON \`_products_v_version_pricing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_body_parent_id_idx\` ON \`_products_v_version_pricing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_quantity_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_quantity_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_quantity_body\` RENAME TO \`home_page_quantity_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_order_idx\` ON \`home_page_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_quantity_body_parent_id_idx\` ON \`home_page_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_design_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_design_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_design_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_design_body\` RENAME TO \`home_page_design_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_design_body_order_idx\` ON \`home_page_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_design_body_parent_id_idx\` ON \`home_page_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_logo_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`home_page_logo_body\`;`)
  await db.run(sql`DROP TABLE \`home_page_logo_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_logo_body\` RENAME TO \`home_page_logo_body\`;`)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_order_idx\` ON \`home_page_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_logo_body_parent_id_idx\` ON \`home_page_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_quantity_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_quantity_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_quantity_body\` RENAME TO \`_home_page_v_version_quantity_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_order_idx\` ON \`_home_page_v_version_quantity_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_quantity_body_parent_id_idx\` ON \`_home_page_v_version_quantity_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_design_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_design_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_design_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_design_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_design_body\` RENAME TO \`_home_page_v_version_design_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_order_idx\` ON \`_home_page_v_version_design_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_design_body_parent_id_idx\` ON \`_home_page_v_version_design_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__home_page_v_version_logo_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__home_page_v_version_logo_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__home_page_v_version_logo_body\` RENAME TO \`_home_page_v_version_logo_body\`;`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_order_idx\` ON \`_home_page_v_version_logo_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_logo_body_parent_id_idx\` ON \`_home_page_v_version_logo_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_about_page_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_about_page_who_we_are_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`about_page_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`about_page_who_we_are_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_about_page_who_we_are_body\` RENAME TO \`about_page_who_we_are_body\`;`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_order_idx\` ON \`about_page_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_parent_id_idx\` ON \`about_page_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__about_page_v_version_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__about_page_v_version_who_we_are_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__about_page_v_version_who_we_are_body\` RENAME TO \`_about_page_v_version_who_we_are_body\`;`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_order_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_who_we_are_body_parent_id_idx\` ON \`_about_page_v_version_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_overview_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_overview_body\` RENAME TO \`site_settings_sub_product_defaults_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_order_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_overview_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_benefits_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_benefits_body\` RENAME TO \`site_settings_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_order_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_benefits_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_printing_body\`("_order", "_parent_id", "id", "paragraph") SELECT "_order", "_parent_id", "id", "paragraph" FROM \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_printing_body\` RENAME TO \`site_settings_sub_product_defaults_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_order_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_overview_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_overview_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_overview_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_overview_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_overview_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_overview_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_benefits_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_benefits_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_benefits_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_benefits_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_benefits_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_benefits_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_printing_body\`("_order", "_parent_id", "id", "paragraph", "_uuid") SELECT "_order", "_parent_id", "id", "paragraph", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_body\` RENAME TO \`_site_settings_v_version_sub_product_defaults_printing_body\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_body\` (\`_parent_id\`);`)
}
