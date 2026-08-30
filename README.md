# Archivist Design Hub

Archiquest- Architecture & Interior Design Inspiration.
Please create a full UI/UX design for this website. Make sure to have design-focused pages. Make sure to use and iterate on the given images to create ui, the final site should be production-ready with functional implementation. It should include a minimum of 8 to 10 pages, including login/signup pages and authenticated pages like the dashboard. The focus should be on design while maintaining all mockup data. Add animations to the site, and please give a simple user flow in the response. Please use open-source images in here instead of generating images.

Design Ideas: Clean spatial aesthetic, building profile pages, floor plan viewer, architect portfolio showcase, style era filter tabs.

Project Description: A platform where architecture lovers explore iconic buildings, interior designs, and connect with architects worldwide.

Problem Statement:

Architecture enthusiasts, students, and clients often struggle to find a centralized, well-organized platform to discover iconic buildings, detailed interior designs, and floor plans across different eras. At the same time, architects lack a dedicated space to showcase comprehensive project portfolios- including spatial layouts and structural contexts- and directly network with a global audience of design lovers. Archiquest addresses this disconnect by providing an intuitive platform where users can easily explore architectural works through structured filters, analyze detailed floor plans, and directly connect with architects worldwide.

Ask me if you have any questions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/23f86549-d06d-4b3b-b459-e860027c40d6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

Building this out now. One call: I'm using a client-side mock auth (localStorage) so the login/dashboard flow works without a backend — tell me if you want real accounts via Lovable Cloud later.

I've laid the foundation for Archiquest but ran out of room before the build was complete — here's exactly where things stand.

Done

- Design system in `src/styles.css`: warm archival paper palette (cream `oklch` background, ink black, terracotta accent), Instrument Serif display + Archivo UI, sharp 4px radii, plus reusable `eyebrow`, `rule-label`, `link-underline`, `media-zoom`, `hairline-grid` utilities and fade-up/reveal/marquee keyframes.
- Mock content in `src/lib/data.ts`: 9 buildings (each with hero + gallery, story text, facts, materials, era, and a full room-by-room floor plan), 6 architects, 4 journal articles, 4 curated collections — all imagery from open-source Unsplash photography, no generated images.
- Client-side auth + saved-works store (`src/lib/auth.tsx`, localStorage).
- Components: `SiteHeader` (scroll-aware, session-driven sign-in/dashboard states, mobile menu), `SiteFooter`, `BuildingCard` (hover zoom, save toggle), `Reveal` (scroll-triggered animation), and `FloorPlanViewer` (SVG plan with zoom controls, room hover/selection, label + area toggles).
- Routes: `__root.tsx` (fonts, SEO metadata, header/footer shell) and the home page (hero with search, era filter tabs, collections strip, architects, journal teaser).

Remaining (the current type errors are simply the not-yet-created routes):
`buildings.$slug.tsx` (profile + floor plan viewer), `architects.index.tsx`, `architects.$slug.tsx` (portfolio showcase), `journal.index.tsx`, `journal.$slug.tsx`, `about.tsx`, `login.tsx`, `signup.tsx`, and the gated `_authenticated.tsx` layout with `dashboard`, `saved`, and `submit` pages. `buildings.index.tsx` is already written.

User flow

1. Land on `/` → search or pick a style-era tab → 2. `/buildings` to filter by era, material, sort and density → 3. open a building profile to read the story and study its floor plan → 4. jump to the architect's portfolio from the credit line → 5. save works with the heart icon (prompts `/login` or `/signup` when signed out) → 6. after auth, land on `/dashboard` to see saved works, followed architects and reading history → 7. architects use `/submit` to add a work; everyone browses `/journal` and `/about`.

Say "continue" and I'll finish the remaining nine route files.
