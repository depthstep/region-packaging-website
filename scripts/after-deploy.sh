#!/bin/bash
# Runs on the server after each upload: restarts the site, then refreshes every page from the
# database (the build has no database, so its prerendered pages hold the starter content).
set -u
sudo systemctl restart rp
secret=$(sed -n 's/^REVALIDATE_SECRET=//p' "$HOME/rp/shared/.env")
code=000
for _ in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 -X POST -H "x-revalidate-secret: $secret" http://127.0.0.1:3000/api/revalidate || true)
  [ "$code" = 200 ] && break
  sleep 2
done
echo "revalidate: $code"
# Lists this update in the admin. A problem here is reported but doesn't fail the deploy.
curl -s -o /dev/null -w 'deploy log: %{http_code}
' --max-time 90 -X POST -H "x-revalidate-secret: $secret" -H 'Content-Type: application/json' --data @"$HOME/rp/app/deploy-note.json" http://127.0.0.1:3000/api/deploy-log || true
[ "$code" = 200 ]
