import type { Field, Tab } from 'payload'
import { faqList, formOptionFields, heading, iconItems, img, imgs, list, paragraphs, section, str, strings, titleText, txt } from './fields'

/** Option cards (printing, finishes, add-ons): name, text and photo. */
const optionCards = (name: string, label: string) =>
  list(name, label, [str('name'), txt('description', 'Description', 2), img('image', 'Photo')])

// Product-page content shared by categories (/custom-mailer-boxes) and sub-products
// (/custom-mailer-boxes/kraft-mailer-boxes). Leave a section's heading empty to hide it on the site.
// How to order, pricing, why us and FAQs fall back to Site settings > Product page defaults.

export const galleryTab: Field[] = [
  str('ratingText', 'Star rating text', { description: 'e.g. "4.9 based (127 reviews)". Empty = Google rating from Site settings.' }),
  txt('shortDescription', 'Short description (under the title)', 3),
  strings('highlights', 'Three bullet points with tick marks', 'Category pages only. Type one, then press Enter to add the next.'),
  strings('badges', 'Small tags under the quote form', 'Product pages only, e.g. "Low MOQ". Type one, then press Enter to add the next.'),
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
    optionCards('methods', 'Printing methods'),
    str('finishesHeading', 'Finishes heading'),
    optionCards('finishes', 'Finishes'),
    txt('finishesNote', 'Text under the finishes (product pages)', 4),
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

/** Takes a section off the form while keeping its place in the database, so nothing has to move. */
const hideFields = (f: Field, names: string[]): Field => ('name' in f && names.includes(f.name) ? ({ ...f, admin: { ...f.admin, hidden: true } } as Field) : f)

/** Product pages only: the construction section under the photos, sustainability and add-ons. */
const construction = section('construction', 'Construction', [
  ...heading,
  paragraphs(),
  img('image', 'Photo'),
  titleText('list', 'Three short points beside the photo'),
])
const sustainability = section('sustainability', 'Sustainability', [str('eyebrow', 'Small label above the heading'), str('heading'), txt('text', 'Text', 6), img('badge', 'Badge or logo (e.g. FSC)')])
const addons = section('addons', 'Add-ons', [optionCards('items', 'Add-ons'), txt('note', 'Text under the add-ons', 4)])

/** The page sections of a product page, in the order they appear on the page. */
const byName = (name: string) => sectionsTab.find((f) => 'name' in f && f.name === name)!
const relabel = (f: Field, label: string): Field => ({ ...f, label } as Field)
export const productSectionsTab: Field[] = [
  relabel(construction, 'Construction (beside a photo, under the top)'),
  relabel(byName('overview'), 'Overview tab: Overview (text and 3 photos)'),
  relabel(byName('benefits'), 'Overview tab: Benefits (heading and paragraphs)'),
  relabel(byName('useCases'), 'Overview tab: Industries & use cases (heading and "Text under the tags")'),
  relabel(byName('specs'), 'Specifications tab'),
  relabel(sustainability, 'Sustainability & Why Us tab: Sustainability'),
  relabel(byName('whyUs'), 'Sustainability & Why Us tab: Why choose us'),
  relabel(byName('faqs'), 'FAQ tab'),
  relabel(byName('materials'), 'Options section: heading, and the Material tab'),
  relabel(byName('printing'), 'Options section: Printing and Finishes tabs'),
  relabel(addons, 'Options section: Add-ons tab'),
  // Not on product pages: kept, hidden, so nothing in the database has to move.
  ...['explore', 'howToOrder', 'pricing', 'related'].map((n) => hideFields(byName(n), [n])),
]

const seoTab: Field[] = [str('seoTitle', 'Title shown in Google (SEO title)'), txt('seoDescription', 'Description shown in Google (SEO description)', 2)]

/** Card + menu fields used when this page appears in grids and the mega menu. */
export const listingFields: Field[] = [
  txt('cardText', 'Short text on product cards', 2),
  img('cardImage', 'Photo on product cards', 'Empty = first gallery photo.'),
  img('menuIcon', 'Icon in the website menu'),
]


/** The editor tabs for a category or sub-product: its own main fields first, then the shared page content. */
export const pageTabs = (main: Field[], notUsed: string[] = [], sections: Field[] = sectionsTab): Field => ({
  type: 'tabs',
  tabs: [
    { label: 'Main', fields: [...main, ...listingFields] },
    { label: 'Photos & quote form', description: 'The top of the page: the photos, and the text and choices beside them.', fields: galleryTab.map((f) => hideFields(f, notUsed)) },
    { label: 'Page sections', description: 'The sections of the page, from top to bottom. To hide a section, leave its heading empty.', fields: sections.map((f) => hideFields(f, notUsed)) },
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
    fields: [
      ...['overview', 'specs', 'materials', 'why', 'faq'].map((n) => ({ name: n, type: 'text' as const })),
      ...[
        ['optionMaterial', 'Options section: Material tab'],
        ['optionPrinting', 'Options section: Printing tab'],
        ['optionFinishes', 'Options section: Finishes tab'],
        ['optionAddons', 'Options section: Add-ons tab'],
      ].map(([name, label]) => ({ name, label, type: 'text' as const })),
    ],
  },
  ...named(galleryTab, ['shortDescription', 'highlights', 'badges', 'gallery']),
  construction,
  ...named(sectionsTab, ['overview', 'benefits', 'useCases', 'specs', 'materials', 'printing', 'whyUs']),
  sustainability,
  addons,
]
