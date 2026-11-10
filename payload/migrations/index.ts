import * as migration_20261028_183617_initial from './20261028_183617_initial';
import * as migration_20261028_215318_contact_page from './20261028_215318_contact_page';
import * as migration_20261029_163911_about_page from './20261029_163911_about_page';
import * as migration_20261102_114316_blog_artwork_subproducts from './20261102_114316_blog_artwork_subproducts';
import * as migration_20261104_095009_seo_login_simple_pages from './20261104_095009_seo_login_simple_pages';
import * as migration_20261105_173053_activity_log_versions from './20261105_173053_activity_log_versions';
import * as migration_20261105_173500_starting_versions from './20261105_173500_starting_versions';
import * as migration_20261105_185355_claude_log from './20261105_185355_claude_log';
import * as migration_20261105_193203_drafts_preview from './20261105_193203_drafts_preview';
import * as migration_20261106_120000_mark_published from './20261106_120000_mark_published';
import * as migration_20261110_100701_product_layout from './20261110_100701_product_layout';

export const migrations = [
  {
    up: migration_20261028_183617_initial.up,
    down: migration_20261028_183617_initial.down,
    name: '20261028_183617_initial',
  },
  {
    up: migration_20261028_215318_contact_page.up,
    down: migration_20261028_215318_contact_page.down,
    name: '20261028_215318_contact_page',
  },
  {
    up: migration_20261029_163911_about_page.up,
    down: migration_20261029_163911_about_page.down,
    name: '20261029_163911_about_page',
  },
  {
    up: migration_20261102_114316_blog_artwork_subproducts.up,
    down: migration_20261102_114316_blog_artwork_subproducts.down,
    name: '20261102_114316_blog_artwork_subproducts',
  },
  {
    up: migration_20261104_095009_seo_login_simple_pages.up,
    down: migration_20261104_095009_seo_login_simple_pages.down,
    name: '20261104_095009_seo_login_simple_pages',
  },
  {
    up: migration_20261105_173053_activity_log_versions.up,
    down: migration_20261105_173053_activity_log_versions.down,
    name: '20261105_173053_activity_log_versions',
  },
  {
    up: migration_20261105_173500_starting_versions.up,
    down: migration_20261105_173500_starting_versions.down,
    name: '20261105_173500_starting_versions',
  },
  {
    up: migration_20261105_185355_claude_log.up,
    down: migration_20261105_185355_claude_log.down,
    name: '20261105_185355_claude_log',
  },
  {
    up: migration_20261105_193203_drafts_preview.up,
    down: migration_20261105_193203_drafts_preview.down,
    name: '20261105_193203_drafts_preview',
  },
  {
    up: migration_20261106_120000_mark_published.up,
    down: migration_20261106_120000_mark_published.down,
    name: '20261106_120000_mark_published',
  },
  {
    up: migration_20261110_100701_product_layout.up,
    down: migration_20261110_100701_product_layout.down,
    name: '20261110_100701_product_layout'
  },
];
