---
name: publish-wiki
description: Publish a Clio Press wiki from the Hetzner VPS to Clio's Garden. Use when the user says "publish <topic>", "ship the <topic> wiki", "sync the <topic> research", or names a wiki topic-slug as something to push live. Wraps scripts/sync-from-vps.sh + git commit + git push so Vercel auto-redeploys.
---

# publish-wiki

End-to-end publish of a single wiki from the press's VPS to the public garden.

## Prerequisites (assume true; verify only on failure)

- Local repo: `~/Documents/web-dev/clio-quartz/` (cwd should be here for the skill).
- VPS SSH key at `~/.ssh/clio_ed25519`.
- `scripts/sync-from-vps.sh` is executable.
- Git remote `origin` points at `github.com/onchaindom/clio-quartz`; main branch.
- Vercel project `clio-quartz` is linked and auto-deploys on push to main.

## Steps

1. **Get the topic slug.** The user names the wiki — `schizocollage`, `cyanotypes`, etc. If not specified, ask.
2. **`cd ~/Documents/web-dev/clio-quartz` then run `./scripts/sync-from-vps.sh <topic>`.** This rsyncs `~/clio-press/wikis/<topic>/` from the VPS into `content/<topic>/`, excluding `raw/`, `.arena-corpus.json`, and `.arena-channel.txt`.
3. **Show `git status content/<topic>/` and a short `git diff --stat content/<topic>/`** so the user sees what changed before publishing.
4. **Run a local build sanity check:** `npx quartz build 2>&1 | tail -5`. If it errors, surface the error and stop — don't push broken markdown.
5. **Confirm with the user before committing** (this is a public publish; brief check-in is appropriate even in auto mode).
6. **Commit:** `git add content/<topic> && git commit -m "publish <topic>"`. If only modified files exist, the message should say "update <topic>" instead.
7. **Push:** `git push`. Vercel auto-redeploys.
8. **Verify:**
   - `vercel ls 2>&1 | head -10` — confirm a new deployment is queued/building.
   - After ~30 sec, `curl -sSI https://cliosgarden.cacheatelier.work/<topic>/ | head -3` — confirm the new page is live (HTTP 200).
   - Report the deployment URL and the live wiki URL to the user.

## Failure modes & responses

- **rsync fails (SSH refused / key missing):** confirm `~/.ssh/clio_ed25519` exists and matches the VPS's `authorized_keys`. The rsync command is in `scripts/sync-from-vps.sh:18-22`.
- **Quartz build fails:** the error is in the markdown — likely a malformed `[[wikilink]]`, a frontmatter typo, or a missing image. Show the user the error; don't push.
- **`git push` rejected:** someone pushed in between. Pull/rebase, re-run sanity build, push.
- **Vercel build fails on the dashboard:** `vercel logs <deployment-url>` to inspect. Most common: a Node-version or dependency mismatch — the local `npx quartz build` should have caught it, so this is rare.

## Auto-deploy vs. manual

Default: push to `main` and let Vercel auto-deploy. If the user asks for an immediate force-publish without GitHub (rare — for example, if GitHub is having an outage), use `vercel deploy --prod` from the linked repo. Both paths produce the same artifact.

## Out of scope

- Don't run this for a wiki that doesn't exist on the VPS yet — confirm `~/clio-press/wikis/<topic>/` exists first if there's any doubt (`ssh -i ~/.ssh/clio_ed25519 openclaw@89.167.101.176 'ls ~/clio-press/wikis/'`).
- Don't modify `content/<topic>/` files by hand — they're authored on the VPS and will be overwritten on next sync.
