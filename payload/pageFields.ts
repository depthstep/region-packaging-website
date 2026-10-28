import type { Field, Tab } from 'payload'
import { faqList, formOptionFields, heading, iconItems, img, imgs, list, nameDesc, paragraphs, section, str, strings, titleText, txt } from './fields'

// Product-page content shared by categories (/custom-mailer-boxes) and sub-products
// (/custom-mailer-boxes/kraft-mailer-boxes). Leave a section's heading empty to hide it on the site.
// How to order, pricing, why us and FAQs fall back to Site settings > Product page defaults.

const galleryTab: Field[] = [
  str('ratingText', 'Rating line', { description: 'e.g. "4.9 based (127 reviews)". Empty = Google rating from Site settings.' }),
  txt('shortDescription', 'Short description (under the title)', 3),
  strings('highlights', 'Highlights (three checks)'),
  imgs('gallery', 'Gallery photos'),
  section('formOptions', 'Quote form options', formOptionFields, 'Leave a list empty to use the defaults from Site settings.'),
]

const sectionsTab: Field[] = [
  section('explore', '4. Explore styles (category pages)', heading),
  section('overview', '5. Overview', [...heading, paragraphs(), imgs('images', 'Photos (3)')]),
  section('benefits', '6. Benefits', [...heading, paragraphs(), iconItems('items', 'Benefit cards')]),
  section('specs', '7. Specs, sizes & dimensions', [
    ...heading,
    list('rows', 'Spec rows', [str('label'), str('value')]),
    str('stockSizesHeading', 'Stock sizes heading'),
    list('stockSizes', 'Popular stock sizes', [str('size'), str('dimensions', 'Dimensions (in)'), str('bestFor', 'Best for')]),
    txt('note', 'Text under the table', 6),
  ]),
  section('materials', '8. Materials & board options', [
    ...heading,
    list('items', 'Materials', [str('name'), str('badge', 'Badge (e.g. Most Popular)'), txt('description', 'Description', 2), img('image', 'Photo')]),
    txt('note', 'Text under the cards', 6),
  ]),
  section('printing', '9. Printing & finishing', [
    ...heading,
    paragraphs(),
    img('image', 'Photo'),
    str('methodsHeading', 'Printing methods heading'),
    nameDesc('methods', 'Printing methods'),
    str('finishesHeading', 'Finishes heading'),
    nameDesc('finishes', 'Finishes & add-ons'),
  ]),
  section('useCases', '10. Industries & use cases', [...heading, strings('pills', 'Pills'), txt('note', 'Text under the pills', 6)]),
  section('howToOrder', '11. How to order', [...heading, titleText('steps', 'Steps', 'Empty = defaults from Site settings.'), txt('note', 'Text under the steps', 6)]),
  section('pricing', '12. Pricing', [...heading, paragraphs(), titleText('cards', 'Cards', 'Empty = defaults from Site settings.'), img('image', 'Background photo (shown tinted blue)')]),
  section('whyUs', '13. Why choose us', [...heading, titleText('cards', 'Cards', 'Empty = defaults from Site settings.'), txt('note', 'Text under the cards', 6)]),
  section('faqs', '16. FAQs', [...heading, faqList('items', 'Questions', 'Empty = defaults from Site settings.')]),
  {
    name: 'related',
    label: '15. Related products',
    type: 'relationship',
    relationTo: ['products', 'categories'],
    hasMany: true,
    maxDepth: 0,
    admin: { description: 'Empty = other products in the same category.' },
  },
]

const seoTab: Field[] = [str('seoTitle', 'SEO title'), txt('seoDescription', 'SEO description', 2)]

/** Card + menu fields used when this page appears in grids and the mega menu. */
export const listingFields: Field[] = [
  txt('cardText', 'Card text (in grids and related products)', 2),
  img('cardImage', 'Card photo', 'Empty = first gallery photo.'),
  img('menuIcon', 'Mega menu icon'),
]

/** The editor tabs for a category or sub-product: its own main fields first, then the shared page content. */
export const pageTabs = (main: Field[]): Field => ({
  type: 'tabs',
  tabs: [
    { label: 'Main', fields: [...main, ...listingFields] },
    { label: 'Gallery & form', fields: galleryTab },
    { label: 'Page sections', fields: sectionsTab },
    { label: 'SEO', fields: seoTab },
  ] satisfies Tab[],
})
