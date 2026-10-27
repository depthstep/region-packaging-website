'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './lib/sanity/env'
import { schemaTypes, singletonTypes } from './sanity/schemas'

export default defineConfig({
  name: 'region',
  title: 'Region Packaging',
  basePath: '/studio',
  projectId: projectId || 'missing-project-id',
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created again from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Home page').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('product').title('Sub-products'),
            S.divider(),
            S.documentTypeListItem('review').title('Reviews'),
            S.documentTypeListItem('post').title('Blog posts'),
            S.divider(),
            S.documentTypeListItem('quoteRequest').title('Quote requests'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
