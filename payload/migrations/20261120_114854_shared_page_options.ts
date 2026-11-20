import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_page_options_materials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_materials_order_idx\` ON \`site_settings_page_options_materials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_materials_parent_id_idx\` ON \`site_settings_page_options_materials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_materials_image_idx\` ON \`site_settings_page_options_materials\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_page_options_printing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_printing_order_idx\` ON \`site_settings_page_options_printing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_printing_parent_id_idx\` ON \`site_settings_page_options_printing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_printing_image_idx\` ON \`site_settings_page_options_printing\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_page_options_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_finishes_order_idx\` ON \`site_settings_page_options_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_finishes_parent_id_idx\` ON \`site_settings_page_options_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_finishes_image_idx\` ON \`site_settings_page_options_finishes\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_page_options_addons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_addons_order_idx\` ON \`site_settings_page_options_addons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_addons_parent_id_idx\` ON \`site_settings_page_options_addons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_addons_image_idx\` ON \`site_settings_page_options_addons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_page_options_spec_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_spec_rows_order_idx\` ON \`site_settings_page_options_spec_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_page_options_spec_rows_parent_id_idx\` ON \`site_settings_page_options_spec_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_page_options_materials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_materials_order_idx\` ON \`_site_settings_v_version_page_options_materials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_materials_parent_id_idx\` ON \`_site_settings_v_version_page_options_materials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_materials_image_idx\` ON \`_site_settings_v_version_page_options_materials\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_page_options_printing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_printing_order_idx\` ON \`_site_settings_v_version_page_options_printing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_printing_parent_id_idx\` ON \`_site_settings_v_version_page_options_printing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_printing_image_idx\` ON \`_site_settings_v_version_page_options_printing\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_page_options_finishes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_finishes_order_idx\` ON \`_site_settings_v_version_page_options_finishes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_finishes_parent_id_idx\` ON \`_site_settings_v_version_page_options_finishes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_finishes_image_idx\` ON \`_site_settings_v_version_page_options_finishes\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_page_options_addons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`spec\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_addons_order_idx\` ON \`_site_settings_v_version_page_options_addons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_addons_parent_id_idx\` ON \`_site_settings_v_version_page_options_addons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_addons_image_idx\` ON \`_site_settings_v_version_page_options_addons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_page_options_spec_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_spec_rows_order_idx\` ON \`_site_settings_v_version_page_options_spec_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_page_options_spec_rows_parent_id_idx\` ON \`_site_settings_v_version_page_options_spec_rows\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_page_options_materials\`;`)
  await db.run(sql`DROP TABLE \`site_settings_page_options_printing\`;`)
  await db.run(sql`DROP TABLE \`site_settings_page_options_finishes\`;`)
  await db.run(sql`DROP TABLE \`site_settings_page_options_addons\`;`)
  await db.run(sql`DROP TABLE \`site_settings_page_options_spec_rows\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_page_options_materials\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_page_options_printing\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_page_options_finishes\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_page_options_addons\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_page_options_spec_rows\`;`)
}
