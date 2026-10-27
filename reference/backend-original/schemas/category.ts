import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'category', title: 'Category', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'kind', title: 'Menu group', type: 'string',
      options: { list: [{ title: 'Custom Boxes (product type)', value: 'product-type' }, { title: 'Boxes By Industry', value: 'industry' }] } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'visible', title: 'Show on site', type: 'boolean', initialValue: true }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
