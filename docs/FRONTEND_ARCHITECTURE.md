# My Diabetes Doc frontend development rules

## Architecture

Keep this project feature based. `src/app` owns startup, routing, and route layouts; `src/features` owns business features; `src/shared` owns reusable, feature-independent code.

Add one folder per real business feature, such as `auth`, `blog`, or `marketing`, when implementation starts. Do not scaffold empty future modules.

A feature may contain `pages`, `components`, `hooks`, `api`, `types`, and `constants` when needed. Do not create every directory by default.

Keep marketing pages and marketing-only components inside `features/marketing`.

Keep application route layouts in `app/layouts`. Avoid layout wrappers that only forward children to another layout.

## Dependencies and ownership

Dependency direction is `app -> features -> shared`. Shared code must never import app or feature code.

Features must not import app code. Avoid direct feature-to-feature imports; compose features in `app`, or extract truly reusable code to `shared`.

Use `@/` imports across modules and relative imports for closely related files inside a component folder.

Export route pages and intentional external entry points from a feature's `index.ts`. Keep implementation details internal.

Shared branding and assets belong in `shared/assets`; feature-specific images belong with the feature.

Move code to `shared` only when it has an actual cross-feature use or is clearly a generic primitive.

## Components and state

Pages compose sections and feature components; they should not contain large implementation blocks.

`shared/components/ui` is for reusable primitives such as buttons and inputs. Business forms belong in the feature's `components` directory.

Keep local state local. Add global state only for a demonstrated cross-feature need.

Group a complex section with its CSS, hooks, calculations, and types in its own folder. Extract by responsibility, not a rigid line limit.

Keep tiny, single-use values next to their component. Put substantial page copy or reused values in feature constants.

Use TypeScript types; avoid `any` and unjustified assertions. Reuse existing primitives before introducing new abstractions.

## Styling and behavior

Preserve existing design, responsive behavior, accessibility, and animations during structural changes.

Use the existing Tailwind theme and tokens. Keep section-specific CSS beside the section; reserve global CSS for global styles and theme declarations.

Provide labels, keyboard access, focus states, and reduced-motion support where relevant.

Clean up listeners, observers, timers, and animation frames in effects.

Keep secrets out of frontend code. Put future network calls in the owning feature's `api` directory; do not add an API layer until it is needed.

## Verification and handoff

Run `npm run build` and `npm run lint` after code changes. Report failures or blocked checks accurately.

For behavior changes, verify the affected routes and interactions. Add focused tests for meaningful logic when appropriate.

Do not upgrade dependencies, change public routes, or alter business behavior as part of a folder-only refactor.

Remove stale imports and empty folders after moves. Update README when setup or architecture changes.

Never claim that a contact request was sent unless delivery is confirmed. The current form opens an email client through `mailto:`.
