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
[ "$code" = 200 ]
