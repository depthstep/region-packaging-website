import type { GlobalConfig } from 'payload'
import { cards, faqList, formOptionFields, heading, iconItems, img, imgs, link, links, list, paragraphs, section, str, strings, titleText, txt } from './fields'
import { revalidateGlobal } from './hooks'
import { subProductDefaultFields } from './pageFields'

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
            { name: 'menuPromo', label: 'Blue promo box in the dropdown menu', type: 'group', fields: [str('title'), txt('text', 'Text', 2), str('buttonLabel', 'Button label'), str('href', 'Button link address')] },
            links('resourcesMenu', 'Resources menu'),
          ],
        },
        {
          label: 'Stats, brands & reviews',
          fields: [
            list('stats', 'Numbers in the main banner', [str('value'), str('label')]),
            str('trustedHeading', '"Trusted by" heading'),
            list('trustedBrands', '"Trusted by" brand logos', [str('name'), img('logo', 'Logo')]),
            {
              name: 'google',
              label: 'Google rating summary',
              type: 'group',
              fields: [str('score', 'Score (e.g. 4.9)'), str('label', 'Rating word (e.g. Excellent)'), str('countText', 'Number of reviews text'), str('reviewUrl', 'Google review link')],
            },
            section('reviewsSection', 'Reviews section heading', [...heading, str('buttonLabel', 'Button label')]),
          ],
        },
        {
          label: 'Product page defaults',
          fields: [
            iconItems('trustStrip', 'Five icons under the quote form'),
            { name: 'formDefaults', label: 'Quote form options', type: 'group', fields: formOptionFields },
            {
              name: 'productDefaults',
              label: 'Standard text for product pages',
              type: 'group',
              admin: { description: 'Used on every category/product page that does not set its own.' },
              fields: [
                str('exploreEyebrow', 'Small label above "Explore styles"'),
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
          label: 'Other pages',
          description: 'Headings and SEO for pages that have no editor of their own.',
          fields: [
            {
              name: 'pageIntros',
              label: 'Page headings & SEO',
              type: 'group',
              fields: [
                ['products', 'All Products'],
                ['faqs', 'FAQs'],
                ['howToOrder', 'How To Order'],
                ['quote', 'Get a Quote'],
                ['sample', 'Request Free Sample'],
              ].map(([name, label]) => section(name, label, [str('heading'), txt('text', 'Text under the heading', 2), str('seoTitle', 'Title shown in Google (SEO title)'), txt('seoDescription', 'Description shown in Google (SEO description)', 2)])),
            },
          ],
        },
        {
          label: 'Get a Quote page',
          description: 'The column beside the form on /quote. Its heading and text are under Other pages > Get a Quote.',
          fields: [{ name: 'quotePage', label: 'Get a Quote page', type: 'group', fields: [str('eyebrow', 'Small label above the heading'), titleText('points', 'Points beside the form')] }],
        },
        {
          label: 'Sub-product pages',
          description: 'Industry sub-product pages (e.g. Cream Boxes) use these until the product has its own. {product} in a heading becomes the product name.',
          fields: [{ name: 'subProductDefaults', label: 'Sub-product page defaults', type: 'group', fields: subProductDefaultFields }],
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
                { name: 'card', label: '"Get a quote" box', type: 'group', fields: [str('heading'), txt('text', 'Text', 2), link('button', 'Button')] },
                str('formHeading', 'Form heading'),
                str('formText', 'Text under the form heading'),
                strings('topics', 'Topics people can choose', 'The first one is selected by default.'),
                str('buttonLabel', 'Send button label'),
              ],
            },
          ],
        },
        {
          label: 'Bottom banner & footer',
          fields: [
            {
              name: 'cta',
              label: '"Ready to manufacture" banner near the bottom of pages',
              type: 'group',
              fields: [
                str('heading'),
                txt('text', 'Text', 2),
                link('primary', 'Main button'),
                link('secondary', 'Second button'),
                // Coupons are off for now. Hidden rather than removed, so the database doesn't change and they can come back.
                { name: 'coupon', type: 'group', admin: { hidden: true }, fields: [str('amount', 'Amount (e.g. 20% OFF)'), str('label'), str('code'), str('buttonLabel', 'Button label'), str('note')] },
              ],
            },
            {
              name: 'footer',
              type: 'group',
              fields: [
                txt('blurb', 'Short text under the logo', 3),
                list('columns', 'Link columns', [str('title'), links('links', 'Links')]),
                str('newsletterTitle', 'Newsletter title'),
                txt('newsletterText', 'Newsletter text', 2),
                str('newsletterPlaceholder', 'Grey hint text in the newsletter box'),
                str('newsletterButton', 'Newsletter button'),
                str('followLabel', 'Text beside the social icons'),
                str('paymentsLabel', 'Text beside the payment logos'),
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

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  admin: { group: 'Content' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', 'Main banner (top of the page)', [str('heading'), txt('text', 'Text', 3), link('button', 'Button'), imgs('photos', 'Photos', 'Three photos: top left, bottom left, tall right.')]),
    section('mission', '2. Mission & vision', [
      str('missionHeading', 'Mission heading'),
      txt('missionText', 'Mission text', 4),
      img('missionIcon', 'Mission icon'),
      img('photo', 'Middle photo', 'Shown with a blue tint and the logo mark on top.'),
      str('visionHeading', 'Vision heading'),
      txt('visionText', 'Vision text', 4),
      img('visionIcon', 'Vision icon'),
    ]),
    section('whoWeAre', '3. Who we are', [...heading, paragraphs(), img('image', 'Photo'), list('stats', 'Number cards', [str('value'), str('label')])]),
    section('products', '4. What we make', heading, 'The cards are the same as Home page > Choose your box.'),
    section('values', '5. Our values', [...heading, iconItems('items', 'Values')]),
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
  ],
}

export const ArtworkPage: GlobalConfig = {
  slug: 'artwork-page',
  label: 'Artwork page',
  admin: { group: 'Content' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', '1. Banner', [
      str('heading'),
      txt('text', 'Text', 3),
      str('buttonLabel', 'Download button label'),
      { name: 'guide', label: 'Guide file (PDF)', type: 'upload', relationTo: 'media', admin: { description: 'The button downloads this file. Until one is uploaded, the button shows but does nothing.' } },
      txt('dielineText', 'Text under the box template picture', 3),
    ]),
    section('formats', '2. Formats we accept', [...heading, iconItems('items', 'Formats')]),
    section('essentials', '3. The essentials', [
      ...heading,
      list('items', 'Cards', [str('title'), txt('text', 'Text', 2), img('icon', 'Icon'), str('iconText', 'Or text instead of an icon (e.g. Aa)')]),
    ]),
    section('steps', '4. What happens next', [...heading, titleText('steps', 'Steps'), txt('note', 'Note under the steps', 2)]),
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
  ],
}

const gsmStops = (name: string, label: string) => list(name, label, [str('gsm', 'Weight (e.g. 80 GSM)'), str('label', 'What it is used for')])

export const PaperWeightPage: GlobalConfig = {
  slug: 'paper-weight-page',
  label: 'Paper weight chart',
  admin: { group: 'Content' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', '1. Banner', [
      str('heading'),
      txt('text', 'Text', 3),
      str('converterLabel', 'First button (jumps to the converter)'),
      str('chartLabel', 'Second button (jumps to the chart)'),
      img('image', 'Photo'),
      gsmStops('scale', 'Weights under the blue line'),
    ]),
    section('measures', '2. Three ways to measure', [...heading, list('cards', 'Cards', [str('code', 'Big letters (e.g. GSM)'), str('title'), txt('text', 'Text', 3)])]),
    section('converter', '3. Converter', [...heading, img('image', 'Photo behind the left side', 'Shown with a blue tint.'), txt('note', 'Text under the result', 2)], 'The sums use standard factors, so they are not edited here.'),
    section('chart', '4. The chart', [
      ...heading,
      list('rows', 'Points to GSM rows', [str('pt', 'Points'), str('text', 'Text stock'), str('uncoated', 'Uncoated board'), str('c1s', 'C1S'), str('c2s', 'C2S'), str('thickness')]),
      str('note', 'Note under the table'),
      str('poundsHeading', 'Pounds table heading'),
      txt('poundsText', 'Text above the pounds table', 2),
      list('poundsRows', 'Pounds to GSM rows', [str('lb', 'Pounds'), str('text', 'Text stock'), str('cover', 'Cover stock')]),
    ]),
    section('glance', '5. From light to heavy', [...heading, gsmStops('bars', 'Bars (lightest first)'), str('note', 'Note under the bars')]),
    section('boxes', '6. Which weight for which box', [
      ...heading,
      list('photos', 'Photos', [img('image', 'Photo'), str('label', 'What the photo shows')]),
      str('fluteHeading', 'Flute guide heading'),
      titleText('flutes', 'Flutes'),
    ]),
    section('faq', '7. FAQ', [...heading, faqList()]),
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
  ],
}

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog page',
  admin: { group: 'Blog' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', 'Banner', [str('heading'), txt('text', 'Text', 2)]),
    str('featuredHeading', 'Featured posts heading'),
    str('searchPlaceholder', 'Grey hint text in the search box'),
    str('viewAllLabel', 'View all label'),
    section('post', 'Article pages', [
      str('tocHeading', 'Contents heading'),
      { name: 'help', label: 'Help card', type: 'group', fields: [str('heading'), txt('text', 'Text', 3), str('phoneLabel', 'Phone label'), link('button', 'Button')] },
      str('followLabel', 'Text beside the social icons'),
      str('relatedEyebrow', 'Small label above "Keep reading"'),
      str('relatedHeading', 'Keep reading heading'),
      link('relatedButton', 'Keep reading button'),
    ]),
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: { group: 'Content' },
  hooks: revalidateGlobal,
  fields: [
    section('hero', 'Main banner (top of the page)', [str('ratingText', 'Star rating text'), str('heading'), txt('intro', 'Intro', 3), link('cta', 'Button'), imgs('slides', 'Slider photos')]),
    section('chooseBox', '3. Choose your box', [...heading, link('button', 'Button'), cards('cards', 'Cards')]),
    section('steps', '4. Order in 4 steps', [...heading, list('steps', 'Steps', [str('title'), txt('text', 'Text', 2), img('icon', 'Icon')])]),
    section('industries', '5. Boxes by industry', [
      ...heading,
      list('tabs', 'Tabs', [
        str('label'),
        { name: 'category', label: 'Show products from category', type: 'relationship', relationTo: 'categories', maxDepth: 0 },
        cards('cards', 'Or pick cards by hand'),
      ]),
      cards('defaultCards', 'Backup cards (used when a tab has none of its own)'),
      txt('note', 'Text under the cards', 4),
    ]),
    section('quantity', '6. Order any quantity', [...heading, paragraphs(), iconItems('features', 'Feature cards')]),
    section('design', '7. Packaging design, done for you', [...heading, txt('lead', 'Bold opening sentence', 2), paragraphs(), titleText('bullets', 'Bullets'), link('button', 'Button'), img('image', 'Dieline illustration')]),
    section('eco', '8. Eco-friendly / FSC banner', [...heading, txt('body', 'Text', 4), str('linkText', 'Linked words in the text'), str('linkHref', 'Link address'), img('badge', 'FSC badge')]),
    section('logo', '9. Custom boxes with your logo', [...heading, txt('lead', 'Bold opening sentence', 2), paragraphs(), titleText('bullets', 'Bullets'), img('image', 'Photo')]),
    section('sample', '11. Free sample pack', [...heading, link('button', 'Button'), str('note'), img('image', 'Photo')]),
    section('faq', '12. FAQ', [...heading, faqList()]),
    section('blog', '13. Packaging, explained', [
      ...heading,
      { name: 'posts', label: 'Posts (empty = latest 3)', type: 'relationship', relationTo: 'posts', hasMany: true, maxDepth: 0 },
      str('linkLabel', 'Link label'),
    ]),
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
  ],
}
