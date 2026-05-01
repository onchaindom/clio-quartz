#!/bin/bash
# Sync a wiki from the Clio Press VPS into Quartz's content/ directory.
# Usage: ./scripts/sync-from-vps.sh <topic-slug>
#   e.g. ./scripts/sync-from-vps.sh schizocollage
#
# After sync, review with `git status content/<topic>/`, then commit and push.
# Vercel will rebuild on push to main.
set -e

TOPIC="${1:?topic-slug required, e.g. ./scripts/sync-from-vps.sh schizocollage}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${REPO_ROOT}/content/${TOPIC}/"
mkdir -p "${TARGET}"

rsync -avz --delete --delete-excluded \
  --exclude='.arena-corpus.json' \
  --exclude='.arena-channel.txt' \
  --exclude='.editor-*.md' \
  --exclude='log.md' \
  --exclude='SCHEMA.md' \
  --exclude='raw/' \
  -e "ssh -i ~/.ssh/clio_ed25519" \
  "openclaw@89.167.101.176:~/clio-press/wikis/${TOPIC}/" \
  "${TARGET}"

# Prune empty subdirectories left behind after exclusions.
find "${TARGET}" -mindepth 1 -type d -empty -delete

echo
echo "Synced ${TOPIC} → content/${TOPIC}/"
echo "Review:  git status content/${TOPIC}/"
echo "Publish: git add content/${TOPIC} && git commit -m 'publish ${TOPIC}' && git push"
