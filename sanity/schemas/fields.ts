import { defineArrayMember, defineField } from 'sanity'

// Small builders so the schemas stay readable. Field names match lib/types.ts exactly;
// lib/sanity/normalize.ts turns the documents into those types without per-field mapping.

export const str = (name: string, title?: string, extra: object = {}) => defineField({ name, title, type: 'string', ...extra })
export const txt = (name: string, title?: string, rows = 3) => defineField({ name, title, type: 'text', rows })

export const img = (name: string, title?: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the photo for screen readers and SEO.' })],
  })

export const paragraphs = (name = 'body', title = 'Paragraphs') =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })] })

export const strings = (name: string, title?: string, description?: string) =>
  defineField({ name, title, description, type: 'array', of: [defineArrayMember({ type: 'string' })] })

export const link = (name: string, title?: string) =>
  defineField({ name, title, type: 'object', fields: [str('label'), str('href', 'URL or path', { description: 'e.g. /quote or https://...' })] })

export const links = (name: string, title?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'object', fields: [str('label'), str('href', 'URL or path')], preview: { select: { title: 'label', subtitle: 'href' } } })],
  })

/** Array of small objects, e.g. [{ title, text }]. */
export const list = (name: string, title: string, fields: ReturnType<typeof defineField>[], previewTitle = 'title', previewSubtitle?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'object', fields, preview: { select: { title: previewTitle, subtitle: previewSubtitle ?? '' } } })],
  })

export const titleText = (name: string, title: string) => list(name, title, [str('title'), txt('text', 'Text', 2)], 'title', 'text')
export const iconItems = (name: string, title: string) => list(name, title, [str('title'), txt('text', 'Text', 2), img('icon', 'Icon')], 'title', 'text')
export const nameDesc = (name: string, title: string) => list(name, title, [str('name'), txt('description', 'Description', 2)], 'name', 'description')

/** eyebrow + heading + subtext, shared by most sections. */
export const heading = [str('eyebrow', 'Eyebrow (small sky text)'), str('heading'), txt('text', 'Subtext', 2)]

/** A collapsible section object. */
export const section = (name: string, title: string, fields: ReturnType<typeof defineField>[], description?: string) =>
  defineField({ name, title, description, type: 'object', options: { collapsible: true, collapsed: true }, fields })

export const cards = (name: string, title: string) =>
  list(name, title, [str('title'), str('kicker', 'Small text above title'), txt('text', 'Text', 2), str('linkLabel', 'Link label'), str('href', 'Link URL'), img('image', 'Photo')], 'title', 'href')
