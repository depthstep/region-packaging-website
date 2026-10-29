import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`about_page_who_we_are_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_order_idx\` ON \`about_page_who_we_are_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_body_parent_id_idx\` ON \`about_page_who_we_are_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_who_we_are_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_stats_order_idx\` ON \`about_page_who_we_are_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_stats_parent_id_idx\` ON \`about_page_who_we_are_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_values_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_values_items_order_idx\` ON \`about_page_values_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_values_items_parent_id_idx\` ON \`about_page_values_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_values_items_icon_idx\` ON \`about_page_values_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text,
  	\`hero_text\` text,
  	\`hero_button_label\` text,
  	\`hero_button_href\` text,
  	\`mission_mission_heading\` text,
  	\`mission_mission_text\` text,
  	\`mission_mission_icon_id\` integer,
  	\`mission_photo_id\` integer,
  	\`mission_vision_heading\` text,
  	\`mission_vision_text\` text,
  	\`mission_vision_icon_id\` integer,
  	\`who_we_are_eyebrow\` text,
  	\`who_we_are_heading\` text,
  	\`who_we_are_text\` text,
  	\`who_we_are_image_id\` integer,
  	\`products_eyebrow\` text,
  	\`products_heading\` text,
  	\`products_text\` text,
  	\`values_eyebrow\` text,
  	\`values_heading\` text,
  	\`values_text\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`mission_mission_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mission_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mission_vision_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`who_we_are_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_mission_mission_mission_icon_idx\` ON \`about_page\` (\`mission_mission_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_mission_mission_photo_idx\` ON \`about_page\` (\`mission_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_mission_mission_vision_icon_idx\` ON \`about_page\` (\`mission_vision_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_who_we_are_who_we_are_image_idx\` ON \`about_page\` (\`who_we_are_image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_rels_order_idx\` ON \`about_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_rels_parent_idx\` ON \`about_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_rels_path_idx\` ON \`about_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`about_page_rels_media_id_idx\` ON \`about_page_rels\` (\`media_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`about_page_who_we_are_body\`;`)
  await db.run(sql`DROP TABLE \`about_page_who_we_are_stats\`;`)
  await db.run(sql`DROP TABLE \`about_page_values_items\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`about_page_rels\`;`)
}
