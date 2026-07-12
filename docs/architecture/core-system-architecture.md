# Core System Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Program:** Smapis Quant Program  
**Status:** Reference architecture blueprint  
**Date:** 2026-07-11

## Architecture Overview

Recommended style:
- Modular monolith first
- Event-driven internally
- API-first externally
- Queue-driven for heavy work
- Security-first and capital-preservation-first
- Explainable AI by design

The platform should be structured so that Laravel handles secure orchestration, Vue handles presentation, background jobs handle heavy processing, and domain events drive real-time updates, projections, alerts, and audit trails.

## Main System Layers

1. Experience layer
   - Web SPA today
   - Mobile app later
   - Enterprise and partner surfaces later

2. Presentation and BFF layer
   - Laravel auth
   - Validation
   - Authorization
   - Response shaping
   - Session and token handling

3. Application layer
   - Use case orchestration
   - Command/query handlers
   - Workflow coordination

4. Domain layer
   - Bounded contexts
   - Policies
   - State machines
   - Value objects
   - Domain events

5. Infrastructure layer
   - Persistence
   - Queueing
   - Caching
   - Broadcasting
   - External adapters

6. Observability layer
   - Audit logs
   - Metrics
   - Alerts
   - Traces
   - Queue health

## Text Diagram

```text
Web / Mobile Clients
   -> Vue 3 SPA
   -> Laravel 12 BFF / API
      -> Authentication + Tenant Context + Billing Entitlements
      -> Application Services / Use Cases
      -> Domain Modules
           -> Identity
           -> Organizations
           -> Billing
           -> Exchanges
           -> Scanner
           -> Opportunities
           -> AI
           -> Risk
           -> Trading
           -> Paper Trading
           -> Portfolio
           -> Notifications
           -> Audit
           -> Analytics
           -> Admin
           -> Developer API
      -> Queue / Redis / Cache / Database
      -> WebSocket Broadcasting
      -> Exchange Adapters / AI Providers / Notification Providers
```

## Core Domain Principles

- Capital preservation before profit
- Risk can veto execution
- AI explains and recommends, it does not blindly execute
- Every state-changing action must be auditable
- Every tenant must be isolated
- Every live surface must be real-time ready

## Main Platform Modules

- Authentication
- User Management
- Organization and Team Management
- Subscription and Billing
- Exchange Manager
- Market Scanner
- Opportunity Engine
- AI Engine
- Risk Engine
- Trading Engine
- Paper Trading
- Portfolio Engine
- Notification Engine
- Audit Log Engine
- Analytics Engine
- Admin Panel
- Developer API
- Plugin System

## Multi-Tenant SaaS Design

- Tenant root object should be Organization or Workspace.
- Users can belong to multiple organizations through memberships.
- Every business record must be tenant-scoped.
- Tenant context must be present in request handling, jobs, events, and broadcasts.
- Enterprise isolation can later be upgraded to dedicated infrastructure without changing the domain model.

## Environment Separation

- Local
  - Mock or sandbox providers
  - Fast refresh
  - Fake mail and notifications
  - Minimal setup overhead

- Staging
  - Production-like topology
  - Sandbox exchange keys
  - Full queue workers
  - Broadcast testing
  - Scrubbed data

- Production
  - Managed secrets
  - Autoscaled workers
  - Strong observability
  - Real-time broadcasting
  - Strict rate limits and backups

## Scaling Considerations

- Stateless app servers
- Separate queue lanes for critical and non-critical work
- Redis for cache and ephemeral market state
- Read models for dashboards and history
- Circuit breakers for unreliable providers
- Idempotent jobs for replay safety
- Projection-based analytics and reporting

## Future Microservice Separation Plan

Recommended extraction order:
1. Exchange Gateway
2. Notification Delivery
3. WebSocket Gateway
4. AI Engine if model complexity grows
5. Analytics if reporting load grows
6. Trading Execution once volume justifies it

Keep Auth, Tenant Context, Billing, and the core BFF monolith together for as long as possible.

