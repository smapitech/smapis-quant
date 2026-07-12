# Frontend Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Status:** Reference architecture blueprint  
**Date:** 2026-07-11

## Frontend Architecture Overview

The frontend should remain a Vue 3 + TypeScript + Tailwind CSS SPA with Pinia state management and Vue Router. The current Laravel shell already fits this model, so there is no need to switch to Inertia for the present setup.

Design goals:
- Modular and feature-first
- Trading-terminal feel
- Strong code splitting
- Typed state and service boundaries
- WebSocket-ready data flow
- Reusable UI and trading components

## Folder Structure

```text
resources/js/
  app.ts
  bootstrap.ts
  router/
  layouts/
  pages/
  modules/
  components/
  stores/
  services/
  composables/
  types/
  data/
  mocks/
  constants/
  styles/
  utils/
```

Recommended boundaries:
- `pages/` are route entrypoints only.
- `modules/` hold domain-specific feature UI and orchestration.
- `components/` hold reusable primitives and shared widgets.
- `stores/` hold Pinia modules by domain.
- `services/` own API and realtime adapters.
- `data/` and `mocks/` hold static development datasets.

## Layout System

Main layouts:
- PublicLayout
- AuthLayout
- AppLayout
- AdminLayout
- MobileLayout future-ready

Layout behavior:
- Public pages should be clean and marketing-focused.
- Auth pages should be trust-first and conversion-friendly.
- App pages should be dense, real-time, and workspace-oriented.
- Admin pages should be high-density and operational.
- Mobile layout should support bottom navigation and sticky actions later.

## Component Hierarchy

Shared component groups:
- UI components
- Trading components
- AI components
- Chart components
- Layout components
- Form components
- Table components
- Modal components
- Notification components

Recommended structure:
- Layout shell
- Page container
- Feature sections
- Domain widgets
- Shared primitives

## Page Structure

Main modules:
- Public Website
- Authentication
- Dashboard
- Live Scanner
- Opportunity Detail
- AI Center
- Risk Center
- Paper Trading
- Auto Trading
- Portfolio
- Exchanges
- Wallets
- Analytics
- Alerts
- Academy
- Billing
- Settings
- Admin Panel

Pages should be thin route-level shells that compose module sections and store data.

## State Management Design

Pinia should be used for:
- Session and tenant context
- UI shell state
- Market metadata
- Scanner filters and results
- Opportunity detail and replay
- AI committee data
- Risk limits and vetoes
- Trading queues
- Portfolio snapshots
- Exchange connections
- Alerts and notifications
- Settings and preferences

Rules:
- Keep server-state-like collections normalized.
- Store only stable preferences persistently.
- Update stores from realtime events, not directly from components.
- Use computed selectors for derived values.

## API Integration Design

- Use a single typed API client abstraction.
- Keep browser SPA auth session-based by default.
- Add token-based clients later for mobile and developer surfaces.
- Keep request logic in service files, not in pages.
- Normalize responses through DTO mappers.
- Mock adapters should be available for local development.

## WebSocket Integration Design

- Use a provider-agnostic realtime client.
- Support tenant, user, portfolio, opportunity, scanner, and alert channels.
- Reconnect with backoff and heartbeats.
- Track connection health in a store.
- Broadcast compact deltas to the frontend.
- Fall back to polling when sockets are unavailable.

## Design System Rules

- Dark theme by default
- Charcoal and graphite surfaces
- Electric teal and emerald accents
- Amber for warnings
- Clean red for danger
- Mono font for money and numeric metrics
- Semantic design tokens for spacing, color, shadow, and motion
- Charts should use semantic colors, not decorative randomness

## Mobile Responsiveness Rules

- Desktop: workstation layout with persistent navigation
- Tablet: two-column compressed layout
- Mobile: single column, drawer navigation, bottom actions
- Tables should become cards or compact lists on mobile
- Keep the most important states visible
- Avoid hover-only interactions

## Accessibility Standards

- Semantic headings and landmarks
- Accessible labels for all inputs
- Keyboard navigation support
- Visible focus states
- Screen-reader-friendly live regions
- Chart summaries as text
- Color should never be the only signal

## Future Expansion Notes

- Keep `AdminLayout` and `MobileLayout` as first-class future shells.
- Route-level code splitting should be mandatory for heavy feature modules.
- Maintain clean service and store contracts so mobile apps can reuse them later.
- If SSR or a server-driven approach is ever needed, preserve the module boundaries and replace only the routing shell.
- The same system can later support white-label themes and plugin marketplaces.

