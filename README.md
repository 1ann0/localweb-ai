# LocalWebAI

AI-powered website generator for local businesses. Upload a flyer, menu, or business card — or just describe your business — and get a professional, mobile-friendly website in seconds.

Built with Next.js 16, React 19, Firebase, and Tailwind CSS.

## Features

- **AI Website Generation** — Describe your business or upload a PDF/image to generate a complete website
- **Live Preview** — See your generated site in a browser-chrome preview with real-time updates
- **Template Sections** — Hero, Services, About, Contact Form, and Footer components
- **Save & Manage** — Save generated sites to your dashboard, view details, edit, or delete
- **Google OAuth** — Sign in with Google to save and manage your sites
- **Responsive Design** — Collapsible sidebar on mobile, fully responsive layout
- **Dark Glassmorphism Theme** — Modern dark UI with blur effects and gradient accents

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 3.4, CSS Modules
- **Auth:** Firebase Authentication (Google OAuth)
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage
- **Validation:** Zod
- **Icons:** Lucide React
- **Fonts:** Syne (display), Manrope (body)
- **Toasts:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication (Google provider) and Firestore enabled

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/1ann0/localweb-ai.git
   cd localweb-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. (Optional) For server-side auth verification, set:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   ```

5. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

6. Start the dev server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Commands

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts      # POST — generate site from prompt
│   │   └── parse-file/route.ts    # POST — generate site from file upload
│   ├── dashboard/page.tsx          # Saved sites dashboard
│   ├── site/[id]/page.tsx          # Site detail/preview page
│   ├── error.tsx                   # Global error boundary
│   ├── loading.tsx                 # Global loading skeleton
│   ├── not-found.tsx               # Custom 404 page
│   ├── layout.tsx                  # Root layout with metadata & Toaster
│   ├── page.tsx                    # Home (landing page / generator toggle)
│   ├── robots.ts                   # robots.txt generation
│   ├── sitemap.ts                  # sitemap.xml generation
│   └── globals.css                 # Theme, utilities, accessibility
├── components/
│   ├── generator/
│   │   ├── Generator.tsx           # Main generator UI (sidebar + preview)
│   │   └── templates/
│   │       ├── Hero.tsx            # Hero section template
│   │       ├── ServiceList.tsx     # Services grid template
│   │       ├── About.tsx           # About section template
│   │       ├── ContactForm.tsx     # Contact info + form template
│   │       └── Footer.tsx          # Footer template
│   └── LandingPage.tsx             # Marketing landing page
├── context/
│   └── AuthContext.tsx              # Firebase auth provider + session cookie
├── lib/
│   ├── auth-server.ts              # Firebase Admin token verification
│   ├── db.ts                       # Firestore CRUD (save, get, delete, update)
│   ├── env.ts                      # Zod environment variable validation
│   └── firebase.ts                 # Firebase client SDK initialization
├── types/
│   └── business.ts                 # BusinessData, Service, ContactInfo types
└── middleware.ts                    # Route protection for /dashboard
```

## Security

- **Firestore rules** enforce user-scoped access (users can only read/write their own sites)
- **API routes** require Firebase ID token authentication (`Authorization: Bearer <token>`)
- **Input validation** via Zod on all API endpoints (prompt length, file type, file size)
- **Security headers** configured in `next.config.ts` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- **Environment validation** at startup — missing Firebase config throws a clear error
- **No debug logging** — API keys are never logged to the console

## License

MIT
