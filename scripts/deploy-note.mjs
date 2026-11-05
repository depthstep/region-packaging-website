// Describes an update for the admin's change logs. Usage: node scripts/deploy-note.mjs <from> <to>
// Prints JSON listing the commits and the files they changed. Run by the deploy workflow.
import { execFileSync } from 'node:child_process'

const [fromArg, to = 'HEAD'] = process.argv.slice(2)
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
const exists = (ref) => {
  try {
    return !!ref && !/^0+$/.test(ref) && !!git('cat-file', '-t', ref)
  } catch {
    return false
  }
}

// A re-run or a first push has no usable "before" commit, so the update is just the latest commit.
const from = exists(fromArg) && git('rev-parse', fromArg).trim() !== git('rev-parse', to).trim() ? fromArg : `${to}~1`
const sha = git('rev-parse', to).trim()
const commits = git('log', '--format=%H%x1f%an%x1f%aI%x1f%s%x1f%b%x1e', `${from}..${to}`)
  .split('\x1e')
  .map((c) => c.trim())
  .filter(Boolean)
  .map((c) => {
    const [hash, author, date, subject, body] = c.split('\x1f')
    return { hash, author, date, subject, body: body.trim() }
  })

const files = git('diff', '--numstat', from, to)
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [added, removed, file] = line.split('\t')
    return { file, text: added === '-' ? 'Binary file changed' : `${added} lines added, ${removed} lines removed` }
  })

const claude = commits.some((c) => /co-authored-by: claude/i.test(c.body))
const message = (c) => [c.subject, c.body.replace(/^co-authored-by:.*$/gim, '').trim()].filter(Boolean).join('\n\n')
const repo = process.env.REPO || 'depthstep/region-packaging-website'

console.log(
  JSON.stringify({
    sha,
    claude,
    date: commits[0]?.date,
    user: claude ? 'Claude' : commits[0]?.author,
    item: commits[0]?.subject ?? sha.slice(0, 7),
    summary: `${commits.length} ${commits.length === 1 ? 'commit' : 'commits'}, ${files.length} files changed`,
    link: `https://github.com/${repo}/compare/${git('rev-parse', from).trim().slice(0, 7)}...${sha.slice(0, 7)}`,
    changes: [
      ...commits.map((c) => ({ field: `Commit ${c.hash.slice(0, 7)}`, segments: [['=', message(c)]] })),
      ...files.map((f) => ({ field: f.file, segments: [['=', f.text]] })),
    ],
  }),
)
