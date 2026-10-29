// Local seed for the site-wide singletons, reviews and blog posts.
// Copy is taken verbatim from the Figma file (see design-copy.md).
import type { AboutPage, BlogPost, HomePage, Review, SiteSettings } from '../lib/types.ts'
import { img, ph } from './helpers.ts'

const faqItems = [
  { question: 'What types of custom boxes do you make?' },
  {
    question: 'What is the minimum order quantity?',
    answer:
      "We keep minimums low so you can order what you actually need. Share your box style, size and quantity and we'll confirm the minimum for your project.",
  },
  { question: 'Can I print my logo in full colour?' },
  { question: 'How long does production take?' },
]

export const settings: SiteSettings = {
  announcement: 'Subscribe to receive 20% off your first project',
  phone: '+123 - 456 - 789',
  email: 'hello@regionpackaging.com',
  socials: [
    { label: 'Facebook', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'X', url: '' },
  ],
  menuPromo: {
    title: 'Free custom dieline & 3D mockup',
    text: 'Lightweight printed paperboard cartons, die-cut and finished for retail shelves.',
    buttonLabel: 'Choose Your Box',
    href: '/products',
  },
  resourcesMenu: [
    { label: 'Blogs', href: '/blog' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'How To Order', href: '/how-to-order' },
    { label: 'Paper Weight Chart', href: '/paper-weight-chart' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ],
  stats: [
    { value: '10+', label: 'Years manufacturing' },
    { value: '2k+', label: 'Custom orders shipped' },
    { value: '98%', label: 'Clients reorder' },
  ],
  trustedHeading: 'Trusted by growing brands',
  trustedBrands: [
    { name: 'Postmark', logo: img('/brands/postmark.png', 'Postmark') },
    { name: 'Kiln & Co', logo: img('/brands/kiln-and-co.png', 'Kiln & Co') },
    { name: 'Fernway', logo: img('/brands/fernway.png', 'Fernway') },
    { name: 'Atlas Goods', logo: img('/brands/atlas-goods.png', 'Atlas Goods') },
    { name: 'Nourish', logo: img('/brands/nourish.png', 'Nourish') },
  ],
  google: { score: '4.9', label: 'Excellent', countText: 'Based on 127 Google reviews', reviewUrl: '' },
  reviewsSection: {
    eyebrow: 'Reviews',
    heading: 'Loved by brands like yours.',
    text: 'Real reviews from real customers, posted on Google.',
    buttonLabel: 'Review us on Google',
  },
  contact: {
    heading: 'Talk to a real person.',
    text: "Questions about a box, an order, or artwork? Send a message and we'll get back to you.",
    image: img('/images/contact-hero.jpg', 'Rigid supplement boxes in sage, blue and orange'),
    callLabel: 'Call Us',
    emailLabel: 'Email us',
    card: {
      heading: 'Know what box you want?',
      text: 'Skip the message and request a quote with your size and quantity.',
      button: { label: 'Choose Your Box', href: '/products' },
    },
    formHeading: 'Send us a message',
    formText: 'Fields marked * are required.',
    topics: ['General question', 'Order status', 'Artwork & design help', 'Samples', 'Something else'],
    buttonLabel: 'Send Message',
  },
  trustStrip: [
    { title: 'Low Minimums', text: '', icon: img('/icons/feature-boxes.svg', '') },
    { title: 'Free design help', text: '', icon: img('/icons/feature-box-design.svg', '') },
    { title: 'Free digital proof', text: '', icon: img('/icons/feature-box-search.svg', '') },
    { title: 'Sustainable options', text: '', icon: img('/icons/feature-eco.svg', '') },
    { title: 'Fast turnaround', text: '', icon: img('/icons/feature-fast.svg', '') },
  ],
  formDefaults: {
    material: ['White standard', 'Kraft', 'Double wall'],
    size: ['Medium 8x6x3', 'Small 6x4x3', 'Large 10x8x4', 'Extra Large 12.5x10x4', 'Custom size'],
    printing: ['Inside & Outside', 'Outside only'],
    productionSpeed: ['Standard', 'Rush'],
    quantity: ['100', '250', '500', '1,000', '2,500', '5,000+'],
    design: ['I Have a Design', 'I Need Design Help'],
  },
  productDefaults: {
    exploreEyebrow: 'Collections',
    howToOrder: {
      eyebrow: 'How it works',
      heading: 'How to Order in 4 Simple Steps',
      text: 'Configure above and send your inquiry, then follow the guided path to delivery.',
      steps: [
        { title: 'Choose & Spec', text: 'Select your style, board, print and size using the instant-pricing builder.' },
        { title: 'Set Quantity', text: 'Pick a quantity with low minimums and see your per-unit price update live.' },
        { title: 'Upload Artwork', text: 'Add your logo and artwork, or use free design support and a dieline.' },
        { title: 'Proof & Produce', text: 'Approve your free digital proof, then we print, make and deliver.' },
      ],
    },
    pricing: {
      eyebrow: 'PRICING',
      heading: 'Low Minimums, Pricing & Turnaround',
      text: 'Transparent instant pricing, built around what your business actually needs.',
      cards: [
        { title: 'From 100 units', text: 'Low minimums' },
        { title: 'No plate fees', text: 'On short digital runs' },
        { title: 'Rush available', text: 'When a launch date is fixed' },
      ],
    },
    whyUs: {
      eyebrow: 'WHY US',
      heading: 'Why Choose Region Packaging',
      text: 'A dedicated custom packaging partner, not just a box supplier.',
      cards: [
        { title: '25 years of experience', text: 'Decades of packaging know-how across e-commerce, retail and gifting, so your project is in expert hands.' },
        { title: 'In-house design', text: 'Our designers prepare dielines and artwork, check your files and make sure your branding prints perfectly.' },
        { title: 'Quality & support', text: 'Consistent print, reliable turnaround and a real team to talk to from first quote to final delivery.' },
      ],
    },
    faqs: { eyebrow: 'Questions', heading: 'Frequently Asked Questions', items: faqItems },
    relatedHeading: { eyebrow: 'Keep Exploring', heading: 'Related Products' },
    sampleLinkLabel: 'Or order a free sample first',
    formNote: 'No payment needed. We reply with your price, confirmed with a free digital proof.',
  },
  cta: {
    heading: 'Ready to manufacture your packaging?',
    text: 'Your first order comes with 10% off. Tell us the box, the size and the quantity, and we will send a fast, no-obligation quote.',
    primary: { label: 'Get a Quote', href: '/quote' },
    secondary: { label: 'Choose Your Box', href: '/products' },
    coupon: { amount: '20% OFF', label: 'Your first order', code: 'FIRST10', buttonLabel: 'Copy code', note: 'New customers only' },
  },
  footer: {
    blurb:
      'Mailer boxes, shipping boxes and retail packaging, printed in full colour and built to your exact dimensions. Low minimums, fast turnaround.',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'How It Works', href: '/how-to-order' },
          { label: 'Design Services', href: '/#design' },
          { label: 'Sustainability', href: '/#eco' },
          { label: 'Reviews', href: '/#reviews' },
          { label: 'Folding Cartons', href: '/custom-folding-cartons' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Get a Quote', href: '/quote' },
          { label: 'Artwork Guidelines', href: '/#design' },
          { label: 'FAQs', href: '/faqs' },
          { label: 'Materials & Finishes', href: '/custom-mailer-boxes#materials' },
        ],
      },
    ],
    newsletterTitle: 'Sign Up For Exclusive Offers',
    newsletterText: 'Subscribe for latest product promotions & discounts.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterButton: 'Subscribe',
    followLabel: 'Follow US',
    paymentsLabel: 'We accept',
    paymentLogos: img('/icons/payment-methods.png', 'Visa, Mastercard, PayPal, American Express, Discover'),
    copyright: '© 2026 Region Packaging. All rights reserved.',
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
}

const mailerCard = {
  title: 'Mailer Boxes',
  text: 'Self-locking corrugated mailers built for e-commerce and the unboxing moment.',
  linkLabel: 'Explore mailer boxes',
  href: '/custom-mailer-boxes',
  image: img('/images/mailer-glowries.jpg', 'Kraft mailer box with green product packaging'),
}
const shippingCard = {
  title: 'Shipping Boxes',
  text: 'Heavy-duty, ECT-rated corrugated shipping boxes printed with your logo, in any size.',
  linkLabel: 'Explore shipping boxes',
  href: '/custom-mailer-boxes/corrugated-mailer-boxes',
  image: img('/images/shipping-studio-binky.jpg', 'Blue printed corrugated shipping boxes'),
}
const giftCard = {
  title: 'Gift Boxes',
  text: 'Premium rigid and magnetic-closure gift packaging for retail and corporate gifting.',
  linkLabel: 'Explore gift boxes',
  href: '/custom-rigid-boxes',
  image: img('/images/gift-maison-bloem.jpg', 'Printed gift box held in two hands'),
}

export const home: HomePage = {
  hero: {
    ratingText: '4.8/5 based on 392 reviews',
    heading: 'Create custom packaging & boxes',
    intro:
      'Mailer boxes, shipping boxes and retail packaging — printed in full colour and built to your exact dimensions. Low minimums, fast turnaround.',
    cta: { label: 'Choose Your Box', href: '/products' },
    slides: [img('/images/hero-shipping-boxes.jpg', 'Stack of branded corrugated shipping boxes'), ph('Hero slide 2'), ph('Hero slide 3')],
  },
  chooseBox: {
    eyebrow: 'Product Range',
    heading: 'Choose your box.',
    text: 'Each style is made to order: your size, your board, your print. Pick a starting point and we engineer it around your product.',
    button: { label: 'View All Products', href: '/products' },
    cards: [
      mailerCard,
      shippingCard,
      giftCard,
      {
        title: 'Retail Boxes',
        text: 'Shelf-ready, point-of-sale product packaging that makes your brand stand out in store.',
        linkLabel: 'Explore retail boxes',
        href: '/custom-folding-cartons',
        image: img('/images/retail-greenleaf.jpg', 'Kraft and navy retail boxes'),
      },
      {
        title: 'Folding Cartons',
        text: 'Lightweight printed paperboard cartons, die-cut and finished for retail shelves.',
        linkLabel: 'Explore folding Cartons',
        href: '/custom-folding-cartons',
        image: img('/images/folding-carton-kinn-skin.jpg', 'Sage green folding cartons with a serum bottle'),
      },
      {
        title: 'PR & Seasonal Boxes',
        text: 'Influencer PR boxes, Christmas and holiday packaging designed for a memorable launch.',
        linkLabel: 'Explore more boxes',
        href: '/products',
        image: img('/images/pr-seasonal-boxes.jpg', 'Stack of colourful printed PR and seasonal boxes'),
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'Order Custom Packaging in 4 Steps',
    text: 'A simple, guided process with a digital proof before anything goes to print.',
    steps: [
      { title: 'Choose Your Box', text: 'Select your box style and material, from corrugated mailers to paperboard cartons.', icon: img('/icons/step-choose-box.svg', '') },
      { title: 'Set Size & Quantity', text: 'Pick a stock or custom size and the quantity that fits your run, with low minimums.', icon: img('/icons/step-size-box.svg', '') },
      { title: 'Brand It Free', text: 'Upload your logo and artwork or use our free design support to bring your brand to life.', icon: img('/icons/step-brand-logo.svg', '') },
      { title: 'Approve & Receive', text: 'Approve your digital proof, we produce it and deliver it to your door.', icon: ph('Approved icon') },
    ],
  },
  industries: {
    eyebrow: 'Shop by industry',
    heading: 'Custom Boxes by Industry',
    text: 'A simple, guided process with a digital proof before anything goes to print.',
    tabs: [
      { label: 'Retail & CPG', cards: [] },
      { label: 'Cosmetics & Beauty', categoryId: 'category-custom-cosmetic-boxes', cards: [] },
      { label: 'Food & Beverage', categoryId: 'category-custom-food-boxes', cards: [] },
      { label: 'Apparel', categoryId: 'category-custom-apparel-boxes', cards: [] },
      { label: 'Consumer Electronics', cards: [] },
      { label: 'Subscription Boxes', cards: [] },
      { label: 'Corporate Gifting', cards: [] },
      { label: 'Books & Stationery', cards: [] },
      { label: 'Toys & Games', cards: [] },
      { label: 'E-commerce & DTC', cards: [] },
    ],
    defaultCards: [mailerCard, shippingCard, giftCard],
    note: 'Every category sells differently. Whether you need high-end retail cartons, protective e-commerce mailers, or compliant food packaging, we craft custom structures and materials matched to your product, brand, and shipping needs.',
  },
  quantity: {
    eyebrow: 'Why brands choose us',
    heading: 'Order Any Quantity, Fully Custom',
    text: 'Everything you need to launch standout branded packaging, without the big-order barrier.',
    body: [
      'Region Packaging is a full-service custom packaging supplier for brands that want packaging to do more than hold a product. Whether you are a small business shipping your first orders or an established retailer scaling a product line, our custom packaging solutions are built around low minimum order packaging, so you never have to over-commit to get a professional result. Every box is fully customizable, from the board and size to the print and finish, and backed by branded packaging for business that protects your product and reinforces your brand identity at every touchpoint. With 25 years of experience, in-house design and honest, eco-friendly custom boxes, we help you look premium, reduce damage in transit and turn each delivery into a moment your customers remember and share.',
    ],
    features: [
      { title: 'Low Minimums', text: 'Order what you need with low minimum order packaging, ideal for small businesses and new launches.', icon: img('/icons/feature-boxes.svg', '') },
      { title: 'Sustainable Options', text: 'Recyclable corrugated fiberboard, kraft paper and FSC certified board, with honest eco choices.', icon: img('/icons/feature-eco.svg', '') },
      { title: 'Fully Customizable', text: 'Any size, any colour, your logo. Bespoke box manufacturing with full-colour digital and flexographic printing.', icon: img('/icons/feature-layers.svg', '') },
      { title: 'Quick Turnaround', text: 'A fast, transparent process from digital proof to delivery, so your packaging arrives on schedule.', icon: img('/icons/feature-fast-2.svg', '') },
    ],
  },
  design: {
    eyebrow: 'Branding & Materials',
    heading: 'Packaging design, done for you.',
    lead: 'No design team needed. Send us your logo and a rough idea, and our in-house designers turn it into print-ready packaging.',
    body: [
      'We place your artwork on the correct dieline, set up bleed and placement, and send you a visual proof to approve before anything goes to print. It is the easiest way to see your custom boxes come to life, without hiring a designer.',
    ],
    bullets: [
      { title: 'Artwork set up for you', text: 'Your branding placed, sized and positioned on the right dieline.' },
      { title: 'Free dieline template', text: 'Prefer your own software? We send a print-ready dieline to design on.' },
      { title: 'Free design support', text: 'Our designers help with artwork and layout at no extra cost.' },
    ],
    button: { label: 'Start with a free quote', href: '/quote' },
    image: ph('Dieline illustration'),
  },
  eco: {
    eyebrow: 'Why Region Packaging',
    heading: 'Eco-friendly packaging solutions',
    body: "We're committed to offsetting our world's carbon footprint, contributing to reforestation, and sustainability. Not only do we offer packaging that's FSC™ certified, all of our premium product boxes is made from recycled materials and printed with soy-based ink.",
    linkText: 'FSC™ certified',
    linkHref: '',
    badge: ph('FSC badge'),
  },
  logo: {
    eyebrow: 'Branding & Materials',
    heading: 'Custom boxes with your logo.',
    lead: 'Your logo printed in full colour, inside and out. Premium materials and print quality that make the first impression count.',
    body: [
      'Great packaging starts with the right material. Corrugated fiberboard for strength and protection, paperboard for crisp retail cartons, and kraft for a natural, recyclable look, printed digitally and flexographically so your brand colours stay consistent on every run.',
    ],
    bullets: [
      { title: 'Materials that fit', text: 'Corrugated fiberboard, paperboard and kraft paper, matched to your product and budget.' },
      { title: 'Full-colour printing', text: 'Digital and flexographic printing with crisp, consistent brand colours.' },
      { title: 'Premium finishes', text: 'Die cutting, foil stamping and embossing to lift your packaging from good to unforgettable.' },
    ],
    image: img('/images/factory-branded-boxes.jpg', 'Branded kraft and navy boxes in a packaging workshop'),
  },
  sample: {
    eyebrow: 'FREE SAMPLE PACK',
    heading: 'Feel the Quality First',
    text: 'Request a free sample pack and check the board, print and finish before you place a full order.',
    button: { label: 'Request Free Sample', href: '/quote?type=sample' },
    note: 'No obligation · Ships to your door',
    image: img('/images/sample-pack.jpg', 'Sample pack of board swatches in a kraft mailer'),
  },
  faq: { eyebrow: 'FAQ', heading: 'Questions, answered.', text: 'Real reviews from real customers, posted on Google.', items: faqItems },
  blog: {
    eyebrow: 'Guides & ideas',
    heading: 'Packaging, explained.',
    text: 'Practical guides to help you choose, measure and design your boxes.',
    postIds: [],
    linkLabel: 'Read guide',
  },
  seoTitle: 'Custom Packaging & Boxes | Region Packaging',
  seoDescription:
    'Mailer boxes, shipping boxes and retail packaging — printed in full colour and built to your exact dimensions. Low minimums, fast turnaround.',
}

export const reviews: Review[] = Array.from({ length: 6 }, (_, i) => ({
  id: `review-placeholder-${i + 1}`,
  name: 'Aisha M.',
  role: 'Beauty brand founder',
  rating: 5,
  dateText: '2 weeks ago',
  quote: 'The mailer boxes landed exactly as proofed and the unboxing looks premium. Low minimums made it easy to start.',
  avatar: img('/images/reviewer-avatar.jpg', 'Aisha M.'),
  source: 'Posted on Google',
}))

export const posts: BlogPost[] = [
  {
    id: 'post-small-business-packaging-ideas',
    slug: '15-creative-small-business-packaging-ideas',
    title: '15 Creative Small Business Packaging Ideas',
    kicker: 'Packaging ideas · 6 min read',
    image: img('/images/blog-small-business-ideas.jpg', 'Colourful printed retail boxes for small brands'),
  },
  {
    id: 'post-measure-box-dimensions',
    slug: 'how-to-measure-box-dimensions',
    title: 'How to Measure Box Dimensions',
    kicker: 'How-to guide · 4 min read',
    image: img('/images/blog-measure-box.jpg', 'Box diagram showing length, width and height'),
  },
  {
    id: 'post-types-of-boxes',
    slug: '17-different-types-of-boxes-used-in-packaging',
    title: '17 Different Types of Boxes Used in Packaging',
    kicker: 'Box guide · 8 min read',
    image: img('/images/blog-box-types.jpg', 'Assorted kraft box styles'),
  },
]

export const about: AboutPage = {
  hero: {
    heading: 'The factory behind your packaging.',
    text: 'Region Packaging is a packaging manufacturer. We print, build, and deliver custom boxes, and our team helps with design when you need it.',
    button: { label: 'Choose Your Box', href: '/products' },
    photos: [
      img('/images/about-belmont.jpg', 'Pink Belmont handle box held up against the sky'),
      img('/images/about-coco.jpg', 'Coco bakery boxes and carrier bag with cookies'),
      img('/images/about-mon-chou.jpg', 'Stack of printed Mon Chou gift boxes'),
    ],
  },
  mission: {
    missionHeading: 'Our Mission',
    missionText:
      'To make custom packaging easy to order for brands of every size. Tell us the box you need, approve your free digital proof, and receive packaging that presents your product properly, protects it in transit, and arrives ready to use.',
    missionIcon: img('/icons/about-mission.svg', ''),
    photo: img('/images/about-factory.jpg', 'Packer preparing boxed orders in the Region Packaging warehouse'),
    visionHeading: 'Our Vision',
    visionText:
      'To be the factory brands come back to: straightforward to work with, consistent in quality, and honest about timelines, from a first sample pack to repeat orders, with the same care for every order, large or small, year after year.',
    visionIcon: img('/icons/about-vision.svg', ''),
  },
  whoWeAre: {
    eyebrow: 'Who we are',
    heading: 'A factory, not a design studio.',
    body: [
      'Region Packaging manufactures custom boxes. Printing, building, and delivering is the core of the business: your boxes are produced in-house, printed in full colour inside and out, and shipped to your door.',
      "Design help is part of the service, not a separate studio. If you have artwork, we check it and prepare it for print. If you don't, our team helps with the design, done for you, and shows you a free digital proof before anything is printed.",
    ],
    image: img('/images/gift-maison-bloem.jpg', 'Maison Bloem gift box being packed by hand'),
    stats: [
      { value: '10+', label: 'Years of experience' },
      { value: '10k+', label: 'Orders delivered' },
      { value: '98%', label: 'Customers who reorder' },
    ],
  },
  products: {
    eyebrow: 'Product Range',
    heading: 'What we make',
    text: 'Each style is made to order: your size, your board, your print. Pick a starting point and we engineer it around your product.',
  },
  values: {
    eyebrow: 'What we stand for',
    heading: 'Our values',
    items: [
      { title: 'Quality first', text: 'Accurate printing and dependable materials on every run.', icon: img('/icons/about-value-quality.svg', '') },
      {
        title: 'Honest timelines',
        text: "We confirm your timeline once you approve your proof, instead of promising dates we can't keep.",
        icon: img('/icons/about-value-timelines.svg', ''),
      },
      {
        title: 'Same standard, any size',
        text: 'From 100 units to larger runs, small orders get the same attention as big ones.',
        icon: img('/icons/about-value-standard.svg', ''),
      },
      {
        title: 'Practical sustainability',
        text: 'Kraft and recycled boards, kerbside recyclable. Sustainability in the material, not just in the marketing.',
        icon: img('/icons/about-value-sustainability.svg', ''),
      },
    ],
  },
  seoTitle: 'About Us | Region Packaging',
  seoDescription: 'Region Packaging is a custom packaging manufacturer: we print, build and deliver custom boxes, with design help and a free digital proof.',
}
