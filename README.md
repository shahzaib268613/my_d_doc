# My Diabetes Doc

Vite, React, TypeScript, Tailwind CSS, and React Router scaffold for the My Diabetes Doc brand.

## Commands

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run typecheck` - run strict TypeScript checks
- `npm run preview` - preview the production build

## Architecture

Feature-based layout:

- `src/app` — startup, routing, and route layouts
- `src/features` — business features (`marketing`, `blog`, `auth`)
- `src/shared` — brand assets and reusable UI primitives

Dependency direction: `app -> features -> shared`. Shared never imports features or app. Features never import app. Compose features in `app`; avoid direct feature-to-feature imports.

Full rules, folder conventions, and handoff checklist: [FRONTEND_ARCHITECTURE.md](./docs/FRONTEND_ARCHITECTURE.md).

## Environment

Copy `.env.example` to `.env` and set:

- `VITE_API_URL` — Nest API base URL (default `http://localhost:3000`)
- `VITE_SITE_URL` — Frontend origin used for public links (default `http://localhost:5173`)

Env is validated in `src/shared/config/env.ts`.
