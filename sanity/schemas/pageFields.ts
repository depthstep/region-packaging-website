import { defineArrayMember, defineField } from 'sanity'
import { heading, iconItems, img, list, nameDesc, paragraphs, section, str, strings, titleText, txt } from './fields'

// Product-page content shared by categories (/custom-mailer-boxes) and sub-products
// (/custom-mailer-boxes/kraft-mailer-boxes). Leave a section empty to hide it on the site.
// How to order, pricing, why us and FAQs fall back to Site settings > Product page defaults.

export const pageGroups = [
  { name: 'main', title: 'Main', default: true },
  { name: 'top', title: 'Gallery & form' },
  { name: 'sections', title: 'Page sections' },
  { name: 'seo', title: 'SEO' },
]

const formOptions = defineField({
  name: 'formOptions',
  title: 'Quote form options',
  description: 'Leave a list empty to use the defaults from Site settings.',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    strings('material', 'Material'),
    strings('size', 'Size'),
    strings('printing', 'Printing'),
    strings('productionSpeed', 'Production speed'),
    strings('quantity', 'Quantity'),
    strings('design', 'Design'),
  ],
})

export const pageFields = [
  // Gallery & quote form card
  defineField({ ...str('ratingText', 'Rating line', { description: 'e.g. "4.9 based (127 reviews)". Empty = Google rating from Site settings.' }), group: 'top' }),
  defineField({ ...txt('shortDescription', 'Short description (under the title)', 3), group: 'top' }),
  defineField({ ...strings('highlights', 'Highlights (three checks)'), group: 'top' }),
  defineField({
    name: 'gallery',
    title: 'Gallery photos',
    type: 'array',
    group: 'top',
    of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')] })],
  }),
  defineField({ ...formOptions, group: 'top' }),

  // Sections, in page order
  defineField({ ...section('explore', '4. Explore styles (category pages)', heading), group: 'sections' }),
  defineField({
    ...section('overview', '5. Overview', [
      ...heading,
      paragraphs(),
      defineField({ name: 'images', title: 'Photos (3)', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')] })] }),
    ]),
    group: 'sections',
  }),
  defineField({ ...section('benefits', '6. Benefits', [...heading, paragraphs(), iconItems('items', 'Benefit cards')]), group: 'sections' }),
  defineField({
    ...section('specs', '7. Specs, sizes & dimensions', [
      ...heading,
      list('rows', 'Spec rows', [str('label'), str('value')], 'label', 'value'),
      str('stockSizesHeading', 'Stock sizes heading'),
      list('stockSizes', 'Popular stock sizes', [str('size'), str('dimensions', 'Dimensions (in)'), str('bestFor', 'Best for')], 'size', 'dimensions'),
      txt('note', 'Text under the table', 6),
    ]),
    group: 'sections',
  }),
  defineField({
    ...section('materials', '8. Materials & board options', [
      ...heading,
      list('items', 'Materials', [str('name'), str('badge', 'Badge (e.g. Most Popular)'), txt('description', 'Description', 2), img('image', 'Photo')], 'name', 'badge'),
      txt('note', 'Text under the cards', 6),
    ]),
    group: 'sections',
  }),
  defineField({
    ...section('printing', '9. Printing & finishing', [
      ...heading,
      paragraphs(),
      img('image', 'Photo'),
      str('methodsHeading', 'Printing methods heading'),
      nameDesc('methods', 'Printing methods'),
      str('finishesHeading', 'Finishes heading'),
      nameDesc('finishes', 'Finishes & add-ons'),
    ]),
    group: 'sections',
  }),
  defineField({ ...section('useCases', '10. Industries & use cases', [...heading, strings('pills', 'Pills'), txt('note', 'Text under the pills', 6)]), group: 'sections' }),
  defineField({
    ...section('howToOrder', '11. How to order', [...heading, titleText('steps', 'Steps (empty = defaults)'), txt('note', 'Text under the steps', 6)]),
    group: 'sections',
  }),
  defineField({
    ...section('pricing', '12. Pricing', [...heading, paragraphs(), titleText('cards', 'Cards (empty = defaults)'), img('image', 'Background photo (shown tinted blue)')]),
    group: 'sections',
  }),
  defineField({ ...section('whyUs', '13. Why choose us', [...heading, titleText('cards', 'Cards (empty = defaults)'), txt('note', 'Text under the cards', 6)]), group: 'sections' }),
  defineField({
    ...section('faqs', '16. FAQs', [...heading, list('items', 'Questions (empty = defaults)', [str('question'), txt('answer', 'Answer', 4)], 'question', 'answer')]),
    group: 'sections',
  }),
  defineField({
    name: 'related',
    title: '15. Related products',
    description: 'Empty = other products in the same category.',
    type: 'array',
    group: 'sections',
    of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }, { type: 'category' }] })],
  }),

  defineField({ ...str('seoTitle', 'SEO title'), group: 'seo' }),
  defineField({ ...txt('seoDescription', 'SEO description', 2), group: 'seo' }),
]

/** Card + menu fields used when this page appears in grids and the mega menu. */
export const listingFields = [
  defineField({ ...txt('cardText', 'Card text (in grids and related products)', 2), group: 'main' }),
  defineField({ ...img('cardImage', 'Card photo', 'Empty = first gallery photo.'), group: 'main' }),
  defineField({ ...img('menuIcon', 'Mega menu icon'), group: 'main' }),
]
