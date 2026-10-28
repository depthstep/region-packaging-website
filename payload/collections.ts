import type { CollectionConfig, Field } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { img, orderField, paragraphs, slugField, str, txt } from './fields'
import { pageTabs } from './pageFields'
import { revalidateOnChange } from './hooks'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = (name: string) => path.resolve(dirname, '..', 'uploads', name)
const loggedIn = ({ req }: { req: { user?: unknown } }) => !!req.user

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin user', plural: 'Admin users' },
  admin: { useAsTitle: 'email', group: 'Settings' },
  auth: true,
  fields: [str('name')],
}

/** Site photos and icons. Public, since they appear on the website. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Settings' },
  access: { read: () => true },
  upload: {
    staticDir: uploadsDir('media'),
    mimeTypes: ['image/*'],
  },
  fields: [{ name: 'alt', label: 'Alt text', type: 'text', admin: { description: 'Describe the image for screen readers and SEO.' } }],
  hooks: revalidateOnChange,
}

/** Customer artwork from the quote form. Only logged-in staff can open these files. */
export const Artwork: CollectionConfig = {
  slug: 'artwork',
  labels: { singular: 'Artwork file', plural: 'Artwork files' },
  admin: { group: 'Quote requests' },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: uploadsDir('artwork'),
    mimeTypes: ['application/pdf', 'application/postscript', 'application/eps', 'image/eps', 'image/x-eps', 'image/png', 'image/jpeg'],
  },
  fields: [],
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Category', plural: 'Categories' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'kind', 'order', 'visible'], group: 'Products' },
  defaultSort: 'order',
  fields: [
    pageTabs([
      str('title', 'Title', { required: true }),
      {
        name: 'kind',
        label: 'Menu group',
        type: 'radio',
        required: true,
        defaultValue: 'product-type',
        options: [
          { label: 'Custom Boxes (product type)', value: 'product-type' },
          { label: 'Boxes By Industry', value: 'industry' },
        ],
      },
      str('menuLabel', 'Mega menu column heading', { description: 'Empty = title.' }),
    ]),
    slugField(),
    orderField(),
    { name: 'visible', label: 'Show on site', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
  hooks: revalidateOnChange,
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Sub-product', plural: 'Sub-products' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'categories', 'order', 'status'], group: 'Products' },
  defaultSort: 'order',
  fields: [
    pageTabs([
      str('title', 'Title', { required: true }),
      {
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: true,
        required: true,
        minRows: 1,
        maxDepth: 0,
        admin: { description: 'The first category sets the URL (/category/product).' },
      },
    ]),
    slugField(),
    orderField(),
    {
      name: 'status',
      type: 'radio',
      defaultValue: 'live',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Hidden', value: 'hidden' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  hooks: revalidateOnChange,
}

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'rating', 'order'], group: 'Content' },
  defaultSort: 'order',
  fields: [
    str('name', 'Name', { required: true }),
    str('role', 'Role / company'),
    { name: 'rating', type: 'number', required: true, defaultValue: 5, min: 1, max: 5 },
    str('dateText', 'Date text (e.g. 2 weeks ago)'),
    { name: 'quote', type: 'textarea', required: true },
    img('avatar', 'Avatar'),
    { name: 'source', type: 'text', defaultValue: 'Posted on Google' },
    orderField(),
  ],
  hooks: revalidateOnChange,
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'publishedAt'], group: 'Content' },
  defaultSort: '-publishedAt',
  fields: [
    str('title', 'Title', { required: true }),
    str('kicker', 'Kicker (e.g. Box guide · 8 min read)'),
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    txt('excerpt', 'Excerpt', 2),
    img('image', 'Cover photo'),
    paragraphs('body', 'Paragraphs'),
    slugField(),
  ],
  hooks: revalidateOnChange,
}

const ro = (name: string, label?: string, type: 'text' | 'textarea' = 'text'): Field =>
  type === 'textarea' ? { name, label, type, admin: { readOnly: true } } : { name, label, type, admin: { readOnly: true } }

/** Enquiries from the quote form. Created by /api/quote; staff tick "Handled". */
export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: { singular: 'Quote request', plural: 'Quote requests' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'product', 'email', 'createdAt', 'handled'], group: 'Quote requests' },
  defaultSort: '-createdAt',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'handled', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    ro('name'),
    ro('email'),
    ro('phone'),
    ro('company'),
    ro('product'),
    ro('material'),
    ro('size'),
    ro('printing'),
    ro('productionSpeed', 'Production speed'),
    ro('quantity'),
    ro('design'),
    ro('message', 'Message', 'textarea'),
    ro('pageUrl', 'Sent from page'),
    { name: 'artwork', type: 'upload', relationTo: 'artwork', admin: { readOnly: true } },
  ],
}
