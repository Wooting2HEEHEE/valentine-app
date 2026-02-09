# Private Valentine App (Next.js 14)

A **private, password-protected** Valentine’s Day experience.

## Security model (important)

- The entire app is protected by `middleware.ts`.
- Only `/login`, `/api/login`, `/api/logout`, and Next internals are public.
- Authentication is a server-only bcrypt check.
- Session is stored in an **HTTP-only cookie**.
- **No media is served from `/public/images` or `/public/videos`.**
  - Put private media in `private-media/` (ignored by git).
  - Media is served via the authenticated route: `/media/...`.

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Create your password hash

```bash
node generate-hash.js "your password here"
```

Copy the output hash.

### 3) Create `.env.local`

Create a file named `.env.local` in the project root:

```bash
PASSWORD_HASH=your_bcrypt_hash_here
```

### 4) Run the app

```bash
npm run dev
```

Open:

- `http://localhost:3000/login`

## Adding private photos/videos (kept out of git)

1. Create folders:

- `private-media/images`
- `private-media/videos`

2. Put files in there.

3. Access them through:

- Images: `http://localhost:3000/media/images/your-file.jpg`
- Videos: `http://localhost:3000/media/videos/your-file.mp4`

Because `/media/*` is protected by middleware + cookie checks, the files are not accessible unless logged in.

## Deploy to Vercel

1. Push the repo to GitHub (safe: no secrets/media).
2. Create a Vercel project.
3. Add the env var:

- `PASSWORD_HASH` = your bcrypt hash

4. Deploy.
