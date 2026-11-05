import type { Field } from 'payload'

// Small builders so the schemas stay readable. Field names match lib/types.ts exactly;
// lib/cms/normalize.ts turns Payload documents into those types by walking these same fields.

type Extra = { description?: string; required?: boolean }
const admin = (description?: string) => (description ? { admin: { description } } : {})

export const str = (name: string, label?: string, extra: Extra = {}): Field => ({
  name,
  label,
  type: 'text',
  required: extra.required,
  ...admin(extra.description),
})

export const txt = (name: string, label?: string, rows = 3): Field => ({ name, label, type: 'textarea', admin: { rows } })

/** An uploaded image (Media collection). Alt text lives on the media item. */
export const img = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  ...admin(description),
})

export const imgs = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  ...admin(description),
})

/** A list of paragraphs. Each row holds one `paragraph`, which the normaliser flattens to string[]. */
export const paragraphs = (name = 'body', label = 'Paragraphs'): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [{ name: 'paragraph', type: 'textarea', required: true, admin: { rows: 4 } }],
})

/** True for a `paragraphs()` list. Payload adds an `id` field to every array when it loads the config, so that is ignored. */
export const isParagraphList = (fields: Field[]) => {
  const named = fields.filter((f) => 'name' in f && f.name !== 'id')
  return named.length === 1 && 'name' in named[0] && named[0].name === 'paragraph'
}

/** A list of short strings (chips in the editor). */
export const strings = (name: string, label?: string, description?: string): Field => ({
  name,
  label,
  type: 'text',
  hasMany: true,
  ...admin(description),
})

const linkFields: Field[] = [str('label', 'Button or link text'), str('href', 'Link address', { description: 'For a page on this site use the part after the domain, such as /quote. For another site use the full https:// address.' })]

export const link = (name: string, label?: string): Field => ({ name, label, type: 'group', fields: linkFields })

export const links = (name: string, label?: string): Field => ({ name, label, type: 'array', fields: linkFields })

/** Array of small objects, e.g. [{ title, text }]. */
export const list = (name: string, label: string, fields: Field[], description?: string): Field => ({
  name,
  label,
  type: 'array',
  fields,
  ...admin(description),
})

export const titleText = (name: string, label: string, description?: string) => list(name, label, [str('title'), txt('text', 'Text', 2)], description)
export const iconItems = (name: string, label: string) => list(name, label, [str('title'), txt('text', 'Text', 2), img('icon', 'Icon')])
export const nameDesc = (name: string, label: string) => list(name, label, [str('name'), txt('description', 'Description', 2)])
export const faqList = (name = 'items', label = 'Questions', description?: string) =>
  list(name, label, [str('question'), txt('answer', 'Answer', 4)], description)

/** eyebrow + heading + subtext, shared by most sections. */
export const heading: Field[] = [str('eyebrow', 'Small label above the heading', { description: 'The small blue word above the big heading, for example "Overview". You can leave it blank.' }), str('heading'), txt('text', 'Text under the heading', 2)]

/** A page section stored as a nested object. Leave its heading empty to hide it on the site. */
export const section = (name: string, label: string, fields: Field[], description?: string): Field => ({
  name,
  // Section numbers in the code follow the design; on screen they only got in the way.
  label: label.replace(/^\d+\.\s*/, ''),
  type: 'group',
  fields,
  ...admin(description),
})

export const cards = (name: string, label: string) =>
  list(name, label, [str('title'), str('kicker', 'Small label above the title'), txt('text', 'Text', 2), str('linkLabel', 'Link label'), str('href', 'Link address'), img('image', 'Photo')])

export const formOptionFields: Field[] = [
  strings('style', 'Box style choices (industry sub-product pages)'),
  strings('finish', 'Finish choices (industry sub-product pages)'),
  strings('material', 'Material choices'),
  strings('size', 'Size choices'),
  strings('printing', 'Printing choices'),
  strings('productionSpeed', 'Production speed choices'),
  strings('quantity', 'Quantity choices'),
  strings('design', 'Design choices'),
]

/** Generates a URL slug from the title when the editor leaves it empty. */
const slugify = (text: unknown) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: 'Page address (slug)',
  admin: { position: 'sidebar', description: 'The last part of the web address, such as custom-mailer-boxes. Leave it empty and it is made from the title.' },
  hooks: {
    beforeValidate: [
      async ({ value, data, originalDoc, collection, req }) => {
        const title = data?.title ?? originalDoc?.title
        // Drafts autosave while someone types, so a page that was never published keeps following
        // its title. Once published the address stays put, unless someone changes it themselves.
        if (collection?.versions?.drafts && originalDoc?.id && value && value === slugify(originalDoc.title)) {
          const live = await req.payload.db.findOne<{ id: number; _status?: string }>({ collection: collection.slug, where: { id: { equals: originalDoc.id } }, req })
          if (live?._status !== 'published') return slugify(title) || undefined
        }
        return slugify(value || title) || undefined
      },
    ],
  },
})

export const orderField = (): Field => ({ name: 'order', label: 'Position in lists', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers show first.' } })
