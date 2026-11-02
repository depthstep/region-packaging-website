// Starter blog: categories (sections on /blog), topics (filter buttons), posts and the page chrome.
// Only the inserts guide has a full article; the other posts are titled placeholders for the SEO team.
import type { BlogCategory, BlogPage, BlogPost, BlogTopic } from '../lib/types.ts'
import { img } from './helpers.ts'
import { a, doc, h2, h3, image, p, ul } from './richtext.ts'

export const blogCategories: BlogCategory[] = [
  { id: 'blogcat-design', slug: 'design-structure', title: 'Design & Structure', description: 'Formats, dielines, inserts, and closures. The structure, before the artwork.' },
  {
    id: 'blogcat-materials',
    slug: 'materials-printing-finishes',
    title: 'Materials, Printing & Finishes',
    description: "Materials, printing, coatings, and foils. What packaging is made of and how it's finished.",
  },
  { id: 'blogcat-sustainability', slug: 'sustainability', title: 'Sustainability', description: 'Recycled materials, recyclable design, and the certifications behind real eco-claims.' },
  { id: 'blogcat-compliance', slug: 'compliance-regulated', title: 'Compliance & Regulated', description: 'Child-resistant, food-contact, cannabis, and labeling rules. How to meet them.' },
  { id: 'blogcat-cost', slug: 'cost-operations-sourcing', title: 'Cost, Operations & Sourcing', description: 'Pricing drivers, MOQs, lead times, freight, and choosing a packaging partner.' },
  { id: 'blogcat-branding', slug: 'branding-presentation', title: 'Branding & Presentation', description: 'Unboxing, shelf presence, and premium finishes that turn packaging into a brand moment.' },
]

const topic = (title: string): BlogTopic => ({ id: `blogtopic-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, slug: title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-'), title })
export const blogTopics: BlogTopic[] = [
  'Apparel & Fashion',
  'Beauty & Cosmetics',
  'Restaurants & Food Service',
  'Jewelry',
  'Candy & Chocolate',
  'Candles & Home Fragrance',
  'Rigid Boxes',
  'Folding Cartons',
  'Corrugated Boxes',
  'Box Inserts',
].map(topic)
const t = (...titles: string[]) => titles.map((x) => blogTopics.find((tp) => tp.title === x)!.id)

const insertsGuide = doc(
  p(
    'A box gets your product to the customer. What sits inside the box decides how the product arrives and how the opening feels. Adding ',
    a('inserts', '#what-are-packaging-inserts'),
    ' is one of the simplest ways to do both, and it rarely adds much to the unit cost.',
  ),
  p(
    'This guide covers what packaging inserts are, the main types and materials, and how to choose between them, so you can brief your packaging partner with confidence.',
  ),
  h2('What are packaging inserts?'),
  p('An insert is anything placed inside the box on purpose, beyond the product itself. Most inserts fall into one of two groups:'),
  ul(a('Box inserts', '#types-of-box-inserts'), a('Promotional inserts', '#promotional-inserts')),
  image(img('/images/blog-minima.jpg', 'Stack of white mailer boxes printed with a red Minima logo')),
  p(
    'Box inserts hold and protect the product. They stop items moving in transit, separate parts of a set and present the product the moment the lid opens. Many can be printed, so your branding carries on inside the box.',
  ),
  p(
    'Promotional inserts speak to the customer instead: thank-you cards, care instructions, discount codes and samples of other products. They cost little and are often what people remember.',
  ),
  h2('Types of box inserts'),
  p('The right material depends on how heavy and how fragile the product is, and how premium the box needs to feel. The most common options are:'),
  ul('Foam', 'Corrugated cardboard', 'Paperboard', 'Moulded pulp'),
  h3('Foam inserts'),
  p(
    'Foam is light, so it keeps shipping weight down, and it can be cut to the exact shape of the product. It suits glass, electronics and jewellery that need protecting from every side.',
  ),
  h3('Corrugated and paperboard inserts'),
  p(
    'Folded card inserts are cost-effective, recyclable with the box and easy to print. Corrugated board handles heavier items; paperboard is ideal for cosmetics and small sets.',
  ),
  image(img('/images/blog-kraft-hands.jpg', 'Kraft mailer boxes being opened by hand')),
  h2('Promotional inserts', ),
  p(
    'A printed card with a short note, a care guide or a code for the next order turns a delivery into a conversation. Keep the message short, match the box design and make the next step obvious.',
  ),
  h2('Choosing the right insert'),
  p(
    'Start with the product: its weight, how fragile it is and how it should sit when the box opens. Then decide how much branding you want inside. If you are unsure, ',
    a('send us your product details', '/contact'),
    ' and we will suggest an insert and include it in your free digital proof.',
  ),
)

type Seed = Omit<BlogPost, 'kicker'>
const post = (
  slug: string,
  title: string,
  categoryId: string,
  publishedAt: string,
  image: BlogPost['image'],
  extra: Partial<Seed> = {},
): Seed => ({ id: `post-${slug}`, slug, title, categoryId, publishedAt, image, topicIds: [], author: 'Region Packaging', readMinutes: 9, ...extra })

export const posts: Seed[] = [
  post('what-are-product-packaging-inserts', 'What Are Product Packaging Inserts? The Master Guide', 'blogcat-design', '2026-10-28', img('/images/blog-camille.jpg', 'Stacked pink Camille Treats boxes'), {
    excerpt: 'Packaging inserts protect your product and shape the unboxing. Here are the main types, the materials they come in and how to choose.',
    body: insertsGuide,
    readMinutes: undefined,
    featured: true,
    topicIds: t('Box Inserts', 'Beauty & Cosmetics'),
  }),
  post('the-offset-printing-process', 'The Offset Printing Process: How It Works', 'blogcat-materials', '2026-10-24', img('/images/pr-seasonal-boxes.jpg', 'Stack of colourful printed boxes'), {
    featured: true,
    topicIds: t('Folding Cartons'),
  }),
  post('eco-friendly-cosmetics-packaging-ideas', '7 Eco-Friendly Cosmetics Packaging Ideas', 'blogcat-sustainability', '2026-10-21', img('/images/blog-athar.jpg', 'Sage green rigid box with printed cards'), {
    featured: true,
    topicIds: t('Beauty & Cosmetics', 'Rigid Boxes'),
  }),
  post('what-drives-the-price-of-custom-boxes', 'What Drives the Price of Custom Boxes?', 'blogcat-cost', '2026-10-17', img('/images/blog-green-mailer.jpg', 'Open green mailer box with tissue'), {
    featured: true,
    topicIds: t('Corrugated Boxes'),
  }),
  post('how-to-measure-box-dimensions', 'How to Measure Box Dimensions', 'blogcat-design', '2026-10-14', img('/images/blog-measure-box.jpg', 'Box diagram showing length, width and height'), {
    readMinutes: 4,
    topicIds: t('Corrugated Boxes', 'Folding Cartons'),
  }),
  post('17-different-types-of-boxes-used-in-packaging', '17 Different Types of Boxes Used in Packaging', 'blogcat-design', '2026-10-10', img('/images/blog-box-types.jpg', 'Assorted kraft box styles'), {
    readMinutes: 8,
    topicIds: t('Rigid Boxes', 'Folding Cartons', 'Corrugated Boxes'),
  }),
  post('foil-stamping-and-embossing-explained', 'Foil Stamping and Embossing Explained', 'blogcat-materials', '2026-10-07', img('/images/about-coco.jpg', 'Printed bakery boxes and bag'), {
    topicIds: t('Candy & Chocolate'),
  }),
  post('choosing-board-grades', 'Choosing Board Grades: Kraft, White and Corrugated', 'blogcat-materials', '2026-10-03', img('/images/board-kraft.jpg', 'Kraft corrugated board'), {
    topicIds: t('Corrugated Boxes'),
  }),
  post('what-fsc-certification-means', 'What FSC Certification Means for Your Packaging', 'blogcat-sustainability', '2026-09-30', img('/images/blog-jewelry.jpg', 'Green jewellery boxes and pouches'), {
    topicIds: t('Jewelry'),
  }),
  post('kraft-vs-recycled-board', 'Kraft vs Recycled Board: A Practical Comparison', 'blogcat-sustainability', '2026-09-26', img('/images/blog-green-ribbons.jpg', 'Green gift boxes tied with ribbon'), {
    topicIds: t('Apparel & Fashion'),
  }),
  post('food-contact-packaging-rules', 'Food-Contact Packaging: What the Rules Require', 'blogcat-compliance', '2026-09-23', img('/images/blog-egle.jpg', 'White printed Egle boxes'), {
    topicIds: t('Restaurants & Food Service', 'Candy & Chocolate'),
  }),
  post('child-resistant-packaging-basics', 'Child-Resistant Packaging Basics', 'blogcat-compliance', '2026-09-19', img('/images/blog-red-seals.jpg', 'Kraft boxes closed with red seals'), {
    topicIds: t('Folding Cartons'),
  }),
  post('labeling-requirements-for-cosmetic-boxes', 'Labeling Requirements for Cosmetic Boxes', 'blogcat-compliance', '2026-09-16', img('/images/blog-minima.jpg', 'White Minima mailer boxes'), {
    topicIds: t('Beauty & Cosmetics'),
  }),
  post('moqs-explained', 'MOQs Explained: Ordering Small Runs', 'blogcat-cost', '2026-09-12', img('/images/blog-kraft-hands.jpg', 'Kraft mailer boxes'), {
    topicIds: t('Corrugated Boxes'),
  }),
  post('planning-lead-times', 'Planning Lead Times for Custom Packaging', 'blogcat-cost', '2026-09-09', img('/images/blog-blue-gift.jpg', 'Blue rigid gift box set'), {
    topicIds: t('Rigid Boxes'),
  }),
  post('15-creative-small-business-packaging-ideas', '15 Creative Small Business Packaging Ideas', 'blogcat-branding', '2026-09-05', img('/images/blog-small-business-ideas.jpg', 'Colourful printed retail boxes for small brands'), {
    readMinutes: 6,
    topicIds: t('Apparel & Fashion', 'Candles & Home Fragrance'),
  }),
  post('designing-an-unboxing-experience', 'Designing an Unboxing Experience Customers Share', 'blogcat-branding', '2026-09-02', img('/images/blog-mirakuru.jpg', 'Light blue Mirakuru rigid box with insert card'), {
    topicIds: t('Rigid Boxes', 'Box Inserts'),
  }),
  post('premium-finishes-and-shelf-presence', 'How Premium Finishes Lift Shelf Presence', 'blogcat-branding', '2026-08-29', img('/images/mailer-dream-big.jpg', 'Printed blue and pink mailer box'), {
    topicIds: t('Candles & Home Fragrance'),
  }),
]

export const blogPage: BlogPage = {
  hero: { heading: 'Guides & ideas', text: 'Practical guides on boxes, boards, print, and artwork, written to help you order the right box the first time.' },
  featuredHeading: 'Featured posts',
  searchPlaceholder: "What you'd like to read?",
  viewAllLabel: 'View all',
  post: {
    tocHeading: 'Contents',
    help: {
      heading: 'Get Help With Expert Guidance',
      text: 'Need help finding the perfect packaging? Contact us now for a free consultation with a trained packaging specialist.',
      phoneLabel: 'Call Us Toll Free',
      button: { label: 'Get Free Quote', href: '/quote' },
    },
    followLabel: 'Follow US',
    relatedEyebrow: 'Related Topics',
    relatedHeading: 'Keep reading',
    relatedButton: { label: 'View All Articles', href: '/blog' },
  },
  seoTitle: 'Packaging Guides & Ideas | Region Packaging Blog',
  seoDescription: 'Practical guides on custom boxes, board, print and artwork from Region Packaging.',
}
