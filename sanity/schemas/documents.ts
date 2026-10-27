import { defineArrayMember, defineField, defineType } from 'sanity'
import { img } from './fields'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / company', type: 'string' }),
    defineField({ name: 'rating', type: 'number', initialValue: 5, validation: (r) => r.min(1).max(5).integer() }),
    defineField({ name: 'dateText', title: 'Date text (e.g. 2 weeks ago)', type: 'string' }),
    defineField({ name: 'quote', type: 'text', rows: 3, validation: (r) => r.required() }),
    img('avatar', 'Avatar'),
    defineField({ name: 'source', type: 'string', initialValue: 'Posted on Google' }),
    defineField({ name: 'order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'quote', media: 'avatar' } },
})

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'kicker', title: 'Kicker (e.g. Box guide · 8 min read)', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    img('image', 'Cover photo'),
    defineField({ name: 'body', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 5 })] }),
  ],
  orderings: [{ title: 'Newest', name: 'new', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'kicker', media: 'image' } },
})

const ro = (name: string, type = 'string', title?: string) => defineField({ name, title, type, readOnly: true })

export const quoteRequest = defineType({
  name: 'quoteRequest',
  title: 'Quote requests',
  type: 'document',
  fields: [
    ro('name'),
    ro('email'),
    ro('phone'),
    ro('company'),
    ro('product'),
    ro('material'),
    ro('size'),
    ro('printing'),
    ro('productionSpeed', 'string', 'Production speed'),
    ro('quantity'),
    ro('design'),
    ro('message', 'text'),
    ro('pageUrl', 'string', 'Sent from page'),
    ro('artworkUrl', 'string', 'Artwork file'),
    ro('submittedAt', 'datetime'),
    defineField({ name: 'handled', title: 'Handled', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest', name: 'new', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'product', handled: 'handled' }, prepare: ({ title, subtitle, handled }) => ({ title: `${handled ? '✓ ' : ''}${title}`, subtitle }) },
})
