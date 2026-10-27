import { defineType } from 'sanity'
const ro = (name: string, type = 'string') => ({ name, type, readOnly: true })
export default defineType({
  name: 'quoteRequest', title: 'Quote requests', type: 'document',
  fields: [ro('name'), ro('email'), ro('phone'), ro('company'), ro('product'), ro('boxStyle'), ro('material'),
    ro('size'), ro('quantity'), ro('message', 'text'), ro('pageUrl'), ro('artworkUrl'), ro('submittedAt', 'datetime'),
    { name: 'handled', type: 'boolean', initialValue: false }],
  orderings: [{ title: 'Newest', name: 'new', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'product' } },
})
