# Thoughts App - Quick Start Guide

## Prerequisites

- **Bun** (installed via npm: `npm install -g bun`)
- **Docker** (for PostgreSQL)
- **Google OAuth Credentials** (from Google Cloud Console)
- **API Key** (OpenRouter or Anthropic)

## Setup in 5 Minutes

### Step 1: Get API Keys

1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials (type: Web application)
   - Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI
   - Copy Client ID and Client Secret

2. **OpenRouter or Anthropic**:
   - OpenRouter: [openrouter.io](https://openrouter.io) (recommended for cost)
   - Anthropic: [console.anthropic.com](https://console.anthropic.com)

### Step 2: Configure Environment

Create `.env` at monorepo root:

```env
# Database
DATABASE_URL=postgresql://dev:dev@localhost:5467/dev

# Auth
AUTH_SECRET=00f7c6f8aac3d4e5b2a1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000

# AI (use one or both)
OPENROUTER_API_KEY=your-openrouter-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### Step 3: Start Database

```sh
docker compose up -d
```

This starts PostgreSQL on `localhost:5467`.

### Step 4: Migrate Database

```sh
npx bun install
npx bun run --filter=@repo/db db:generate
npx bun run --filter=@repo/db db:migrate
```

### Step 5: Start Dev Server

```sh
npx bun run dev --filter=nextjs-template
```

Visit `http://localhost:3000`

## First Run

1. Click **"Sign in with Google"**
2. Authorize with your Google account
3. You'll be redirected to the capture page
4. Type a thought and press **Capture** (or Ctrl+Enter)
5. Watch as AI extracts categories automatically
6. Click category pills to filter
7. Click **Reply** to create a threaded response

## Common Issues

### "Cannot find module @repo/db"
→ Run `npx bun install` again

### "Google OAuth error"
→ Check `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env`

### "Database connection failed"
→ Make sure Docker container is running: `docker ps`

### "AI call failed"
→ Check API key and ensure `OPENROUTER_API_KEY` or `ANTHROPIC_API_KEY` is set

## Development Commands

```sh
# Start all dev servers (Next.js on :3000, SvelteKit on :3001)
npx bun run dev

# Type check
npx bun run check-types

# Lint
npx bun run lint

# Format
npx bun run format

# Open Prisma Studio (browse database)
npx bun run --filter=@repo/db studio

# Rebuild database (WARNING: deletes data)
npx bun run --filter=@repo/db db:push --force-reset
```

## What to Try

1. **Create multiple thoughts** with different content
2. **Reply to thoughts** to create threads
3. **Create custom categories** and assign them manually
4. **Filter by category** to organize thoughts
5. **Switch theme** (light/dark mode in header)
6. **Sign out** and sign back in

## Architecture Notes

- **Frontend**: Next.js 16 with React 19
- **API**: tRPC for type-safe backend communication
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth v5 with Google provider
- **AI**: OpenRouter (Qwen) or Claude API
- **UI**: shadcn/ui components on Tailwind v4

## Next Steps

- [ ] Deploy to Vercel (Frontend)
- [ ] Deploy Postgres to AWS RDS or Supabase
- [ ] Set up graph visualization for thought tree
- [ ] Add full-text search
- [ ] Implement thought editing
- [ ] Add rate limiting
- [ ] Set up monitoring/logging

## Help

- Check `POC_SUMMARY.md` for full feature list
- See `.env.example` for all available options
- Run `npx bun run --help` for CLI options
