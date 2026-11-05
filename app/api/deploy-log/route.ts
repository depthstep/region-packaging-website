import { NextResponse } from 'next/server'

/** Records a code update in the admin's change logs. Called on the server by scripts/after-deploy.sh. */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) return NextResponse.json({ error: 'Not allowed' }, { status: 401 })

  const note = await req.json()
  if (!note?.sha) return NextResponse.json({ error: 'Missing commit' }, { status: 400 })

  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
  const payload = await getPayload({ config })
  const collection = note.claude ? 'claude-log' : 'activity-log'

  // Re-running a deploy shouldn't list the same update twice.
  const { totalDocs } = await payload.count({ collection, where: { recordId: { equals: note.sha } } })
  if (totalDocs) return NextResponse.json({ ok: true, duplicate: true })

  await payload.create({
    collection,
    data: {
      user: note.user,
      action: 'deployed',
      section: 'Website code',
      item: String(note.item).slice(0, 200),
      recordId: note.sha,
      summary: note.summary,
      link: note.link,
      changes: note.changes,
      createdAt: note.date,
    },
  })
  return NextResponse.json({ ok: true })
}
