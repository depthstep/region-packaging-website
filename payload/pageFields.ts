import type { Field, Tab } from 'payload'
import { faqList, formOptionFields, heading, iconItems, img, imgs, list, nameDesc, paragraphs, section, str, strings, titleText, txt } from './fields'

// Product-page content shared by categories (/custom-mailer-boxes) and sub-products
// (/custom-mailer-boxes/kraft-mailer-boxes). Leave a section's heading empty to hide it on the site.
// How to order, pricing, why us and FAQs fall back to Site settings > Product page defaults.

export const galleryTab: Field[] = [
  str('ratingText', 'Star rating text', { description: 'e.g. "4.9 based (127 reviews)". Empty = Google rating from Site settings.' }),
  txt('shortDescription', 'Short description (under the title)', 3),
  strings('highlights', 'Three bullet points with tick marks', 'Type one, then press Enter to add the next.'),
  imgs('gallery', 'Photos beside the quote form'),
  section('formOptions', 'Quote form options', formOptionFields, 'Leave a list empty to use the defaults from Site settings.'),
]

export const sectionsTab: Field[] = [
  section('explore', '4. Explore styles (category pages)', heading),
  section('overview', '5. Overview', [...heading, paragraphs(), imgs('images', 'Photos (3)')]),
  section('benefits', '6. Benefits', [...heading, paragraphs(), iconItems('items', 'Benefit cards')]),
  section('specs', '7. Specs, sizes & dimensions', [
    ...heading,
    list('rows', 'Specifications table', [str('label'), str('value')]),
    str('stockSizesHeading', 'Heading above the sizes table'),
    list('stockSizes', 'Sizes table', [str('size'), str('dimensions', 'Dimensions (inches)'), str('bestFor', 'Best for')]),
    txt('note', 'Text under the table', 6),
  ]),
  section('materials', '8. Materials & board options', [
    ...heading,
    list('items', 'Materials', [str('name'), str('badge', 'Small tag on the card (e.g. Most Popular)'), txt('description', 'Description', 2), img('image', 'Photo')]),
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
  section('useCases', '10. Industries & use cases', [...heading, strings('pills', 'Tags (small rounded labels)', 'Type one, then press Enter to add the next.'), txt('note', 'Text under the tags', 6)]),
  section('howToOrder', '11. How to order', [...heading, titleText('steps', 'Steps', 'Empty = defaults from Site settings.'), txt('note', 'Text under the steps', 6)]),
  section('pricing', '12. Pricing', [...heading, paragraphs(), titleText('cards', 'Cards', 'Empty = defaults from Site settings.'), img('image', 'Background photo (appears with a blue tint)')]),
  section('whyUs', '13. Why choose us', [...heading, titleText('cards', 'Cards', 'Empty = defaults from Site settings.'), txt('note', 'Text under the cards', 6)]),
  section('faqs', '16. FAQs', [...heading, faqList('items', 'Questions', 'Empty = defaults from Site settings.')]),
  {
    name: 'related',
    label: 'Related products',
    type: 'relationship',
    relationTo: ['products', 'categories'],
    hasMany: true,
    maxDepth: 0,
    admin: { description: 'Empty = other products in the same category.' },
  },
]

const seoTab: Field[] = [str('seoTitle', 'Title shown in Google (SEO title)'), txt('seoDescription', 'Description shown in Google (SEO description)', 2)]

/** Card + menu fields used when this page appears in grids and the mega menu. */
export const listingFields: Field[] = [
  txt('cardText', 'Short text on product cards', 2),
  img('cardImage', 'Photo on product cards', 'Empty = first gallery photo.'),
  img('menuIcon', 'Icon in the website menu'),
]

/** The editor tabs for a category or sub-product: its own main fields first, then the shared page content. */
export const pageTabs = (main: Field[]): Field => ({
  type: 'tabs',
  tabs: [
    { label: 'Main', fields: [...main, ...listingFields] },
    { label: 'Photos & quote form', description: 'The top of the page: the photos, and the text and choices beside them.', fields: galleryTab },
    { label: 'Page sections', description: 'The sections of the page, from top to bottom. To hide a section, leave its heading empty.', fields: sectionsTab },
    { label: 'Google (SEO)', description: 'How this page appears in Google search results.', fields: seoTab },
  ] satisfies Tab[],
})

/** Site settings > Sub-product pages: the defaults for industry sub-products (same fields as their own sections). */
const named = (fields: Field[], names: string[]) => fields.filter((f) => 'name' in f && names.includes(f.name))
export const subProductDefaultFields: Field[] = [
  {
    name: 'tabs',
    label: 'Tab labels',
    type: 'group',
    fields: ['overview', 'specs', 'materials', 'why', 'faq'].map((n) => ({ name: n, type: 'text' as const })),
  },
  ...named(galleryTab, ['shortDescription', 'highlights', 'gallery']),
  ...named(sectionsTab, ['overview', 'benefits', 'useCases', 'specs', 'materials', 'printing', 'whyUs']),
]
