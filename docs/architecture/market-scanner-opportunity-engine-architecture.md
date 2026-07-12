# Market Scanner & Opportunity Engine Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Program:** Smapis Quant Program  
**Status:** Final approved architecture version  
**Date:** 2026-07-11

---

## 1. Market Scanner Overview

The Market Scanner is the high-throughput discovery layer for Smapis Quant OS.

Its job is to:
- Consume normalized market data from the Exchange Integration Layer.
- Compare canonical pairs across venues.
- Detect raw spreads, then progressively validate them.
- Produce opportunity candidates, not trade orders.
- Push only high-signal candidates into the Opportunity Engine and Risk Engine.
- Broadcast live scanner state to the UI.

Design stance:
- Stateless where possible.
- Queue-driven for scale.
- Rate-limit aware.
- Exchange-agnostic.
- Evidence-first, not price-gap-first.

---

## 2. Opportunity Engine Overview

The Opportunity Engine is the canonical ledger of arbitrage intelligence.

Its job is to:
- Create and merge opportunities.
- Track lifecycle transitions.
- Record snapshots and confidence changes.
- Prepare replay and future AI committee inputs.
- Maintain historical lineage for every meaningful market change.
- Expose read models for dashboard, scanner, replay, and alerts.

Design stance:
- Stateful aggregate.
- Append-only evidence trail.
- Duplicate-resistant.
- Replay-friendly.
- User-filterable at read time, not scan time.

---

## 3. Text-Based Architecture Diagram

```text
Scheduler / Queue Workers / WebSocket Feeds
        |
        v
Exchange Integration Layer
        |
        v
Market Scanner
  -> Pair Normalizer
  -> Gross Spread Detector
  -> Fee Estimator
  -> Liquidity Validator
  -> Slippage Estimator
  -> Health Gate
        |
        v
Opportunity Engine
  -> Deduper / Merger
  -> Lifecycle State Machine
  -> Snapshot Recorder
  -> Confidence Timeline Writer
  -> Replay Builder
        |
        +--> Risk Engine
        |
        +--> AI Committee later
        |
        +--> Alert Engine
        |
        +--> WebSocket Broadcaster
        |
        +--> Read Models / Projections
        |
        +--> Frontend Consumers
```

---

## 4. Full Data Flow

1. Exchange Layer receives ticker and order book data.
2. Scanner normalizes market symbols and pair mappings.
3. Scanner compares buy/sell routes across exchanges.
4. Gross spread is calculated using top-of-book and depth-aware prices.
5. Fee estimates are applied.
6. Liquidity depth is validated.
7. Slippage is estimated.
8. Exchange health is checked.
9. A candidate opportunity is created or updated.
10. Opportunity Engine stores a snapshot and current state.
11. Risk Engine validates or rejects the candidate.
12. Confidence Timeline records any material score change.
13. Frontend receives a compact WebSocket update.
14. Opportunity Replay stores all relevant historical movement.
15. Alert Engine evaluates user rules and fires notifications when needed.

---

## 5. Opportunity Lifecycle

The lifecycle is a strict state machine. Status describes **where the opportunity is**. Quality describes **how strong the evidence is**.

| State | Entered When | Exited When |
|---|---|---|
| `DETECTED` | Raw spread candidate is first discovered | Moves to `VALIDATING` or `EXPIRED` |
| `VALIDATING` | Fee, liquidity, and health checks are running | Moves to `RISK_CHECKING`, `FAILED`, or `EXPIRED` |
| `RISK_CHECKING` | Candidate passed base validation and is being reviewed by risk | Moves to `AI_REVIEW_PENDING` or `EXPIRED` |
| `AI_REVIEW_PENDING` | Risk approved and AI committee is next | Moves to `AI_APPROVED`, `AI_REJECTED`, or `EXPIRED` |
| `AI_APPROVED` | AI committee accepted the candidate | Moves to `PAPER_TRADE_READY`, `MANUAL_EXECUTION_READY`, or `AUTO_EXECUTION_READY` |
| `AI_REJECTED` | AI committee rejected the candidate | Moves to `REPLAY_AVAILABLE` or `ARCHIVED` |
| `PAPER_TRADE_READY` | Candidate is valid for simulation only | Moves to `EXECUTION_PENDING`, `EXPIRED`, or `ARCHIVED` |
| `MANUAL_EXECUTION_READY` | Human-approved live execution is allowed | Moves to `EXECUTION_PENDING`, `FAILED`, or `EXPIRED` |
| `AUTO_EXECUTION_READY` | Automation is allowed under strict policy | Moves to `EXECUTION_PENDING`, `FAILED`, or `EXPIRED` |
| `EXECUTION_PENDING` | Execution request submitted | Moves to `EXECUTED` or `FAILED` |
| `EXECUTED` | Trade completed successfully | Moves to `REPLAY_AVAILABLE` |
| `FAILED` | Pipeline or execution failed technically | Moves to `REPLAY_AVAILABLE` or `ARCHIVED` |
| `EXPIRED` | Market or policy conditions invalidated the opportunity | Moves to `REPLAY_AVAILABLE` |
| `REPLAY_AVAILABLE` | Historical replay is sealed and queryable | Moves to `ARCHIVED` |
| `ARCHIVED` | Cold storage or retention state | Terminal |

Notes:
- A risk rejection should usually end in `EXPIRED` with reason `RISK_REJECTED`.
- `FAILED` is reserved for technical or execution failures.
- `AI_REJECTED` remains explicit so the committee’s decision history is preserved.

---

## 6. Quality Level Model

Quality level is an analytical maturity scale. It can change up or down as the market changes. It is not the same as lifecycle status.

| Quality Level | Meaning |
|---|---|
| `RAW_SPREAD` | Top-of-book spread exists, but no validation yet |
| `CANDIDATE` | Pair match passed and basic filters are valid |
| `FEE_ADJUSTED` | Net remains positive after fees |
| `LIQUIDITY_VALIDATED` | Depth and fillability support the trade size |
| `RISK_VALIDATED` | Risk engine allows the candidate |
| `AI_VALIDATED` | AI committee supports the opportunity |
| `EXECUTION_READY` | All gating checks pass and execution can be authorized |

Difference between status and quality:
- Status tells you the lifecycle stage.
- Quality tells you the strength of the evidence.
- A candidate can be `AI_VALIDATED` but still `EXPIRED`.
- A live opportunity can be `EXECUTION_READY` while still `AI_REVIEW_PENDING` in a fallback mode, but that should generally be avoided.

---

## 7. Scanning Strategy

Recommended scanning modes:

| Mode | Purpose | Recommendation |
|---|---|---|
| Scheduled polling | MVP and deterministic scanning | Start here |
| Queue-based scanning | Parallel exchange jobs with rate-limit respect | Add next |
| WebSocket live scanning | Real-time tick/order book mode | Future high-performance mode |
| Hybrid scanning | WebSocket where available, polling fallback | Long-term target |

Recommended rollout:
- Phase 1: Scheduled polling only.
- Phase 2: Queue-based parallelism.
- Phase 3: Hybrid with websocket where supported.
- Phase 4: WebSocket-first for supported venues, polling as fallback.

Why this order:
- Polling is easiest to audit and reason about.
- Queue parallelism gives scale without losing control.
- Hybrid scanning adds performance without breaking reliability.

---

## 8. Pair Normalization Design

The scanner must normalize symbols before comparison.

Examples:
- `BTC/USDT`
- `BTC-USDT`
- `BTCUSDT`
- `XBT/USDT`

All should normalize to:
- `BTC/USDT`

Normalization rules:
- Use a canonical base asset and quote asset model.
- Keep exchange symbol separate from canonical symbol.
- Maintain an asset alias map, such as `XBT -> BTC`.
- Use exchange market metadata to disambiguate ambiguous symbols.
- Preserve network as transfer-route metadata, not pair metadata.
- Mark delisted, suspended, or inactive pairs as non-tradable.
- Keep stablecoin variants distinct by quote asset, even when similar.

Recommended normalized record fields:
- Canonical symbol
- Exchange symbol
- Exchange code
- Base asset
- Quote asset
- Market type
- Network
- Status
- Tradability flag
- Source timestamp
- Alias source

---

## 9. Spread and Profit Calculation Design

Conceptual formulas:
- Buy price = best ask on the buy exchange.
- Sell price = best bid on the sell exchange.
- Gross spread = sell price - buy price.
- Gross spread % = gross spread / buy price * 100.
- Net profit = gross profit - fees - slippage - network costs.

Important design rule:
- Gross spread is only a first filter.
- Final usefulness must be depth-aware and fee-aware.
- The system should model the actual fill path, not just the top-of-book price.

Required calculation fields:
- Buy exchange
- Sell exchange
- Buy price
- Sell price
- Route fingerprint
- Gross spread absolute
- Gross spread percent
- Estimated gross profit
- Estimated fees
- Estimated slippage
- Network costs
- Net profit
- Net profit percent
- Confidence score
- Recommended size
- Max safe capital

---

## 10. Liquidity Validation Design

Liquidity validation must go beyond top-of-book.

Checks:
- Available ask depth on the buy exchange.
- Available bid depth on the sell exchange.
- Minimum trade size.
- Maximum safe trade size.
- Volume threshold.
- Order book depth score.
- Slippage estimate.
- Partial fill risk.

Outputs:
- Liquidity score
- Maximum safe capital
- Expected slippage
- Depth confidence
- Partial fill risk
- Fillability verdict

Recommended method:
- Simulate fills against multiple order book levels.
- Cap trade size at the lesser of buy-side depth and sell-side depth.
- Penalize books that are thin at the top but collapse at the next levels.
- Reduce liquidity score if volatility is high or spread is unstable.

---

## 11. Fee Calculation Design

Fee awareness must include both visible and hidden costs.

Include:
- Maker fee
- Taker fee
- Withdrawal fee
- Network gas fee
- Stablecoin conversion fee future
- Hidden spread cost
- Slippage cost
- Exchange-specific fee tier future

Outputs:
- Gross profit
- Total estimated fees
- Net profit
- Fee confidence

Design notes:
- Fee estimation should use the actual route and execution style.
- Taker fees should be assumed if immediate execution is required.
- Fee confidence should drop when tier data is missing or uncertain.
- Costs should be modeled per route, not globally.

---

## 12. Exchange Health Validation

The scanner must use exchange health as a hard gate or soft downgrade depending on severity.

Check:
- API latency
- Error rate
- WebSocket status
- Maintenance status
- Deposit status
- Withdrawal status
- Trading status
- Rate-limit status

Health effects:
- Maintenance or trading disabled should hard-reject the candidate.
- Elevated latency or warnings should downgrade quality and confidence.
- Deposit or withdrawal closure should reduce or block executable readiness.
- Stale health data should invalidate the candidate until refreshed.

Good practice:
- Maintain a health score and a health status.
- Health state should influence both scanner confidence and opportunity lifecycle.

---

## 13. Confidence Timeline Integration

Confidence Timeline should be an append-only event stream attached to each opportunity.

Each event should include:
- Timestamp
- Event type
- Previous confidence
- New confidence
- Reason
- Data source
- System module
- Severity
- User-visible explanation

Example confidence events:
- Opportunity detected
- Spread increased
- Spread decreased
- Liquidity confirmed
- Liquidity weakened
- Fee estimate updated
- Risk score changed
- AI committee approved later
- AI confidence increased
- AI confidence decreased
- Opportunity expired

Design rule:
- Current confidence is a projection of events, not a manually edited field.
- This makes the timeline explainable and replayable.

---

## 14. Opportunity Replay Integration

Replay support should be built from snapshots and state transitions.

Capture snapshots for:
- Prices
- Spread
- Order book depth
- Liquidity score
- Slippage estimate
- Fee estimate
- Risk score
- Future SQIS placeholder
- AI decision placeholder
- Exchange health
- Status changes
- Duration
- Expiry reason

Replay model should support:
- Timeline reconstruction
- State transition playback
- Market movement visualization
- Committee-ready historical context later
- Incident analysis and learning workflows

Recommended replay cadence:
- Capture on every material transition.
- Capture at a fixed interval while the opportunity is active.
- Store only meaningful deltas when possible to avoid excessive write volume.

---

## 15. Duplicate Detection

Duplicates should be avoided by using an opportunity fingerprint.

Suggested fingerprint dimensions:
- Canonical pair
- Buy exchange
- Sell exchange
- Network
- Arbitrage type
- Direction
- Time window

Rules:
- If the same fingerprint persists, update the active opportunity and append snapshots.
- If the route changes materially, create a new opportunity version or a new opportunity.
- If only the price drifts slightly, do not create a new record.
- Use a scan-window bucket so short-lived noise does not create object churn.

---

## 16. Expiry Rules

Expire an opportunity if:
- Spread falls below threshold.
- Liquidity disappears.
- Exchange becomes unhealthy.
- Pair becomes suspended.
- Deposit or withdrawal closes.
- Data becomes stale.
- Max active duration is exceeded.
- Risk engine rejects permanently.

On expiry:
- Mark `EXPIRED`.
- Store a final snapshot.
- Preserve the replay trail.
- Broadcast the update.
- Generate a replay summary later.
- Move to `REPLAY_AVAILABLE` when the replay artifact is ready.

---

## 17. User Filtering

Important design rule:
- Global scan first, user filtering second.

Why:
- It avoids duplicated scan work per tenant or user.
- It keeps the market intelligence canonical.
- It makes alerting and watchlists consistent.

User-specific filters:
- Connected exchanges
- Subscription plan
- Risk profile
- Minimum profit
- Minimum SQIS future
- Allowed countries
- Watchlist
- Preferred coins
- Hidden exchanges
- Trading mode
- Auto-trading eligibility

Recommended architecture:
- Scanner builds the global opportunity pool.
- A visibility or projection layer filters opportunities per tenant or user.
- Alerts are generated from user rules applied to the filtered projection, not the raw scan stream.

---

## 18. Alert Integration

Alert triggers:
- New high-quality opportunity
- SQIS above threshold future
- Net profit above threshold
- Watchlist pair detected
- Opportunity expiring
- Risk changed
- AI approved future
- Exchange issue detected

Channels:
- In-app
- Email
- Telegram future
- WhatsApp future
- Mobile push future

Alert design notes:
- Alerts must be deduped and cooled down.
- Alert severity should follow opportunity severity.
- Watchlist and high-priority rules should bypass normal digest batching.
- Avoid over-alerting by grouping repeated updates on the same fingerprint.

---

## 19. WebSocket Events

| Event | Purpose | Payload Summary | Frontend Consumers |
|---|---|---|---|
| `OpportunityDetected` | Notify that a new candidate exists | Opportunity ID, pair, route, initial spread, initial confidence | Scanner page, dashboard |
| `OpportunityUpdated` | Push material changes | Price change, spread delta, liquidity delta, score delta | Scanner page, opportunity detail |
| `OpportunityExpired` | Inform that an opportunity is no longer valid | Expiry reason, final snapshot, timestamps | Scanner page, replay, alerts |
| `OpportunityRiskChanged` | Report risk movement | Old risk, new risk, reason, health context | Risk center, opportunity detail |
| `OpportunityConfidenceChanged` | Report confidence score movement | Previous confidence, new confidence, reason | Opportunity detail, AI center |
| `OpportunityReplayReady` | Notify that replay data is sealed | Replay ID, duration, archived status | Opportunity detail, replay UI |
| `ScannerStatusUpdated` | Report scanner state | Scan mode, queue depth, exchange health | Dashboard, scanner page |
| `MarketPulseUpdated` | Broadcast market summary | Market health, opportunity count, top route, recommendation | Dashboard, scanner overview |

Event payload rule:
- Keep them compact.
- Include only what the UI needs.
- Do not broadcast raw vendor payloads.

---

## 20. Queue / Job Architecture

| Job | Role | Depends On | Output |
|---|---|---|---|
| `ScanExchangeMarketDataJob` | Fetch raw exchange data | Exchange registry, rate limits | Raw market payload |
| `NormalizeMarketDataJob` | Canonicalize symbols and payloads | Raw market payload | Normalized market data |
| `DetectArbitrageOpportunitiesJob` | Compare routes and build candidates | Normalized market data | Candidate opportunity set |
| `ValidateOpportunityLiquidityJob` | Check depth and fillability | Candidate opportunity | Liquidity metrics and verdict |
| `EstimateOpportunityFeesJob` | Calculate expected costs | Candidate opportunity, fee schedule | Fee metrics and net estimate |
| `UpdateOpportunitySnapshotJob` | Persist opportunity state and snapshot | Validated candidate | Opportunity record and snapshot |
| `ExpireStaleOpportunitiesJob` | Close invalid or stale opportunities | Active opportunity pool | Expiry transitions |
| `BroadcastOpportunityUpdateJob` | Push UI updates | Snapshot or state transition | WebSocket event |
| `GenerateMarketPulseJob` | Build market summary projection | Active opportunity set | Market pulse snapshot |
| `TriggerOpportunityAlertsJob` | Evaluate alert rules | Opportunity event, user rules | In-app or email alerts |

Recommended sequence:
- Scan and normalize first.
- Detect candidates second.
- Validate liquidity and fees third.
- Persist the snapshot fourth.
- Expire stale data continuously.
- Broadcast and alert after persistence commits.

Queue discipline:
- Use idempotent jobs.
- Use correlation IDs and opportunity fingerprints.
- Separate high-priority scanner jobs from lower-priority projections and alerts.
- Use retries only for safe operations.

---

## 21. Market Pulse Support

Market Pulse is a read-model summary built from scanner outputs.

Summarize:
- Current market health
- Number of opportunities
- High-quality opportunities
- Average spread
- Average SQIS future
- Top pair
- Top exchange route
- Risk level
- Recommendation

Design rule:
- Market Pulse should not be computed directly in the frontend.
- It should be projected on the backend and broadcast as a compact summary.
- It can refresh on a schedule, after scan batches, or after major state changes.

---

## 22. Performance Strategy

Performance priorities:
- Batch processing over per-row processing.
- Cache latest tickers and book summaries in Redis.
- Keep hot data in memory or cache and write only material changes.
- Apply user-specific filtering after the global scan, not before.
- Avoid unnecessary database writes for tiny price noise.
- Partition future storage by exchange, symbol group, or time bucket.
- Compress historical snapshots in later phases.
- Throttle WebSocket broadcasts to meaningful deltas.
- Respect exchange rate limits aggressively.
- Use queue concurrency per exchange and per job type.

Important optimization:
- The scanner should ingest broadly, but persistence should be selective.
- Only store snapshots when a change is material enough to affect confidence, risk, or replay.

---

## 23. Laravel Folder Structure

Recommended structure:

```text
app/
  Domain/
    Scanner/
      Services/
      Actions/
      Jobs/
      Events/
      Listeners/
      DTOs/
      Enums/
      Exceptions/
      Support/
    Opportunities/
      Services/
      Actions/
      Jobs/
      Events/
      Listeners/
      DTOs/
      Enums/
      Policies/
      Support/
  Application/
    Scanner/
      Actions/
      Queries/
      Jobs/
      DTOs/
    Opportunities/
      Actions/
      Queries/
      Jobs/
      DTOs/
  Infrastructure/
    Scanner/
      Repositories/
      Projections/
      Broadcasting/
      Cache/
    Opportunities/
      Repositories/
      Projections/
      Broadcasting/
      Cache/
```

Folder explanations:
- `Domain/Scanner/Services`: pure scanner logic such as spread comparison, depth scoring, and normalization rules.
- `Domain/Scanner/Actions`: orchestrated scanner use cases.
- `Domain/Scanner/Jobs`: queued scanner work units.
- `Domain/Scanner/Events`: immutable facts like data refresh and candidate creation.
- `Domain/Scanner/Listeners`: side effects such as alerts, broadcasts, and projections.
- `Domain/Scanner/DTOs`: canonical payload shapes for scan output.
- `Domain/Scanner/Enums`: scanner mode, error type, and scan state enums.
- `Domain/Scanner/Exceptions`: scanner-specific failures.
- `Domain/Scanner/Support`: pair normalization helpers, scoring calculators, registry helpers.

- `Domain/Opportunities/Services`: lifecycle, deduplication, scoring, replay, and confidence logic.
- `Domain/Opportunities/Actions`: opportunity create/update/expire workflows.
- `Domain/Opportunities/Jobs`: snapshotting, replay preparation, alert dispatch, and expiry jobs.
- `Domain/Opportunities/Events`: opportunity state transitions and confidence events.
- `Domain/Opportunities/Listeners`: projection, broadcast, and alert listeners.
- `Domain/Opportunities/DTOs`: opportunity snapshot and replay payload shapes.
- `Domain/Opportunities/Enums`: statuses, quality levels, expiry reasons.
- `Domain/Opportunities/Policies`: user-specific access and visibility rules.
- `Domain/Opportunities/Support`: fingerprinting, merging, snapshot compression helpers.

- `Application/Scanner`: use-case orchestration, query handlers, and job coordination.
- `Application/Opportunities`: orchestration for lifecycle transitions, snapshots, and replay prep.
- `Infrastructure/Scanner`: persistence adapters, broadcast adapters, cache/projection wiring.
- `Infrastructure/Opportunities`: persistence adapters, replay storage, read models.

---

## 24. Conceptual Enums

| Enum | Conceptual Values | Purpose |
|---|---|---|
| `OpportunityStatus` | DETECTED, VALIDATING, RISK_CHECKING, AI_REVIEW_PENDING, AI_APPROVED, AI_REJECTED, PAPER_TRADE_READY, MANUAL_EXECUTION_READY, AUTO_EXECUTION_READY, EXECUTION_PENDING, EXECUTED, FAILED, EXPIRED, REPLAY_AVAILABLE, ARCHIVED | Lifecycle state |
| `OpportunityQualityLevel` | RAW_SPREAD, CANDIDATE, FEE_ADJUSTED, LIQUIDITY_VALIDATED, RISK_VALIDATED, AI_VALIDATED, EXECUTION_READY | Evidence maturity |
| `ArbitrageType` | CROSS_EXCHANGE, TRIANGULAR, INTRA_EXCHANGE_FUTURE, NETWORK_ARBITRAGE_FUTURE | Opportunity classification |
| `RiskLevel` | LOW, MODERATE, HIGH, BLOCKED | Risk severity |
| `LiquidityLevel` | VERY_LOW, LOW, MEDIUM, HIGH, VERY_HIGH | Depth assessment |
| `ScannerMode` | POLLING, QUEUE_PARALLEL, WEBSOCKET_LIVE, HYBRID | Scan execution strategy |
| `ConfidenceEventType` | DETECTED, SPREAD_INCREASED, SPREAD_DECREASED, LIQUIDITY_CONFIRMED, LIQUIDITY_WEAKENED, FEE_UPDATED, RISK_CHANGED, AI_APPROVED, AI_DOWNGRADED, EXPIRED | Confidence change reason |
| `ExpiryReason` | SPREAD_TOO_LOW, LIQUIDITY_LOST, EXCHANGE_UNHEALTHY, PAIR_SUSPENDED, DEPOSIT_WITHDRAW_CLOSED, STALE_DATA, MAX_DURATION_REACHED, RISK_REJECTED, EXECUTED, MANUALLY_ARCHIVED | Why the opportunity ended |
| `AlertTriggerType` | HIGH_QUALITY_OPPORTUNITY, NET_PROFIT_THRESHOLD, SQIS_THRESHOLD_FUTURE, WATCHLIST_MATCH, EXPIRY_WARNING, RISK_CHANGED, AI_APPROVED_FUTURE, EXCHANGE_ISSUE | Alert rule trigger |

---

## 25. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| False arbitrage from stale data | Enforce freshness windows, health gating, and source timestamps |
| Low liquidity | Require depth validation and max safe capital caps |
| Suspended deposits or withdrawals | Hard gate executable readiness and downgrade confidence |
| High fees | Always compute net profit, not just spread |
| Exchange API delay | Health monitor, circuit breakers, stale-data rejection |
| Market volatility | Reduce confidence, shrink size, and revalidate before promotion |
| Duplicate opportunities | Fingerprint-based deduplication and snapshot merging |
| Over-alerting users | Cooldowns, dedupe windows, and alert grouping |
| Database overload | Store only material deltas, use projections, compress history later |
| WebSocket overload | Broadcast compact deltas, throttle noisy updates, batch events |

---

## 26. Phased Implementation Plan

| Phase | Scope |
|---|---|
| Phase 1 | Mock scanner + static opportunities |
| Phase 2 | Public ticker polling |
| Phase 3 | Order book-based validation |
| Phase 4 | Fee-aware net profit calculation |
| Phase 5 | Exchange health integration |
| Phase 6 | Confidence timeline |
| Phase 7 | Opportunity replay |
| Phase 8 | Risk engine integration |
| Phase 9 | AI committee integration |
| Phase 10 | WebSocket real-time scanner |

Recommended order:
- Build the scanner core first.
- Then add opportunity lifecycle and snapshots.
- Then add health, replay, and confidence.
- Then risk and AI.
- Then realtime broadcasting.

---

## 27. Next Recommended Module

**Risk Engine Integration Contract**

Why this next:
- The scanner should not promote candidates without a clear risk interface.
- Risk has capital-preservation authority.
- The scanner becomes much more useful once it can hand off clean candidate payloads to risk without ambiguity.

