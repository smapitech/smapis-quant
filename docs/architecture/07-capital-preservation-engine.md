# Module 7 - Capital Preservation Engine (CPE), Trading Guardrails & Safety Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Program:** Smapis Quant Program  
**Status:** Authoritative architecture blueprint  
**Date:** 2026-07-12

---

## 1. Executive Overview

The Capital Preservation Engine is the authoritative safety layer for Smapis Quant OS.

Its job is not to maximize trade frequency or aggressively pursue profit. Its job is to protect user capital, protect platform integrity, and ensure that every downstream trading action is bounded by deterministic safety policy.

This module sits after validated opportunity analysis and AI recommendation, but before paper trading eligibility, manual execution eligibility, or live execution eligibility.

It must be able to:
- approve
- reduce position size
- require manual approval
- restrict to paper trading
- pause a strategy
- pause an exchange
- pause a user account
- pause all live trading
- reject an opportunity
- trigger emergency protection

It must fail closed. If the module is uncertain, incomplete, unhealthy, or unable to compute safely, the default must be conservative.

---

## 2. Mission and Principles

### Mission
Protect user capital before pursuing profit.

### Core principles
1. Capital preservation before profit.
2. Deterministic guardrails before AI recommendations.
3. No AI agent may bypass hard safety rules.
4. Safety rules must fail closed.
5. Uncertainty must reduce permissions.
6. Automatic execution requires stricter limits than manual execution.
7. Paper trading precedes live automation.
8. User-configurable controls cannot weaken non-disableable system controls.
9. Every safety decision must be explainable.
10. Every rejected, reduced, paused, or stopped action must be auditable.
11. Position size must be constrained by the lowest safe limit.
12. Repeated operational failures must trigger automatic suspension.
13. Critical protection actions must not depend on generative AI.
14. Emergency controls must remain available even when other services fail.
15. Safety rules must be versioned, tested, monitored, and reversible.

---

## 3. Architecture Boundaries

The engine is split into layers so that deterministic controls cannot be overridden by AI, and safety decisions remain explainable and reversible.

| Component | Responsibility | Consumes | Produces |
|---|---|---|---|
| Risk Input Validator | Ensures the safety input is complete, fresh, and structurally valid | CapitalProtectionInput | Validated input or rejection |
| Safety Feature Builder | Normalizes raw inputs into safety features | Validated input | Safety feature set |
| Safety Score Engine | Computes execution-safety score from features | Safety features | SafetyScoreResult |
| Guardrail Policy Engine | Applies hard and soft rules in priority order | Safety score, features, policy config | Guardrail outcomes |
| Position and Exposure Limit Engine | Calculates permitted capital and exposure | Portfolio state, liquidity, committee output | Position limits |
| Daily Loss Control Engine | Enforces daily loss budgets and reset rules | PnL, budgets, thresholds | Loss control outcome |
| Portfolio Protection Engine | Protects portfolio concentration and reserves | Exposure and reserve data | Portfolio safety outcome |
| Exchange and Network Safety Engine | Validates venue and transfer-path health | Exchange status, network status | Exchange/network safety outcome |
| Execution Safety Gate | Final revalidation before any trade | All safety outputs | Eligibility result |
| Failure and Recovery Monitor | Tracks operational failures and recovery conditions | Execution and system telemetry | Failure state, recovery state |
| Circuit Breaker Manager | Temporarily suspends risky scopes after repeated failures | Failure monitor data | Breaker state |
| Kill Switch Manager | Performs emergency stop behavior | Emergency triggers, authorization context | Kill switch state |
| Trading Pause Manager | Applies scoped pause states | Guardrail outcomes, breaker states | Pause state |
| Profit Protection Engine | Preserves realized gains within policy | Profit, reserve, state | Profit-lock state |
| Stablecoin Reserve Manager | Enforces reserve policy and depeg risk rules | Balances, reserve policy | Reserve outcome |
| Safety Decision Explainer | Creates evidence-backed reasons | Safety decision, evidence graph | Explanation |
| Safety Audit and Governance Layer | Stores immutable decisions and policy changes | All safety outputs | Audit records |
| Safety Monitoring and Alerting Layer | Raises operational and risk alerts | Safety events and metrics | Alerts, dashboards |

Why separation matters:
- Hard safety checks must be deterministic and testable.
- Soft controls should be configurable without affecting hard gates.
- Position sizing must use the lowest binding safe limit.
- Emergency control paths must be independent of AI services.
- All high-impact decisions must be explainable and auditable.

---

## 4. Text-Based Architecture Diagram

```text
Opportunity Engine + AI Committee
    -> CapitalProtectionInput
    -> Risk Input Validator
    -> Safety Feature Builder
    -> Safety Score Engine
    -> Guardrail Policy Engine
    -> Position & Exposure Limit Engine
    -> Daily Loss Control Engine
    -> Portfolio Protection Engine
    -> Exchange & Network Safety Engine
    -> Execution Safety Gate
    -> Safety Decision
    -> Explainability Engine
    -> Audit / Alerts / WebSocket Broadcasts
    -> Paper Trading / Manual Execution / Live Execution Eligibility
    -> Failure & Recovery Monitor
    -> Circuit Breakers / Kill Switches / Trading Pauses
```

---

## 5. End-to-End Safety Flow

1. Opportunity passes Market Scanner validation.
2. AI Committee produces a structured recommendation.
3. Capital Preservation Engine receives opportunity data, SQIS, committee decision, portfolio status, exchange health, current limits, and execution history.
4. Risk Input Validator checks completeness and freshness.
5. Safety Feature Builder creates normalized risk features.
6. Safety Score Engine calculates a 0-100 Safety Score.
7. Guardrail Policy Engine checks hard and soft rules.
8. Position Limit Engine calculates maximum permitted exposure.
9. Daily Loss Engine checks loss budgets.
10. Portfolio Protection Engine checks concentration and reserves.
11. Execution Safety Gate determines trading eligibility.
12. Final safety decision is produced.
13. Decision is stored, explained, and broadcast.
14. Conditions are revalidated immediately before execution.
15. Ongoing execution is monitored.
16. Failures may activate circuit breaker, pause, or kill switch.

---

## 6. Risk Input Contract

### `CapitalProtectionInput`

This normalized DTO is the only accepted input shape for the safety engine.

#### Opportunity
- Opportunity ID
- Pair
- Arbitrage type
- Buy exchange
- Sell exchange
- Network
- Opportunity status
- Opportunity age
- Data freshness
- Expected lifespan

#### Financial
- Proposed trade size
- Gross expected profit
- Net expected profit
- Net profit percentage
- Estimated fees
- Estimated slippage
- Worst-case estimate
- Break-even threshold

#### Liquidity
- Buy-side depth
- Sell-side depth
- Maximum safe capital
- Partial-fill probability
- Order-book stability
- Liquidity confidence

#### AI intelligence
- SQIS
- SQIS confidence
- Committee decision
- Committee confidence
- Agent vetoes
- Debate status
- Recommended position size

#### Exchange safety
- API latency
- API error rate
- Trading status
- Deposit status
- Withdrawal status
- Maintenance state
- Rate-limit status
- WebSocket health
- Exchange health score

#### User and portfolio
- Available balance
- Stablecoin balance
- Total portfolio value
- Current open exposure
- Exposure by asset
- Exposure by exchange
- Exposure by strategy
- Daily realized profit/loss
- Daily unrealized profit/loss
- Consecutive losses
- Consecutive failed executions
- User risk profile
- Maximum trade size
- Daily loss limit
- Maximum portfolio exposure
- Stablecoin reserve requirement
- Trading mode

#### Operational
- Current system health
- Queue delay
- Worker health
- Database health
- WebSocket health
- Execution service status
- Time synchronization status

#### Security
- API permission status
- Withdrawal permission status
- Credential age
- Credential health
- Country restriction
- Account lock status
- Suspicious activity flags

### Required fields
- Opportunity ID
- Pair
- Proposed trade size
- Net expected profit
- SQIS
- Committee decision
- Committee confidence
- Available balance
- Daily loss limit
- Maximum trade size
- Execution service status
- Time synchronization status
- API permission status
- Withdrawal permission status

### Optional fields
- Historical context fields
- Exposure breakdowns by strategy or exchange
- Suspicious activity flags when none exist
- Debates or veto details if not triggered

### Validation rules
- Required fields must exist and be well-typed.
- Numeric fields must be non-negative unless explicitly modeled as losses.
- Freshness-critical fields must be inside policy freshness windows.
- Data must carry timestamps and source references.
- Any missing critical field must fail closed.

### Freshness limits
- Market data freshness should be strict.
- Exchange health freshness should be short.
- Balance and exposure freshness should be short before execution.
- Time synchronization status should be very strict.

### Missing-data behavior
- Missing critical data must block live execution.
- Missing non-critical data may downgrade to paper trading or manual review.
- Missing execution-state data should force revalidation.

---

## 7. Safety Score Model

The Safety Score measures execution safety, not expected profitability.

### Categories
- 90-100: Very Safe
- 80-89: Safe
- 70-79: Acceptable with Conditions
- 60-69: Caution
- 40-59: Unsafe for Automation
- 20-39: High Risk
- 0-19: Blocked

### Scoring dimensions

| Dimension | Purpose | Input signals | Weight | Score range | Penalties | Critical failures | Confidence | User-facing explanation |
|---|---|---|---|---|---|---|---|---|
| Exchange Safety | Judge venue reliability | latency, errors, maintenance, fill quality, status | 18% | 0-100 | degraded venue, inconsistent fills | exchange blocked or paused | exchange confidence | “Exchange conditions are safe enough for this action.” |
| Liquidity Safety | Ensure size can be filled safely | buy/sell depth, partial fill risk, depth stability | 16% | 0-100 | thin depth, book instability | insufficient liquidity | liquidity confidence | “The book is deep enough for safe sizing.” |
| Execution Safety | Assess sequencing and completion risk | fill probability, API reliability, sync risk | 14% | 0-100 | slow execution, poor recovery | execution path unsafe | execution confidence | “The order path appears executable within policy.” |
| Portfolio Safety | Prevent concentration and overexposure | exposure, reserves, balance, reserve target | 14% | 0-100 | high concentration, reserve shortfall | hard exposure limit breached | portfolio confidence | “This trade fits current portfolio safety rules.” |
| Loss Budget Safety | Protect daily, weekly, and strategy budgets | realized losses, unrealized losses, failure costs | 14% | 0-100 | nearing limits, recent losses | daily hard stop reached | loss confidence | “Loss budgets still allow cautious activity.” |
| Market Volatility Safety | Detect unstable market conditions | volatility, regime, shock signals | 8% | 0-100 | elevated volatility, shock events | volatility beyond threshold | volatility confidence | “Market volatility is within policy.” |
| Network Safety | Protect transfer and chain assumptions | congestion, confirmations, chain health, mismatch | 6% | 0-100 | congestion, chain mismatch, fee spikes | network route unsafe | network confidence | “Transfer/network conditions are acceptable.” |
| API and Infrastructure Safety | Keep system healthy enough to act | queue delay, worker health, db health, ws health | 6% | 0-100 | degraded infrastructure | execution service unhealthy | infra confidence | “The platform is healthy enough to support this trade.” |
| Credential and Compliance Safety | Prevent dangerous account usage | permissions, withdrawal access, country rules, credential age | 2% | 0-100 | risky permissions, stale credentials | compliance blocked | compliance confidence | “Your account permissions and compliance state are acceptable.” |
| Data Freshness and Confidence | Penalize stale or uncertain data | freshness, confidence, missing-data flags | 2% | 0-100 | stale or incomplete inputs | stale data gate hit | freshness confidence | “The inputs are fresh enough to trust.” |

### Safety Score behavior
- A high weighted average cannot override a critical failure.
- Any hard block yields a blocked or ineligible outcome regardless of score.
- The score is a safety measure, not a profit measure.

---

## 8. Safety Score vs SQIS

### SQIS
Measures opportunity quality and intelligence confidence.

### Safety Score
Measures whether the opportunity can be executed safely under current conditions.

### Examples

#### Example 1
- SQIS: 94
- Safety Score: 42
- Result: WAIT or PAPER_TRADE_ONLY

#### Example 2
- SQIS: 81
- Safety Score: 96
- Result: Eligible for manual execution

#### Example 3
- SQIS: 96
- Safety Score: 0
- Reason: Compliance rejection
- Result: BLOCKED

The final execution decision must use both scores and all hard guardrails.

---

## 9. Hard Guardrails

Hard guardrails are non-disableable. They must fail closed.

Examples:
- Negative expected net profit
- Stale price data
- Stale order-book data
- Buy or sell trading suspended
- Critical exchange maintenance
- Insufficient balance
- Insufficient liquidity
- Compliance restriction
- Invalid API credentials
- Required API permission missing
- Critical risk veto
- Daily hard loss limit reached
- Global kill switch active
- User account suspended
- Execution service unhealthy
- Time synchronization failure
- Opportunity expired
- Maximum safe capital below minimum order size
- Portfolio exposure exceeds hard limit

Hard guardrail result:
- BLOCKED

Hard guardrails must not be bypassable by users, admins, AI, or subscription plans without formal policy change and ADR approval.

---

## 10. Soft Guardrails

Soft guardrails are configurable controls that reduce permission rather than hard-block every time.

Examples:
- Elevated volatility
- Moderate exchange latency
- Medium committee disagreement
- Lower-than-preferred liquidity
- High portfolio concentration
- Recent execution failures
- Reduced confidence
- Profit below preferred target
- Network congestion
- Uncertain fee estimate
- Spread decay
- Approaching daily loss limit

Possible outcomes:
- REDUCE_POSITION_SIZE
- REQUIRE_MANUAL_APPROVAL
- PAPER_TRADE_ONLY
- WAIT
- PAUSE_STRATEGY
- PAUSE_EXCHANGE

---

## 11. Guardrail Priority

Priority order:

- Priority 0: Emergency stop
- Priority 1: Hard block
- Priority 2: Critical reduction
- Priority 3: Manual approval required
- Priority 4: Warning
- Priority 5: Informational

When multiple guardrails trigger, the most restrictive result must win.

---

## 12. Position Limit Engine

The Position Limit Engine calculates the lowest safe permitted capital.

### Inputs
- User maximum trade size
- Strategy maximum trade size
- Exchange maximum exposure
- Asset maximum exposure
- Portfolio concentration limit
- Liquidity-derived maximum capital
- Committee-recommended capital
- Safety Score limit
- Daily loss utilization
- Stablecoin reserve
- Available balance
- Partial-fill risk
- Slippage sensitivity

### Outputs
- Requested capital
- Recommended capital
- Maximum safe capital
- Maximum permitted capital
- Binding constraint
- Exposure after trade
- Risk percentage
- Expected slippage
- Expected net profit
- Decision explanation

### Rule
The final permitted capital must be the minimum of all applicable safe limits.

---

## 13. Daily Loss Control Engine

Daily loss controls should support:
- soft warning threshold
- position reduction threshold
- strategy pause threshold
- account pause threshold
- hard stop threshold

Example:
- 50% of daily loss budget: warning
- 70%: reduce position sizes
- 85%: manual approval only
- 100%: stop live trading

Include:
- realized losses
- unrealized losses
- fees
- failed execution costs
- recovery losses
- per-strategy loss
- per-exchange loss
- per-user loss
- global system loss controls future

Daily reset rules:
- Reset follows a configured trading timezone, not necessarily UTC.
- The reset window must be explicit and versioned.
- Unrealized losses should be policy-defined: include them when the active strategy requires it, otherwise isolate them by mode.

---

## 14. Consecutive Failure Controls

Track:
- consecutive losing trades
- consecutive partial fills
- consecutive API failures
- consecutive execution timeouts
- consecutive slippage breaches
- consecutive recovery actions

Example behavior:
- 1 failure: record and warn
- 2 failures: reduce size
- 3 failures: pause strategy
- 4 failures: pause exchange route
- 5 failures: stop live trading pending review

Thresholds must be configurable and versioned.

---

## 15. Exposure Controls

Exposure controls should exist for:
- total portfolio
- per asset
- per stablecoin
- per exchange
- per exchange route
- per network
- per strategy
- per user
- per organization
- correlated assets future

The engine must consider balances distributed across exchanges so it does not assume a single pooled balance when the funds are fragmented.

---

## 16. Stablecoin Reserve Manager

Stablecoins are not risk-free.

### Purpose
- Keep sufficient capital liquid
- Avoid overexposure to volatile assets
- Maintain capital for future opportunities
- Support rebalancing
- Protect realized profits

### Controls
- Minimum stablecoin reserve percentage
- Preferred stablecoin mix
- Maximum stablecoin concentration
- Approved stablecoins
- Depeg risk monitoring
- Reserve shortfall warning
- Reserve restoration plan

### Risk considerations
- depeg risk
- issuer risk
- liquidity risk
- network risk
- exchange concentration risk

---

## 17. Profit Protection Engine

Profit protection should preserve gains within exchange balances and not require withdrawal permissions.

### Policies
1. Fixed Trading Capital
   - Continue trading only with original capital.
   - Move profit to protected balance.

2. Percentage Profit Lock
   - Lock a configurable percentage of realized profit.

3. Daily Profit Lock
   - Protect profit after reaching a daily threshold.

4. Drawdown Protection
   - Reduce position size after giving back part of daily profit.

5. Stablecoin Conversion
   - Convert residual volatile assets to approved stablecoins after completed cycles.

6. End-of-Session Protection
   - Disable new trades and restore configured asset allocation.

Profit protection should stay internal to controlled balances unless a separate withdrawal module later authorizes transfers.

---

## 18. Drawdown Control

Track:
- daily drawdown
- weekly drawdown
- monthly drawdown
- peak-to-current drawdown
- strategy drawdown
- exchange-route drawdown

Possible actions:
- warning
- reduce trade size
- disable auto trading
- pause strategy
- pause account
- require review

---

## 19. Exchange Safety Engine

### Rules to evaluate
- API latency
- error rates
- maintenance
- order rejection rate
- fill quality
- deposit/withdrawal status
- rate limits
- WebSocket disconnects
- historical reliability
- recent incident reports future

### Exchange states
- HEALTHY
- DEGRADED
- RESTRICTED
- PAUSED
- BLOCKED
- RECOVERING

### State transitions
- HEALTHY -> DEGRADED when latency, errors, or fill quality worsen.
- DEGRADED -> RESTRICTED when a subset of functionality is still usable but risky.
- RESTRICTED -> PAUSED when trading safety is no longer acceptable.
- PAUSED -> BLOCKED when a hard policy or compliance issue exists.
- BLOCKED -> RECOVERING after a successful, policy-approved recovery window.

---

## 20. Network Safety Engine

Checks:
- network congestion
- gas or transfer fees
- confirmation delays
- chain halt
- bridge risk future
- token contract issues
- exchange network mismatch
- deposit memo/tag requirements
- stablecoin network mismatch

Even if transfers are not part of immediate execution, the network context must still be preserved for rebalancing and profit-protection safety.

---

## 21. Execution Safety Gate

The final safety gate runs immediately before any paper, manual, or live execution action.

It must revalidate:
- opportunity is still active
- prices remain within tolerance
- order-book depth remains sufficient
- expected profit remains positive
- fees remain valid
- exchange health remains acceptable
- balance remains available
- Safety Score remains above threshold
- SQIS remains above threshold
- committee decision remains valid
- no veto is active
- daily loss budget remains available
- position limit remains valid
- kill switch is not active
- user control mode permits execution

### Outputs
- ELIGIBLE_FOR_PAPER_TRADE
- ELIGIBLE_FOR_MANUAL_EXECUTION
- ELIGIBLE_FOR_AUTO_EXECUTION
- REDUCE_POSITION_SIZE
- REQUIRE_MANUAL_APPROVAL
- WAIT
- BLOCKED
- EXPIRED

---

## 22. Manual vs Automatic Thresholds

### Paper trading
- May allow weaker opportunities.
- Must clearly label simulated risk.

### Manual execution
- Requires moderate-to-high Safety Score.
- May allow conditional opportunities.
- Must show warnings.

### Automatic execution
- Requires highest Safety Score.
- Requires no critical disagreement.
- Requires lower exposure.
- Requires stricter latency limits.
- Requires stronger liquidity.
- Requires healthy infrastructure.
- Requires valid recovery path.

---

## 23. Circuit Breakers

Circuit breakers should exist for:
1. Exchange circuit breaker
2. Strategy circuit breaker
3. Pair circuit breaker
4. Network circuit breaker
5. User account circuit breaker
6. Organization circuit breaker
7. Global trading circuit breaker
8. AI decision circuit breaker
9. Execution service circuit breaker

### Trigger examples
- repeated API failures
- abnormal slippage
- high order rejection rate
- unexpected loss
- market shock
- data feed mismatch
- queue backlog
- AI decision anomaly
- exchange incident
- security event

### Breaker definition
Each breaker should define:
- trigger threshold
- scope
- duration
- recovery checks
- manual review requirements
- auto-recovery eligibility
- audit requirements

---

## 24. Kill Switch Architecture

Kill switches:
- User kill switch
- Strategy kill switch
- Exchange kill switch
- Organization kill switch
- Administrator global kill switch
- Automated emergency kill switch

Kill switch actions:
- Prevent new orders
- Cancel unfilled orders where safe
- Preserve current state
- Trigger recovery workflow
- Notify user and administrators
- Record audit event
- Require controlled reactivation

Kill switch properties:
- Fast
- Highly available
- Independent of generative AI
- Auditable
- Protected by strong authorization
- Resistant to accidental activation
- Resistant to unauthorized deactivation

---

## 25. Trading Pause Manager

Pause states:
- ACTIVE
- WARNING
- REDUCED
- MANUAL_ONLY
- PAPER_ONLY
- PAUSED
- EMERGENCY_STOPPED
- RECOVERY_PENDING

Pauses may apply to:
- user
- exchange
- pair
- strategy
- route
- organization
- entire platform

---

## 26. Recovery Mode

Recovery behavior after a failure:
- one leg filled, second leg failed
- partial fill
- order status uncertain
- API timeout after submission
- exchange disconnected
- market moved beyond safe range

Recovery options:
- cancel remaining order
- retry within strict tolerance
- hedge exposure
- convert residual asset to approved stablecoin
- reduce position
- stop strategy
- escalate for manual intervention

The architecture defines recovery policy, but actual trade execution stays for the future Execution Engine module.

---

## 27. Safety Decision Output

### `CapitalProtectionDecision`

| Field | Purpose |
|---|---|
| decision_id | Unique decision reference |
| opportunity_id | Linked opportunity |
| safety_score | Final safety score |
| safety_label | Very Safe, Safe, Acceptable with Conditions, etc. |
| decision | Final decision type |
| execution_eligibility | Paper, manual, auto, blocked, etc. |
| requested_capital | User or committee requested capital |
| recommended_capital | Safety-capped capital |
| maximum_safe_capital | Liquidity and risk-derived cap |
| maximum_permitted_capital | Final permitted cap |
| triggered_guardrails | Guardrails that fired |
| hard_blocks | Non-disableable blocks |
| soft_warnings | Configurable warnings |
| binding_constraint | Most restrictive limiter |
| loss_budget_status | Budget state |
| exposure_status | Exposure state |
| stablecoin_reserve_status | Reserve state |
| circuit_breaker_status | Breaker state |
| kill_switch_status | Kill switch state |
| required_conditions | Conditions that must remain true |
| expiry_time | When the decision expires |
| rule_set_version | Policy version |
| input_snapshot_version | Source snapshot version |
| user_facing_summary | Short summary |
| technical_explanation | Evidence-backed detail |
| evidence_references | Evidence IDs |

---

## 28. Explainability

### Example explanations
- Approved: “This trade remains within your exposure, liquidity, and daily-loss limits.”
- Reduced: “The requested capital exceeds the current order-book safe limit. Position size was reduced from $5,000 to $2,100.”
- Manual only: “Exchange latency has increased. Automatic execution is disabled, but manual review remains available.”
- Paper only: “Committee confidence is below the live-trading threshold.”
- Blocked: “Your daily hard loss limit has been reached.”
- Paused: “Three consecutive execution failures triggered a strategy circuit breaker.”

### Explanation rules
- Explanations must be evidence-backed.
- Explanations must not invent reasons.
- Explanations must mirror the actual decision package.

---

## 29. User Safety Profiles

Profiles:
- Conservative
- Balanced
- Advanced
- Institutional
- Custom

Users may configure:
- Preferred maximum trade size
- Soft daily loss limit
- Maximum trades per day
- Minimum Safety Score
- Minimum SQIS
- Maximum exposure
- Stablecoin reserve target
- Manual approval conditions
- Profit-locking preferences

Users must not be able to disable:
- Compliance restrictions
- Hard loss stops
- Stale-data checks
- Critical exchange blocks
- Credential safety requirements
- Global kill switch
- Critical liquidity requirements

---

## 30. Admin Governance

Admin capabilities:
- guardrail rule versions
- threshold configurations
- safety profile templates
- emergency platform controls
- exchange blocklists
- pair blocklists
- network blocklists
- incident review
- rule rollout
- rule rollback
- approval workflows

High-impact changes should require:
- role-based authorization
- reason
- ADR reference
- review
- audit event
- staging validation
- paper-trading validation
- controlled production rollout

---

## 31. Queue and Job Architecture

### Conceptual jobs
- ValidateCapitalProtectionInputJob
- CalculateSafetyScoreJob
- EvaluateHardGuardrailsJob
- EvaluateSoftGuardrailsJob
- CalculatePositionLimitsJob
- EvaluateDailyLossBudgetJob
- EvaluatePortfolioExposureJob
- EvaluateStablecoinReserveJob
- EvaluateProfitProtectionJob
- ProduceCapitalProtectionDecisionJob
- RevalidateExecutionSafetyJob
- TriggerCircuitBreakerJob
- ActivateKillSwitchJob
- ReleaseTradingPauseJob
- MonitorRecoveryStatusJob
- RecordSafetyAuditJob
- BroadcastSafetyDecisionJob

### Dependencies
1. Validate input.
2. Calculate safety score.
3. Evaluate hard guardrails.
4. Evaluate soft guardrails in parallel with other non-dependent checks.
5. Calculate limits, loss budget, exposure, reserves, and profit protection.
6. Produce decision.
7. Record audit.
8. Broadcast result.
9. Revalidate before execution.
10. Trigger breaker or kill switch if needed.

### Job rules
- Parallelize independent checks.
- Use priority queues.
- Keep jobs idempotent.
- Retry only safe jobs.
- Fail closed if safety cannot be established.
- Enforce timeouts on all decision jobs.

---

## 32. Event Architecture

### Events

| Event | Producer | Consumer | Payload | Auditable | Broadcast |
|---|---|---|---|---|---|
| SafetyEvaluationStarted | Input validator | Audit, UI | Opportunity and snapshot identifiers | Yes | Yes |
| SafetyScoreCalculated | Safety score engine | Orchestrator, UI | score, label, confidence | Yes | Yes |
| GuardrailTriggered | Guardrail engine | Audit, alerts, UI | guardrail type, severity, outcome | Yes | Yes |
| PositionSizeReduced | Position engine | UI, execution handoff | old size, new size, reason | Yes | Yes |
| DailyLossThresholdReached | Loss control engine | Alerts, admin, UI | threshold, utilization, scope | Yes | Yes |
| ExposureLimitReached | Exposure engine | Alerts, UI | exposure state, limit | Yes | Yes |
| StablecoinReserveBelowTarget | Reserve manager | Alerts, portfolio, UI | reserve gap, affected assets | Yes | Yes |
| ProfitLocked | Profit protection engine | Audit, portfolio, UI | lock amount, policy type | Yes | Yes |
| TradingModeRestricted | Pause manager | Execution, UI, audit | old mode, new mode, reason | Yes | Yes |
| StrategyPaused | Pause manager | Scanner, execution, UI | strategy id, reason | Yes | Yes |
| ExchangePaused | Exchange safety engine | Scanner, execution, UI | exchange id, reason | Yes | Yes |
| CircuitBreakerActivated | Breaker manager | Alerts, admin, UI | breaker scope, duration, reason | Yes | Yes |
| KillSwitchActivated | Kill switch manager | Alerts, admin, UI | scope, actor, reason | Yes | Yes |
| KillSwitchReleased | Kill switch manager | Alerts, admin, UI | scope, actor, reason | Yes | Yes |
| ExecutionSafetyApproved | Execution gate | Execution handoff, UI | eligibility, constraints | Yes | Yes |
| ExecutionSafetyRejected | Execution gate | UI, audit, alerts | rejection reasons | Yes | Yes |
| RecoveryRequired | Recovery monitor | Execution, UI, alerts | failure mode, required action | Yes | Yes |
| SafetyPolicyChanged | Governance | Audit, admin, UI | policy version, diff summary | Yes | Yes |

---

## 33. Alerts

Alert types:
- Approaching loss limit
- Hard loss stop
- Exposure limit
- Position size reduction
- Exchange degraded
- Circuit breaker
- Kill switch
- Stablecoin reserve shortfall
- Profit-lock event
- Trading paused
- Recovery required
- Policy change

Channels:
- In-app
- Email
- Telegram future
- WhatsApp future
- Mobile push future
- Administrator incident channel

Alerts should be deduplicated and severity-aware.

---

## 34. Observability

Metrics to monitor:
- Average Safety Score
- Block rate
- Reduction rate
- Manual-approval rate
- Paper-only rate
- Daily loss limit triggers
- Circuit breaker count
- Kill switch activations
- Consecutive failure rate
- Exposure-limit triggers
- Slippage breaches
- Recovery actions
- Exchange safety state
- Guardrail evaluation latency
- False safety blocks
- Losses prevented estimate future
- Rule-set versions in use

### Abnormal behavior alerts
- Safety scores collapsing across many opportunities.
- Block rates rising without a corresponding market shock.
- Frequent kill switch activation.
- Repeated false blocks from a rule version.
- Growing exposure-limit triggers.
- Reserve shortfall trending downward.

---

## 35. Security

Threats and controls:
- Unauthorized safety-rule changes: strict authorization and versioned policies.
- Kill-switch abuse: strong auth, dual approval for future global controls, audit trail.
- Cross-tenant limit leakage: tenant-scoped calculations and data access.
- Manipulated balances: revalidate from source systems and protect against stale ledger reads.
- Manipulated market inputs: freshness and source validation.
- Audit-log tampering: append-only records and integrity controls.
- Replay attacks: idempotency keys and expiring decisions.
- Race conditions during execution approval: revalidation at the gate.
- Stale decision reuse: strict expiry.
- Privilege escalation: separated admin and safety roles.
- Disabling safety controls: disallowed unless formal policy change and ADR approval.

Controls:
- Strict authorization
- Versioned policies
- Immutable audit records
- Expiring safety decisions
- Idempotency keys
- Signed decision packages future
- Tenant isolation
- Encryption
- Dual approval for global controls future

---

## 36. Laravel Domain Structure

Recommended structure:

```text
app/
├── Domain/
│   └── CapitalProtection/
│       ├── Contracts/
│       ├── Services/
│       ├── DTOs/
│       ├── Enums/
│       ├── Policies/
│       ├── Guardrails/
│       │   ├── Hard/
│       │   └── Soft/
│       ├── SafetyScore/
│       ├── PositionLimits/
│       ├── LossControls/
│       ├── ExposureControls/
│       ├── StablecoinReserve/
│       ├── ProfitProtection/
│       ├── CircuitBreakers/
│       ├── KillSwitches/
│       ├── Pauses/
│       ├── Recovery/
│       ├── Jobs/
│       ├── Events/
│       ├── Listeners/
│       ├── Exceptions/
│       └── Support/
```

### Directory responsibilities
- `Contracts`: interfaces for safety services, breakers, and decision engines.
- `Services`: core orchestration and policy logic.
- `DTOs`: normalized safety input and output contracts.
- `Enums`: safety levels, pause states, breaker states, and decision types.
- `Policies`: authorization and governance rules.
- `Guardrails/Hard`: non-disableable stop conditions.
- `Guardrails/Soft`: configurable reduction, approval, and pause behaviors.
- `SafetyScore`: scoring logic and dimensions.
- `PositionLimits`: exposure and capital limit calculations.
- `LossControls`: daily, weekly, monthly, and per-strategy loss logic.
- `ExposureControls`: portfolio, exchange, asset, and route exposure limits.
- `StablecoinReserve`: reserve policy and depeg protection.
- `ProfitProtection`: profit-locking and drawdown rules.
- `CircuitBreakers`: breaker detection and state transitions.
- `KillSwitches`: emergency stop mechanisms.
- `Pauses`: scoped pause state management.
- `Recovery`: post-failure recovery policies.
- `Jobs`: queue-driven safety evaluation and monitoring work.
- `Events`: safety facts emitted to the system.
- `Listeners`: audit, notification, and projection side effects.
- `Exceptions`: safety-specific failures.
- `Support`: shared helpers, calculators, and policy utilities.

---

## 37. Conceptual Enums

| Enum | Conceptual values | Purpose |
|---|---|---|
| SafetyLevel | VERY_SAFE, SAFE, ACCEPTABLE_WITH_CONDITIONS, CAUTION, UNSAFE_FOR_AUTOMATION, HIGH_RISK, BLOCKED | Human label for safety score |
| CapitalProtectionDecisionType | APPROVE, REDUCE_POSITION_SIZE, REQUIRE_MANUAL_APPROVAL, PAPER_TRADE_ONLY, PAUSE_STRATEGY, PAUSE_EXCHANGE, PAUSE_USER_ACCOUNT, PAUSE_ALL_LIVE_TRADING, REJECT, EMERGENCY_PROTECTION | Final safety outcome |
| ExecutionEligibility | ELIGIBLE_FOR_PAPER_TRADE, ELIGIBLE_FOR_MANUAL_EXECUTION, ELIGIBLE_FOR_AUTO_EXECUTION, REDUCE_POSITION_SIZE, REQUIRE_MANUAL_APPROVAL, WAIT, BLOCKED, EXPIRED | Execution state |
| GuardrailType | HARD_BLOCK, SOFT_REDUCTION, MANUAL_APPROVAL, PAPER_ONLY, PAUSE, KILL_SWITCH, CIRCUIT_BREAKER | Guardrail category |
| GuardrailSeverity | INFO, WARNING, HIGH, CRITICAL, EMERGENCY | Severity taxonomy |
| TradingControlMode | ANALYSIS_ONLY, PAPER_TRADING, MANUAL_APPROVAL_REQUIRED, CONDITIONAL_AUTOMATION, FULL_AUTOMATION | Human control mode |
| TradingPauseState | ACTIVE, WARNING, REDUCED, MANUAL_ONLY, PAPER_ONLY, PAUSED, EMERGENCY_STOPPED, RECOVERY_PENDING | Pause status |
| CircuitBreakerType | EXCHANGE, STRATEGY, PAIR, NETWORK, USER_ACCOUNT, ORGANIZATION, GLOBAL_TRADING, AI_DECISION, EXECUTION_SERVICE | Breaker scope |
| CircuitBreakerState | CLOSED, OPEN, HALF_OPEN, RECOVERING | Breaker lifecycle |
| KillSwitchScope | USER, STRATEGY, EXCHANGE, ORGANIZATION, ADMIN_GLOBAL, AUTOMATED_EMERGENCY | Kill-switch scope |
| KillSwitchState | DISABLED, ENABLED, ACTIVATED, COOLDOWN, RECOVERY | Kill-switch lifecycle |
| LossThresholdLevel | WARNING, REDUCE, MANUAL_ONLY, HARD_STOP | Loss budget level |
| ExposureType | TOTAL_PORTFOLIO, ASSET, STABLECOIN, EXCHANGE, ROUTE, NETWORK, STRATEGY, USER, ORGANIZATION, CORRELATED_ASSET | Exposure category |
| RecoveryStatus | NOT_REQUIRED, REQUIRED, IN_PROGRESS, COMPLETED, FAILED | Recovery lifecycle |
| ExchangeSafetyState | HEALTHY, DEGRADED, RESTRICTED, PAUSED, BLOCKED, RECOVERING | Exchange state |
| SafetyDecisionExpiryReason | DATA_STALE, HEALTH_CHANGED, BALANCE_CHANGED, LIMIT_CHANGED, STATUS_CHANGED, TIME_WINDOW_EXPIRED | Expiry cause |
| ProfitProtectionPolicyType | FIXED_TRADING_CAPITAL, PERCENTAGE_PROFIT_LOCK, DAILY_PROFIT_LOCK, DRAWDOWN_PROTECTION, STABLECOIN_CONVERSION, END_OF_SESSION_PROTECTION | Profit-protection policy |

---

## 38. Testing Architecture

### Required test suites
1. Hard guardrail enforcement
2. Soft guardrail outcomes
3. Safety Score calculation
4. SQIS and Safety Score conflict
5. Position size minimum-rule behavior
6. Daily loss thresholds
7. Exposure limits
8. Stablecoin reserve policy
9. Profit-lock behavior
10. Drawdown controls
11. Consecutive failure escalation
12. Circuit breaker activation
13. Kill switch activation
14. Kill switch authorization
15. Pause and resume workflow
16. Recovery requirements
17. Decision expiry
18. Revalidation before execution
19. Cross-tenant isolation
20. Audit integrity
21. Race-condition protection
22. Fail-closed behavior

### Required scenarios
- High SQIS but low Safety Score
- High expected profit but insufficient liquidity
- Safety Score passes but daily loss limit fails
- User requests more than maximum safe capital
- Exchange degrades after approval
- Opportunity expires before execution
- Three partial fills trigger pause
- Global kill switch activates
- Stablecoin reserve falls below target
- Auto trading blocked but manual execution permitted
- Manual execution blocked by a hard guardrail
- Safety service unavailable

Tests must verify that the most restrictive guardrail always wins.

---

## 39. Recommended ADRs

| ADR | Context | Decision | Alternatives | Consequences | Security impact | Review trigger |
|---|---|---|---|---|---|---|
| Capital Preservation Engine is authoritative over execution eligibility | Safety must be centralized | CPE decides if trading is allowed | Let execution engine decide | Stronger safety, clearer governance | Strong positive | If execution policy changes |
| Safety Score is separate from SQIS | Quality and safety are different | Keep distinct scores | Merge into one score | Better semantics and safer gating | Positive | If product semantics change |
| Most restrictive guardrail wins | Multiple rules may trigger | Highest restriction wins | Average guardrail behavior | Prevents unsafe override | Strong positive | If policy precedence changes |
| Hard guardrails are non-disableable | Some risks are unacceptable | Hard gates cannot be toggled off | User-disableable hard stops | Safer platform | Strong positive | If governance model changes |
| Position size uses the lowest binding safe limit | Many constraints can bind | Minimum safe limit wins | Average or weighted size | Prevents over-allocation | Strong positive | If sizing policy changes |
| Automatic trading uses stricter thresholds | Automation increases risk | Auto thresholds are stricter | Same as manual | Safer automation | Strong positive | If auto-trading policy changes |
| Global kill switch is independent of AI services | Emergency safety must not depend on AI | Keep independent control path | AI-assisted kill switch | More reliable emergency response | Strong positive | If emergency governance changes |
| Safety decisions expire | Markets and balances change fast | Decisions are time-bounded | Long-lived approvals | Lower stale-execution risk | Strong positive | If execution latency changes |
| Live execution requires immediate revalidation | Data can drift between review and order | Revalidate before execution | Use review-time decision only | Safer execution | Strong positive | If order latency changes |
| Stablecoins are treated as risk-bearing assets | Stablecoins can depeg | Do not treat as risk-free | Treat as cash equivalent | Better reserve safety | Positive | If reserve strategy changes |
| Profit protection does not require withdrawal permission | Profit-lock should stay internal | Use internal balance controls | Require withdrawals | Less operational friction and safer | Positive | If treasury model changes |
| Repeated failures trigger automatic escalation | Repeated failure indicates instability | Escalate and pause | Keep retrying | Better capital defense | Strong positive | If failure policy changes |
| Safety policy changes require versioning and audit | Safety must be governed | Version, test, audit, roll out slowly | Direct live changes | Safe governance | Strong positive | If policy lifecycle changes |

---

## 40. Phased Implementation Plan

| Phase | Goal | Dependencies | Deliverables | Risks | Exit criteria |
|---|---|---|---|---|---|
| Phase 1 | Deterministic hard guardrails | Input contract, policy config | Hard-block engine and tests | Overblocking if rules are too strict | Hard guardrails behave correctly |
| Phase 2 | Safety Score | Feature builder | Safety score engine and calibration hooks | False confidence or over-penalization | Score is stable and interpretable |
| Phase 3 | Position and exposure limits | Portfolio and liquidity inputs | Capital cap engine | Under-sizing or hidden constraint conflicts | Lowest-safe-limit rule works |
| Phase 4 | Daily loss controls | PnL and time zone logic | Loss thresholds and reset rules | Time-zone bugs | Loss budgets enforce correctly |
| Phase 5 | Trading pause states | Guardrails and loss controls | Scoped pause manager | Pause state drift | Pause/resume states function |
| Phase 6 | Circuit breakers | Failure telemetry | Breaker activation and recovery policies | Excessive sensitivity | Breakers trigger and recover safely |
| Phase 7 | Kill switches | Auth and governance | Emergency stop path | Accidental activation | Safe activation and controlled release |
| Phase 8 | Stablecoin reserve and profit protection | Balance and reserve data | Reserve manager and profit-lock rules | Depeg underestimation | Reserve policy functions safely |
| Phase 9 | Execution safety revalidation | Execution handoff | Final gate checks | Revalidation latency | Pre-execution gate blocks unsafe actions |
| Phase 10 | Recovery coordination | Execution failure events | Recovery policy and workflows | Slow recovery handling | Recovery actions are defined |
| Phase 11 | Admin governance and policy versioning | Registry and audit layer | Rule versioning and rollout controls | Governance complexity | Policy changes are versioned and reversible |
| Phase 12 | Advanced institutional controls | Full ecosystem telemetry | Enterprise controls and scoped governance | System complexity | Controls operate safely at scale |

---

## 41. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Unsafe capital deployment | Hard guardrails, lowest-safe-limit sizing, revalidation |
| AI overconfidence | Separate Safety Score from SQIS and require deterministic gates |
| Stale approvals | Decision expiry and immediate revalidation |
| Exchange instability | Exchange safety engine and circuit breakers |
| Portfolio overexposure | Exposure caps and reserve management |
| Loss escalation | Daily loss controls and consecutive failure limits |
| Kill-switch misuse | Strict authorization, audit, and controlled reactivation |
| Rule drift | Versioned policies, testing, and rollback |
| Race conditions | Idempotency and pre-execution revalidation |
| Reserve depeg risk | Treat stablecoins as risk-bearing assets and monitor concentration |

---

## 42. Next Recommended Architecture Module

**Module 8: Execution Eligibility, Paper Trading Handoff, and Recovery Coordination Architecture**

Why next:
- The safety engine will need a downstream consumer for eligibility and recovery handling.
- Paper trading and manual execution should obey the same safety contract before live automation is considered.
- The next module should define how a safety decision becomes an execution eligibility package without weakening the guardrail model.

