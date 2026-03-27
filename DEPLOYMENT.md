# Deployment Guide

## GitHub Repository

✅ **Pushed to GitHub**
- Repository: https://github.com/agentthinkpad10/thoughts
- All commits pushed to `master` branch
- Initial commit with full POC implementation

✅ **Collaborator Invited**
- **qudo-code** has been invited as a collaborator with push permissions
- They will receive an invitation email

## Vercel Deployment

### Current Status
- Project has been created in Vercel: `agentthinkpad10-cmyks-projects/nextjs-template`
- GitHub repository connected for automatic deployments
- Main branch is configured for production deployments

### Setup Instructions

Since this is a monorepo with Bun, you'll need to configure Vercel's build settings manually:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select the `nextjs-template` project**
3. **Settings → Build & Development Settings**
4. Set the following:
   - **Root Directory**: `apps/nextjs-template`
   - **Build Command**: `cd ../.. && npx bun run build --filter=nextjs-template`
   - **Development Command**: `cd ../.. && npx bun run dev --filter=nextjs-template`
   - **Output Directory**: `.next`

OR (Simpler) - Just use defaults if the framework is auto-detected properly:
   - Vercel will try to auto-detect Next.js and should work with the default `next build` command

### Environment Variables

Add these to Vercel project settings (Settings → Environment Variables):

```env
# NextAuth
AUTH_SECRET=<random 32-byte hex>
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
NEXTAUTH_URL=https://<your-vercel-domain>.vercel.app

# AI Integration
OPENROUTER_API_KEY=<your-openrouter-key>
# OR
ANTHROPIC_API_KEY=<your-anthropic-key>

# Database (required for production)
DATABASE_URL=<your-production-database-url>
```

### Database Setup

For production, you'll need:
1. **PostgreSQL Database** (e.g., Supabase, AWS RDS, Railway)
   - Copy the connection string to `DATABASE_URL` env var
2. **Run Migrations**:
   ```sh
   npx bun run --filter=@repo/db db:migrate
   ```

### Deployment URLs

After Vercel finishes building, your app will be available at:
- **Production**: https://nextjs-template-*.vercel.app

## Automatic Deployments

Vercel is configured for automatic deployments:
- **Push to `master`** → Automatic production deployment
- **Pull requests** → Preview deployments (automatic)
- **Rollback**: Available in Vercel dashboard

## Troubleshooting

### Build Fails with "No Next.js version detected"
→ Make sure the Root Directory is set to `apps/nextjs-template` in Vercel Settings

### Build Fails with "bun not found"
→ Use the simpler build command: `next build` (without bun prefix)
→ Or configure Vercel to use Node.js with Bun installed

### Auth Errors in Production
→ Make sure `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and `NEXTAUTH_URL` are set
→ Update Google OAuth redirect URI to your Vercel domain

### Database Connection Errors
→ Ensure `DATABASE_URL` is set in Vercel environment variables
→ Run migrations on production database first

## Next Steps

1. ✅ Code pushed to GitHub (done)
2. ✅ qudo-code invited as collaborator (done)
3. ⏳ **Configure Vercel build settings** (manual via dashboard)
4. ⏳ **Add environment variables to Vercel**
5. ⏳ **Set up production PostgreSQL database**
6. ⏳ **Test deployment**

## Useful Commands

```bash
# Deploy manually to Vercel
vercel deploy --prod

# Check deployment status
vercel status

# View logs
vercel logs

# Check current project
vercel project

# List all projects
vercel projects list
```

## References

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- NextAuth v5: https://authjs.dev
- Thoughts App Repo: https://github.com/agentthinkpad10/thoughts

---

**Status Summary:**
- ✅ GitHub repo created and pushed
- ✅ qudo-code invited as collaborator
- 🟡 Vercel project created (needs manual configuration)
- ⏳ Ready for production deployment after Vercel setup

For questions, refer to QUICKSTART.md for local development or POC_SUMMARY.md for feature details.
