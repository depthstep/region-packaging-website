// Starts the site on the server (systemd service "rp@<port>"). The build replaces this folder on every deploy,
// so settings live outside it, in ../shared/.env, next to the database and uploads.
const fs = require('fs')
const path = require('path')

const envFile = path.join(__dirname, '..', 'shared', '.env')
for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
  if (m) process.env[m[1]] = m[2]
}
// Two copies take turns during a deploy (ports 3000 and 3001), so the service's own port wins.
if (process.env.RP_PORT) process.env.PORT = process.env.RP_PORT
process.chdir(__dirname)
require('./server.js')
