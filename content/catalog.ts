// Local seed for the 8 categories and 32 sub-products (from Sub Products.xlsx).
// Custom Mailer Boxes carries the full Product Page copy from Figma; the others start
// with just their names and fill in from the CMS. Empty sections are hidden on the site.
import type { Category, Product } from '../lib/types.ts'
import { img, ph } from './helpers.ts'

const icon = {
  mailer: img('/icons/mailer-box.svg', ''),
  gift: img('/icons/gift-box.svg', ''),
  burger: img('/icons/burger-box.svg', ''),
  insert: img('/icons/box-insert.svg', ''),
  tray: img('/icons/menu-tray.svg', ''),
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const blankPage = { highlights: [], gallery: [] }

type Seed = { title: string; kind: Category['kind']; icon: keyof typeof icon; products: string[]; extra?: Partial<Category> }

const tree: Seed[] = [
  {
    title: 'Custom Mailer Boxes',
    kind: 'product-type',
    icon: 'mailer',
    products: ['Black Mailer Boxes', 'Corrugated Mailer Boxes', 'Kraft Mailer Boxes', 'Small Product Mailer Boxes'],
  },
  {
    title: 'Custom Apparel Boxes',
    kind: 'industry',
    icon: 'gift',
    products: ['Custom Shirt Boxes', 'Custom Sock Packaging', 'Custom Hat Boxes', 'Custom Shoe Boxes'],
  },
  {
    title: 'Custom Cosmetic Boxes',
    kind: 'industry',
    icon: 'insert',
    products: ['Cream Boxes', 'Lotion Boxes', 'Eyelash Boxes', 'Eyeliner Boxes'],
  },
  {
    title: 'Custom Folding Cartons',
    kind: 'product-type',
    icon: 'insert',
    products: ['Straight Tuck End (STE)', 'Reverse Tuck End (RTE)', 'Tuck Top Boxes', 'Snap Lock Bottom'],
    extra: {
      cardText: 'Lightweight printed paperboard cartons for retail.',
      cardImage: img('/images/folding-carton-mirakuru.jpg', 'Light blue printed carton with insert card'),
    },
  },
  {
    title: 'Custom Food Boxes',
    kind: 'industry',
    icon: 'burger',
    products: ['Burger Boxes', 'Candy Boxes', 'Cereal Boxes', 'Chocolate Boxes'],
  },
  {
    title: 'Custom Rigid Boxes',
    kind: 'product-type',
    icon: 'gift',
    products: ['Collapsible Rigid Boxes', 'Magnetic Rigid Boxes', 'Shoulder Neck Boxes', 'Two Piece Boxes'],
    extra: { cardText: 'Premium rigid and magnetic-closure gift packaging.', cardImage: ph('Custom gift boxes photo') },
  },
  {
    title: 'Custom Soap Boxes',
    kind: 'industry',
    icon: 'tray',
    products: ['Soap Cigar Bands', 'Soap Wrapping Paper', 'Soap Sleeves', 'Soap Boxes with Window'],
  },
  {
    title: 'Custom Candle Boxes',
    kind: 'industry',
    icon: 'gift',
    products: ['Candle Dust Covers', 'Two Piece Candle Boxes', 'Candle Boxes with Inserts', 'Candle Boxes with Window'],
  },
]

const productExtras: Record<string, Partial<Product>> = {
  'corrugated-mailer-boxes': {
    cardText: 'Heavy-duty corrugated shipping boxes printed with your logo.',
    cardImage: img('/images/shipping-studio-binky.jpg', 'Blue printed corrugated shipping boxes'),
  },
  'kraft-mailer-boxes': { cardImage: img('/images/kraft-mailers-vase.jpg', 'Kraft mailer boxes on a table') },
}

const mailer: Partial<Category> = {
  ratingText: '4.9 based (127 reviews)',
  shortDescription:
    "Self-locking corrugated mailers printed with your logo. Free design help and low minimums. Send your inquiry and we'll reply with your price.",
  highlights: ['Materials that fit', 'Ships flat, assembles in seconds', 'Full-colour print inside & out'],
  gallery: [
    img('/images/mailer-glowries.jpg', 'Kraft mailer box with printed skincare packaging'),
    img('/images/mailer-dream-big.jpg', 'Blue and pink printed mailer boxes'),
    img('/images/mailer-calmly.jpg', 'Light blue mailer box printed inside and out'),
    img('/images/mailer-unbox-happiness.jpg', 'Blue mailer box printed inside'),
  ],
  cardText: 'Self-locking corrugated mailers built for e-commerce and the unboxing moment.',
  cardImage: img('/images/mailer-glowries.jpg', 'Kraft mailer box with printed skincare packaging'),
  explore: {
    eyebrow: 'Collections',
    heading: 'Explore Our Custom Mailer Box Styles & Options',
    text: 'Browse our range of functional, fully branded custom mailer boxes for every product.',
  },
  overview: {
    eyebrow: 'Overview',
    heading: 'What Are Custom Mailer Boxes?',
    body: [
      'Custom mailer boxes are self-locking shipping boxes made from a single sheet of corrugated fiberboard, folded into a sturdy base with wings that tuck and lock closed without tape. The classic style is the Roll End Front Tuck, known as REFT, which uses dust flaps and side locks to hold its shape and cushion your product on its journey. They are the go-to choice for e-commerce fulfillment, subscription box programs and direct-to-consumer brands because they are light, strong and designed to be opened.',
      'Unlike a plain brown carton, a custom printed mailer box is a branding surface. Every panel, inside and out, can carry your logo, colours, artwork and message, turning a routine delivery into a memorable unboxing experience. Durable corrugated mailers travel safely through USPS and other carriers, arrive looking considered, and give customers a reason to share your packaging.',
      'Because they ship flat and assemble in seconds, mailer boxes are efficient to store and quick to pack, which matters when you fulfil orders by hand or through a fulfilment partner. The front tuck and side locks mean no tape is needed, so packing is faster and the finished parcel looks clean. From a single unit to a full subscription box run, the same reliable structure scales with your business.',
    ],
    images: [
      img('/images/mailer-dream-big.jpg', 'Blue and pink printed mailer boxes'),
      img('/images/mailer-calmly.jpg', 'Light blue mailer box printed inside and out'),
      img('/images/mailer-unbox-happiness.jpg', 'Blue mailer box printed inside'),
    ],
  },
  benefits: {
    eyebrow: 'Benefits',
    heading: 'Benefits of Custom Mailer Boxes for Your Brand',
    text: 'Branded mailer packaging does several jobs at once, at every step of the journey.',
    body: [
      'A custom mailer box protects what is inside, carries your brand across the entire carrier network, and shapes the first physical impression a customer has of your company. For online brands that rarely meet their customers in person, that moment on the doorstep is one of the few tangible touchpoints you truly own. Branded mailer packaging turns a routine delivery into an on-brand experience, encourages customers to share their unboxing, and quietly signals that the product inside was worth the care.',
    ],
    items: [
      { title: 'Brand Recognition', text: 'A mailer box with logo printing keeps your brand front and centre from doorstep to desk.', icon: img('/icons/feature-box-design.svg', '') },
      { title: 'Product Protection', text: 'Snug, self-locking construction reduces movement, damage and costly returns.', icon: img('/icons/feature-boxes.svg', '') },
      { title: 'Unboxing Moment', text: 'Inside printing and inserts create a share-worthy experience that builds loyalty.', icon: img('/icons/feature-unboxing.svg', '') },
      { title: 'Repeatable', text: 'Consistent sizes and spec make reordering simple as your volume grows.', icon: img('/icons/feature-layers.svg', '') },
    ],
  },
  specs: {
    eyebrow: 'Specifications',
    heading: 'Specs, Sizes & Dimensions',
    text: 'Everything you need to know at a glance, then choose a stock size or go fully custom.',
    rows: [
      { label: 'Box style', value: 'Roll End Front Tuck (REFT)' },
      { label: 'Material', value: 'Corrugated fiberboard' },
      { label: 'Board options', value: 'White, Kraft, Double wall' },
      { label: 'Strength', value: '32 ECT standard' },
      { label: 'Printing', value: 'Digital & flexographic' },
      { label: 'Print area', value: 'Outside and inside' },
      { label: 'Minimum order', value: 'Low minimums' },
      { label: 'Custom sizes', value: 'Available' },
    ],
    stockSizesHeading: 'Popular Stock Sizes',
    stockSizes: [
      { size: 'Small', dimensions: '6 x 4 x 3', bestFor: 'Cosmetics, small goods' },
      { size: 'Medium', dimensions: '8 x 6 x 3', bestFor: 'Apparel, candles' },
      { size: 'Large', dimensions: '10 x 8 x 4', bestFor: 'Subscription boxes' },
      { size: 'Extra Large', dimensions: '12.5 x 10 x 4', bestFor: 'Gift sets, bundles' },
    ],
    note: 'Dimensions are measured as internal length by width by height, so your product sits snugly with the right amount of protection and minimal void fill. If none of the stock mailer box sizes fit, we manufacture to your exact measurements at the same low minimums. Getting the size right is as much about cost as fit, because an oversized box invites damage, needs more void fill and can push you into a higher dimensional weight band with carriers, while a box that is too tight risks bursting its seams. Send us your product measurements or a sample and we will recommend the ideal internal size, board grade and flute. Once a size is dialled in you can reorder it exactly, run after run, so your packing line and your shipping costs stay predictable as you grow.',
  },
  materials: {
    eyebrow: 'Materials',
    heading: 'Materials & Board Options',
    text: 'Pick the board that matches your product, budget and sustainability goals.',
    items: [
      {
        name: 'White Corrugated',
        badge: 'Most Popular',
        description: 'A bright white corrugated fiberboard surface for vivid, full-colour printing and a premium retail feel.',
        image: img('/images/board-white-corrugated.jpg', 'White corrugated board edge'),
      },
      {
        name: 'Kraft Paper',
        badge: 'Natural',
        description: 'Unbleached kraft paper for an earthy, recyclable look that suits eco-friendly mailer boxes.',
        image: img('/images/board-kraft.jpg', 'Kraft corrugated flutes'),
      },
      {
        name: 'Double Wall',
        badge: 'Heavy duty',
        description: 'Extra strength and a higher Edge Crush Test rating for heavier or fragile products.',
        image: img('/images/board-double-wall.jpg', 'Double wall corrugated board edge'),
      },
    ],
    note: 'Every board is graded by its Edge Crush Test value, which tells you how much stacking pressure it can take. For most e-commerce products a single-wall board is ideal, while heavier or fragile items benefit from a stronger grade or double wall. If sustainability is the priority, kraft paper and recycled-content liners keep the footprint low while still printing beautifully. Tell us what you ship and how it travels, and we will specify a board that protects it reliably from the first mile to the last. The right board keeps your products safe, your parcels light and your packaging costs under control.',
  },
  printing: {
    eyebrow: 'Print & finish',
    heading: 'Printing & Finishing Options',
    body: [
      'How your box is printed shapes both the look and the unit cost. For short runs and photographic artwork, full-colour digital printing is ideal because there are no plates to pay for. For large, repeating orders, flexographic printing brings the per-unit cost down using spot colours. Whichever method fits, we print your custom printed mailer boxes to a consistent standard and can brand every panel, inside and out.',
    ],
    image: ph('Printing & finishing photo'),
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
  useCases: {
    eyebrow: 'Use cases',
    heading: 'Industries & Use Cases',
    text: 'Custom mailer boxes work across categories that ship directly to customers.',
    pills: ['Subscription boxes', 'Beauty & cosmetics', 'Apparel & accessories', 'Food & treats', 'Electronics', 'Candles & home', 'Stationery', 'E-commerce & DTC'],
    note: 'Subscription box mailers need a repeatable, recognisable look month after month, while beauty and apparel brands lean on inside printing and inserts to elevate the unboxing experience. Food brands choose snug sizing and the right liner, electronics brands add inserts to immobilise components, and gifting brands use inside printing to make the open feel like an occasion. Whatever you ship, mailer boxes for shipping keep products secure and your branding consistent across every order.',
  },
  howToOrder: {
    steps: [],
    note: 'Every mailer order follows this same path, and you approve a digital proof before we print a single box, so there are never any surprises. If you are unsure about structure, board or size, our team guides you through the choices and can send a physical sample to check. Because design, printing and manufacturing all happen together, your custom mailer boxes arrive on schedule and exactly as approved.',
  },
  pricing: {
    cards: [],
    body: [
      'The two biggest questions are always what it costs and how fast it arrives, so we answer both up front. Custom mailer boxes are priced on size, board, print and quantity, and because we print digitally there are no plate fees on short runs. The per-unit price drops as your quantity grows, which is why the configurator shows your rate update live as you change the order. Production begins as soon as you approve your free digital proof, and rush options are available when a launch date is fixed. If you are weighing custom mailer boxes against plain stock boxes, remember the branded version does marketing work a plain box never can, often for a small difference per unit once volume is factored in. Custom mailer boxes wholesale pricing is available for larger and repeat orders, and we keep your specification on file so reordering is effortless.',
    ],
    image: img('/images/kraft-mailers-vase.jpg', ''),
  },
  whyUs: {
    cards: [],
    note: 'We built Region Packaging to give growing brands the capability of a large manufacturer with the attention of a specialist partner. That means honest advice on specification, transparent pricing with no hidden setup fees, and a real person who picks up when you call. Whether you are ordering your first run of personalized mailer boxes or scaling up to custom mailer boxes wholesale, we treat every project with the same care from the first quote to the final delivery.',
  },
  seoTitle: 'Custom Mailer Boxes | Region Packaging',
  seoDescription:
    "Self-locking corrugated mailers printed with your logo. Free design help and low minimums. Send your inquiry and we'll reply with your price.",
}

export const categories: Category[] = []
export const products: Product[] = []

let productOrder = 0
tree.forEach((c, ci) => {
  const slug = slugify(c.title)
  const id = `category-${slug}`
  categories.push({
    ...blankPage,
    id,
    kind: c.kind,
    title: c.title,
    slug,
    order: ci + 1,
    menuIcon: icon[c.icon],
    ...(slug === 'custom-mailer-boxes' ? mailer : {}),
    ...c.extra,
  })
  for (const title of c.products) {
    const pslug = slugify(title)
    products.push({
      ...blankPage,
      id: `product-${pslug}`,
      title,
      slug: pslug,
      categoryIds: [id],
      order: ++productOrder,
      menuIcon: icon[c.icon],
      relatedIds: [],
      ...productExtras[pslug],
    })
  }
})

// The design's "Related Products" row on the mailer page: shipping, gift and folding cartons.
categories[0].relatedIds = ['product-corrugated-mailer-boxes', 'category-custom-rigid-boxes', 'category-custom-folding-cartons']
