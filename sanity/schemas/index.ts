import { category, product } from './catalog'
import { post, quoteRequest, review } from './documents'
import { homePage, siteSettings } from './singletons'

export const schemaTypes = [siteSettings, homePage, category, product, review, post, quoteRequest]

export const singletonTypes = new Set(['siteSettings', 'homePage'])
