# Visual Redesign Changelog — RwandaBeyond Agri-Business

## Summary
Complete visual layer redesign implementing an earthy, harvest-inspired design system with rectangular shape language, replacing the previous mint-green SaaS aesthetic.

## Design Tokens
- **Primary (Forest/Crop Green):** #1F5130 | hover #173D24 | tint #E4EFE6
- **Secondary (Soil/Terracotta Brown):** #7A4A2B | tint #F1E6DC
- **Accent (Harvest Gold/Maize):** #E0A526 | tint #FBF1D6
- **Background (Cream/Grain):** #F7F4EC | Surface: #FFFFFF
- **Border:** #DDD6C6 | **Text:** #1E2A22 | **Muted:** #5F6B62
- **Semantic:** success #2E7D4F, warning #E0A526, danger #B3392F, info #2B6F8F
- **Dark mode:** Deep green-black #0F1A13 background
- **Radius:** --radius-sm: 4px, --radius-md: 6px, --radius-lg: 8px
- **Typography:** Sora (headings), Inter (body)

## Files Modified

### Theme & Tokens
- `Frontend/index.css` — Complete token system rewrite, component classes, dark mode

### UI Components
- `Frontend/components/ui/Button.tsx` — Rectangular (rounded-md), new color tokens, danger variant
- `Frontend/components/ui/Card.tsx` — 8px radius, new color tokens
- `Frontend/components/ui/Input.tsx` — 6px radius, new color tokens
- `Frontend/components/ui/Badge.tsx` — 4px radius, semantic color variants
- `Frontend/components/ui/Spinner.tsx` — Compact EmptyState with square icon
- `Frontend/components/ui/BrandLogo.tsx` — Rectangular mark, new colors
- `Frontend/components/ui/AlertCard.tsx` — New color tokens, square icon container
- `Frontend/components/ui/StatsCard.tsx` — New color tokens, square icon container
- `Frontend/components/ui/WeatherCard.tsx` — New color tokens, rectangular layout
- `Frontend/components/ui/FarmCard.tsx` — New color tokens, square status dots
- `Frontend/components/ui/SensorCard.tsx` — Color-coded left border, new tokens
- `Frontend/components/ui/MapboxMap.tsx` — New color tokens, square markers
- `Frontend/components/ui/ScheduleInsightsPanel.tsx` — New color tokens
- `Frontend/components/ui/DashboardHeader.tsx` — Rectangular search, square avatar, new colors
- `Frontend/components/ui/index.ts` — Updated barrel exports
- `Frontend/tailwind.config.js` — Updated to use hex-based CSS variables, new color tokens, Sora/Inter fonts

### Pages & Layouts
- `Frontend/components/LandingPage.tsx` — Full redesign: split hero, numbered steps, stats grid, testimonials
- `Frontend/components/Dashboard.tsx` — Sidebar with 3px left accent bar, square avatar, rectangular search
- `Frontend/components/ConnectedFarmerDashboard.tsx` — KPI cards, monitoring tiles, quick actions
- `Frontend/components/Features.tsx` — New color tokens, rectangular layout
- `Frontend/components/Footer.tsx` — 4-column grid, rectangular subscribe control
- `Frontend/components/Navbar.tsx` — Border and color updates
- `Frontend/components/VoiceAssistant.tsx` — Square mic button, square status dots

## Backend Files Modified
**None.** All changes are frontend-only. No API routes, data fetching, request/response shapes, auth, database, or environment config were touched.

## Verification
- No `rounded-full` classes remain in modified files
- No `border-radius: 50%` remains in modified files
- All old hex colors replaced with design tokens
- Responsive at 375px, tablet, and desktop breakpoints
- WCAG AA contrast maintained
- Visible focus states on all interactive elements
- 44px minimum tap targets preserved
- `prefers-reduced-motion` media query added
