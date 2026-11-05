// Local seed for the site-wide singletons, reviews and blog posts.
// Copy is taken verbatim from the Figma file (see design-copy.md).
import type { AboutPage, ArtworkPage, HomePage, SimplePage, Review, SiteSettings } from '../lib/types.ts'
import { img, ph } from './helpers.ts'
import { doc, p } from './richtext.ts'

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
  pageIntros: {
    products: { heading: 'All Products' },
    faqs: {},
    howToOrder: { heading: 'How To Order' },
    quote: { heading: 'Get a Quote' },
    sample: { heading: 'Request Free Sample' },
  },
  // Sample copy from the Figma sub-product design (written for rigid boxes); editors replace it per product.
  subProductDefaults: {
    tabs: { overview: 'Overview', specs: 'Specs', materials: 'Materials & Finishes', why: 'Sustainability & Why Us', faq: 'FAQ' },
    shortDescription:
      "Premium two-piece and magnetic-closure setup boxes, wrapped in your artwork. Free design help and low minimums. Send your inquiry and we'll reply with your price.",
    highlights: ['Lid-and-base, magnetic, book-style and drawer styles', 'Thick greyboard that holds its shape', 'Full-colour print, inside & out'],
    gallery: [
      img('/images/mailer-glowries.jpg', 'Kraft box with printed skincare packaging'),
      img('/images/mailer-dream-big.jpg', 'Blue and pink printed box'),
      img('/images/sample-pack.jpg', 'Kraft mailer with board samples'),
    ],
    overview: {
      eyebrow: 'Overview',
      heading: 'What are {product}?',
      body: [
        'A custom rigid box — also called a setup box — is a premium, non-collapsible box built from thick greyboard or chipboard (typically 1.5–3 mm) wrapped in printed paper. The classic format is the two-piece rigid box: a lid-and-base construction where the lid lifts cleanly off the base. Magnetic-closure, book-style and drawer variants add different reveals for different products.',
        'Unlike a folding carton, a rigid box holds its shape permanently, which is why luxury brands reach for it on high-value products and gifting. From skincare to electronics, a rigid box signals quality the moment it is picked up, and protects what is inside through retail handling and e-commerce fulfillment — the definition of premium product packaging.',
      ],
      images: [img('/images/mailer-dream-big.jpg', 'Blue and pink printed box with the lid open')],
    },
    benefits: {
      eyebrow: 'Benefits',
      heading: 'Benefits of {product} for your brand',
      text: 'A rigid box does more than hold a product — it frames it, protects it and makes the open feel like an event.',
      body: [],
      items: [
        {
          title: 'Brand Recognition',
          text: 'A fully printed rigid box with lid keeps your logo and colours front and centre, on the shelf and at the doorstep.',
          icon: img('/icons/sub-benefit-brand.svg', ''),
        },
        {
          title: 'Shelf Presence',
          text: 'Weight, structure and finish signal luxury instantly, lifting how customers value what is inside.',
          icon: img('/icons/sub-benefit-shelf.svg', ''),
        },
        {
          title: 'Unboxing Moment',
          text: 'A magnetic closure or lift-off lid creates a giftable, share-worthy reveal customers love to film.',
          icon: img('/icons/sub-benefit-unboxing.svg', ''),
        },
        {
          title: 'Superior Protection',
          text: 'Thick board and fitted inserts guard fragile, high-value products far better than a folding carton.',
          icon: img('/icons/sub-benefit-protection.svg', ''),
        },
      ],
    },
    useCases: {
      eyebrow: 'Use cases',
      heading: 'Industries & use cases',
      text: 'Custom mailer boxes work across categories that ship directly to customers.',
      pills: [
        'Cosmetics & skincare',
        'Jewelry & watches',
        'Consumer electronics',
        'Confectionery & spirits',
        'Apparel & accessories',
        'Corporate gifting',
        'Luxury retail',
        'Subscription & DTC',
      ],
      note: 'Cosmetics and skincare brands use magnetic-closure boxes with fitted inserts, jewelry and watch brands choose small rigid gift boxes with foam cradles, and electronics brands rely on structure and inserts to immobilise components. Confectionery and spirits lean on foil and embossing for a giftable look, while apparel and corporate gifting use large lift-off-lid boxes for a premium reveal. Whatever you sell, a rigid box elevates the unboxing experience and protects the product end to end.',
    },
    specs: {
      eyebrow: 'Specifications',
      heading: '{product} specifications',
      text: 'Structure, board, print, and minimum order for custom rigid boxes.',
      rows: [
        { label: 'Box style', value: 'Two-piece, magnetic, book-style, drawer' },
        { label: 'Material', value: 'Greyboard wrapped in paper' },
        { label: 'Board thickness', value: '1.5–3 mm calliper' },
        { label: 'Strength', value: 'Rigid, non-collapsible' },
        { label: 'Printing', value: 'Digital, offset, litho-lam' },
        { label: 'Print area', value: 'Full wrap, inside & out' },
        { label: 'Minimum order', value: 'From 100 units' },
      ],
      stockSizes: [],
      note: 'Dimensions are measured internally as length by width by height, so your product fits perfectly. Any dimension, depth or insert can be made to fit a specific product or a multi-item set, with free dieline help. Custom sizing and tooling can raise the minimum slightly and add a little lead time, which we confirm up front with your quote.',
    },
    materials: {
      eyebrow: 'Materials',
      heading: 'Materials & board options',
      text: 'Pick the board that matches your product, weight and sustainability goals.',
      items: [
        {
          name: 'Greyboard / Chipboard',
          badge: 'Most Popular',
          description: 'Dense 1.5–3 mm greyboard gives a luxury packaging box its weight and permanent structure, the core of every setup box.',
          image: img('/images/material-greyboard.jpg', 'Stack of grey chipboard sheets'),
        },
        {
          name: 'Printed Paper or Fabric',
          badge: 'The Wrap',
          description: 'A printed paper or textured fabric wrap carries your full-colour artwork, foil and finish around the rigid core.',
          image: img('/images/material-paper-wrap.jpg', 'Box wrapped in patterned paper'),
        },
        {
          name: 'Corrugated-backed Rigid',
          badge: 'Heavy Duty',
          description: 'For heavier products or shipping-first use, a corrugated-backed rigid board adds strength without losing the premium feel.',
          image: img('/images/material-corrugated-rigid.jpg', 'Close-up of corrugated board flutes'),
        },
      ],
      note: 'Every board is graded by its Edge Crush Test value, which tells you how much stacking pressure it can take. For most e-commerce products a single-wall board is ideal, while heavier or fragile items benefit from a stronger grade or double wall. If sustainability is the priority, kraft paper and recycled-content liners keep the footprint low while still printing beautifully. Tell us what you ship and how it travels, and we will specify a board that protects it reliably from the first mile to the last. The right board keeps your products safe, your parcels light and your packaging costs under control.',
    },
    printing: {
      eyebrow: 'Print & finish',
      heading: 'Printing & finishing options',
      body: [
        'How your box is printed shapes both the look and the unit cost. For short runs and photographic artwork, full-colour digital printing is ideal because there are no plates to pay for. For large, repeating orders, flexographic printing brings the per-unit cost down using spot colours. Whichever method fits, we print your custom printed mailer boxes to a consistent standard and can brand every panel, inside and out.',
      ],
      image: img('/images/printing-rigid-box.jpg', 'Kraft rigid box with a dark tray'),
      methodsHeading: 'Printing Methods',
      methods: [
        { name: 'Full-colour digital', description: 'Photographic, full-colour artwork with no plate cost, perfect for short runs.' },
        { name: 'Flexographic printing', description: 'Cost-effective spot-colour printing for larger, repeat production runs.' },
      ],
      finishesHeading: 'Finishes & Add-ons',
      finishes: [
        { name: 'Matte or gloss', description: 'Choose a finish that matches your brand, from understated matte to a premium sheen.' },
        { name: 'Custom inserts', description: 'Die-cut pads and trays hold products in place and lift the presentation.' },
        { name: 'Inside printing', description: 'Brand the interior for a reveal that makes the unboxing experience feel considered.' },
        { name: 'Free design support', description: 'Download a dieline or let our designers prepare a print-ready file for you.' },
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
      note: 'We built Region Packaging to give growing brands the capability of a large manufacturer with the attention of a specialist partner. That means honest advice on specification, transparent pricing with no hidden setup fees, and a real person who picks up when you call. Whether you are ordering your first run of personalized mailer boxes or scaling up to custom mailer boxes wholesale, we treat every project with the same care from the first quote to the final delivery.',
    },
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
    style: ['Two Piece', 'Magnetic Closure', 'Book Style', 'Drawer', 'Shoulder Neck'],
    finish: ['Matte Lamination', 'Gloss Lamination', 'Soft Touch', 'Spot UV', 'Foil Stamping'],
    material: ['White standard', 'Kraft', 'Double wall'],
    size: ['Small 4x4x2', 'Medium 8x6x3', 'Small 6x4x3', 'Large 10x8x4', 'Extra Large 12.5x10x4', 'Custom size'],
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
          { label: 'Artwork Guidelines', href: '/artwork-guidelines' },
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
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
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

export { posts } from './blog.ts'

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

export const artwork: ArtworkPage = {
  hero: {
    heading: 'Artwork guidelines',
    text: 'What to send us, how to prepare it, and what happens if you have no artwork at all. Short version: send what you have, and we will help with the rest.',
    buttonLabel: 'Download the full guide',
    dielineText:
      'A dieline is the flat template your box is cut and folded from. We provide standard dielines free, and set up custom ones free too. You do not need to draw one yourself.',
  },
  formats: {
    heading: 'Formats we accept',
    text: 'Send your artwork in any of these formats, attached in the inquiry form.',
    items: [
      { title: 'PDF', text: 'A print-ready PDF is the safest choice for accurate colour and sharp text.', icon: img('/icons/art-file-pdf.svg', '') },
      { title: 'AI', text: 'Adobe Illustrator files keep your artwork editable, which helps if anything needs adjusting.', icon: img('/icons/art-file-ai.svg', '') },
      { title: 'EPS', text: 'A widely supported vector format for logos and print artwork.', icon: img('/icons/art-file-eps.svg', '') },
      { title: 'PNG', text: 'Good for artwork with transparency. Send the largest size you have.', icon: img('/icons/art-file-png.svg', '') },
      { title: 'JPG', text: 'Fine for photographic artwork. Send the largest size you have.', icon: img('/icons/art-file-jpg.svg', '') },
    ],
  },
  essentials: {
    heading: 'The essentials',
    text: 'Four things that decide how your print comes out. General print standards, not strict rules. If your file misses one, send it anyway and we will check it.',
    items: [
      { title: 'CMYK, not RGB', text: 'Screens show RGB. Print uses CMYK. Files sent in RGB can shift in colour when converted.', icon: img('/icons/art-cmyk.png', '') },
      { title: '300 DPI', text: 'The print standard for sharp artwork. Small files that look crisp on screen can still print soft.', icon: img('/icons/art-dpi.svg', '') },
      { title: 'Bleed', text: 'Extend backgrounds past the cut edge, so no white border shows. Keep text inside the safe area.', icon: img('/icons/art-bleed.svg', '') },
      { title: 'Outlined fonts', text: 'Outlined text cannot shift if a font is missing. Keep text readable, not tiny or very thin.', iconText: 'Aa' },
    ],
  },
  steps: {
    heading: 'What happens next',
    text: 'Three steps, and nothing is printed until you approve it.',
    steps: [
      { title: 'We check your file', text: 'Resolution, colour, bleed, and fonts. If something needs fixing, we tell you first.' },
      { title: 'You get a free digital proof', text: 'See your artwork on the box before production starts.' },
      { title: 'You approve, then we print', text: 'The box you receive is the box you signed off.' },
    ],
    note: 'No artwork? No problem. Our team helps with artwork and dielines as a done-for-you service.',
  },
  seoTitle: 'Artwork Guidelines | Region Packaging',
  seoDescription:
    'What artwork to send for custom printed boxes: accepted file formats, CMYK, 300 DPI, bleed and outlined fonts, and what happens after you upload.',
}

const placeholderPage = (slug: string, title: string, note: string): SimplePage => ({ id: `page-${slug}`, slug, title, body: doc(p(`[Placeholder] ${note}`)) })
export const pages: SimplePage[] = [
  placeholderPage('paper-weight-chart', 'Paper Weight Chart', 'The paper weight chart has not been supplied yet.'),
  placeholderPage('privacy-policy', 'Privacy Policy', 'The privacy policy has not been supplied yet.'),
  placeholderPage('terms-of-service', 'Terms of Service', 'The terms of service have not been supplied yet.'),
]
