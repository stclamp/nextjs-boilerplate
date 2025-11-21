# Next.js Authentication Boilerplate

A production-ready Next.js boilerplate with custom backend authentication, refresh token logic, and multi-language support.

## Features

- ✅ **Next.js 16** with App Router
- ✅ **NextAuth.js v5** for authentication
- ✅ **Custom Backend Integration** with JWT access/refresh tokens
- ✅ **Automatic Token Refresh** with session management
- ✅ **Multi-language Support** (English, Ukrainian) via next-intl
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Form Validation** with React Hook Form & Zod
- ✅ **Protected Routes** with middleware
- ✅ **Localized Error Pages** (404, error boundaries)

## Tech Stack

- **Framework**: Next.js 16
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod
- **Internationalization**: next-intl
- **HTTP Client**: Axios
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see configuration below)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stclamp/nextjs-boilerplate.git
cd nextjs-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# NextAuth Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-secret-key-here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── (auth)/           # Auth pages (login, register)
│   │   ├── dashboard/        # Protected dashboard
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Locale layout with i18n provider
│   │   ├── not-found.tsx     # Localized 404 page
│   │   └── error.tsx         # Localized error page
│   ├── api/auth/[...nextauth]/ # NextAuth API routes
│   └── global-error.tsx      # Global error boundary
├── components/
│   ├── auth/                 # Authentication forms
│   └── ui/                   # Reusable UI components
├── i18n/
│   ├── routing.ts            # i18n routing configuration
│   └── request.ts            # Server-side i18n config
├── messages/
│   ├── en.json               # English translations
│   └── uk.json               # Ukrainian translations
├── types/
│   └── next-auth.d.ts        # NextAuth type extensions
├── auth.ts                   # NextAuth configuration
└── middleware.ts             # Route protection & i18n
```

## Authentication Flow

### Login Process
1. User submits credentials via `LoginForm`
2. NextAuth calls custom backend `/user/login/` endpoint
3. Backend returns JWT access token, refresh token, and user data
4. Tokens are stored in JWT session
5. User is redirected to dashboard

### Token Refresh
- Access tokens are automatically refreshed when expired
- Refresh token is sent to `/user/refresh/` endpoint
- If refresh fails, user is redirected to login

### Protected Routes
- Middleware checks authentication status
- Public routes: `/`, `/login`, `/register`
- All other routes require authentication
- Redirects preserve locale (e.g., `/uk/dashboard` → `/uk/login`)

## Internationalization

### Supported Languages
- English (`en`)
- Ukrainian (`uk`)

### Usage

**In Client Components:**
```tsx
'use client';
import {useTranslations} from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyNamespace');
  return <h1>{t('title')}</h1>;
}
```

**In Server Components:**
```tsx
import {getTranslations} from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations('MyNamespace');
  return <h1>{t('title')}</h1>;
}
```

**Navigation:**
```tsx
import {Link} from '@/i18n/routing';

<Link href="/dashboard">Dashboard</Link>
```

### Adding New Languages
1. Create `messages/{locale}.json`
2. Add locale to `i18n/routing.ts`:
```ts
locales: ['en', 'uk', 'de'],
```

## Backend API Requirements

Your backend should implement these endpoints:

### POST `/user/login/`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "result": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "first_name": "John",
      ...
    },
    "access": "jwt-access-token",
    "refresh": "jwt-refresh-token"
  }
}
```

### POST `/user/signup/`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST `/user/refresh/`
**Request:**
```json
{
  "email": "user@example.com",
  "refresh": "jwt-refresh-token"
}
```

**Response:**
```json
{
  "result": {
    "access": "new-jwt-access-token",
    "refresh": "new-jwt-refresh-token"
  }
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |
| `AUTH_SECRET` | NextAuth secret key | Yes |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
