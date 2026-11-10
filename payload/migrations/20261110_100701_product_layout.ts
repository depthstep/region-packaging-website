import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`products_construction_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_construction_body_order_idx\` ON \`products_construction_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_construction_body_parent_id_idx\` ON \`products_construction_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_construction_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_construction_list_order_idx\` ON \`products_construction_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_construction_list_parent_id_idx\` ON \`products_construction_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_addons_items\` (
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
  await db.run(sql`CREATE INDEX \`products_addons_items_order_idx\` ON \`products_addons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_addons_items_parent_id_idx\` ON \`products_addons_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_addons_items_image_idx\` ON \`products_addons_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_construction_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_construction_body_order_idx\` ON \`_products_v_version_construction_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_construction_body_parent_id_idx\` ON \`_products_v_version_construction_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_construction_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_construction_list_order_idx\` ON \`_products_v_version_construction_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_construction_list_parent_id_idx\` ON \`_products_v_version_construction_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_addons_items\` (
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
  await db.run(sql`CREATE INDEX \`_products_v_version_addons_items_order_idx\` ON \`_products_v_version_addons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_addons_items_parent_id_idx\` ON \`_products_v_version_addons_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_addons_items_image_idx\` ON \`_products_v_version_addons_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_construction_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_construction_body_order_idx\` ON \`site_settings_sub_product_defaults_construction_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_construction_body_parent_id_idx\` ON \`site_settings_sub_product_defaults_construction_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_construction_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_construction_list_order_idx\` ON \`site_settings_sub_product_defaults_construction_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_construction_list_parent_id_idx\` ON \`site_settings_sub_product_defaults_construction_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_sub_product_defaults_addons_items\` (
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
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_addons_items_order_idx\` ON \`site_settings_sub_product_defaults_addons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_addons_items_parent_id_idx\` ON \`site_settings_sub_product_defaults_addons_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_addons_items_image_idx\` ON \`site_settings_sub_product_defaults_addons_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_construction_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_construction_body_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_construction_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_construction_body_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_construction_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_construction_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_construction_list_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_construction_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_construction_list_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_construction_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_sub_product_defaults_addons_items\` (
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
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_addons_items_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_addons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_addons_items_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_addons_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_addons_ite_idx\` ON \`_site_settings_v_version_sub_product_defaults_addons_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`categories_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`categories_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`categories_printing_methods_image_idx\` ON \`categories_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`categories_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`categories_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`categories_printing_finishes_image_idx\` ON \`categories_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_methods_image_idx\` ON \`_categories_v_version_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_finishes_image_idx\` ON \`_categories_v_version_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`products_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`products_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`products_printing_methods_image_idx\` ON \`products_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`products_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`products_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`products_printing_finishes_image_idx\` ON \`products_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`construction_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`construction_heading\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`construction_text\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`construction_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`sustainability_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`sustainability_heading\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`sustainability_text\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`sustainability_badge_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`addons_note\` text;`)
  await db.run(sql`CREATE INDEX \`products_construction_construction_image_idx\` ON \`products\` (\`construction_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_sustainability_sustainability_badge_idx\` ON \`products\` (\`sustainability_badge_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v_version_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v_version_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_methods_image_idx\` ON \`_products_v_version_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v_version_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v_version_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_finishes_image_idx\` ON \`_products_v_version_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_construction_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_construction_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_construction_text\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_construction_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_sustainability_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_sustainability_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_sustainability_text\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_sustainability_badge_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_addons_note\` text;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_construction_version_construction_im_idx\` ON \`_products_v\` (\`version_construction_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_sustainability_version_sustainabilit_idx\` ON \`_products_v\` (\`version_sustainability_badge_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_sub_product_defaults_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_sub_product_defaults_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_methods_imag_idx\` ON \`site_settings_sub_product_defaults_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_sub_product_defaults_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_sub_product_defaults_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_finishes_ima_idx\` ON \`site_settings_sub_product_defaults_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_option_material\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_option_printing\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_option_finishes\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_tabs_option_addons\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_construction_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_construction_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_construction_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_construction_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_sustainability_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_sustainability_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_sustainability_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_sustainability_badge_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`sub_product_defaults_addons_note\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_construction_sub_prod_idx\` ON \`site_settings\` (\`sub_product_defaults_construction_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_sustainability_sub_pr_idx\` ON \`site_settings\` (\`sub_product_defaults_sustainability_badge_id\`);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v_version_sub_product_defaults_printing_methods\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v_version_sub_product_defaults_printing_methods\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_m_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_methods\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v_version_sub_product_defaults_printing_finishes\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v_version_sub_product_defaults_printing_finishes\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_f_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_tabs_option_material\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_tabs_option_printing\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_tabs_option_finishes\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_tabs_option_addons\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_construction_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_construction_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_construction_text\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_construction_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_printing_finishes_note\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_sustainability_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_sustainability_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_sustainability_text\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_sustainability_badge_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_sub_product_defaults_addons_note\` text;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_constructi_idx\` ON \`_site_settings_v\` (\`version_sub_product_defaults_construction_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_sustainabi_idx\` ON \`_site_settings_v\` (\`version_sub_product_defaults_sustainability_badge_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`products_construction_body\`;`)
  await db.run(sql`DROP TABLE \`products_construction_list\`;`)
  await db.run(sql`DROP TABLE \`products_addons_items\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_construction_body\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_construction_list\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_addons_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_construction_body\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_construction_list\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_addons_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_construction_body\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_construction_list\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_addons_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_categories_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_printing_methods\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`categories_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_printing_methods\` RENAME TO \`categories_printing_methods\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`categories_printing_methods_order_idx\` ON \`categories_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_methods_parent_id_idx\` ON \`categories_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_categories_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_printing_finishes\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`categories_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`categories_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_printing_finishes\` RENAME TO \`categories_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`categories_printing_finishes_order_idx\` ON \`categories_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_printing_finishes_parent_id_idx\` ON \`categories_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_printing_methods\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_categories_v_version_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_printing_methods\` RENAME TO \`_categories_v_version_printing_methods\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_methods_order_idx\` ON \`_categories_v_version_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_methods_parent_id_idx\` ON \`_categories_v_version_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_printing_finishes\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_categories_v_version_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_printing_finishes\` RENAME TO \`_categories_v_version_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_finishes_order_idx\` ON \`_categories_v_version_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_printing_finishes_parent_id_idx\` ON \`_categories_v_version_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_printing_methods\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`products_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`products_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_printing_methods\` RENAME TO \`products_printing_methods\`;`)
  await db.run(sql`CREATE INDEX \`products_printing_methods_order_idx\` ON \`products_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_methods_parent_id_idx\` ON \`products_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_printing_finishes\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`products_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`products_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_printing_finishes\` RENAME TO \`products_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`products_printing_finishes_order_idx\` ON \`products_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_printing_finishes_parent_id_idx\` ON \`products_printing_finishes\` (\`_parent_id\`);`)
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
  await db.run(sql`INSERT INTO \`__new_products\`("id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at", "_status") SELECT "id", "title", "card_text", "card_image_id", "menu_icon_id", "rating_text", "short_description", "explore_eyebrow", "explore_heading", "explore_text", "overview_eyebrow", "overview_heading", "overview_text", "benefits_eyebrow", "benefits_heading", "benefits_text", "specs_eyebrow", "specs_heading", "specs_text", "specs_stock_sizes_heading", "specs_note", "materials_eyebrow", "materials_heading", "materials_text", "materials_note", "printing_eyebrow", "printing_heading", "printing_text", "printing_image_id", "printing_methods_heading", "printing_finishes_heading", "use_cases_eyebrow", "use_cases_heading", "use_cases_text", "use_cases_note", "how_to_order_eyebrow", "how_to_order_heading", "how_to_order_text", "how_to_order_note", "pricing_eyebrow", "pricing_heading", "pricing_text", "pricing_image_id", "why_us_eyebrow", "why_us_heading", "why_us_text", "why_us_note", "faqs_eyebrow", "faqs_heading", "faqs_text", "seo_title", "seo_description", "slug", "order", "status", "updated_at", "created_at", "_status" FROM \`products\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__products_v_version_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_printing_methods\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_products_v_version_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_printing_methods\` RENAME TO \`_products_v_version_printing_methods\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_methods_order_idx\` ON \`_products_v_version_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_methods_parent_id_idx\` ON \`_products_v_version_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_printing_finishes\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_products_v_version_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_printing_finishes\` RENAME TO \`_products_v_version_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_finishes_order_idx\` ON \`_products_v_version_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_printing_finishes_parent_id_idx\` ON \`_products_v_version_printing_finishes\` (\`_parent_id\`);`)
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
  await db.run(sql`INSERT INTO \`__new__products_v\`("id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_card_text", "version_card_image_id", "version_menu_icon_id", "version_rating_text", "version_short_description", "version_explore_eyebrow", "version_explore_heading", "version_explore_text", "version_overview_eyebrow", "version_overview_heading", "version_overview_text", "version_benefits_eyebrow", "version_benefits_heading", "version_benefits_text", "version_specs_eyebrow", "version_specs_heading", "version_specs_text", "version_specs_stock_sizes_heading", "version_specs_note", "version_materials_eyebrow", "version_materials_heading", "version_materials_text", "version_materials_note", "version_printing_eyebrow", "version_printing_heading", "version_printing_text", "version_printing_image_id", "version_printing_methods_heading", "version_printing_finishes_heading", "version_use_cases_eyebrow", "version_use_cases_heading", "version_use_cases_text", "version_use_cases_note", "version_how_to_order_eyebrow", "version_how_to_order_heading", "version_how_to_order_text", "version_how_to_order_note", "version_pricing_eyebrow", "version_pricing_heading", "version_pricing_text", "version_pricing_image_id", "version_why_us_eyebrow", "version_why_us_heading", "version_why_us_text", "version_why_us_note", "version_faqs_eyebrow", "version_faqs_heading", "version_faqs_text", "version_seo_title", "version_seo_description", "version_slug", "version_order", "version_status", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave" FROM \`_products_v\`;`)
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
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_printing_methods\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`site_settings_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_printing_methods\` RENAME TO \`site_settings_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_methods_order_idx\` ON \`site_settings_sub_product_defaults_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_methods_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_sub_product_defaults_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_sub_product_defaults_printing_finishes\`("_order", "_parent_id", "id", "name", "description") SELECT "_order", "_parent_id", "id", "name", "description" FROM \`site_settings_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`site_settings_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_sub_product_defaults_printing_finishes\` RENAME TO \`site_settings_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_finishes_order_idx\` ON \`site_settings_sub_product_defaults_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_finishes_parent_id_idx\` ON \`site_settings_sub_product_defaults_printing_finishes\` (\`_parent_id\`);`)
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
  	\`page_intros_products_heading\` text,
  	\`page_intros_products_text\` text,
  	\`page_intros_products_seo_title\` text,
  	\`page_intros_products_seo_description\` text,
  	\`page_intros_faqs_heading\` text,
  	\`page_intros_faqs_text\` text,
  	\`page_intros_faqs_seo_title\` text,
  	\`page_intros_faqs_seo_description\` text,
  	\`page_intros_how_to_order_heading\` text,
  	\`page_intros_how_to_order_text\` text,
  	\`page_intros_how_to_order_seo_title\` text,
  	\`page_intros_how_to_order_seo_description\` text,
  	\`page_intros_quote_heading\` text,
  	\`page_intros_quote_text\` text,
  	\`page_intros_quote_seo_title\` text,
  	\`page_intros_quote_seo_description\` text,
  	\`page_intros_sample_heading\` text,
  	\`page_intros_sample_text\` text,
  	\`page_intros_sample_seo_title\` text,
  	\`page_intros_sample_seo_description\` text,
  	\`sub_product_defaults_tabs_overview\` text,
  	\`sub_product_defaults_tabs_specs\` text,
  	\`sub_product_defaults_tabs_materials\` text,
  	\`sub_product_defaults_tabs_why\` text,
  	\`sub_product_defaults_tabs_faq\` text,
  	\`sub_product_defaults_short_description\` text,
  	\`sub_product_defaults_overview_eyebrow\` text,
  	\`sub_product_defaults_overview_heading\` text,
  	\`sub_product_defaults_overview_text\` text,
  	\`sub_product_defaults_benefits_eyebrow\` text,
  	\`sub_product_defaults_benefits_heading\` text,
  	\`sub_product_defaults_benefits_text\` text,
  	\`sub_product_defaults_specs_eyebrow\` text,
  	\`sub_product_defaults_specs_heading\` text,
  	\`sub_product_defaults_specs_text\` text,
  	\`sub_product_defaults_specs_stock_sizes_heading\` text,
  	\`sub_product_defaults_specs_note\` text,
  	\`sub_product_defaults_materials_eyebrow\` text,
  	\`sub_product_defaults_materials_heading\` text,
  	\`sub_product_defaults_materials_text\` text,
  	\`sub_product_defaults_materials_note\` text,
  	\`sub_product_defaults_printing_eyebrow\` text,
  	\`sub_product_defaults_printing_heading\` text,
  	\`sub_product_defaults_printing_text\` text,
  	\`sub_product_defaults_printing_image_id\` integer,
  	\`sub_product_defaults_printing_methods_heading\` text,
  	\`sub_product_defaults_printing_finishes_heading\` text,
  	\`sub_product_defaults_use_cases_eyebrow\` text,
  	\`sub_product_defaults_use_cases_heading\` text,
  	\`sub_product_defaults_use_cases_text\` text,
  	\`sub_product_defaults_use_cases_note\` text,
  	\`sub_product_defaults_why_us_eyebrow\` text,
  	\`sub_product_defaults_why_us_heading\` text,
  	\`sub_product_defaults_why_us_text\` text,
  	\`sub_product_defaults_why_us_note\` text,
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
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`sub_product_defaults_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contact_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`footer_payment_logos_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "page_intros_products_heading", "page_intros_products_text", "page_intros_products_seo_title", "page_intros_products_seo_description", "page_intros_faqs_heading", "page_intros_faqs_text", "page_intros_faqs_seo_title", "page_intros_faqs_seo_description", "page_intros_how_to_order_heading", "page_intros_how_to_order_text", "page_intros_how_to_order_seo_title", "page_intros_how_to_order_seo_description", "page_intros_quote_heading", "page_intros_quote_text", "page_intros_quote_seo_title", "page_intros_quote_seo_description", "page_intros_sample_heading", "page_intros_sample_text", "page_intros_sample_seo_title", "page_intros_sample_seo_description", "sub_product_defaults_tabs_overview", "sub_product_defaults_tabs_specs", "sub_product_defaults_tabs_materials", "sub_product_defaults_tabs_why", "sub_product_defaults_tabs_faq", "sub_product_defaults_short_description", "sub_product_defaults_overview_eyebrow", "sub_product_defaults_overview_heading", "sub_product_defaults_overview_text", "sub_product_defaults_benefits_eyebrow", "sub_product_defaults_benefits_heading", "sub_product_defaults_benefits_text", "sub_product_defaults_specs_eyebrow", "sub_product_defaults_specs_heading", "sub_product_defaults_specs_text", "sub_product_defaults_specs_stock_sizes_heading", "sub_product_defaults_specs_note", "sub_product_defaults_materials_eyebrow", "sub_product_defaults_materials_heading", "sub_product_defaults_materials_text", "sub_product_defaults_materials_note", "sub_product_defaults_printing_eyebrow", "sub_product_defaults_printing_heading", "sub_product_defaults_printing_text", "sub_product_defaults_printing_image_id", "sub_product_defaults_printing_methods_heading", "sub_product_defaults_printing_finishes_heading", "sub_product_defaults_use_cases_eyebrow", "sub_product_defaults_use_cases_heading", "sub_product_defaults_use_cases_text", "sub_product_defaults_use_cases_note", "sub_product_defaults_why_us_eyebrow", "sub_product_defaults_why_us_heading", "sub_product_defaults_why_us_text", "sub_product_defaults_why_us_note", "contact_heading", "contact_text", "contact_image_id", "contact_call_label", "contact_email_label", "contact_card_heading", "contact_card_text", "contact_card_button_label", "contact_card_button_href", "contact_form_heading", "contact_form_text", "contact_button_label", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "_status", "updated_at", "created_at") SELECT "id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "page_intros_products_heading", "page_intros_products_text", "page_intros_products_seo_title", "page_intros_products_seo_description", "page_intros_faqs_heading", "page_intros_faqs_text", "page_intros_faqs_seo_title", "page_intros_faqs_seo_description", "page_intros_how_to_order_heading", "page_intros_how_to_order_text", "page_intros_how_to_order_seo_title", "page_intros_how_to_order_seo_description", "page_intros_quote_heading", "page_intros_quote_text", "page_intros_quote_seo_title", "page_intros_quote_seo_description", "page_intros_sample_heading", "page_intros_sample_text", "page_intros_sample_seo_title", "page_intros_sample_seo_description", "sub_product_defaults_tabs_overview", "sub_product_defaults_tabs_specs", "sub_product_defaults_tabs_materials", "sub_product_defaults_tabs_why", "sub_product_defaults_tabs_faq", "sub_product_defaults_short_description", "sub_product_defaults_overview_eyebrow", "sub_product_defaults_overview_heading", "sub_product_defaults_overview_text", "sub_product_defaults_benefits_eyebrow", "sub_product_defaults_benefits_heading", "sub_product_defaults_benefits_text", "sub_product_defaults_specs_eyebrow", "sub_product_defaults_specs_heading", "sub_product_defaults_specs_text", "sub_product_defaults_specs_stock_sizes_heading", "sub_product_defaults_specs_note", "sub_product_defaults_materials_eyebrow", "sub_product_defaults_materials_heading", "sub_product_defaults_materials_text", "sub_product_defaults_materials_note", "sub_product_defaults_printing_eyebrow", "sub_product_defaults_printing_heading", "sub_product_defaults_printing_text", "sub_product_defaults_printing_image_id", "sub_product_defaults_printing_methods_heading", "sub_product_defaults_printing_finishes_heading", "sub_product_defaults_use_cases_eyebrow", "sub_product_defaults_use_cases_heading", "sub_product_defaults_use_cases_text", "sub_product_defaults_use_cases_note", "sub_product_defaults_why_us_eyebrow", "sub_product_defaults_why_us_heading", "sub_product_defaults_why_us_text", "sub_product_defaults_why_us_note", "contact_heading", "contact_text", "contact_image_id", "contact_call_label", "contact_email_label", "contact_card_heading", "contact_card_text", "contact_card_button_label", "contact_card_button_href", "contact_form_heading", "contact_form_text", "contact_button_label", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "_status", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_sub_product_defaults_printing_sub_product__idx\` ON \`site_settings\` (\`sub_product_defaults_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_contact_image_idx\` ON \`site_settings\` (\`contact_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_footer_payment_logos_idx\` ON \`site_settings\` (\`footer_payment_logos_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings__status_idx\` ON \`site_settings\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_methods\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_printing_methods\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_methods\` RENAME TO \`_site_settings_v_version_sub_product_defaults_printing_methods\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_methods_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_methods\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_methods_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_methods\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_sub_product_defaults_printing_finishes\`("_order", "_parent_id", "id", "name", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "description", "_uuid" FROM \`_site_settings_v_version_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_sub_product_defaults_printing_finishes\` RENAME TO \`_site_settings_v_version_sub_product_defaults_printing_finishes\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_finishes_order_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_finishes_parent_id_idx\` ON \`_site_settings_v_version_sub_product_defaults_printing_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v\` (
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
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_sub_product_defaults_printing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contact_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_footer_payment_logos_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v\`("id", "version_announcement", "version_phone", "version_email", "version_menu_promo_title", "version_menu_promo_text", "version_menu_promo_button_label", "version_menu_promo_href", "version_trusted_heading", "version_google_score", "version_google_label", "version_google_count_text", "version_google_review_url", "version_reviews_section_eyebrow", "version_reviews_section_heading", "version_reviews_section_text", "version_reviews_section_button_label", "version_product_defaults_explore_eyebrow", "version_product_defaults_how_to_order_eyebrow", "version_product_defaults_how_to_order_heading", "version_product_defaults_how_to_order_text", "version_product_defaults_pricing_eyebrow", "version_product_defaults_pricing_heading", "version_product_defaults_pricing_text", "version_product_defaults_why_us_eyebrow", "version_product_defaults_why_us_heading", "version_product_defaults_why_us_text", "version_product_defaults_faqs_eyebrow", "version_product_defaults_faqs_heading", "version_product_defaults_faqs_text", "version_product_defaults_related_heading_eyebrow", "version_product_defaults_related_heading_heading", "version_product_defaults_related_heading_text", "version_product_defaults_sample_link_label", "version_product_defaults_form_note", "version_page_intros_products_heading", "version_page_intros_products_text", "version_page_intros_products_seo_title", "version_page_intros_products_seo_description", "version_page_intros_faqs_heading", "version_page_intros_faqs_text", "version_page_intros_faqs_seo_title", "version_page_intros_faqs_seo_description", "version_page_intros_how_to_order_heading", "version_page_intros_how_to_order_text", "version_page_intros_how_to_order_seo_title", "version_page_intros_how_to_order_seo_description", "version_page_intros_quote_heading", "version_page_intros_quote_text", "version_page_intros_quote_seo_title", "version_page_intros_quote_seo_description", "version_page_intros_sample_heading", "version_page_intros_sample_text", "version_page_intros_sample_seo_title", "version_page_intros_sample_seo_description", "version_sub_product_defaults_tabs_overview", "version_sub_product_defaults_tabs_specs", "version_sub_product_defaults_tabs_materials", "version_sub_product_defaults_tabs_why", "version_sub_product_defaults_tabs_faq", "version_sub_product_defaults_short_description", "version_sub_product_defaults_overview_eyebrow", "version_sub_product_defaults_overview_heading", "version_sub_product_defaults_overview_text", "version_sub_product_defaults_benefits_eyebrow", "version_sub_product_defaults_benefits_heading", "version_sub_product_defaults_benefits_text", "version_sub_product_defaults_specs_eyebrow", "version_sub_product_defaults_specs_heading", "version_sub_product_defaults_specs_text", "version_sub_product_defaults_specs_stock_sizes_heading", "version_sub_product_defaults_specs_note", "version_sub_product_defaults_materials_eyebrow", "version_sub_product_defaults_materials_heading", "version_sub_product_defaults_materials_text", "version_sub_product_defaults_materials_note", "version_sub_product_defaults_printing_eyebrow", "version_sub_product_defaults_printing_heading", "version_sub_product_defaults_printing_text", "version_sub_product_defaults_printing_image_id", "version_sub_product_defaults_printing_methods_heading", "version_sub_product_defaults_printing_finishes_heading", "version_sub_product_defaults_use_cases_eyebrow", "version_sub_product_defaults_use_cases_heading", "version_sub_product_defaults_use_cases_text", "version_sub_product_defaults_use_cases_note", "version_sub_product_defaults_why_us_eyebrow", "version_sub_product_defaults_why_us_heading", "version_sub_product_defaults_why_us_text", "version_sub_product_defaults_why_us_note", "version_contact_heading", "version_contact_text", "version_contact_image_id", "version_contact_call_label", "version_contact_email_label", "version_contact_card_heading", "version_contact_card_text", "version_contact_card_button_label", "version_contact_card_button_href", "version_contact_form_heading", "version_contact_form_text", "version_contact_button_label", "version_cta_heading", "version_cta_text", "version_cta_primary_label", "version_cta_primary_href", "version_cta_secondary_label", "version_cta_secondary_href", "version_cta_coupon_amount", "version_cta_coupon_label", "version_cta_coupon_code", "version_cta_coupon_button_label", "version_cta_coupon_note", "version_footer_blurb", "version_footer_newsletter_title", "version_footer_newsletter_text", "version_footer_newsletter_placeholder", "version_footer_newsletter_button", "version_footer_follow_label", "version_footer_payments_label", "version_footer_payment_logos_id", "version_footer_copyright", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest", "autosave") SELECT "id", "version_announcement", "version_phone", "version_email", "version_menu_promo_title", "version_menu_promo_text", "version_menu_promo_button_label", "version_menu_promo_href", "version_trusted_heading", "version_google_score", "version_google_label", "version_google_count_text", "version_google_review_url", "version_reviews_section_eyebrow", "version_reviews_section_heading", "version_reviews_section_text", "version_reviews_section_button_label", "version_product_defaults_explore_eyebrow", "version_product_defaults_how_to_order_eyebrow", "version_product_defaults_how_to_order_heading", "version_product_defaults_how_to_order_text", "version_product_defaults_pricing_eyebrow", "version_product_defaults_pricing_heading", "version_product_defaults_pricing_text", "version_product_defaults_why_us_eyebrow", "version_product_defaults_why_us_heading", "version_product_defaults_why_us_text", "version_product_defaults_faqs_eyebrow", "version_product_defaults_faqs_heading", "version_product_defaults_faqs_text", "version_product_defaults_related_heading_eyebrow", "version_product_defaults_related_heading_heading", "version_product_defaults_related_heading_text", "version_product_defaults_sample_link_label", "version_product_defaults_form_note", "version_page_intros_products_heading", "version_page_intros_products_text", "version_page_intros_products_seo_title", "version_page_intros_products_seo_description", "version_page_intros_faqs_heading", "version_page_intros_faqs_text", "version_page_intros_faqs_seo_title", "version_page_intros_faqs_seo_description", "version_page_intros_how_to_order_heading", "version_page_intros_how_to_order_text", "version_page_intros_how_to_order_seo_title", "version_page_intros_how_to_order_seo_description", "version_page_intros_quote_heading", "version_page_intros_quote_text", "version_page_intros_quote_seo_title", "version_page_intros_quote_seo_description", "version_page_intros_sample_heading", "version_page_intros_sample_text", "version_page_intros_sample_seo_title", "version_page_intros_sample_seo_description", "version_sub_product_defaults_tabs_overview", "version_sub_product_defaults_tabs_specs", "version_sub_product_defaults_tabs_materials", "version_sub_product_defaults_tabs_why", "version_sub_product_defaults_tabs_faq", "version_sub_product_defaults_short_description", "version_sub_product_defaults_overview_eyebrow", "version_sub_product_defaults_overview_heading", "version_sub_product_defaults_overview_text", "version_sub_product_defaults_benefits_eyebrow", "version_sub_product_defaults_benefits_heading", "version_sub_product_defaults_benefits_text", "version_sub_product_defaults_specs_eyebrow", "version_sub_product_defaults_specs_heading", "version_sub_product_defaults_specs_text", "version_sub_product_defaults_specs_stock_sizes_heading", "version_sub_product_defaults_specs_note", "version_sub_product_defaults_materials_eyebrow", "version_sub_product_defaults_materials_heading", "version_sub_product_defaults_materials_text", "version_sub_product_defaults_materials_note", "version_sub_product_defaults_printing_eyebrow", "version_sub_product_defaults_printing_heading", "version_sub_product_defaults_printing_text", "version_sub_product_defaults_printing_image_id", "version_sub_product_defaults_printing_methods_heading", "version_sub_product_defaults_printing_finishes_heading", "version_sub_product_defaults_use_cases_eyebrow", "version_sub_product_defaults_use_cases_heading", "version_sub_product_defaults_use_cases_text", "version_sub_product_defaults_use_cases_note", "version_sub_product_defaults_why_us_eyebrow", "version_sub_product_defaults_why_us_heading", "version_sub_product_defaults_why_us_text", "version_sub_product_defaults_why_us_note", "version_contact_heading", "version_contact_text", "version_contact_image_id", "version_contact_call_label", "version_contact_email_label", "version_contact_card_heading", "version_contact_card_text", "version_contact_card_button_label", "version_contact_card_button_href", "version_contact_form_heading", "version_contact_form_text", "version_contact_button_label", "version_cta_heading", "version_cta_text", "version_cta_primary_label", "version_cta_primary_href", "version_cta_secondary_label", "version_cta_secondary_href", "version_cta_coupon_amount", "version_cta_coupon_label", "version_cta_coupon_code", "version_cta_coupon_button_label", "version_cta_coupon_note", "version_footer_blurb", "version_footer_newsletter_title", "version_footer_newsletter_text", "version_footer_newsletter_placeholder", "version_footer_newsletter_button", "version_footer_follow_label", "version_footer_payments_label", "version_footer_payment_logos_id", "version_footer_copyright", "version__status", "version_updated_at", "version_created_at", "created_at", "updated_at", "latest", "autosave" FROM \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v\` RENAME TO \`_site_settings_v\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_sub_product_defaults_printing_v_idx\` ON \`_site_settings_v\` (\`version_sub_product_defaults_printing_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_contact_version_contact_image_idx\` ON \`_site_settings_v\` (\`version_contact_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_version_footer_payment_l_idx\` ON \`_site_settings_v\` (\`version_footer_payment_logos_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version__status_idx\` ON \`_site_settings_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_latest_idx\` ON \`_site_settings_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_autosave_idx\` ON \`_site_settings_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`printing_finishes_note\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` DROP COLUMN \`version_printing_finishes_note\`;`)
}
