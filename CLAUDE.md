# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

All commands run from the `localweb-ai/` directory.

## Architecture

**LocalWebAI** is an AI-powered website generator for local businesses. Users upload business info (PDF/images) or type a prompt, and the app generates a website preview they can save.

### Tech Stack

- **Next.js 16** with App Router, **React 19**, **TypeScript**
- **Firebase** for auth (Google OAuth), database (Firestore), and storage
- **Tailwind CSS** with CSS Modules for template components
- Path alias: `@/*` maps to `./src/*`

### Project Structure

- `src/app/` — Next.js App Router pages and API routes
- `src/components/generator/` — Main Generator UI and website template components (Hero, ServiceList, Footer)
- `src/components/LandingPage.tsx` — Marketing/home page
- `src/context/AuthContext.tsx` — Firebase auth provider; exposes `useAuth()` hook
- `src/lib/firebase.ts` — Firebase SDK initialization
- `src/lib/db.ts` — Firestore CRUD operations for saved sites
- `src/types/business.ts` — Core TypeScript interfaces (`BusinessData`, `Service`, `ContactInfo`, `Site`)

### Key Data Flow

1. `AuthProvider` wraps the root layout, providing auth state app-wide via `useAuth()`
2. `Generator.tsx` handles file upload and prompt input, calls `/api/generate` or `/api/parse-file`, then renders a live website preview using template components
3. Template components (`Hero`, `ServiceList`, `Footer`) accept `BusinessData` and render with dynamic colors via inline styles
4. Saving a site writes to Firestore via `db.ts`; the dashboard reads saved sites back

### API Routes

- `POST /api/generate` — Takes business prompt, returns generated `BusinessData` (currently mock data; needs OpenAI integration)
- `POST /api/parse-file` — Accepts FormData file upload, returns parsed `BusinessData` (currently mock data)

### Styling

- Dark theme with glassmorphism: background `#0B0C15`, primary `#6366f1` (indigo), accent `#ec4899` (pink)
- Global utility classes in `globals.css`: `.glass-panel`, `.text-gradient`, `.noise-bg`
- Template components use CSS Modules (`*.module.css`) for scoped styles
- Custom fonts: Syne (display) and Manrope (body) configured in `tailwind.config.ts`

## Environment

Requires `.env.local` with Firebase config keys (`NEXT_PUBLIC_FIREBASE_*`). These are client-side keys per Firebase's security model.
