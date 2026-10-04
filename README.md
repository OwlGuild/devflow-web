# devflow-web

Next.js client for **DevFlow**, the open-source team task-management product. Consumes
[`devflow-api`](https://github.com/OwlGuild/devflow-api).

[![CI](https://github.com/OwlGuild/devflow-web/actions/workflows/ci.yml/badge.svg)](https://github.com/OwlGuild/devflow-web/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/next-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

**Live:** https://devflow-web-agbx.onrender.com

## Why this exists

A task board lives or dies on how fast you can see state and act on it. The client is built
around three rules:

- **The page says what actually runs.** Every claim on the home page maps to shipped code, and
  the status pill probes `devflow-api`'s readiness endpoint from the browser.
- **Components are tested, not eyeballed.** Each component has a Vitest test that fails if the
  component breaks.
- **CI is the gate.** Lint, production build, tests and a Docker build run on every push to
  `main` and on every pull request.

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
cp .env.example .env
npm install
npm run dev
```

App: `http://localhost:3000`. `DEVFLOW_API_URL` (server-side, read at request time) points the
status pill at an API instance; Render sets it to the deployed one.

## Structure

```
src/
  app/
    layout.tsx           document shell and metadata
    page.tsx             home page (server component)
    page.test.tsx
  components/
    SiteHeader.tsx       logo and navigation
    SiteHeader.test.tsx
    FeatureCard.tsx      one building block of the stack
    FeatureCard.test.tsx
    BoardPreview.tsx     planned board columns
    BoardPreview.test.tsx
    LiveStatus.tsx       client-side readiness probe
    LiveStatus.test.tsx
    StatusBadge.tsx      board status pill
    StatusBadge.test.tsx
vitest.config.mts        test runner configuration
```

## Testing

```bash
npm test          # vitest run
npm run lint
npm run build     # production build, also runs in CI
```

The suite covers every component — rendering, links, status variants and the readiness probe's
success, failure and unconfigured paths:

```bash
npm test

✓ src/components/StatusBadge.test.tsx (4 tests)
✓ src/components/LiveStatus.test.tsx (5 tests)
✓ src/components/FeatureCard.test.tsx (2 tests)
✓ src/components/BoardPreview.test.tsx (3 tests)
✓ src/components/SiteHeader.test.tsx (2 tests)
✓ src/app/page.test.tsx (7 tests)

Test Files  6 passed (6)
     Tests  23 passed (23)
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
| Realtime integration (planned) | shared with [@MarziehAkrami](https://github.com/MarziehAkrami) |
| CI, Docker, docs | shared |

## Related

- [`devflow-api`](https://github.com/OwlGuild/devflow-api) — the REST API this client consumes
- [`devflow-realtime`](https://github.com/OwlGuild/devflow-realtime) — WebSocket layer
- [`devflow-qa`](https://github.com/OwlGuild/devflow-qa) — contract and load checks

## License

[MIT](LICENSE).
