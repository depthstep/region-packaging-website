// Normalised content shapes. Payload documents and the local seed both map onto these,
// so components never know which source the content came from.

/** An image that may not exist yet. Without `src` it renders as a labelled placeholder. */
export type Img = { src?: string; alt: string; label: string; width?: number; height?: number }

export type Link = { label: string; href: string }
export type TitleText = { title: string; text: string }
export type IconItem = TitleText & { icon?: Img }
export type NameDescription = { name: string; description: string }

export type SectionHeading = { eyebrow?: string; heading?: string; text?: string }

export type Review = {
  id: string
  name: string
  role?: string
  rating: number
  dateText?: string
  quote: string
  avatar?: Img
  source?: string
}

/** Payload rich text (Lexical JSON). Images inside it are already Img (see lib/cms/normalize.ts). */
export type RichTextNode = {
  type: string
  children?: RichTextNode[]
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  fields?: { url?: string; newTab?: boolean; linkType?: string; doc?: unknown } | null
  value?: Img | unknown
  [key: string]: unknown
}
export type RichText = { root: RichTextNode }

export type BlogCategory = { id: string; slug: string; title: string; description?: string }
export type BlogTopic = { id: string; slug: string; title: string }

export type BlogPost = {
  id: string
  slug: string
  title: string
  /** Small line above card titles; worked out as "Category · N min read". */
  kicker?: string
  excerpt?: string
  body?: RichText
  image?: Img
  categoryId?: string
  topicIds: string[]
  publishedAt?: string
  author?: string
  readMinutes?: number
  featured?: boolean
}

/** Blog index chrome and the article sidebar (Blog > Blog page). */
export type BlogPage = {
  hero: { heading?: string; text?: string }
  featuredHeading?: string
  searchPlaceholder?: string
  viewAllLabel?: string
  post: {
    tocHeading?: string
    help: { heading?: string; text?: string; phoneLabel?: string; button?: Link }
    followLabel?: string
    relatedEyebrow?: string
    relatedHeading?: string
    relatedButton?: Link
  }
  seoTitle?: string
  seoDescription?: string
}

export type Card = { title: string; kicker?: string; text?: string; linkLabel?: string; href?: string; image?: Img }


export type SiteSettings = {
  announcement?: string
  phone?: string
  email?: string
  socials: { label: string; url: string }[]
  menuPromo: { title?: string; text?: string; buttonLabel?: string; href?: string }
  resourcesMenu: Link[]
  stats: { value: string; label: string }[]
  trustedHeading?: string
  trustedBrands: { name: string; logo?: Img }[]
  google: { score: string; label: string; countText: string; reviewUrl?: string }
  trustStrip: IconItem[]
  formDefaults: FormOptions
  productDefaults: ProductDefaults
  subProductDefaults: SubProductDefaults
  pageIntros: Partial<Record<'products' | 'faqs' | 'howToOrder' | 'quote' | 'sample', PageIntroText>>
  cta: { heading?: string; text?: string; primary?: Link; secondary?: Link }
  footer: {
    blurb?: string
    columns: { title: string; links: Link[] }[]
    newsletterTitle?: string
    newsletterText?: string
    newsletterPlaceholder?: string
    newsletterButton?: string
    followLabel?: string
    paymentsLabel?: string
    paymentLogos?: Img
    copyright?: string
    legal: Link[]
  }
  reviewsSection: SectionHeading & { buttonLabel?: string }
  contact: ContactPage
}

/** The Contact Us page (Site settings > Contact page). */
export type ContactPage = {
  heading?: string
  text?: string
  image?: Img
  callLabel?: string
  emailLabel?: string
  card?: { heading?: string; text?: string; button?: Link }
  formHeading?: string
  formText?: string
  topics: string[]
  buttonLabel?: string
}

export type PageIntroText = { heading?: string; text?: string; seoTitle?: string; seoDescription?: string }

export type FormOptions = {
  style: string[]
  finish: string[]
  material: string[]
  size: string[]
  printing: string[]
  productionSpeed: string[]
  quantity: string[]
  design: string[]
}

/** Generic product-page content used when a category/product has none of its own. */
export type ProductDefaults = {
  trustHeading?: string
  exploreEyebrow?: string
  howToOrder?: SectionHeading & { steps: TitleText[] }
  pricing?: SectionHeading & { cards: TitleText[] }
  whyUs?: SectionHeading & { cards: TitleText[] }
  faqs?: SectionHeading & { items: Faq[] }
  relatedHeading?: SectionHeading
  sampleLinkLabel?: string
  formNote?: string
}

export type Faq = { question: string; answer?: string }

/** What industry sub-product pages show when the product has no content of its own. "{product}" in a heading becomes the product name. */
export type SubProductDefaults = Pick<PageContent, 'shortDescription' | 'highlights' | 'gallery' | 'overview' | 'benefits' | 'useCases' | 'specs' | 'materials' | 'printing' | 'whyUs'> & {
  tabs?: { overview?: string; specs?: string; materials?: string; why?: string; faq?: string }
}

/** Fields shared by category pages and sub-product pages. Every section is optional. */
export type PageContent = {
  ratingText?: string
  shortDescription?: string
  highlights: string[]
  gallery: Img[]
  formOptions?: Partial<FormOptions>
  explore?: SectionHeading
  overview?: SectionHeading & { body: string[]; images: Img[] }
  benefits?: SectionHeading & { body: string[]; items: IconItem[] }
  specs?: SectionHeading & { rows: { label: string; value: string }[]; stockSizesHeading?: string; stockSizes: StockSize[]; note?: string }
  materials?: SectionHeading & { items: (NameDescription & { badge?: string; image?: Img })[]; note?: string }
  printing?: SectionHeading & { body: string[]; image?: Img; methodsHeading?: string; methods: NameDescription[]; finishesHeading?: string; finishes: NameDescription[] }
  useCases?: SectionHeading & { pills: string[]; note?: string }
  howToOrder?: SectionHeading & { steps: TitleText[]; note?: string }
  pricing?: SectionHeading & { body: string[]; cards: TitleText[]; image?: Img }
  whyUs?: SectionHeading & { cards: TitleText[]; note?: string }
  faqs?: SectionHeading & { items: Faq[] }
  /** Product or category ids shown in "Related Products". */
  relatedIds?: string[]
  seoTitle?: string
  seoDescription?: string
}

export type StockSize = { size: string; dimensions: string; bestFor: string }

export type Category = PageContent & {
  id: string
  kind: 'product-type' | 'industry'
  title: string
  slug: string
  order: number
  menuLabel?: string
  menuIcon?: Img
  cardText?: string
  cardImage?: Img
}

export type Product = PageContent & {
  id: string
  title: string
  slug: string
  categoryIds: string[]
  order: number
  menuIcon?: Img
  cardText?: string
  cardImage?: Img
}

export type HomePage = {
  hero: { ratingText?: string; heading: string; intro?: string; cta?: Link; slides: Img[] }
  chooseBox: SectionHeading & { button?: Link; cards: Card[] }
  steps: SectionHeading & { steps: (TitleText & { icon?: Img })[] }
  industries: SectionHeading & { tabs: { label: string; categoryId?: string; cards: Card[] }[]; defaultCards: Card[]; note?: string }
  quantity: SectionHeading & { body: string[]; features: IconItem[] }
  design: SectionHeading & { lead?: string; body: string[]; bullets: TitleText[]; button?: Link; image?: Img }
  eco: SectionHeading & { body?: string; linkText?: string; linkHref?: string; badge?: Img }
  logo: SectionHeading & { lead?: string; body: string[]; bullets: TitleText[]; image?: Img }
  sample: SectionHeading & { button?: Link; note?: string; image?: Img }
  faq: SectionHeading & { items: Faq[] }
  blog: SectionHeading & { postIds: string[]; linkLabel?: string }
  seoTitle?: string
  seoDescription?: string
}

/** The About Us page (Content > About page). */
export type AboutPage = {
  hero: { heading?: string; text?: string; button?: Link; photos: Img[] }
  mission: {
    missionHeading?: string
    missionText?: string
    missionIcon?: Img
    photo?: Img
    visionHeading?: string
    visionText?: string
    visionIcon?: Img
  }
  whoWeAre: SectionHeading & { body: string[]; image?: Img; stats: { value: string; label: string }[] }
  products: SectionHeading
  values: SectionHeading & { items: IconItem[] }
  seoTitle?: string
  seoDescription?: string
}

/** The Artwork Guidelines page (Content > Artwork page). */
export type ArtworkPage = {
  hero: { heading?: string; text?: string; buttonLabel?: string; guide?: Img; dielineText?: string }
  formats: SectionHeading & { items: IconItem[] }
  essentials: SectionHeading & { items: (IconItem & { iconText?: string })[] }
  steps: SectionHeading & { steps: TitleText[]; note?: string }
  seoTitle?: string
  seoDescription?: string
}

/** A text page at /slug (Content > Simple pages). */
export type SimplePage = { id: string; slug: string; title: string; intro?: string; body?: RichText; seoTitle?: string; seoDescription?: string }

export type SiteData = {
  settings: SiteSettings
  home: HomePage
  about: AboutPage
  artwork: ArtworkPage
  categories: Category[]
  products: Product[]
  reviews: Review[]
  posts: BlogPost[]
  blogCategories: BlogCategory[]
  blogTopics: BlogTopic[]
  blog: BlogPage
  pages: SimplePage[]
}
