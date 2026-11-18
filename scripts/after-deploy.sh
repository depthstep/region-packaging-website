#!/bin/bash
# Runs on the server after each upload, from the copy that was just updated. The site never goes down:
#   1. The new version starts beside the live one, on the other port (3000 or 3001).
#   2. It refreshes every page from the database (the build has no database, so its pages hold the
#      starter content) and every page is visited once, so it is built before any visitor sees it.
#   3. Caddy sends visitors to the new version. A Caddy reload finishes requests already under way.
#   4. The old version stops once its last requests are done.
# If the new version fails steps 1 or 2, it is stopped and the live site carries on unchanged.
set -u
next=${1:?usage: after-deploy.sh 3000|3001}
live=$(cat "$HOME/rp/live-port" 2>/dev/null || echo legacy)
app="$HOME/rp/app-$next"
secret=$(sed -n 's/^REVALIDATE_SECRET=//p' "$HOME/rp/shared/.env")
url="http://127.0.0.1:$next"

give_up() {
  echo "DEPLOY STOPPED: $1. The live site was not changed."
  sudo /usr/local/sbin/rp-ctl stop "$next"
  exit 1
}

sudo /usr/local/sbin/rp-ctl start "$next" || give_up "the new version could not be started"

# Database updates run at start-up, so allow a few minutes.
code=000
reply="$HOME/rp/.revalidate-reply.json"
for _ in $(seq 1 90); do
  code=$(curl -s -o "$reply" -w '%{http_code}' --max-time 60 -X POST -H "x-revalidate-secret: $secret" "$url/api/revalidate" || true)
  [ "$code" = 200 ] && break
  sleep 2
done
[ "$code" = 200 ] || give_up "the new version did not answer (last reply $code)"
echo "new version answering on port $next"

# Every public page (the refresh replied with the list), built once on the new version.
pages=$(node -e 'for (const p of JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")).paths || []) console.log(p)' "$reply" | sort -u)
total=0; bad=0
for p in $pages; do
  total=$((total + 1))
  c=$(curl -s -o /dev/null -w '%{http_code}' --max-time 120 "$url$p" || echo 000)
  case "$c" in 5*|000) bad=$((bad + 1)); echo "  page error $c: $p" ;; esac
done
echo "warmed $total pages, $bad errors"
[ "$total" -gt 5 ] || give_up "the page list was too short ($total pages)"
[ "$bad" = 0 ] || give_up "$bad pages failed on the new version"

sudo /usr/local/sbin/rp-ctl switch "$next" || give_up "Caddy could not be switched to the new version"
echo "$next" > "$HOME/rp/live-port"
echo "visitors now go to port $next"

# Let the old version finish anything under way (uploads, saves), then stop it.
sleep 30
sudo /usr/local/sbin/rp-ctl stop "$live"
echo "old version ($live) stopped"

# Edits saved on the old version during the switch were not seen by the new one's page cache.
curl -s -o /dev/null --max-time 20 -X POST -H "x-revalidate-secret: $secret" "$url/api/revalidate" || true

# Lists this update in the admin. A problem here is reported but doesn't fail the deploy.
curl -s -o /dev/null -w 'deploy log: %{http_code}
' --max-time 90 -X POST -H "x-revalidate-secret: $secret" -H 'Content-Type: application/json' --data @"$app/deploy-note.json" "$url/api/deploy-log" || true
