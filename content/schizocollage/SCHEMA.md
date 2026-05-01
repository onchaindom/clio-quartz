# Wiki Schema

## Domain

Emergent aesthetic and cultural phenomena, documented from the formal-criticism position. Specific topic for this wiki: **schizocollage**.

The wiki's purpose is to support a Clio Press issue on this subject. It is the *argument* layer of the press's three-artifact stance:

- **Wiki** = argument (this document and its pages)
- **Are.na channel** = evidence (primary works with provenance)
- **Zine** = capsule (the designed publication)

The wiki documents what the subject is, where it came from, who is doing it, and what it responds to — at the depth a careful reader will want in ten or fifty years.

## Directory structure

```
wikis/schizocollage/
├── SCHEMA.md           # this file
├── index.md            # sectioned content catalog
├── log.md              # chronological action log
├── lineage.md          # required: structured genealogy
├── formal-grammar.md   # required: numbered taxonomy of formal rules
├── adjacent-aesthetics.md  # required: neighboring aesthetics, named transfers
├── critical-disputes.md    # required: contested claims on the record
├── raw/
│   ├── articles/       # web articles, criticism, journalism
│   ├── papers/         # PDFs, exhibition catalogues
│   ├── transcripts/    # interviews, talks
│   ├── works/          # primary visual material with provenance stubs
│   └── assets/         # images referenced by sources
├── entities/           # figures, organizations, venues, publications, movements
├── concepts/           # formal devices, theoretical frames, named ideas
├── comparisons/        # side-by-side analyses
└── queries/            # filed query results worth keeping
```

## Conventions

- File names: lowercase, hyphens, no spaces (e.g., `evil-biscuit.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- **Provenance markers**: on pages synthesizing 3+ sources, append `^[raw/articles/source-file.md]` at the end of paragraphs whose claims trace to a specific source
- **Are.na blocks**: when a page references a primary work that has been posted to the Are.na channel as an image block, include the Are.na block URL on the page under an `### Evidence` heading

## Page types

Standard Karpathy types extended for aesthetic-phenomena research:

- `entity` — a person (figure), organization, venue, publication, or movement
- `concept` — a formal device, theoretical frame, or named idea
- `lineage` — a structured genealogy (used for the required `lineage.md`)
- `grammar` — a numbered taxonomy of formal rules (used for `formal-grammar.md`)
- `adjacent` — a neighboring aesthetic with what specifically transfers (used for `adjacent-aesthetics.md`)
- `dispute` — a contested claim, alternative reading, or internal disagreement (used for `critical-disputes.md`)
- `comparison` — side-by-side analysis
- `query` — filed answer worth keeping
- `summary` — a synthesis page

## Frontmatter

```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | lineage | grammar | adjacent | dispute | comparison | query | summary
tags: [from taxonomy below]
sources: [raw/articles/source-name.md]
arena_channel: are.na/clio-press/schizocollage    # optional, for pages tied to an Are.na channel
arena_blocks: []                                  # optional, list of Are.na block URLs for primary works on this page
confidence: high | medium | low                   # optional, default high
contested: true                                   # optional, set when claims are unresolved
contradictions: [other-page-slug]                 # optional, pages this one conflicts with
---
```

`raw/` files get a smaller frontmatter block:

```yaml
---
source_url: https://example.com/article
ingested: YYYY-MM-DD
sha256: hex digest
---
```

## Tag taxonomy

- `figure` — named person doing or having done the work
- `work` — a specific artwork, zine, post, video, image, or other artifact
- `movement` — a named movement, scene, or grouping
- `formal-device` — a specific compositional or formal technique
- `lineage` — for lineage-type pages
- `adjacent-aesthetic` — for adjacent-type pages
- `venue` — gallery, magazine, platform, channel, online forum
- `publication` — book, zine, periodical, paper
- `period` — a named historical moment relevant to the topic
- `critical-frame` — a theoretical lens with traction on the subject
- `internet-native` — for figures, works, or movements that originated online
- `disputed` — for pages on contested claims (paired with `contested: true`)
- `material` — physical materials and treatments (xerox, riso, glue, tape, etc.)

## Required pages for any Clio wiki

A complete Clio wiki on a topic must produce, at minimum:

1. `index.md` — content catalog (auto-maintained)
2. `SCHEMA.md` — this file
3. `log.md` — action log (auto-maintained)
4. `lineage.md` (type: lineage) — structured genealogy
5. `formal-grammar.md` (type: grammar) — numbered taxonomy
6. `adjacent-aesthetics.md` (type: adjacent) — neighboring aesthetics
7. `critical-disputes.md` (type: dispute) — contested claims
8. At least 2 figure pages
9. At least 2 work pages
10. Concept pages as the subject demands

## Page thresholds

- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source AND the wiki's required pages need it
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions or details outside formal scope

## Source quality hierarchy

1. Primary (works, original publications, interviews, documented archive)
2. Peer-reviewed criticism (academic articles, books from established presses)
3. Magazine criticism (*Artforum*, *Frieze*, *e-flux*, *n+1*, *October*)
4. Working journalism (*NYT*, *Guardian*, *New Yorker* when subject-literate)
5. Forum / online (Reddit, Tumblr, Twitter — evidence of circulation, not authority)

Do not use as primary: listicles, AI summaries, content-mill articles, "Internet aesthetics" Wikipedia, platform marketing copy.
