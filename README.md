# MindCare

Starter project for an anonymous mental-health support platform. The current foundation includes a static HTML/CSS/JavaScript frontend, an Express API, Supabase Auth/Database wiring, daily check-ins, and a moderated community-post flow.

## Requirements

- Node.js 20 or newer
- A Supabase project

## Start locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`, then add your Supabase project URL and **anon/publishable key**.
3. Run `supabase/schema.sql` in the Supabase SQL Editor.
4. Run `npm run dev` and open `http://localhost:3000`.

The Supabase service-role key must never be put in `.env` for this app or exposed to the browser. The API uses the anon key and verifies member access tokens; database access is constrained by Row Level Security.

## Project map

```text
public/                 Static frontend (HTML, CSS, browser ES modules)
  js/pages/              Dashboard, community, check-in, library and sign-in screens
server/src/
  config/                Supabase client configuration
  middleware/            Authentication and error handling
  routes/                Health, auth, posts and check-in API routes
supabase/schema.sql      Initial tables, constraints, RLS and profile trigger
```

## API starter

- `GET /api/health`
- `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/posts`, `POST /api/posts` (new posts enter moderation as `pending`)
- `GET /api/check-ins`, `POST /api/check-ins` (one check-in per member per day)

Posts support three identity modes: `unlinked` leaves `author_user_id` null on the post row; `moderator_only` stores the author for admin review but the public community view always masks the identity; `public` shows the display name. A separate per-account daily counter enforces spam limits without mapping unlinked posts back to the account. Unlinked posts cannot be attributed for per-author reputation or admin investigations. The public API reads `community_posts`, never the base table. Do not add IP/device logging or expose database identifiers in public post responses if the product promise is complete anonymity.

AI risk detection, AI moderation, clinician recommendations, follows/friends, reputation rules, reports, weekly summaries/PDF export, panic escalation, and audio uploads are product extensions, not implemented clinical features in this starter. Treat check-ins and wellness content as supportive tools, not diagnosis or emergency care. Review privacy, consent, security, and clinical safety before a public launch.
