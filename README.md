# harbefas.github.io

Site for **Harbefas** — open-source replacements for tools that should never have
been rented: RSS and self-hosted media, a browser, the desktop, and the
infrastructure around AI agents.

Live: https://harbefas.github.io

## Stack

React 19 · Vite · Tailwind. Colors come from the Yerba Mate / Tererê tokens,
vendored in `src/styles/mate-tokens.css` and `src/theme/tokens.generated.ts`.

## Commands

| Command               | Action                                                 |
| :-------------------- | :----------------------------------------------------- |
| `npm install`         | Install dependencies                                    |
| `npm run dev`         | Dev server on `localhost:5173`                          |
| `npm run build`       | Build to `./dist/`                                      |
| `npm run sync:tokens` | Re-vendor tokens from a local `mateCreations` checkout  |

`sync:tokens` needs `~/code/personal/mateCreations` (override with
`MATECREATIONS=`), so it stays a local, manual step — the generated files are
committed and CI builds without it.

## Content

Every project card lives in `src/data/projects.ts`: name, repo, what it does,
what closed thing it replaces, stack. Adding a project means adding one object
there.

## Deploy

Push to `master`; the workflow builds and publishes `dist/` to `gh-pages`.
