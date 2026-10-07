# Contributing

Part of [OwlGuild](https://github.com/OwlGuild).

## Ground rules

- Small pull requests; one concern per commit.
- English commit messages in the imperative mood ("Add live status probe").
- Every component gets a test that would fail if the component broke.
- CI must be green before review.

## Local checks

```bash
npm ci
npm test
npm run lint
npm run build
```

## Review

Both maintainers review before merge. Keep discussion in the PR, keep scope in the diff.
