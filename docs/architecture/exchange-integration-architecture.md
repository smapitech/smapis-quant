# Exchange Integration Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Program:** Smapis Quant Program  
**Status:** Reference architecture blueprint  
**Date:** 2026-07-11

## Exchange Integration Overview

The exchange layer should be a secure, adapter-based gateway that abstracts all supported exchanges behind one unified contract. It must support centralized exchanges now and remain extensible enough for 100+ venues and future DEX integrations later.

Primary goals:
- Normalize market data
- Validate credentials securely
- Monitor exchange health
- Respect rate limits
- Support real-time feeds later
- Remain execution-safe and audit-heavy

## Architecture Diagram

```text
Scheduler / Admin / API
    -> Exchange Registry
    -> Credential Manager
    -> Rate Limit Manager
    -> Exchange Gateway Orchestrator
    -> Exchange Adapter
        -> External Exchange API / WebSocket
    -> Normalizers / DTOs
    -> Market Data Collector
    -> Health Monitor
    -> Scanner Engine / Opportunity Engine
    -> Event Bus
    -> WebSocket Broadcaster
    -> Audit Logs / Alerts / Health Logs
```

## Module Responsibilities

- Exchange Registry
  - Stores supported exchanges, capability flags, and status metadata.
- Exchange Gateway Orchestrator
  - Coordinates registry, credentials, rate limits, and adapter calls.
- Exchange Adapter Layer
  - Vendor-specific implementations behind a unified contract.
- Credential Manager
  - Encrypts, validates, masks, rotates, and revokes credentials.
- Health Monitor
  - Tracks latency, errors, maintenance, and WS state.
- Market Data Collector
  - Fetches and normalizes ticker and order book snapshots.
- Rate Limit Manager
  - Budgets requests, throttles queues, and prevents API abuse.
- Event Bus
  - Emits exchange events to listeners, projections, and broadcasts.
- Plugin Loader
  - Allows new exchange integrations without core rewrites.

## Laravel Folder Structure

```text
app/
  Domain/
    Exchanges/
      Contracts/
      ValueObjects/
      DTOs/
      Services/
      Events/
      Exceptions/
      Policies/
      Support/
  Application/
    Exchanges/
      Actions/
      Jobs/
      Listeners/
      Queries/
      DTOs/
  Infrastructure/
    Exchanges/
      Adapters/
      Clients/
      Normalizers/
      CredentialVault/
      RateLimiting/
      HealthMonitoring/
      Broadcasting/
      Factories/
  Http/
    Controllers/
      Api/V1/
      Web/
    Requests/
    Resources/
    Middleware/
  Providers/
  Support/
config/
  exchanges.php
  exchange-ratelimits.php
  broadcast.php
```

## Adapter Contract Design

Core capabilities:
- fetchTicker
- fetchOrderBook
- fetchMarkets
- fetchBalance
- fetchFees
- fetchDepositWithdrawStatus
- ping
- fetchHealth
- supportsWebSocket
- supportsSandbox
- supportsTrading

Future execution capabilities:
- placeOrder
- cancelOrder
- fetchOrderStatus
- fetchOpenOrders
- fetchTradeHistory

Guidelines:
- Return normalized DTOs only.
- Unsupported actions should fail explicitly.
- Adapters should receive a context object with tenant, credential, and correlation metadata.

## Credential Security Model

Rules:
- Encrypt API keys and secrets at rest.
- Never log raw keys.
- Show only masked values.
- Keep fingerprint and validation state, not secrets, in application state.
- Audit every create, validate, rotate, revoke, and delete action.
- Admins must never view raw secrets.
- Secure deletion must revoke at the exchange and clear local encrypted data.

Permission checks:
- Read permission
- Trade permission
- Withdrawal permission
- IP restriction status
- Expiry status
- Sandbox/testnet status

If withdrawal permission is enabled, mark the credential as HIGH RISK.

## Market Data Flow

1. Scheduler triggers exchange scanning job.
2. Job selects active exchanges.
3. Rate Limit Manager checks capacity.
4. Exchange Adapter fetches ticker and order book.
5. Data is normalized into a common format.
6. Market Scanner consumes the normalized feed.
7. Opportunities are created or updated.
8. WebSocket broadcasts are emitted.
9. Audit and health logs are written.

## Normalized DTOs

- ExchangeTickerData
- ExchangeOrderBookData
- ExchangeBalanceData
- ExchangeFeeData
- ExchangeMarketData
- ExchangeHealthData
- ExchangeCredentialStatusData

Each DTO should define:
- Purpose
- Required fields
- Optional fields
- Example structure

## Error Handling

Handle:
- Invalid API keys
- Expired API keys
- Permission denied
- Rate limit exceeded
- Exchange maintenance
- Market pair unavailable
- WebSocket disconnected
- Network timeout
- Invalid response format
- Partial data response
- Exchange-specific API changes

For each error define:
- Severity
- Retry policy
- User visibility
- Audit logging rule

## Retry and Circuit Breaker Strategy

Use:
- Immediate retry for transient failures
- Exponential backoff for recoverable errors
- Circuit breaker for repeated failures
- Temporary adapter suspension when needed
- Admin alerts for repeated failure patterns

If an adapter fails repeatedly:
- Stop requests temporarily
- Mark health degraded
- Notify the scanner
- Block execution on that exchange
- Continue health monitoring
- Restore when stable

## WebSocket Strategy

Future WS coverage:
- Ticker streams
- Order book streams
- Trade streams later
- Heartbeats
- Reconnection with backoff
- Frontend broadcast normalization

## CCXT vs Native SDK Recommendation

- Phase 1: CCXT-style abstraction or CCXT where suitable
- Phase 2: Native adapters for high-priority exchanges
- Phase 3: Hybrid adapter system

Recommendation:
- Use CCXT-style abstraction first for speed.
- Introduce native adapters for important venues later.
- Keep the contract stable so the implementation can change without breaking the app.

## Phased Implementation Plan

1. Exchange registry + mock adapters
2. Public market data only
3. User API key connection and validation
4. Balances and fees
5. Order book and liquidity depth
6. Paper trading integration
7. Manual execution
8. Auto execution with strict risk controls

## Security Risks and Mitigations

- Secret leakage: encrypt, redact, and audit.
- Withdrawal abuse: default to no withdrawal permission and warn strongly when enabled.
- Rate-limit abuse: token budgets and circuit breakers.
- API drift: quarantine broken adapters quickly.
- Cross-tenant leakage: tenant-scoped credentials, events, and logs.
- Plugin risk: signed manifests and capability whitelisting.

