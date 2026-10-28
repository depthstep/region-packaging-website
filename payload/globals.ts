import type { GlobalConfig } from 'payload'
import { cards, faqList, formOptionFields, heading, iconItems, img, imgs, link, links, list, paragraphs, section, str, strings, titleText, txt } from './fields'
import { revalidateGlobal } from './hooks'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  hooks: revalidateGlobal,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header & menu',
          fields: [
            str('announcement', 'Top bar message'),
            str('phone', 'Phone (shown as written)'),
            str('email'),
            { name: 'menuPromo', label: 'Mega menu promo card', type: 'group', fields: [str('title'), txt('text', 'Text', 2), str('buttonLabel', 'Button label'), str('href', 'Button link')] },
            links('resourcesMenu', 'Resources menu'),
          ],
        },
        {
          label: 'Stats, brands & reviews',
          fields: [
            list('stats', 'Hero stats', [str('value'), str('label')]),
            str('trustedHeading', 'Trusted-by heading'),
            list('trustedBrands', 'Trusted-by brand logos', [str('name'), img('logo', 'Logo')]),
            {
              name: 'google',
              label: 'Google rating summary',
              type: 'group',
              fields: [str('score', 'Score (e.g. 4.9)'), str('label', 'Label (e.g. Excellent)'), str('countText', 'Count text'), str('reviewUrl', 'Google review link')],
            },
            section('reviewsSection', 'Reviews section heading', [...heading, str('buttonLabel', 'Button label')]),
          ],
        },
        {
          label: 'Product page defaults',
          fields: [
            iconItems('trustStrip', 'Trust strip (5 icons under the quote form)'),
            { name: 'formDefaults', label: 'Quote form options', type: 'group', fields: formOptionFields },
            {
              name: 'productDefaults',
              label: 'Generic product-page sections',
              type: 'group',
              admin: { description: 'Used on every category/product page that does not set its own.' },
              fields: [
                str('exploreEyebrow', 'Explore styles eyebrow'),
                section('howToOrder', 'How to order', [...heading, titleText('steps', 'Steps')]),
                section('pricing', 'Pricing', [...heading, titleText('cards', 'Cards')]),
                section('whyUs', 'Why choose us', [...heading, titleText('cards', 'Cards')]),
                section('faqs', 'FAQs', [...heading, faqList()]),
                section('relatedHeading', 'Related products heading', heading),
                str('sampleLinkLabel', 'Free sample link label'),
                txt('formNote', 'Note under the form', 2),
              ],
            },
          ],
        },
        {
          label: 'Contact page',
          fields: [
            {
              name: 'contact',
              label: 'Contact Us page',
              type: 'group',
              fields: [
                str('heading', 'Banner heading'),
                txt('text', 'Banner text', 2),
                img('image', 'Banner photo'),
                str('callLabel', 'Phone label'),
                str('emailLabel', 'Email label'),
                { name: 'card', label: 'Quote shortcut card', type: 'group', fields: [str('heading'), txt('text', 'Text', 2), link('button', 'Button')] },
                str('formHeading', 'Form heading'),
                str('formText', 'Text under the form heading'),
                strings('topics', 'Topic choices', 'The first one is selected by default.'),
                str('buttonLabel', 'Send button label'),
              ],
            },
          ],
        },
        {
          label: 'CTA & footer',
          fields: [
            {
              name: 'cta',
              label: 'Ready to manufacture CTA',
              type: 'group',
              fields: [
                str('heading'),
                txt('text', 'Text', 2),
                link('primary', 'Primary button'),
                link('secondary', 'Secondary button'),
                { name: 'coupon', type: 'group', fields: [str('amount', 'Amount (e.g. 20% OFF)'), str('label'), str('code'), str('buttonLabel', 'Button label'), str('note')] },
              ],
            },
            {
              name: 'footer',
              type: 'group',
              fields: [
                txt('blurb', 'Blurb under the logo', 3),
                list('columns', 'Link columns', [str('title'), links('links', 'Links')]),
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
            },
            list('socials', 'Social links', [
              { name: 'label', label: 'Network', type: 'select', options: ['Facebook', 'LinkedIn', 'X', 'Instagram'] },
              str('url', 'URL'),
            ]),
          ],
        },
      ],
    },
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: { group: 'Content' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', '1. Hero', [str('ratingText', 'Rating line'), str('heading'), txt('intro', 'Intro', 3), link('cta', 'Button'), imgs('slides', 'Slider photos')]),
    section('chooseBox', '3. Choose your box', [...heading, link('button', 'Button'), cards('cards', 'Cards')]),
    section('steps', '4. Order in 4 steps', [...heading, list('steps', 'Steps', [str('title'), txt('text', 'Text', 2), img('icon', 'Icon')])]),
    section('industries', '5. Boxes by industry', [
      ...heading,
      list('tabs', 'Tabs', [
        str('label'),
        { name: 'category', label: 'Show products from category', type: 'relationship', relationTo: 'categories', maxDepth: 0 },
        cards('cards', 'Or pick cards by hand'),
      ]),
      cards('defaultCards', 'Cards for tabs with no category or cards'),
      txt('note', 'Text under the cards', 4),
    ]),
    section('quantity', '6. Order any quantity', [...heading, paragraphs(), iconItems('features', 'Feature cards')]),
    section('design', '7. Packaging design, done for you', [...heading, txt('lead', 'Bold lead', 2), paragraphs(), titleText('bullets', 'Bullets'), link('button', 'Button'), img('image', 'Dieline illustration')]),
    section('eco', '8. Eco-friendly / FSC banner', [...heading, txt('body', 'Text', 4), str('linkText', 'Linked words in the text'), str('linkHref', 'Link URL'), img('badge', 'FSC badge')]),
    section('logo', '9. Custom boxes with your logo', [...heading, txt('lead', 'Bold lead', 2), paragraphs(), titleText('bullets', 'Bullets'), img('image', 'Photo')]),
    section('sample', '11. Free sample pack', [...heading, link('button', 'Button'), str('note'), img('image', 'Photo')]),
    section('faq', '12. FAQ', [...heading, faqList()]),
    section('blog', '13. Packaging, explained', [
      ...heading,
      { name: 'posts', label: 'Posts (empty = latest 3)', type: 'relationship', relationTo: 'posts', hasMany: true, maxDepth: 0 },
      str('linkLabel', 'Link label'),
    ]),
    str('seoTitle', 'SEO title'),
    txt('seoDescription', 'SEO description', 2),
  ],
}
