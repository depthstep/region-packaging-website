import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/** The whole site reads one content snapshot, so any edit refreshes every page. */
function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not inside a Next.js request (e.g. the seed script): nothing to refresh.
  }
}

const afterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}
const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite()
  return doc
}
const afterGlobalChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateOnChange = { afterChange: [afterChange], afterDelete: [afterDelete] }
export const revalidateGlobal = { afterChange: [afterGlobalChange] }
