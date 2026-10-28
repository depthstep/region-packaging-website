import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`quote_requests\` ADD \`topic\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_call_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_email_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_card_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_card_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_card_button_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_card_button_href\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_form_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_form_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_button_label\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_contact_image_idx\` ON \`site_settings\` (\`contact_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
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
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "updated_at", "created_at") SELECT "id", "announcement", "phone", "email", "menu_promo_title", "menu_promo_text", "menu_promo_button_label", "menu_promo_href", "trusted_heading", "google_score", "google_label", "google_count_text", "google_review_url", "reviews_section_eyebrow", "reviews_section_heading", "reviews_section_text", "reviews_section_button_label", "product_defaults_explore_eyebrow", "product_defaults_how_to_order_eyebrow", "product_defaults_how_to_order_heading", "product_defaults_how_to_order_text", "product_defaults_pricing_eyebrow", "product_defaults_pricing_heading", "product_defaults_pricing_text", "product_defaults_why_us_eyebrow", "product_defaults_why_us_heading", "product_defaults_why_us_text", "product_defaults_faqs_eyebrow", "product_defaults_faqs_heading", "product_defaults_faqs_text", "product_defaults_related_heading_eyebrow", "product_defaults_related_heading_heading", "product_defaults_related_heading_text", "product_defaults_sample_link_label", "product_defaults_form_note", "cta_heading", "cta_text", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "cta_coupon_amount", "cta_coupon_label", "cta_coupon_code", "cta_coupon_button_label", "cta_coupon_note", "footer_blurb", "footer_newsletter_title", "footer_newsletter_text", "footer_newsletter_placeholder", "footer_newsletter_button", "footer_follow_label", "footer_payments_label", "footer_payment_logos_id", "footer_copyright", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_footer_payment_logos_idx\` ON \`site_settings\` (\`footer_payment_logos_id\`);`)
  await db.run(sql`ALTER TABLE \`quote_requests\` DROP COLUMN \`topic\`;`)
}
