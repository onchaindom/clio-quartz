# Clio's Garden

The wiki collection site for [Clio Press](https://www.are.na/clio-press), an imprint of [Cache Atelier](https://cacheatelier.work). Built on [Quartz v4](https://quartz.jzhao.xyz).

> *…the power to know the hearts of the gods and the ways by which things come to be.*

## Naming

Three things, three roles:

- **Cache Atelier** — the studio (parent imprint).
- **Clio's Garden** — *this site.* The digital garden / wiki collection. The argument layer of each Clio Press issue.
- **Clio Press** — the imprint that publishes the zines (designed PDF capsules). Sibling to the garden.

Each issue produces three artifacts: a wiki on the garden (here), an Are.na channel (evidence), and a zine PDF (the press's designed publication).

## Local development

```bash
npm install
npx quartz build --serve
```

Site serves at `http://localhost:8080`. Edit anything under `content/` and the build hot-reloads.

## Adding a wiki

Wikis are authored on the Clio Press VPS by the Hermes / Clio agent, not in this repo. To publish:

```bash
./scripts/sync-from-vps.sh <topic-slug>
git status content/<topic-slug>/   # review what changed
git add content/<topic-slug>
git commit -m "publish <topic-slug>"
git push                            # Vercel rebuilds on push to main
```

The sync script `rsync`s `~/clio-press/wikis/<topic>/` from the VPS (Hetzner, alias `clio`, user `openclaw`) into `content/<topic>/`. It excludes the agent's internal artifacts (`.arena-corpus.json`, `.arena-channel.txt`, `raw/`) so only reader-facing markdown lands.

Requires `~/.ssh/clio_ed25519` for VPS access.

## Repo structure

```
clio-quartz/
├── content/                     # Quartz input — markdown wikis
│   ├── index.md                 # garden homepage
│   └── <topic-slug>/            # one folder per wiki
├── quartz/                      # Quartz framework code (upstream)
├── quartz.config.ts             # branding, fonts, plugins
├── quartz.layout.ts             # header / footer / sidebars
├── scripts/
│   └── sync-from-vps.sh         # rsync wikis from VPS
├── vercel.json                  # build config for Vercel
└── package.json
```

## Deployment

- Hosted on **Vercel**, auto-deploys on push to `main`.
- Domain: `cliosgarden.cacheatelier.work` (CNAME to Vercel).
- No analytics, no comments, no auth.

## Theme

Quartz defaults with two minimal tweaks:
- **EB Garamond** throughout (header + body), via Google Fonts.
- A muted warm palette tuned away from Quartz's stock blue toward parchment / sepia.

The garden is presentation-neutral on purpose. Each issue's *zine* carries the formal argument; the garden stays out of the way and lets the prose carry.

## Upstream

This repo started from [jackyzha0/quartz](https://github.com/jackyzha0/quartz) v4.5.2. Pulling upstream updates:

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git
git fetch upstream
git merge upstream/v4
```

Resolve conflicts in `quartz.config.ts`, `quartz.layout.ts`, and the README in favor of local.
