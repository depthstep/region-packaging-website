import type { SubProductDefaults } from './types'

/**
 * Product pages (by their address) that use the new product layout. Every other product keeps
 * its earlier design. Add a page's address here to move it over.
 */
export const NEW_LAYOUT_PRODUCTS: string[] = ['magnetic-rigid-boxes', 'black-mailer-boxes', 'custom-hat-boxes']

const card = (name: string, badge: string, description: string) => ({ name, badge, description })

/**
 * Placeholder text for the parts of the new layout the admin doesn't have fields for yet.
 * A product's own content from the admin still comes first (overview, specs, FAQ, materials …);
 * these fill the rest. "{product}" in a heading becomes the product name.
 */
export const NEW_LAYOUT_DEFAULTS: SubProductDefaults = {
  tabs: { specs: 'Specifications', optionMaterial: 'Material', optionPrinting: 'Printing', optionFinishes: 'Finishes', optionAddons: 'Add-ons' },
  highlights: [],
  gallery: [],
  badges: ['Low MOQ', 'Free design', 'Free proof', 'Fast ship'],
  construction: {
    eyebrow: 'Construction',
    heading: 'Lid & Base Construction',
    body: [
      'The classic two-piece rigid box is made in two parts: a base that holds your product and a lid that lifts cleanly off it. Both are built from thick greyboard, typically 1.5–3 mm, wrapped in printed paper, so the box keeps its shape through retail handling and e-commerce fulfillment.',
      'Because the lid and base are made separately, each can carry its own artwork and finish, and fitted inserts sit neatly inside the base to hold the product in place.',
    ],
    list: [
      { title: 'Lift-off lid', text: 'A clean, deliberate reveal every time the box is opened.' },
      { title: 'Thick greyboard', text: 'A rigid, non-collapsible structure that holds its shape.' },
      { title: 'Fitted inserts', text: 'Foam, EVA or paperboard inserts keep the product in place.' },
    ],
  },
  materials: {
    eyebrow: 'Materials & Print',
    heading: 'Materials, Printing & Finishing Options',
    text: 'Pick the board that matches your product, budget and sustainability goals, then choose how it is printed and finished.',
    items: [],
  },
  printing: {
    heading: 'Printing & finishing options',
    body: [],
    methods: [
      card('CMYK Printing', 'Great for Branding', 'Full color printing method ideal for detailed graphics, images and vibrant packaging designs.'),
      card('Pantone Printing', 'Accurate Color Match', 'Match your brand colors with precise Pantone shades for a consistent and premium look.'),
      card('Offset Printing', 'Best for Bulk Orders', 'High quality printing method for large orders with sharp details and consistent results.'),
      card('Digital Printing', 'Ideal for Custom Designs', 'Modern printing method ideal for short runs, custom designs and fast turnaround times.'),
    ],
    finishes: [
      card('Matte', 'Hides Fingerprints', 'Provides a smooth, non-reflective finish for a clean and elegant packaging appearance.'),
      card('Gloss', 'Enhances Colors', 'Adds a shiny and vibrant finish that makes colors and graphics stand out.'),
      card('Aqueous Coating', 'Water-based Coating', 'A water-based coating that adds a thin layer of protection and a subtle finish.'),
      card('Anti Scratch Lamination', 'Scratch Resistant', 'Adds a protective layer that helps resist scratches, scuffs and surface damage.'),
    ],
    finishesNote:
      'Choose a finish that matches your brand, from understated matte to a premium sheen. Finishes also add a light protective layer, so your box looks good on arrival.',
  },
  sustainability: {
    eyebrow: 'Sustainability',
    heading: 'Sustainable {product}',
    text: 'A premium box can still be a responsible one. Our boxes use recyclable board, and recycled-content and kraft paper wraps keep the footprint low while still printing beautifully. FSC-certified board is available from responsibly managed forests, and we print with lower-impact inks where possible. We only make eco claims we can stand behind, and help you choose a genuinely recyclable box and describe it honestly to your customers.',
  },
  addons: {
    items: [
      card('Debossing', 'Pressed Effect', 'Presses your design into the box for a subtle, tactile impression.'),
      card('Embossing', 'Raised Effect', 'Raises your design above the surface for a bold, dimensional effect.'),
      card('Foil Stamping', 'Premium Effect', 'Adds a metallic foil accent for a luxurious, eye-catching finish.'),
      card('Spot UV Coating', 'Selective Shine', 'Highlights specific design elements with a glossy, raised coating.'),
    ],
    note: 'Whichever options you choose, we print your boxes to a consistent standard and can brand every panel, inside and out.',
  },
}
