import type { Access, CollectionConfig, Field } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { img, orderField, slugField, str, topLevelSlugField, txt } from './fields'
import { pageTabs, productSectionsTab } from './pageFields'
import { revalidateOnChange } from './hooks'

const dirname = path.dirname(fileURLToPath(import.meta.url))
// UPLOADS_DIR keeps uploads outside the app folder on the server, so deploys can't touch them.
const uploadsDir = (name: string) => path.resolve(process.env.UPLOADS_DIR || path.resolve(dirname, '..', 'uploads'), name)

// Two kinds of login. Admins do everything. Editors (the SEO team) manage all site content,
// but cannot see customer enquiries or artwork, or manage other logins.
type Role = { role?: string | null }
const isAdmin = ({ req }: { req: { user?: unknown } }) => (req.user as Role | null | undefined)?.role === 'admin'
const adminsOnly = { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin }
const hiddenFromEditors = ({ user }: { user: unknown }) => (user as Role | null | undefined)?.role !== 'admin'
/** Admins see every login; anyone else only their own (to change their password). */
const adminOrSelf: Access = ({ req }) => isAdmin({ req }) || (req.user ? { id: { equals: req.user.id } } : false)

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Login', plural: 'Logins' },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'role'], group: 'Settings', hidden: hiddenFromEditors },
  auth: true,
  access: { read: adminOrSelf, create: isAdmin, update: adminOrSelf, delete: isAdmin, unlock: isAdmin },
  fields: [
    str('name'),
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin (everything)', value: 'admin' },
        { label: 'Editor (site content only)', value: 'editor' },
      ],
      access: { create: isAdmin, update: isAdmin },
      admin: { position: 'sidebar' },
    },
  ],
}

/** Site photos and icons. Public, since they appear on the website. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Settings' },
  access: { read: () => true },
  upload: {
    staticDir: uploadsDir('media'),
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [{ name: 'alt', label: 'Alt text', type: 'text', admin: { description: 'Describe the image for screen readers and SEO.' } }],
  hooks: revalidateOnChange,
}

/** Customer artwork from the quote form. Only logged-in staff can open these files. */
export const Artwork: CollectionConfig = {
  slug: 'artwork',
  labels: { singular: 'Artwork file', plural: 'Artwork files' },
  admin: { group: 'Quote requests' },
  access: adminsOnly,
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
      // Kept for its saved values: the menu now lists each category by its title.
      { name: 'menuLabel', type: 'text', admin: { hidden: true } },
    ], ['badges']),
    topLevelSlugField(),
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
        admin: { description: 'The first category sets the breadcrumb and the related boxes. The page address is your-domain/slug.' },
      },
    ], ['highlights'], productSectionsTab),
    topLevelSlugField(),
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
    img('avatar', 'Reviewer photo'),
    { name: 'source', type: 'text', defaultValue: 'Posted on Google' },
    orderField(),
  ],
  hooks: revalidateOnChange,
}

/** Plain text pages at /slug: Paper Weight Chart, Privacy Policy, Terms and anything new. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Simple page', plural: 'Simple pages' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug'], group: 'Content', description: 'Text pages. The address is your-domain/slug.' },
  fields: [
    str('title', 'Title', { required: true }),
    txt('intro', 'Text under the title', 2),
    { name: 'body', type: 'richText', label: 'Page text' },
    str('seoTitle', 'Title shown in Google (SEO title)'),
    txt('seoDescription', 'Description shown in Google (SEO description)', 2),
    topLevelSlugField(),
  ],
  hooks: revalidateOnChange,
}

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: { singular: 'Blog category', plural: 'Blog categories' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'], group: 'Blog', description: 'Each category is a section on the blog page.' },
  defaultSort: 'order',
  fields: [str('title', 'Title', { required: true }), txt('description', 'Text under the heading', 2), slugField(), orderField()],
  hooks: revalidateOnChange,
}

export const BlogTopics: CollectionConfig = {
  slug: 'blog-topics',
  labels: { singular: 'Blog topic', plural: 'Blog topics' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'], group: 'Blog', description: 'The filter buttons on the blog page.' },
  defaultSort: 'order',
  fields: [str('title', 'Title', { required: true }), slugField(), orderField()],
  hooks: revalidateOnChange,
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', 'featured'], group: 'Blog' },
  defaultSort: '-publishedAt',
  fields: [
    str('title', 'Title', { required: true }),
    { name: 'category', type: 'relationship', relationTo: 'blog-categories', maxDepth: 0 },
    { name: 'topics', type: 'relationship', relationTo: 'blog-topics', hasMany: true, maxDepth: 0 },
    txt('excerpt', 'Excerpt (under the title and in search results)', 2),
    img('image', 'Cover photo'),
    { name: 'body', type: 'richText', label: 'Article' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'author', type: 'text', defaultValue: 'Region Packaging', admin: { position: 'sidebar' } },
    { name: 'readMinutes', type: 'number', label: 'Read time (minutes)', admin: { position: 'sidebar', description: 'Empty = worked out from the article length.' } },
    { name: 'featured', type: 'checkbox', label: 'Featured on the blog page', admin: { position: 'sidebar' } },
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
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'product', 'topic', 'email', 'createdAt', 'handled'], group: 'Quote requests', hidden: hiddenFromEditors },
  defaultSort: '-createdAt',
  access: adminsOnly,
  fields: [
    { name: 'handled', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    ro('name'),
    ro('email'),
    ro('phone'),
    ro('company'),
    ro('topic', 'Topic (contact form)'),
    ro('product'),
    ro('style'),
    ro('finish'),
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
