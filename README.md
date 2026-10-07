# devflow-web

Next.js client for **DevFlow**, the open-source team task-management product. Consumes
[`devflow-api`](https://github.com/OwlGuild/devflow-api).

[![CI](https://github.com/OwlGuild/devflow-web/actions/workflows/ci.yml/badge.svg)](https://github.com/OwlGuild/devflow-web/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/next-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

## Why this exists

A task board lives or dies on how fast you can see state and act on it. The client is built
around three rules:

- **Nothing blocks the view.** Mutations update the list immediately; failures roll back.
- **Persian is first-class.** Layout is written logical-first so RTL is not an afterthought.
- **Live by default.** WebSocket events patch the store, so the board is never stale.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS |
| Testing | Vitest + Testing Library (jsdom) |

## Quickstart

```bash
git clone https://github.com/OwlGuild/devflow-web.git
cd devflow-web
npm install
npm run dev
```

App: `http://localhost:3000`.

## Structure

```
src/
  app/
    layout.tsx         document shell and metadata
    page.tsx           home
    page.test.tsx
  components/
    StatusBadge.tsx    board status pill
    StatusBadge.test.tsx
vitest.config.mts      test runner configuration
```

## Testing

```bash
npm test          # vitest run
npm run build     # production build, also runs in CI
```

The suite covers component rendering and status variants: 6 tests, running in CI on every push.

```bash
npm test

✓ src/components/StatusBadge.test.tsx (4 tests)
✓ src/app/page.test.tsx (2 tests)

Test Files  2 passed (2)
     Tests  6 passed (6)
```

## Roadmap

- Authenticated board views backed by `devflow-api`
- Optimistic mutations with rollback
- RTL pass across every view, verified visually in both languages
- Playwright end-to-end suite against a seeded API

## Ownership

Both maintainers of [OwlGuild](https://github.com/OwlGuild) commit here.

| Area | Maintainer |
|---|---|
| App routing, state, data fetching | [@AhmadGolbooee](https://github.com/AhmadGolbooee) |
| UI components, design system, Tailwind | [@AhmadGolbooee](https://github.com/AhmadGolbooee) |
| Client-side API contract | [@AhmadGolbooee](https://github.com/AhmadGolbooee) |
| Live-update handling | shared with [@MarziehAkrami](https://github.com/MarziehAkrami) |
| CI, Docker, docs | shared |

## Related

- [`devflow-api`](https://github.com/OwlGuild/devflow-api) — the REST API this client consumes
- [`devflow-realtime`](https://github.com/OwlGuild/devflow-realtime) — WebSocket layer
- [`devflow-qa`](https://github.com/OwlGuild/devflow-qa) — contract and load checks

## License

[MIT](LICENSE).
