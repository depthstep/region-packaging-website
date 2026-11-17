import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`categories_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_cards_icon_idx\` ON \`categories_pricing_cards\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_cards_icon_idx\` ON \`_categories_v_version_pricing_cards\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`products_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`products_pricing_cards_icon_idx\` ON \`products_pricing_cards\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v_version_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_cards_icon_idx\` ON \`_products_v_version_pricing_cards\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_product_defaults_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_pricing_cards_icon_idx\` ON \`site_settings_product_defaults_pricing_cards\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`_site_settings_v_version_product_defaults_pricing_cards\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_pricing_cards__idx\` ON \`_site_settings_v_version_product_defaults_pricing_cards\` (\`icon_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_categories_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_categories_pricing_cards\`("_order", "_parent_id", "id", "title", "text") SELECT "_order", "_parent_id", "id", "title", "text" FROM \`categories_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`categories_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_categories_pricing_cards\` RENAME TO \`categories_pricing_cards\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`categories_pricing_cards_order_idx\` ON \`categories_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_pricing_cards_parent_id_idx\` ON \`categories_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__categories_v_version_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__categories_v_version_pricing_cards\`("_order", "_parent_id", "id", "title", "text", "_uuid") SELECT "_order", "_parent_id", "id", "title", "text", "_uuid" FROM \`_categories_v_version_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new__categories_v_version_pricing_cards\` RENAME TO \`_categories_v_version_pricing_cards\`;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_cards_order_idx\` ON \`_categories_v_version_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_pricing_cards_parent_id_idx\` ON \`_categories_v_version_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products_pricing_cards\`("_order", "_parent_id", "id", "title", "text") SELECT "_order", "_parent_id", "id", "title", "text" FROM \`products_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_products_pricing_cards\` RENAME TO \`products_pricing_cards\`;`)
  await db.run(sql`CREATE INDEX \`products_pricing_cards_order_idx\` ON \`products_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_pricing_cards_parent_id_idx\` ON \`products_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v_version_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__products_v_version_pricing_cards\`("_order", "_parent_id", "id", "title", "text", "_uuid") SELECT "_order", "_parent_id", "id", "title", "text", "_uuid" FROM \`_products_v_version_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v_version_pricing_cards\` RENAME TO \`_products_v_version_pricing_cards\`;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_cards_order_idx\` ON \`_products_v_version_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_pricing_cards_parent_id_idx\` ON \`_products_v_version_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_product_defaults_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_product_defaults_pricing_cards\`("_order", "_parent_id", "id", "title", "text") SELECT "_order", "_parent_id", "id", "title", "text" FROM \`site_settings_product_defaults_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`site_settings_product_defaults_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_product_defaults_pricing_cards\` RENAME TO \`site_settings_product_defaults_pricing_cards\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_pricing_cards_order_idx\` ON \`site_settings_product_defaults_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_product_defaults_pricing_cards_parent_id_idx\` ON \`site_settings_product_defaults_pricing_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_product_defaults_pricing_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_product_defaults_pricing_cards\`("_order", "_parent_id", "id", "title", "text", "_uuid") SELECT "_order", "_parent_id", "id", "title", "text", "_uuid" FROM \`_site_settings_v_version_product_defaults_pricing_cards\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_product_defaults_pricing_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_product_defaults_pricing_cards\` RENAME TO \`_site_settings_v_version_product_defaults_pricing_cards\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_pricing_cards_order_idx\` ON \`_site_settings_v_version_product_defaults_pricing_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_product_defaults_pricing_cards_parent_id_idx\` ON \`_site_settings_v_version_product_defaults_pricing_cards\` (\`_parent_id\`);`)
}
