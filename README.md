# APS — Expert Level Cybersecurity Dashboard

A production-grade B2B SaaS security scanning dashboard built from scratch with Next.js App Router, TypeScript, and Tailwind CSS. No external UI kits, no dashboard templates — every component hand-crafted.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + CSS custom properties for theming
- **Font**: Inter via `next/font/google`
- **State**: React hooks only (`useState`, `useMemo`, `useEffect`, `useContext`)
- **Routing**: Next.js App Router with file-based routes

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or you can also use 
npx next dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/login`.

## Screens

| Route | Description |
|---|---|
| `/login` | Sign-up page with split layout, form validation, social buttons |
| `/signup` | Sign-up page with split layout, form validation, social buttons |
| `/dashboard` | Scan list with severity stats, search/filter, new scan |
| `/scan` | Active scan detail with live console, findings, step tracker (no route params handled by custon builded hook) |

## Architecture

The project follows a clean separation of concerns:

- **`app/`** — Next.js App Router pages (thin shells that compose layout + feature components)
- **`components/ui/`** — Pure reusable primitives: Button, Input, Badge, Modal, Toast, ProgressBar, CircularProgress, StepTracker, StatusChip
- **`components/layout/`** — DashboardLayout, TopBar (breadcrumbs + theme toggle)
- **`components/sidebar/`** — Collapsible navigation sidebar with active state
- **`components/dashboard/`** — TopStatsCard, DashboardMetaBar, ScanTable, FilterModal
- **`components/scan/`** — LiveConsole (with log highlighting), FindingLog, ScanStatusBar
- **`context/`** — ThemeContext (dark/light mode with localStorage persistence)
- **`lib/`** — mock-data.ts (realistic scan data), utils.ts (helpers, cn, severity/status color maps)

## Folder Structure

```
.github/
  workflows/pages.yml     # GitHub Pages deployment workflow

app/
  login/page.tsx          # Sign-up screen
  signup/page.tsx         # Signup screen
  dashboard/page.tsx      # Scan list dashboard
  scan/page.tsx           # Active scan detail (no route params)
  layout.tsx              # Root layout (Inter font, ThemeProvider, ToastProvider)
  globals.css             # CSS variables design system + animations

components/
  ui/                     # Button, Input, PasswordInput, Badge, VulnBadges,
  │                       # StatusChip, ProgressBar, CircularProgress,
  │                       # StepTracker, Modal, Toast
  layout/                 # DashboardLayout, TopBar
  sidebar/                # Sidebar (with mobile hamburger + overlay)
  dashboard/              # TopStatsCard, DashboardMetaBar, ScanTable, FilterModal
  scan/                   # LiveConsole, FindingLog, ScanStatusBar

context/
  theme-context.tsx       # ThemeContext + ThemeProvider

lib/
  mock-data.ts            # 12 scans, scan detail, console logs, findings
  hooks/useSelectedScan.ts # Selected scan id storage + scan detail resolver
  utils.ts                # cn(), severity/status helpers, debounce

constants/                # App constants (labels, enums, config)
types/                    # Shared TypeScript types
```

## Theme Implementation

The entire color system lives in `globals.css` as CSS custom properties under `:root` (light) and `.dark` (dark). Switching themes just toggles the `.dark` class on `<html>`:

```css
:root {
  --bg-primary: #F5F5F5;
  --bg-card: #FFFFFF;
  --accent: #0CC8A8;
  --severity-critical: #EF4444;
  /* ... */
}

.dark {
  --bg-primary: #0F0F0F;
  --bg-card: #1E1E1E;
  /* ... */
}
```

`ThemeContext` reads from `localStorage` on mount, applies the class immediately (no flash), and exposes `toggleTheme()`. The toggle button lives in the TopBar on every authenticated screen.

## Mock Data

`lib/mock-data.ts` contains:
- **12 scan entries** across Greybox/Blackbox types, with Completed/Scheduled/Failed/Running statuses and realistic vulnerability distributions
- **Scan detail** with full step tracker state, 11 timestamped console log entries, 3 verification loops, and 6 findings across all severity levels
- **Dashboard stats** for the meta bar (org, owner, counts) and severity summary cards

All data is typed with exported TypeScript interfaces (`ScanEntry`, `ScanDetail`, `Finding`, `ConsoleLogEntry`, etc.).

## Key Interactions

- **Search** filters the scan table live by name, type, or target
- **Filter modal** filters by status and scan type with visual checkboxes
- **New Scan** button prepends a mock running scan to the table with a toast
- **Row click** stores the clicked scan id in `localStorage` and navigates to `/scan`
- **Export Report** triggers a toast notification
- **Stop Scan** shows a confirmation modal, then toasts on confirm
- **Theme toggle** (top-right) switches dark/light instantly and persists

## Known Limitations

- No real backend — all data is mock.
- Scan detail uses a selected scan id stored client-side (see `lib/hooks/useSelectedScan.ts`). It maps the selected `ScanEntry` onto a `ScanDetail` template.
- The live console doesn't actually stream; it renders the full log on mount. A real implementation would use Server-Sent Events or WebSocket.
- Pagination on the scan table is decorative (prev/next buttons exist but don't paginate since all data fits on one page with the mock set).
- Social login buttons (Apple, Google, Meta) on the signup page are UI-only with no OAuth flow.

## Deployment

### GitHub Pages

This project is configured for GitHub Pages via **static export**.

- Push to the `main` branch.
- In GitHub: `Settings` -> `Pages` -> **Source: GitHub Actions**.
- The workflow at `.github/workflows/pages.yml` builds and deploys the `out/` directory.

The site will be available at:

`https://<your-username>.github.io/<your-repo>/`

### Local build verification

```bash
npm run build
```

This produces an `out/` folder (static site output).

### Vercel (optional)

If you want a server-backed deployment, you can still deploy to Vercel, but GitHub Pages is static-only.
