import * as migration_20261028_183617_initial from './20261028_183617_initial';
import * as migration_20261028_215318_contact_page from './20261028_215318_contact_page';

export const migrations = [
  {
    up: migration_20261028_183617_initial.up,
    down: migration_20261028_183617_initial.down,
    name: '20261028_183617_initial',
  },
  {
    up: migration_20261028_215318_contact_page.up,
    down: migration_20261028_215318_contact_page.down,
    name: '20261028_215318_contact_page'
  },
];
