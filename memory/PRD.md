# Shri Puri Jagannath Religious and Charitable Trust — PRD

## Original Problem Statement
A devotional/editorial website for the Trust of Managing Trustee — covering the Puri Jagannath temple (history, kshetra puranam, rituals, kings, bhaktas, miracles), Jayadeva's Gita Govinda, Adi Shankara's Jagannathastakam, Ratha Yatra, the Gaudiya Vaishnava tradition (Chaitanya, Nityananda, Rupa & Sanatana Goswami), the three Vedantas (Advaita/Vishishtadvaita/Dvaita), Pancharatra/Vaikhanasa Agamas, biographies of Ramanuja & Vedanta Desika and the 12 Azhwars, and a Nityanushtanam handbook (Sandhyavandanam, Yajnopavita, Tarpanam, Sraddham). The site must be **Awwwards-worthy** — kinetic hero, masked line reveals, editorial marquee, Lenis smooth scroll, framer-motion micro-interactions. Plus a **Gallery** (4 categories, lightbox) and an **Admin panel** to upload photos.

## Architecture
- **Backend:** FastAPI + Motor (Mongo async), JWT httpOnly cookie auth, bcrypt password hashing, admin-seeded on startup, 16 gallery photos seeded on empty DB.
- **Frontend:** React 19 + React Router 7 + Tailwind + Framer Motion 11 + Lenis + react-fast-marquee + Sonner. Editorial Dark Mode aesthetic (Cormorant Garamond + Outfit + Noto Serif Devanagari on stone-950).
- **Data:** MongoDB collections — `users` (single admin), `photos` (id, caption, category, image_data as base64 or url, created_at), `contact_messages`, `login_attempts` (reserved).

## Personas
- **Managing Trustee (Admin):** logs in, uploads photos, tags category, deletes obsolete photos.
- **Devotee / Pilgrim (Public):** reads content, browses gallery + lightbox, writes to the Trust.

## What's Implemented (2025-12)
- 11 public pages: Home, Temple, Ratha Yatra, Gita Govinda, Jagannathastakam, Gaudiya, Vedanta (Sampradaya), Acharyas, Nityanushtanam, Gallery, Contact.
- Award-worthy home: masked line-by-line hero reveal, parallax hero image (Ken Burns via useTransform), sanskrit sloka in top-right, editorial marquee (Sanskrit + Jai Jagannātha), six numbered manifesto chapters, three feature blocks (Gita Govinda, Ratha Yatra, Acharyas), a 4-cell handbook grid, cinematic Ashtakam quote block, CTA.
- Gallery: 4 categories (rath-yatra, daily-darshan, charitable-activities, festivals), tab filter, masonry-ish grid, framer-motion staggered reveal, keyboard-navigable lightbox (esc / ← / →).
- Admin: JWT cookie auth, /admin/login form, /admin dashboard with drag-in file input (base64 up to 5 MB), caption + category, live filter over existing photos, delete with confirm.
- Contact form (name/email/message) writes to `contact_messages`.
- SmoothScroll (Lenis) with reduced-motion opt-out.
- All interactive elements have `data-testid`.

## Backend Endpoints (all under /api)
- GET /              (health)
- POST /auth/login | POST /auth/logout | GET /auth/me
- GET /gallery/categories | GET /gallery?category=<slug> | POST /gallery (admin) | DELETE /gallery/{id} (admin)
- POST /contact

## Test Status
Iteration 1 · 100 % backend, 100 % frontend. Report: `/app/test_reports/iteration_1.json`.

## Backlog (P0/P1/P2)
- **P1** — Donation flow (Stripe / Razorpay) on Contact / Home.
- **P1** — Newsletter signup + Resend integration for Ratha Yatra announcements.
- **P1** — Downloadable PDFs of Sandhyavandanam & Ashtapadis.
- **P2** — Multi-lingual: Sanskrit + Tamil + Odia toggle on select pages.
- **P2** — Panchang / festival calendar widget.
- **P2** — AI-powered "Ask about Sanatana Dharma" chatbot (Claude/GPT via Emergent LLM Key).
- **P2** — Guest submissions for Gallery (with moderation queue).

## Credentials
See `/app/memory/test_credentials.md`.
