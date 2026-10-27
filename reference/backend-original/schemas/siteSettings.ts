import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    defineField({ name: 'announcement', title: 'Top bar message', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'socials', type: 'array', of: [{ type: 'object',
      fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'url' }] }] }),
    defineField({ name: 'menuPromoTitle', type: 'string' }),
    defineField({ name: 'menuPromoText', type: 'text', rows: 2 }),
    defineField({ name: 'menuPromoButton', type: 'string' }),
    defineField({ name: 'stats', type: 'array', of: [{ type: 'object',
      fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }] }),
    defineField({ name: 'resourcesMenu', type: 'array', of: [{ type: 'object',
      fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'string' }] }] }),
  ],
})
