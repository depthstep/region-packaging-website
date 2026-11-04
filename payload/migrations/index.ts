import * as migration_20261028_183617_initial from './20261028_183617_initial';
import * as migration_20261028_215318_contact_page from './20261028_215318_contact_page';
import * as migration_20261029_163911_about_page from './20261029_163911_about_page';
import * as migration_20261102_114316_blog_artwork_subproducts from './20261102_114316_blog_artwork_subproducts';
import * as migration_20261104_095009_seo_login_simple_pages from './20261104_095009_seo_login_simple_pages';

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
    name: '20261104_095009_seo_login_simple_pages'
  },
];
