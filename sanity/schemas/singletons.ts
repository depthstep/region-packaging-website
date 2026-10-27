import { defineArrayMember, defineField, defineType } from 'sanity'
import { cards, heading, iconItems, img, link, links, list, paragraphs, section, str, strings, titleText, txt } from './fields'

const faqItems = list('items', 'Questions', [str('question'), txt('answer', 'Answer', 4)], 'question', 'answer')

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & menu', default: true },
    { name: 'trust', title: 'Stats, brands & reviews' },
    { name: 'product', title: 'Product page defaults' },
    { name: 'footer', title: 'CTA & footer' },
  ],
  fields: [
    defineField({ ...str('announcement', 'Top bar message'), group: 'header' }),
    defineField({ ...str('phone', 'Phone (shown as written)'), group: 'header' }),
    defineField({ ...str('email'), group: 'header' }),
    defineField({
      name: 'menuPromo',
      title: 'Mega menu promo card',
      type: 'object',
      group: 'header',
      fields: [str('title'), txt('text', 'Text', 2), str('buttonLabel', 'Button label'), str('href', 'Button link')],
    }),
    defineField({ ...links('resourcesMenu', 'Resources menu'), group: 'header' }),

    defineField({ ...list('stats', 'Hero stats', [str('value'), str('label')], 'value', 'label'), group: 'trust' }),
    defineField({ ...str('trustedHeading', 'Trusted-by heading'), group: 'trust' }),
    defineField({ ...list('trustedBrands', 'Trusted-by brand logos', [str('name'), img('logo', 'Logo')], 'name'), group: 'trust' }),
    defineField({
      name: 'google',
      title: 'Google rating summary',
      type: 'object',
      group: 'trust',
      fields: [str('score', 'Score (e.g. 4.9)'), str('label', 'Label (e.g. Excellent)'), str('countText', 'Count text'), defineField({ name: 'reviewUrl', title: 'Google review link', type: 'url' })],
    }),
    defineField({ ...section('reviewsSection', 'Reviews section heading', [...heading, str('buttonLabel', 'Button label')]), group: 'trust' }),

    defineField({ ...iconItems('trustStrip', 'Trust strip (5 icons under the quote form)'), group: 'product' }),
    defineField({
      name: 'formDefaults',
      title: 'Quote form options',
      type: 'object',
      group: 'product',
      fields: [
        strings('material', 'Material'),
        strings('size', 'Size'),
        strings('printing', 'Printing'),
        strings('productionSpeed', 'Production speed'),
        strings('quantity', 'Quantity'),
        strings('design', 'Design'),
      ],
    }),
    defineField({
      name: 'productDefaults',
      title: 'Generic product-page sections',
      description: 'Used on every category/product page that does not set its own.',
      type: 'object',
      group: 'product',
      fields: [
        str('exploreEyebrow', 'Explore styles eyebrow'),
        section('howToOrder', 'How to order', [...heading, titleText('steps', 'Steps')]),
        section('pricing', 'Pricing', [...heading, titleText('cards', 'Cards')]),
        section('whyUs', 'Why choose us', [...heading, titleText('cards', 'Cards')]),
        section('faqs', 'FAQs', [...heading, faqItems]),
        section('relatedHeading', 'Related products heading', heading),
        str('sampleLinkLabel', 'Free sample link label'),
        txt('formNote', 'Note under the form', 2),
      ],
    }),

    defineField({
      name: 'cta',
      title: 'Ready to manufacture CTA',
      type: 'object',
      group: 'footer',
      fields: [
        str('heading'),
        txt('text', 'Text', 2),
        link('primary', 'Primary button'),
        link('secondary', 'Secondary button'),
        defineField({
          name: 'coupon',
          type: 'object',
          fields: [str('amount', 'Amount (e.g. 20% OFF)'), str('label'), str('code'), str('buttonLabel', 'Button label'), str('note')],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      type: 'object',
      group: 'footer',
      fields: [
        txt('blurb', 'Blurb under the logo', 3),
        list('columns', 'Link columns', [str('title'), links('links', 'Links')], 'title'),
        str('newsletterTitle', 'Newsletter title'),
        txt('newsletterText', 'Newsletter text', 2),
        str('newsletterPlaceholder', 'Newsletter placeholder'),
        str('newsletterButton', 'Newsletter button'),
        str('followLabel', 'Follow label'),
        str('paymentsLabel', 'Payments label'),
        img('paymentLogos', 'Payment logos image'),
        str('copyright'),
        links('legal', 'Legal links'),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            str('label', 'Network', { options: { list: ['Facebook', 'LinkedIn', 'X', 'Instagram'] } }),
            defineField({ name: 'url', type: 'url' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    section('hero', '1. Hero', [str('ratingText', 'Rating line'), str('heading'), txt('intro', 'Intro', 3), link('cta', 'Button'), defineField({ name: 'slides', title: 'Slider photos', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')] })] })]),
    section('chooseBox', '3. Choose your box', [...heading, link('button', 'Button'), cards('cards', 'Cards')]),
    section('steps', '4. Order in 4 steps', [...heading, list('steps', 'Steps', [str('title'), txt('text', 'Text', 2), img('icon', 'Icon')], 'title', 'text')]),
    section('industries', '5. Boxes by industry', [
      ...heading,
      list(
        'tabs',
        'Tabs',
        [
          str('label'),
          defineField({ name: 'category', title: 'Show products from category', type: 'reference', to: [{ type: 'category' }] }),
          cards('cards', 'Or pick cards by hand'),
        ],
        'label',
      ),
      cards('defaultCards', 'Cards for tabs with no category or cards'),
      txt('note', 'Text under the cards', 4),
    ]),
    section('quantity', '6. Order any quantity', [...heading, paragraphs(), iconItems('features', 'Feature cards')]),
    section('design', '7. Packaging design, done for you', [...heading, txt('lead', 'Bold lead', 2), paragraphs(), titleText('bullets', 'Bullets'), link('button', 'Button'), img('image', 'Dieline illustration')]),
    section('eco', '8. Eco-friendly / FSC banner', [...heading, txt('body', 'Text', 4), str('linkText', 'Linked words in the text'), str('linkHref', 'Link URL'), img('badge', 'FSC badge')]),
    section('logo', '9. Custom boxes with your logo', [...heading, txt('lead', 'Bold lead', 2), paragraphs(), titleText('bullets', 'Bullets'), img('image', 'Photo')]),
    section('sample', '11. Free sample pack', [...heading, link('button', 'Button'), str('note'), img('image', 'Photo')]),
    section('faq', '12. FAQ', [...heading, faqItems]),
    section('blog', '13. Packaging, explained', [
      ...heading,
      defineField({ name: 'posts', title: 'Posts (empty = latest 3)', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })] }),
      str('linkLabel', 'Link label'),
    ]),
    str('seoTitle', 'SEO title'),
    txt('seoDescription', 'SEO description', 2),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})
