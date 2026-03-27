# Fullstack Monorepo Template

## Package Structure

- **`apps/*`** — Deployable applications (Next.js, SvelteKit, etc.)
- **`packages/*`** — Shared libraries consumed by apps
- All packages use `@repo/` namespace (e.g., `@repo/react-ui`, `@repo/api`)
- Local dependencies use `"*"` in package.json: `"@repo/api": "*"`
- Package manager: **Bun** (`bun run <script>`)
- Module format: ES modules (`"type": "module"`) throughout

## Database (`@repo/db`)

- **Prisma 7** with `prisma-client` generator (outputs TypeScript, not CJS — works with both Vite and Turbopack)
- Generator output: `packages/db/src/generated/prisma/` — import from `./generated/prisma/client`
- **Adapter:** `@prisma/adapter-pg` (PostgreSQL via `pg` driver, not the Prisma engine)
- **Config:** `packages/db/prisma.config.ts` sets `datasource.url` from env — do NOT pass `datasourceUrl` to the `PrismaClient` constructor (removed in Prisma 7)
- **Schema:** `packages/db/prisma/schema.prisma`
- **Client singleton:** `packages/db/src/index.ts` exports `db` — cached on `globalThis` across hot reloads
- **Exports:** `db` (client instance), `Prisma` (namespace), all generated types

### Database workflow

```sh
bun run --filter=@repo/db db:generate    # regenerate client after schema changes
bun run --filter=@repo/db db:push        # push schema to dev DB
bun run --filter=@repo/db db:migrate     # create + apply migration
bun run --filter=@repo/db studio         # open Prisma Studio
```

### Schema changes checklist
1. Edit `packages/db/prisma/schema.prisma`
2. Run `db:generate` to regenerate the TypeScript client
3. Run `db:push` (dev) or `db:migrate` (production) to sync the database
4. Restart dev servers

## tRPC + Database Integration

### Data flow
```
App router → publicProcedure → ctx.db.model.method()
                                 ↑
                    @repo/api/trpc.ts imports db from @repo/db
                    and injects it into tRPC context
```

### tRPC wiring by framework

**Next.js:**

| Purpose | File |
|---------|------|
| Router definition | `app/server/router.ts` |
| Context factory | `app/server/context.ts` |
| Route handler | `app/api/trpc/[...trpc]/route.ts` |
| Client setup | `app/trpc.ts` |
| Providers | `app/providers.tsx` (TRPCProvider + ThemeProvider) |

**SvelteKit:**

| Purpose | File |
|---------|------|
| Router definition | `src/lib/server/router.ts` |
| Context factory | `src/lib/server/context.ts` |
| Route handler | `src/routes/api/trpc/[...trpc]/+server.ts` |
| Client setup | `src/lib/trpc.ts` (module import, no provider) |

- Import `router`, `publicProcedure` from `@repo/api`
- Use Zod for input validation
- Access database via `ctx.db` in procedures

### Query options (`queries/` folder)

Each app has a `queries/` folder containing factory functions for query/mutation options:

- **Next.js:** `app/queries/*.ts` — exports functions that take the `trpc` proxy and return options for `useQuery`/`useMutation`
- **SvelteKit:** `src/lib/queries/*.ts` — exports functions that return options for `createQuery`/`createMutation`

This keeps query definitions reusable across components and co-located by domain rather than scattered in page files.

## Environment Variables

Env files live at **monorepo root** (not in app directories):

| File | Purpose |
|------|---------|
| `.env` | Local development (always loaded as base) |
| `.env.staging` | Staging overrides (layered on top of `.env`) |
| `.env.prod` | Production overrides (layered on top of `.env`) |
| `.env.example` | Template with required keys, no values (committed) |

**Loading mechanism:** All scripts use `dotenv-cli` with `-e` flags. Later `-e` flags override earlier ones:
- `dev` → `dotenv -e ../../.env --`
- `dev:staging` → `dotenv -e ../../.env -e ../../.env.staging --`
- `dev:prod` → `dotenv -e ../../.env -e ../../.env.prod --`

Required env vars: `DATABASE_URL`

## Component Conventions

### React (`@repo/react-ui`)
- Flat files: `src/components/kebab-case.tsx`
- Primitives: **Radix UI** (`@radix-ui/react-*`)
- Icons: **lucide-react**
- Export pattern: `"./components/*" → "./src/components/*.tsx"`
- Each component file exports named components (not default)

### Svelte (`@repo/svelte-ui`)
- Folder per component: `src/components/kebab-case/` with `.svelte` sub-components + `index.ts` barrel export
- Primitives: **bits-ui**
- Icons: **lucide-svelte**
- Export pattern: `"./components/*" → "./src/components/*/index.ts"`

### Shared rules
- Use **CVA** (`class-variance-authority`) for all component variants
- Use `cn()` from `../lib/utils` for className merging (clsx + tailwind-merge)
- Never put raw hex/hsl values in component files — always use theme tokens (`bg-primary`, `text-muted-foreground`, etc.)
- Component names: PascalCase in code, kebab-case for files/folders
- Each UI package has a `registry.json` — update it when adding/removing components

## Component Registry

Both `@repo/react-ui` and `@repo/svelte-ui` contain a `registry.json` following the [shadcn/ui registry schema](https://ui.shadcn.com/docs/registry/registry-json). This file maps every component to its dependencies, file paths, and inter-component relationships. AI tooling should read `registry.json` to understand what exists and what each component needs — do not guess.

When adding a new component, add its entry to `registry.json` in both packages.

## Style Architecture

- **Design tokens** live in `packages/[react|svelte]-ui/src/globals.css` using Tailwind v4 `@theme` blocks
- Dark mode uses **class-based toggling** via `@custom-variant dark (&:is(.dark *))` — NOT media queries
- Light tokens are in `@theme {}`, dark overrides are in `.dark {}` as plain CSS custom properties
- **Apps import tokens** via `@import "@repo/react-ui/globals.css"` in their own `globals.css`
- **Apps declare `@source`** to scan the UI package for Tailwind classes: `@source "../../../packages/react-ui/src"`
- App-specific style overrides go in the app's `globals.css` **after** the package import
- Never duplicate or override base design tokens in app-level CSS

### Theme switching
- **Next.js:** Custom `ThemeProvider` in `app/components/theme-provider.tsx` (replaced `next-themes` due to Next.js 16 / React 19 `<script>` tag incompatibility). Inline script in `layout.tsx` `<head>` prevents dark mode flash.
- **SvelteKit:** `mode-watcher` package

## TypeScript

- Base config: `@repo/typescript-config/base.json` — ES2022, strict, `noUncheckedIndexedAccess`
- Extend from the right variant:
  - Libraries: `library.json` (ESNext/Bundler)
  - React libraries: `react-library.json` (adds `jsx: "react-jsx"`)
  - Next.js apps: `nextjs.json` (ESNext, Bundler, `jsx: "preserve"`, `noEmit`)

## ESLint

- Configs in `@repo/eslint-config`: `base.js`, `react-internal.js`, `next.js`
- Import the right one in each package's `eslint.config.mjs`
- Zero warnings allowed: `eslint . --max-warnings 0`

## Scripts

Run from monorepo root:
- `bun run build` — Build all packages and apps
- `bun run dev` — Start all dev servers
- `bun run dev:staging` — Dev with staging env overrides
- `bun run dev:prod` — Dev with production env overrides
- `bun run lint` — Lint everything
- `bun run check-types` — Type-check everything
- `bun run format` — Format with Prettier
- `bun run test` — Run unit/integration tests (Vitest)
- `bun run test:e2e` — Run Playwright E2E tests (requires `bunx playwright install chromium` first)

## E2E Tests

Each app has its own Playwright setup:
- Config: `playwright.config.ts` at app root
- Tests: `e2e/` directory
- Next.js runs on port 3000, SvelteKit on port 3001
- Playwright starts the dev server automatically via `webServer` config

## Infrastructure

- **Docker Compose** (`docker-compose.yml` at repo root): PostgreSQL 16 on port 5467
- Start with `docker compose up -d` before running dev servers

## Do / Don't

- **Do** use `@repo/` imports across packages — never relative paths across package boundaries
- **Do** use CVA for component variants, `cn()` for class merging
- **Do** keep both UI packages in sync (see sync rule below)
- **Do** run `db:generate` after any schema change
- **Don't** put business logic in UI components — keep it in the API layer or app-level code
- **Don't** add dependencies to the root package.json — add them to the specific package that needs them
- **Don't** create new TypeScript or ESLint configs — extend the shared ones
- **Don't** pass `datasourceUrl` or `datasources` to PrismaClient constructor — use `prisma.config.ts`
- **Don't** use `prisma-client-js` generator — use `prisma-client` (TypeScript output, no CJS/ESM issues)

---

## UI Package Sync Rule

`@repo/react-ui` and `@repo/svelte-ui` must have the same set of components. When a new component is added to either package, create the equivalent in the other package using that framework's idioms (React + Radix UI for react-ui, Svelte 5 + bits-ui for svelte-ui). Both should use identical Tailwind classes for visual parity.

Do NOT automatically sync changes to existing component implementations. Component code is framework-specific — a change to one does not imply a change to the other unless explicitly requested.

### Adding a new component checklist
1. Create the component in the originating package
2. Create the equivalent in the other package with matching Tailwind classes, variants, and prop API surface
3. Export it from the package's `index.ts` (svelte-ui) or verify the glob export covers it (react-ui)
4. Add the component entry to `registry.json` in both packages
5. Ensure `bun run check-types` passes for both packages
