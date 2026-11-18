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
import * as migration_20261110_200323_product_layout from './20261110_200323_product_layout';
import * as migration_20261114_054239_paper_weight_quote from './20261114_054239_paper_weight_quote';
import * as migration_20261116_175406_overview_layout from './20261116_175406_overview_layout';
import * as migration_20261116_193023_topbar_tag from './20261116_193023_topbar_tag';
import * as migration_20261117_104754_pricing_card_icons from './20261117_104754_pricing_card_icons';
import * as migration_20261117_171547_quote_size_fields from './20261117_171547_quote_size_fields';
import * as migration_20261118_162441_quote_unit from './20261118_162441_quote_unit';

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
    up: migration_20261110_200323_product_layout.up,
    down: migration_20261110_200323_product_layout.down,
    name: '20261110_200323_product_layout',
  },
  {
    up: migration_20261114_054239_paper_weight_quote.up,
    down: migration_20261114_054239_paper_weight_quote.down,
    name: '20261114_054239_paper_weight_quote',
  },
  {
    up: migration_20261116_175406_overview_layout.up,
    down: migration_20261116_175406_overview_layout.down,
    name: '20261116_175406_overview_layout',
  },
  {
    up: migration_20261116_193023_topbar_tag.up,
    down: migration_20261116_193023_topbar_tag.down,
    name: '20261116_193023_topbar_tag',
  },
  {
    up: migration_20261117_104754_pricing_card_icons.up,
    down: migration_20261117_104754_pricing_card_icons.down,
    name: '20261117_104754_pricing_card_icons',
  },
  {
    up: migration_20261117_171547_quote_size_fields.up,
    down: migration_20261117_171547_quote_size_fields.down,
    name: '20261117_171547_quote_size_fields',
  },
  {
    up: migration_20261118_162441_quote_unit.up,
    down: migration_20261118_162441_quote_unit.down,
    name: '20261118_162441_quote_unit'
  },
];
