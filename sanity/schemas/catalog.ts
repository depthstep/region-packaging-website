import { defineArrayMember, defineField, defineType } from 'sanity'
import { listingFields, pageFields, pageGroups } from './pageFields'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({ name: 'title', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'main', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'kind',
      title: 'Menu group',
      type: 'string',
      group: 'main',
      initialValue: 'product-type',
      options: { list: [{ title: 'Custom Boxes (product type)', value: 'product-type' }, { title: 'Boxes By Industry', value: 'industry' }], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'menuLabel', title: 'Mega menu column heading', type: 'string', group: 'main', description: 'Empty = title.' }),
    defineField({ name: 'order', type: 'number', group: 'main' }),
    defineField({ name: 'visible', title: 'Show on site', type: 'boolean', group: 'main', initialValue: true }),
    ...listingFields,
    ...pageFields,
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'kind', media: 'cardImage' } },
})

export const product = defineType({
  name: 'product',
  title: 'Sub-product',
  type: 'document',
  groups: pageGroups,
  fields: [
    defineField({ name: 'title', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'main', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'main',
      description: 'The first category sets the URL (/category/product).',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'main',
      initialValue: 'live',
      options: { list: [{ title: 'Live', value: 'live' }, { title: 'Hidden', value: 'hidden' }], layout: 'radio' },
    }),
    defineField({ name: 'order', type: 'number', group: 'main' }),
    ...listingFields,
    ...pageFields,
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'categories.0.title', media: 'cardImage' } },
})
