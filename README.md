# Fullstack Monorepo

A Turborepo monorepo with Next.js and SvelteKit apps sharing a tRPC API layer, Prisma database, TanStack Query integration, and mirrored UI component libraries.

## Architecture

```
apps/
  nextjs-template/       Next.js app (port 3000)
  sveltekit-template/    SvelteKit app (port 3001)
packages/
  api/                   Base tRPC setup + framework adapters
  db/                    Prisma client + schema (PostgreSQL)
  nextjs-query/          TanStack React Query + tRPC integration
  svelte-query/          TanStack Svelte Query + tRPC integration
  react-ui/              React component library (Shadcn + Tailwind)
  svelte-ui/             Svelte 5 component library (Shadcn + Tailwind)
  eslint-config/         Shared ESLint configs
  typescript-config/     Shared tsconfig presets
```

## Packages

### `@repo/db`

Prisma 7 database client with PostgreSQL via `@prisma/adapter-pg`.

- Uses `prisma-client` generator with custom output to `src/generated/prisma/` (TypeScript output, works with both Vite and Turbopack)
- Singleton pattern — reuses the client instance across hot reloads
- Connection config lives in `prisma.config.ts`, env vars passed via `dotenv-cli`
- Exports `db` (client instance), `Prisma` namespace, and all generated types

**Scripts (run from `packages/db/`):**

| Script | Description |
|--------|-------------|
| `bun run db:generate` | Generate Prisma client from schema |
| `bun run db:push` | Push schema to local dev database |
| `bun run push:staging` | Push schema to staging database |
| `bun run push:prod` | Push schema to production database |
| `bun run db:migrate` | Create and apply migrations |
| `bun run studio` | Open Prisma Studio GUI |
| `bun run seed` | Seed database |

### `@repo/api`

Base tRPC setup with superjson transformer. Apps import primitives and build their own routers.

- `router`, `publicProcedure`, `createCallerFactory`, `mergeRouters` — tRPC building blocks
- `createTRPCContext` — base context factory (injects `db` from `@repo/db` + headers)
- `@repo/api/adapters/next` — `createNextHandler()` for Next.js App Router route handlers
- `@repo/api/adapters/svelte` — `createSvelteHandler()` for SvelteKit `+server.ts` handlers

### `@repo/nextjs-query`

TanStack React Query + tRPC wired together for Next.js.

- `createTRPCNextQuery<AppRouter>({ url })` — returns `{ TRPCProvider, useTRPC, getQueryClient }`
- SSR-safe QueryClient (fresh per-request on server, singleton on browser)
- Uses `@trpc/tanstack-react-query` under the hood
- Components use `useTRPC()` to get a typed proxy, then `useQuery(trpc.foo.queryOptions(...))`

### `@repo/svelte-query`

TanStack Svelte Query + tRPC for SvelteKit.

- `createTRPCSvelteClient<AppRouter>({ url })` — returns a typed tRPC client proxy
- `createQueryClient()` — factory with sensible defaults (30s stale time)
- No provider needed for the tRPC client — just a module import
- Components use `createQuery()` / `createMutation()` with the tRPC proxy directly

### `@repo/react-ui`

25 React components built on Radix UI primitives with CVA variants and Tailwind.

- Exports via `./components/*` glob mapping to `*.tsx` files
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/globals.css` — full design token system (CSS custom properties for colors, radii) with light/dark mode

### `@repo/svelte-ui`

29 Svelte 5 components built on bits-ui primitives with identical Tailwind classes.

- Exports via `./components/*` glob mapping to `*/index.ts` (folder-per-component)
- `src/lib/utils.ts` — same `cn()` function
- `src/globals.css` — same design tokens as react-ui
- Uses Svelte 5 runes (`$props()`, `$bindable()`) and `{@render children()}` snippets

### `@repo/typescript-config`

- `base.json` — strict, ES2022, NodeNext
- `nextjs.json` — Bundler resolution, JSX preserve, Next.js plugin
- `react-library.json` — react-jsx for React packages
- `library.json` — ESNext + Bundler for non-React packages (api, svelte-query)
- `sveltekit.json` — ESNext + Bundler + verbatimModuleSyntax

### `@repo/eslint-config`

- `base` — JS + TypeScript-ESLint + Prettier + Turbo
- `next-js` — base + React + React Hooks + Next.js plugin
- `react-internal` — base + React + React Hooks
- `svelte` — base + eslint-plugin-svelte + svelte-eslint-parser

## Apps

### `nextjs-template` (port 3000)

- **Server:** `app/server/router.ts` defines `appRouter`, `app/api/trpc/[...trpc]/route.ts` uses `createNextHandler`
- **Client:** `app/trpc.ts` calls `createTRPCNextQuery<AppRouter>`, `app/providers.tsx` wraps with `TRPCProvider`
- **Theme:** Custom `ThemeProvider` (class-based dark mode, inline script in `layout.tsx` to prevent flash)
- **Styles:** `app/globals.css` imports `@repo/react-ui/globals.css` for design tokens, `@source` directive for Tailwind class scanning. Local fonts (Geist Sans/Mono) in `layout.tsx`. Tailwind via `@tailwindcss/postcss`.
- **Queries:** `app/queries/` — query/mutation option factories, used by components via `useQuery(helloQueryOptions(trpc, ...))`
- **Page:** "Hello, World!" query + form with echo mutation + messages from DB

### `sveltekit-template` (port 3001)

- **Server:** `src/lib/server/router.ts` defines same `appRouter`, `src/routes/api/trpc/[...trpc]/+server.ts` uses `createSvelteHandler`
- **Client:** `src/lib/trpc.ts` calls `createTRPCSvelteClient<AppRouter>` (module import, no provider needed), `+layout.svelte` wraps with `QueryClientProvider`
- **Theme:** `mode-watcher` (class-based dark mode)
- **Styles:** `src/app.css` imports `@repo/svelte-ui/globals.css` for same design tokens, `@source` for Tailwind scanning. Tailwind via `@tailwindcss/vite`.
- **Queries:** `src/lib/queries/` — query/mutation option factories, used by components via `createQuery(messagesQueryOptions())`
- **Page:** Same UI — "Hello, World!" query + form with echo mutation + messages from DB

Both apps share identical design tokens, identical Tailwind classes on equivalent components, and the same tRPC router shape — expressed in their respective framework idioms.

## Environment Variables

All env files live at the monorepo root:

| File | Purpose |
|------|---------|
| `.env` | Local development (always loaded as base) |
| `.env.staging` | Staging overrides (layered on top of `.env`) |
| `.env.prod` | Production overrides (layered on top of `.env`) |
| `.env.example` | Template with required keys, no values (committed) |

Apps use `dotenv-cli` to load env files. The `-e` flags are layered — `.env` is always the base, environment-specific files override on top.

## Development

### Prerequisites

- [Bun](https://bun.sh/) package manager
- [Docker](https://www.docker.com/) (for PostgreSQL)

### Getting started

```sh
cp .env.example .env         # configure DATABASE_URL etc.
docker compose up -d         # start PostgreSQL
bun install
bun run --filter=@repo/db db:generate   # generate Prisma client
bun run --filter=@repo/db db:push       # push schema to database
bun run dev                  # starts both apps
```

### Scripts

```sh
bun run dev          # starts both apps (Next.js :3000, SvelteKit :3001)
bun run build        # build all packages and apps
bun run check-types  # type-check everything
bun run lint         # lint everything
bun run format       # format with Prettier
bun run test         # run unit/integration tests
bun run test:e2e     # run Playwright E2E tests
```

### Environment-specific dev servers

```sh
bun run dev                  # uses .env
bun run dev:staging          # uses .env + .env.staging overrides
bun run dev:prod             # uses .env + .env.prod overrides
```

### Filter to a single app

```sh
turbo dev --filter=nextjs-template
turbo dev --filter=sveltekit-template
```
