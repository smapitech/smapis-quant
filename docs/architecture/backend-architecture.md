# Backend Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Status:** Reference architecture blueprint  
**Date:** 2026-07-11

## Backend Architecture Overview

The backend should be a modular Laravel 12 monolith with strict bounded contexts, queue-driven processing, and event-based projections. Laravel should remain the secure orchestration layer for auth, tenancy, policies, requests, queues, broadcasting, and the developer API surface.

Design priorities:
- Modular monolith first
- Clear domain boundaries
- Thin controllers
- Rich application services
- Explicit policies and tenant isolation
- Queue-driven background work
- API-first design
- Auditability and observability first

## Recommended Folder Structure

```text
app/
  Domain/
    Shared/
    Auth/
    Users/
    Organizations/
    Subscriptions/
    Exchanges/
    MarketData/
    Opportunities/
    AICommittee/
    ConfidenceTimeline/
    OpportunityReplay/
    DigitalTwin/
    RiskEngine/
    PaperTrading/
    LiveTrading/
    Portfolio/
    Alerts/
    Notifications/
    AuditLogs/
    FounderNotes/
    ADR/
    Admin/
    DeveloperAPI/
  Application/
    Shared/
    Auth/
    Users/
    Organizations/
    Subscriptions/
    Exchanges/
    MarketData/
    Opportunities/
    AICommittee/
    ConfidenceTimeline/
    OpportunityReplay/
    DigitalTwin/
    RiskEngine/
    PaperTrading/
    LiveTrading/
    Portfolio/
    Alerts/
    Notifications/
    AuditLogs/
    FounderNotes/
    ADR/
    Admin/
    DeveloperAPI/
  Infrastructure/
    Persistence/
    Queue/
    Broadcasting/
    Integrations/
    Observability/
    Cache/
    Files/
  Http/
    Controllers/
    Requests/
    Resources/
    Middleware/
  Policies/
  Providers/
  Support/
  Console/
routes/
  web.php
  api.php
  channels.php
  console.php
tests/
  Unit/
  Feature/
  Integration/
  Contract/
  Security/
```

## Service Layer Pattern

Recommended flow:
`Controller -> FormRequest -> Action -> Domain Service -> Repository/Adapter -> Event -> Listener -> Projection`

Guidelines:
- Controllers stay thin.
- Actions orchestrate use cases.
- Domain services hold business rules.
- Repositories are used where persistence is complex or aggregate-oriented.
- Infrastructure owns Eloquent, adapters, broadcasting, and persistence details.

## Middleware Strategy

Recommended middleware includes:
- Request ID
- Tenant resolution
- Authentication
- Membership check
- Subscription entitlement check
- MFA enforcement
- Feature flags
- Rate limiting
- Locale
- Audit context

Tenant resolution and authorization should occur before sensitive model access or side effects.

## API Versioning Strategy

- Web SPA can keep session auth.
- Public and partner APIs should live under `/api/v1`.
- Version by URL prefix for clarity.
- Separate web, admin, tenant, and developer routes.
- Standardize API resources and error shapes.

## Queue Architecture

Recommended queue lanes:
- critical-execution
- risk
- ai
- scanner
- notifications
- analytics
- audit
- backfill
- webhooks

Rules:
- High priority work must not be blocked by analytics or backfills.
- Jobs must be idempotent.
- Use retries, backoff, and dead-letter handling.
- Use a transactional outbox for sensitive transitions.

## WebSocket Event Broadcasting

Broadcast compact deltas, not raw provider payloads.

Use private channels for:
- User events
- Organization events
- Opportunity updates
- Portfolio updates
- Alert feeds
- Scanner status

## Logging Strategy

- Structured JSON logs in production
- Correlation IDs everywhere
- Tenant and user context in log metadata
- Separate audit logs from application logs
- Redact secrets and prompt content

## Error Handling Strategy

- Centralize exception mapping
- Use domain exceptions for business failures
- Avoid leaking sensitive provider details
- Return stable API error codes
- Keep diagnostics in logs and audit trails

## Testing Architecture

Testing layers:
- Unit tests for domain logic
- Feature tests for routes and workflows
- Integration tests for jobs and adapters
- Contract tests for external providers
- Security tests for tenancy and permissions

## Module Summary

The backend should cover:
- Auth
- Users
- Organizations
- Subscriptions
- Exchanges
- Market Data
- Opportunities
- AI Committee
- Confidence Timeline
- Opportunity Replay
- Digital Twin
- Risk Engine
- Paper Trading
- Live Trading
- Portfolio
- Alerts
- Notifications
- Audit Logs
- Founder Notes
- ADR
- Admin
- Developer API

Each module should define:
- Purpose
- Main services
- Main actions
- Events emitted
- Jobs required
- API responsibilities
- Security concerns
- Future expansion points

