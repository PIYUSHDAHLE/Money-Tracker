# Redux Auth (HeroUI + Tailwind) 

## Install

1. Create project folder and copy files into it (this repo structure)
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (Vite default). Login with one of the demo accounts:

- Admin: `admin` / `admin123` (role: admin)
- User: `user` / `user123` (role: user)

## Notes
- `src/services/authService.ts` is a mocked service that returns a fake JWT. Replace it with real API calls.
- `src/utils/localStorage.ts` saves the token + user into `localStorage` under the key `redux_auth_demo_v1`.
- `src/components/ProtectedRoute.tsx` enforces authentication and optional role-based access.
- UI uses HeroUI components (placeholder import `@heroui/react`). If not available, replace imports with your UI components or plain Tailwind markup.

## Next steps / Improvements
- Integrate a real backend (Node/Express, NestJS, etc.) to issue real signed JWTs.
- Add refresh-token support / token renewal.
- Protect API calls by attaching Authorization headers using axios interceptors.
- Add server-side RBAC checks for every protected API route.
```

---

If you'd like, I can:

- Convert this demo into a **full repo** and provide a downloadable zip.
- Replace the mocked auth service with **real axios calls** to your backend (you provide the endpoints).
- Translate the instructions to **Hindi**.

Open the canvas document above to copy any file. If you want the repo as a zip, say so and I'll generate it for you.
