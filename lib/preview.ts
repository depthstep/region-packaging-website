/** Which draft an editor is previewing, kept in a cookie alongside Next's draft mode. */
export const PREVIEW_COOKIE = 'rp-preview'

export const parsePreview = (value?: string) => {
  const [type, id] = (value ?? '').split(':')
  return type ? { type, id } : null
}
