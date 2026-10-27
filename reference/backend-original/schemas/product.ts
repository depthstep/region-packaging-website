import { defineType, defineField } from 'sanity'
const kv = (name: string, title: string, a: string, b: string) => defineField({
  name, title, type: 'array', of: [{ type: 'object', fields: [{ name: a, type: 'string' }, { name: b, type: 'string' }],
    preview: { select: { title: a, subtitle: b } } }] })
export default defineType({
  name: 'product', title: 'Sub-product', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'categories', type: 'array', validation: r => r.min(1),
      of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'status', type: 'string', initialValue: 'draft',
      options: { list: ['draft', 'live', 'hidden'] } }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'shortDescription', type: 'text', rows: 2 }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }] }),
    defineField({ name: 'intro', title: 'Intro / "What are..." text', type: 'array', of: [{ type: 'block' }] }),
    kv('specs', 'Specs (Material, Board, Printing, MOQ...)', 'label', 'value'),
    defineField({ name: 'stockSizes', type: 'array', of: [{ type: 'object',
      fields: [{ name: 'size', type: 'string' }, { name: 'dimensions', type: 'string' }, { name: 'bestFor', type: 'string' }],
      preview: { select: { title: 'size', subtitle: 'dimensions' } } }] }),
    kv('benefits', 'Benefits', 'title', 'text'),
    kv('materials', 'Materials & board options', 'name', 'description'),
    kv('finishes', 'Finishes & add-ons', 'name', 'description'),
    defineField({ name: 'useCases', title: 'Industries & use cases', type: 'array', of: [{ type: 'string' }] }),
    kv('faqs', 'FAQs', 'question', 'answer'),
    defineField({ name: 'related', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title', subtitle: 'status', media: 'images.0' } },
})
