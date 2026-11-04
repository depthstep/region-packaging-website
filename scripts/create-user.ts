// Creates a login, or resets its password if it already exists, and prints a new random password.
//   USER_EMAIL=seo@example.com USER_ROLE=editor npm run create-user
// USER_ROLE is "editor" (site content only, the default) or "admin".
import crypto from 'crypto'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

const email = process.env.USER_EMAIL
const role = process.env.USER_ROLE === 'admin' ? 'admin' : 'editor'
if (!email) throw new Error('Set USER_EMAIL, e.g. USER_EMAIL=seo@example.com npm run create-user')

const payload = await getPayload({ config })
const password = crypto.randomBytes(15).toString('base64url')
const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } } })
if (docs[0]) await payload.update({ collection: 'users', id: docs[0].id, data: { password, role } })
else await payload.create({ collection: 'users', data: { email, password, role } })

// Written synchronously: process.exit can cut off normal console output on a pipe.
fs.writeSync(1, `${docs[0] ? 'Updated' : 'Created'} ${role} login\n  Email:    ${email}\n  Password: ${password}\n`)
process.exit(0)
