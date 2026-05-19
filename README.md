# Jose Manuel Porras — Portfolio

Personal portfolio site. Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-themes. Deployed on Vercel.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Editing content

All site copy lives in one typed file: [`src/lib/content.ts`](src/lib/content.ts). Update it and every section re-renders — no JSX edits needed.

To set the profile photo, drop a square image at `public/profile.jpg` (replaces the generated placeholder; no code change).

## Structure

- `src/app/` — App Router pages, layout, generated OG image / icons, robots, sitemap
- `src/components/` — section components + `ui/` primitives
- `src/lib/` — `content.ts` (source of truth) + `types.ts`
- `public/` — CV PDF, banner, project images
