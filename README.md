# STRIGLO

Mobile-first barber booking web app built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, Zod, Vitest, and Playwright.

## Setup

```bash
npm install
```

## Run dev

```bash
npm run dev
```

## Run tests

```bash
npm run test
```

## Run e2e

```bash
npm run test:e2e
```

## Structure

- `app/` route entries and global app shell
- `components/` reusable UI primitives and booking cards
- `features/` screen-level flows for home, booking, recommendations, and confirmation
- `lib/` shared helpers, validation, and booking logic
- `data/` realistic mocked data for services, barbers, slots, styles, and voice parsing
- `hooks/` route-aware booking actions
- `store/` Zustand booking state
- `types/` domain types
- `tests/` unit, component, integration, and Playwright e2e coverage
